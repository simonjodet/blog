<img src="/img/2011-12-10-my-journey-with-ruby/ruby.png" class="post-img float-left"/>
I'm a developer. But as a developer, I'm fairly faithful. I really seriously started programming with PHP. I learned and used this language thouroughly. I consider myself an expert programmer in this language.

It's more or less my native language. My second language is JavaScript. I started playing with it a long time ago but really discovered its power in 2007 with Mootools.  
Yes Mootools! jQuery is for sissies! Just kidding, jQuery is fine but if you want to really learn JavaScript, try Mootools or ExtJS, read [this](http://shop.oreilly.com/product/9780596101992.do), Crockford's [book](http://shop.oreilly.com/product/9780596517748.do) and watch [his lectures](http://yuiblog.com/crockford/).

I've played with other languages, some really close to what I know - ActionScript is just JavaScript- others a little more different like Python. Python is nice but we have our fair share of Python developers at the office. What's the fun of learning a new language if you have the security of being able to ask the guy next door?

So as you probably guessed with this article's title, I've decided to learn Ruby. And I just figured out that I should document this journey. I don't know if it'll help anybody but, heh, why not?  
So to be fair, I've tried Ruby before. Not very seriously. And because of this blog actually. It's built on [Jekyll](http://jekyllrb.com/) which is written in Ruby. When I wanted to change some stuff I realized I should probably learn Ruby first.

This introduction is already way too long so let's get to the point.

* Ruby is a pretty cool language, clearly designed for the convenience of the developer, with a lot of alternative syntaxes and shortcuts.  
  The language is, I feel, sometimes a bit too forgiving, leaving the developer free to write bad code without realizing it.
* I just love the fact that Ruby has closures. It's like a mix between PHP and JavaScript.
* Gems seem to be a lot better than PHP's PEAR. 
* The documentation is huge, a bit too much actually. My first tries at Ruby were a bit rushed. I've been hearing praises for Ruby On Rails for so long, I tried to learn the language through RoR.  
  Even though there is a lot of [good tutorials](http://railsforzombies.org/), you should start by learning Ruby first, RoR second. So, I got the [Learning Ruby](http://shop.oreilly.com/product/9780596529864.do) book and just read it. It's not a perfect book, I feel it sometimes even expressed dangerous opinions for junior developers. But if you want to learn the basics of the language, it does the trick.
* Still regarding the documentation, for whatever reason, it's hard for me to understand the reference documentation. It's just a mess for me. I tried to learn the language with a small program that manipulate file paths. In other words, strings. When I started looking for a way to use Regexp, I hit [a wall](http://www.ruby-doc.org/core-1.8.7/Regexp.html). Where is the legend? Where is the real life example? Oh I see, I have to use the ``new`` method to transform a string in a pattern. I mean, the php.net documentation is not that good but a least you get examples in their context...
* I took me 2 hours and a lot of digging to understand why my ``require 'json'`` directive didn't work even though I had installed the gem. Actually, I still don't understand why, I just found that with ``require 'rubygems'`` before, it was working.
* Even though Ruby is installed by default on Mac OS X, some struff doesn't really work well. Or I just broke it earlier digging in my system. I'm currently using the macports version of Ruby (1.8.7). I may eventually decide to compile it myself or use rvm.
 
So, for the couple of geeks that'll read this, if you know soemthing about Ruby, have advices, books I should read, please let me know in the comments :)
