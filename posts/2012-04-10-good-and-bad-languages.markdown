***
{
    "title":"Good and bad languages",
    "date":"2012-04-10",
    "category":"development",
    "layout":"post.twig",
    "tags":["PHP", "JavaScript", "languages", "Trolls"]
}
***

I was in pretty good mood this morning. Then I went to browse my Twitter feed and stumbled upon an article linked by one of the guys I truly admire, [Jeff Atwood](http://www.codinghorror.com/).

The article I'm talking about is [this one](http://me.veekun.com/blog/2012/04/09/php-a-fractal-of-bad-design/).

At that point, I got annoyed. I knew Jeff wasn't a PHP fan. He's free to think what he wants and express it as much as he wants. And [his article](http://www.codinghorror.com/blog/2008/05/php-sucks-but-it-doesnt-matter.html) on the topic is pretty fair.

The tweeted article is really bad, full of errors that shows how much the guy doesn't know what he's talking about or maybe he just doesn't care to be fair or objective. The article states PHP errors don't have [call stacks](http://php.net/manual/en/exception.gettraceasstring.php). It states PHP has [no constructor and no destructor](http://php.net/manual/en/language.oop5.decon.php). At that point, I just stopped reading. But enough advertisement for this article already. At least, it gave me the urge to write this blog entry - long time no see dear reader =)

A bit of personal history first. I started programming in PHP around 2000 when PHP 3 was still the standard and 4.0.x a novelty not that much supported by French free hosting services.  
I had very little programming experience at that point but still I was able to get a pretty good picture gallery website with MySQL database, pagination, sorting options, etc. in a couple of months.  
Of course, the code was ugly but all I needed at that point was to learn the good practices.  
The language you use doesn't make you a better programmer. As long as it doesn't prevent good practices, you should use whatever language is easier for you to learn and understand.

I recently had to make the language choice for a brand new personal project. As previous entries in this blog shows, I could have used Python, Ruby or Node.JS. To be honest, I started the project with Rails, switched to Django then played with Node.JS.  
Eventually, I stopped experimenting and chose PHP. Why? Because the project would require to be installed on servers I don't have control over. Among PHP, Python, Ruby and Node, what's the most ubiquitous language around in web-hosting solutions? PHP is probably on top. That's why I chose MySQL over other RDBMS/NoSQL solutions by the way.

I was a bit sad to have to resort to PHP again and then I found out (thanks François!) about [Silex](http://silex.sensiolabs.org/). A new feature of PHP 5.3 I didn't noticed previously is heavily used by Silex: closures. Wow! Apart from the fact that my experiences with Node.JS made closures easy for me to understand and use, I realized PHP had made a lot of progress lately.

[Closures](http://php.net/manual/en/class.closure.php) and [Phars](http://www.php.net/manual/en/intro.phar.php) are great additions to PHP.

That's what make me angry when I read PHP-bashing articles. They see the bad parts and judge only by them, they don't see how much the language progressed over the years. I don't give a f**k about the bad parts. I know them, I avoid them and I only use what is good or great. The same applies to JavaScript, read [Douglas Crockford](http://www.amazon.com/JavaScript-Good-Parts-Douglas-Crockford/dp/0596517742) and focus on what is great in the language. It's enough.

I wonder how PHP successfully went through 6 major versions (5.3 is what 6.0 should have been IMO). And I'm wondering why Python struggles so much with its 3.0 version adoption rate. Oh maybe it deprecates too much stuff and nobody wants to work that much to switch to 3.0.  
On the other hand, PHP suffers from not deprecating too much its API: the naming is not consistent. It tends to add to the API instead of replacing, meaning a growing API.

I can do better TDD in PHP, thanks for the somewhat classical OO model of PHP and the closures, allowing for easier and more powerful dependency injection. Python doesn't even have private methods...  
PHP also better fits my need for readable code, Ruby has too much "magic" syntax for me. But that part is purely personal preference.

The last major advantage of PHP is that you can set it up fast for development. You then have a lot of actions possible when going to production to fast things up: going to Nginx and FastFPM, enabling opcode cache (APC), tweaking your php.ini, compiling your own version of PHP or even using [HipHop](https://github.com/facebook/hiphop-php/).

I agree with most stuff Jeff Atwood writes but not this tweet:

![image](/img/2012-04-10-good-and-bad-languages/jeff_atwood_tweet.png.jpg)

So please continue to create projects using PHP. And please continue ranting on the bad parts of the language to the community, that'll make it better.

