I've learned a long time ago that PHPUnit mocks suck. Big time. They're just a pain to use.

So I looked for alternatives. I didn't look for long as a [former colleague](https://github.com/fdussert) of mine is one of the original contributors of [atoum](https://github.com/atoum/atoum).

Maybe because it's younger (and thus requires PHP 5.3 or above), atoum expressiveness is much better than [PHPUnit](https://github.com/sebastianbergmann/phpunit).  
I really like atoum and highly recommend it. However, because it's a young project, I have two problems with it:

* The documentation was really lagging but it's getting there
* Integration with other tools is poor

The integration issue for me is really a deal-breaker. I really like to have a green bar in [IntelliJ IDEA](http://www.jetbrains.com/idea/). I sometimes like to check test coverage live in the IDE. <span style="text-decoration: line-through;">There was no Jenkins plugin for atoum (I didn't check lately though).</span>  
**Update:** [atoum works with Jenkins](https://github.com/atoum/atoum/wiki/atoum-et-Jenkins-(ou-Hudson)) as his author [indicates to me](https://twitter.com/mageekguy/status/290863062636969984). And I should have mentioned the [feature request](http://blog.mageekbox.net/?post/2012/11/07/You-use-atoum-and-PhpStorm) for atoum support in IntelliJ IDEA. I signed it and you should too.

And then I stumbled on [Mockery](https://github.com/padraic/mockery). Unlike atoum, it doesn't replace PHPUnit, it just replaces its mocking system with a more elegant, powerful and reliable one.

The big plus of Mockery over PHPUnit is that you don't need to have the class to mock to create a mock. You can start mocking a dependency, test and write your class then later create the dependency class. Oh and try mocking [Demeter chains](https://github.com/padraic/mockery#mocking-demeter-chains-and-fluent-interfaces) with PHPUnit. Good luck!

But writing partial mocks with Mockery is not obvious. "What is a partial mock?" you say? It's mocking some method(s) of a class to test other methods of the same class.

Here's a real life example. Let's say we have a `Database` class with:

* a `dropTable` method to drop a given table
* a `listTables` method to list existing tables in a given database
* a `getSchema` method to get the database SQL schema

Those 3 methods will be used to reset (empty it of all data) the database: list tables, delete them then execute the SQL requests of the schema.  
To me, there is no other logical place for a `reset` method than the `Database` class. That's a typical scenario when you need a partial mock.  

Here's the `Database` class:

<pre class="php">
&lt;?php
 
class Database
{
    /**
     * @var \Doctrine\DBAL\Connection
     */
    private $conn;
 
    public function __construct(\Silex\Application $app)
    {
        $this->conn = $app['db'];
    }
 
    public function getSchema($version = null)
    {
        //...
    }
 
    public function listTables()
    {
        //...
 
    }
 
    public function dropTable($table)
    {
        //...
    }
 
    public function reset($version = null)
    {
        $tables = $this->listTables();
        foreach ($tables as $table)
        {
            $this->dropTable($table);
        }
 
        $schema = $this->getSchema($version);
        foreach ($schema as $query)
        {
            $this->conn->query($query);
        }
 
    }
}
</pre>

To create partial mocks, you have to give Mockery the class to mock (so don't create an anonymous mock) and the methods that will be mocked surrounded by square braces:

<pre class="php">$Database = \Mockery::mock('MyClass[methodToMock1,methodToMock2]', array('constructor parameter 1', 'constructor parameter 2'))</pre>

You can also pass some parameters to the mock's constructor. It's especially handy when you need to inject external dependencies.

And here's how it's applied to our example:

<pre class="php">
&lt;?php

namespace Tests\UnitTests;

class DatabaseTest extends PHPUnit_Framework_TestCase
{
    //...

    public function test_reset_lists_existing_tables_deletes_them_then_create_a_new_schema()
    {
        $app = new \Silex\Application();

        $ConnectionMock = \Mockery::mock('\Doctrine\DBAL\Connection');
        $ConnectionMock
            ->shouldReceive('query')
            ->with('SQL query 1')
            ->once()
            ->ordered('reset');
        $ConnectionMock
            ->shouldReceive('query')
            ->with('SQL query 2')
            ->once()
            ->ordered('reset');
        $app['db'] = $ConnectionMock;

        $Database = \Mockery::mock('\Database[listTables,dropTable, getSchema]', array($app));
        $Database
            ->shouldReceive('listTables')
            ->once()
            ->ordered('reset')
            ->andReturn(array('system', 'users'));
        $Database
            ->shouldReceive('dropTable')
            ->with('system')
            ->once()
            ->ordered('reset');
        $Database
            ->shouldReceive('dropTable')
            ->with('users')
            ->once()
            ->ordered('reset');
        $Database
            ->shouldReceive('getSchema')
            ->with(1)
            ->once()
            ->ordered('reset')
            ->andReturn(array('SQL query 1', 'SQL query 2'));

        $Database->reset(1);
    }
}
</pre>
