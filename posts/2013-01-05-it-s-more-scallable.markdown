***
{
    "title":"‟It's More Scallable”",
    "date":"2013-01-05",
    "category":"development",
    "layout":"post.twig",
    "tags":["language","development","PHP","Java","Ruby","JavaScript","Python"]
}
***

In a matter of a week, I've been "trolled" twice - I may be exaggerating a bit here - on Twitter by two very serious and talented developers: [@dhh](https://twitter.com/intent/user?screen_name=dhh) (creator of Ruby on Rails) and [@JBossMike](https://twitter.com/intent/user?screen_name=JBossMike) (a core engineer at JBoss).

#### The DHH incident
First, I got a bit pissed at @dhh for this tweet:
<blockquote class="twitter-tweet tw-align-center"><p>It's the same thing about PHP. Its simplicity and niche was and is amazing. Trying to grow it into a full OO env is folly.</p>&mdash; DHH (@dhh) <a href="https://twitter.com/dhh/status/284942147428438016" data-datetime="2012-12-29T08:41:16+00:00">December 29, 2012</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

I could have let it go but it was not the first time I saw a Ruby developer bashing PHP about it being simple or messy or not professional.

So I answered with:
<blockquote class="twitter-tweet tw-align-center"><p>And now @<a href="https://twitter.com/dhh">dhh</a> is trolling about PHP… You should look at Symfony 2 or Zend Framework, you'll learn a couple of things about true OOP...</p>&mdash; Simon Jodet (@sjodet) <a href="https://twitter.com/sjodet/status/284946401127985152" data-datetime="2012-12-29T08:58:10+00:00">December 29, 2012</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
and got his attention with:
<blockquote class="twitter-tweet tw-align-center"><p>.@<a href="https://twitter.com/dhh">dhh</a> tweets PHP is not a full OO env just weeks after @<a href="https://twitter.com/gilesgoatboy">gilesgoatboy</a> publishes a book about how Rails gets OOP wrong: <a href="http://t.co/op0uF4LX" title="http://railsoopbook.com/">railsoopbook.com</a></p>&mdash; Simon Jodet (@sjodet) <a href="https://twitter.com/sjodet/status/284948263029846016" data-datetime="2012-12-29T09:05:34+00:00">December 29, 2012</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

The discussion went on for a while but basically, @dhh said he admired PHP for its original simplicity but it shouldn't have evolved toward OOP.

#### Discussing with Mike Brock
Then today I had a Twitter conversation with @JBossMike who reacted to this tweet of mine:
<blockquote class="twitter-tweet tw-align-center"><p>ROFL "Java has eclipsed most dynamic languages" <a href="http://t.co/Dnd2c0Am" title="http://ocpsoft.org/opensource/javascript-is-the-new-perl/">ocpsoft.org/opensource/jav…</a> Except at Facebook, Twitter, Google, Dropbox and the list is long...</p>&mdash; Simon Jodet (@sjodet) <a href="https://twitter.com/sjodet/status/287587204702822402" data-datetime="2013-01-05T15:51:47+00:00">January 5, 2013</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
Basically, he took offence of *"ROFL"* associated with Java - or maybe because I made fun of his colleague's article - and spent a surprising amount of time listing how much Facebook, Twitter and especially Google were using Java and how much Java is scalable.
I can't argue with that, he probably knows better than I do what language is used at Google and it's absolutely true some very scalable tools like Cassandra or Hadoop are coded with Java.

#### Scalability is not the only criterium
But, like @dhh, @JBossMike missed my point or ignored it. There is a good reason Google was initially using Python. Facebook still uses PHP heavily and Twitter was created with Rails.

The reason is those languages and their ecosystem allow for a quick development and are easily deployable. I'm no Java expert but I'd suspect Java doesn't perform as well on small architectures as those 3 languages.  
I'd also suspect that in order to deliver a working prototype of Facebook, Google or Twitter, the amount of code/work necessary in Java is higher.  
And finally, I think Java developers are more expensive than their fellow developers specialised in PHP, Python or Ruby.

#### Silver bullet
*"Oh look what he's done in this last chapter, he's trolling Java!"* Maybe but I just wanted to prove that Java, like Ruby (and Rails) are not the silver bullet that solves every problem.  
I could go on about Java, even though I know very little about it and not be that far from the truth. I mean, the [article](http://ocpsoft.org/opensource/javascript-is-the-new-perl/) that started the discussion with @JBossMike is referring CoffeeScript replacing JavaScript. Like Scala is replacing Java?  
*"Java is a strongly-typed language so it's more maintainable and failure-proof"* I've worked several years with very talented C/C++ developers and they still had much more difficulties refactoring their apps than me with my MVC framework written in PHP. Strongly-typed has *nothing* to do with code quality or maintainability.  
It happens I'm reading [Clean Code](http://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882) again. All the examples are in Java but I can't remember an occurrence where Uncle Bob refers to Java being strongly-typed having anything to do with writing clean code.

#### You're not your code, you're not your language!
You know why Cassandra or Hadoop are written in Java? Because they're developed by better developers!

Yes they're better developers, more experienced, more trained, more schooled. But they're not better because they use Java. Those guys just tend to have learned Java early in their career and feel comfortable using it.

But you know what? Two of the best developers I know are not Java developers (I mean Java is not their prefered language). Fabien Potencier is the creator of the Symfony project (among other PHP projects) and Douglas Crockford created JSON and wrote the most educating book about JavaScript: [JavaScript: The Good Parts](http://shop.oreilly.com/product/9780596517748.do).

The language you're using doesn't tell me how good a developer you are. That's not because you're a Java developer or a Ruby developer that you know better than Fabien or Douglas about anything.
Actually it's more impressive for someone to master a flawed language (and PHP, JavaScript, Perl are majorly flawed) than to master strong languages such as Java.

#### To DHH and Mike Brock
Finally, to answer directly to DHH and Mike Brock, I know why you took some time to argue with me on this topic. You, more than others, invested *a lot* in your respective language and you have all the reasons in the world to try to convince people it is better than PHP, Python, JavaScript or Perl. Lincoln's article is just about proselytising Java.  
The more people you convince other languages suck, the more product/expertise in your preferred language you're gonna sell to them. 

But face it guys.
PHP powers much more web sites than Ruby and Java:
<div style="text-align:center;"><a href="http://w3techs.com/technologies/overview/programming_language/all">![Server Side Programming Languages](/posts/img/2013-01-05-your-preferred-language-is-not-better/server_side_programming_languages.png)</a></div>
And against the odds - and Java applets, VBScript and Flash - JavaScript, as flawed as it is, is the de-facto browser's language (I'm not convinced yet it's an appropriate server-side language but node.js and SilkJS are promising).

Your languages are strong but not *that* strong.

#### That's all trolls!
That's the last time I'll spend time on this holy war of languages. We got the same argument with web browsers and operating systems before that. And actual religions before that.

People tend to take offence when you criticise their preferred language the same way they'd take offence if you criticised their culture or religion. So don't do it, that's petty, mean and counter-productive.

You'd better spend your time developing great apps instead, whatever language you use.

