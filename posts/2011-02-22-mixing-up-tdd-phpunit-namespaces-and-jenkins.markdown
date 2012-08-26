***
{
    "title":"Mixing up TDD, PHPUnit, Namespaces and Jenkins",
    "date":"2011-02-22",
    "category":"development",
    "layout":"post.twig",
    "tags":["TDD", "PHPUnit", "namespace", "Jenkins", "PHP"]
}
***

Hi all,

First of all, if you're not a PHP developer, don't read this.

This post will be about my tries and misses with [TDD](http://en.wikipedia.org/wiki/Test-driven_development). To make things harder, I'm adding into the mix [PHPUnit](http://www.phpunit.de/manual/3.6/en/index.html) (of which I have minimal knowledge), [namespaces](http://www.php.net/manual/en/language.namespaces.php) (because I'm also a JavaScript developer and I feel at home now) and [Jenkins](http://jenkins-ci.org/) (fka Hudson).

First of all and against all odds, TDD is fun! I swear, I really enjoy it. And adding Jenkins multiply the fun because you can gloat, showing off you 100% test coverage, your sky-rocketing test count, etc.

Now, I wouldn't write a post just to say TDD is fun. Anyway TDD becomes fun and worthy of the effort when you have figured out some quirks of the different tools.

PHPUnit is a pain in the a\*\*. But it seems to be the de facto standard so... I'm waiting for a stable version of [Atoum](http://blog.mageekbox.net/?category/Projets/atoum) though.

I got 3 major issues with PHPUnit:

1- On a previous project, I found out the process isolation support is incomplete. To have a real process isolation, you have to put your tests in separate files! And it is really long to run the complete test suite. So you've got 3 options: multiply the file count of your project, curse PHPUnit's author or rewrite your project and stop using constants for everything...

2- Namespace support is weird, especially when using type hinting of classes. My advice: use full-qualified names. Not a big deal, you SHOULD always use full-qualified names anyway. That way, your fellow developer will not have to learn the whole namespace hierarchy to understand your code.

3- Mocks are cool but they're not meant to fix all your problems. You want to test if an object's method is called: mocks are the solution. You want to make sure that during a future rewrite your fellow developer will not forget to update the client class of another? Use a real instance of the object, not a mock of it. Here's a stupid example:

<pre class="prettyprint">
class Conf
{
    public function get_conf($key)
    {
        //do something
    }

    public function set_conf($key,$value)
    {
        //do something
    }
}

class Client
{
    public function __construct(Conf $conf)
    {
        $conf_entry = $conf->get_conf('key');
        $conf->set_conf('key2','value2');
        $conf_entry_2 = $conf->get_conf('key2');
        if($conf_entry_2 === false)
        {
             throw new Exception();
        }
    }
}
</pre>

To make sure the ``get_conf`` method is called by ``Client``'s constructor, use a mock.
To make sure the exception is thrown if ``$conf_entry_2`` is empty, use an instance of ``Conf``. Why?
Because someday, ``Conf`` may return ``null`` instead of ``false`` after a rewrite. The ``Conf`` unit tests will be changed and the developer will be happy, he's got 100% passed tests. But the ``Client`` class has not been changed because you've mocked ``Conf`` to return false. The tests are passing but the developer didn't rewrite ``Client`` to test ``$conf_entry_2`` against ``null`` instead of ``false``.

I've also got an issue using autoloading with namespaces. I'm not sure it's related to PHPUnit but anyway... I liked the solution I found because it will prevent some possible code collision which is the main benefit of namespaces in the first place. The solution? Instead of naming your autoload function ``__autoload()``, use a specific and very unique name such as ``myFantasticAutoloadingFunctionThatKicksAss()`` and use the ``spl_autoload_register()`` function to register it as an autoload function. After that PHPUnit was able to find my classes by himself.

Now TDD is starting to be fun.

PS: I will update this page if I find other quirks.

__Update:__

I've got 2 new quick tips:

* I use Netbeans to code and it is really simple to have a split screen in Netbeans. Just drag the file tab you want to split to the right and you'll have a split screen. Really handy for TDD to write your test and your code side by side.
* I found out that mocking 2 consecutive calls to the same method is not explained in PHPUnit's documentation. But it's simple: instead of using ``once()``, ``any()`` or ``none()`` in ``expects()``, use ``at(0)`` for the first call and ``at(1)`` in the second and so on. You can even make the mock return different values each time. I needed this in my previous example because you usually retrieve configuration more than once.
