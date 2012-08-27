***
{
    "title":"Gumdroping this blog",
    "date":"2012-08-26",
    "category":"development",
    "layout":"post.twig",
    "tags":["TDD", "PHP", "Gumdrop", "Gem", "Ruby", "Jekyll"]
}
***

Hi, it's been a while right?

It's not that I was lacking motivation to post here but for a while, I've been without any practical way to update this blog.

I've been talking quite a lot here on how this blog is built. Up until today, I was using [Jekyll](http://jekyllrb.com/) and I was happy with it because Jekyll meant I could get rid of Wordpress. Don't get me wrong, Wordpress is a great tool, I'm operating several deployments of it but not for me. It's way too powerful for my needs.

So I decided to use Jekyll. The only issue I've been having with Jekyll is actually the language it's built with, Ruby. Ok, before you rage-quit this blog, no it's not gonna be one of those trollish post about how much a language sucks. I promise!

So why do I have a problem with Ruby? First of all, because I don't know much about it. You may have read here that I gave Ruby a try. I enjoyed it and I'm not done with it. But it would have required a lot of my time to learn enough Ruby to fix what Jekyll is lacking.

The other problem I have with Ruby is [RubyGems](http://rubygems.org/). I recently changed computers and when I wanted to publish a new blog post, I realized how much a pain it was to install Jekyll. It's using the RubyGems system so you'd think it's easy. But nnnnooooo.... 
<blockquote class="twitter-tweet tw-align-center"><p>Say what you want about PHP but I miss Composer sometimes. The Ruby/Gem pair is a pure nightmare. Required root rights?! WTF!</p>&mdash; Simon Jodet (@sjodet) <a href="https://twitter.com/sjodet/status/234715658699558912" data-datetime="2012-08-12T18:19:08+00:00">August 12, 2012</a></blockquote>
<blockquote class="twitter-tweet tw-align-center"><p>Now I'm pissed! I have to install XCode to compile this f***ing ruby! I was able to install a whole PHP env with only the developer tools!</p>&mdash; Simon Jodet (@sjodet) <a href="https://twitter.com/sjodet/status/234719423418748929" data-datetime="2012-08-12T18:34:06+00:00">August 12, 2012</a></blockquote>
<script src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

First, you have to install Xcode. For a while I've been using Apple's Command Line Tools instead of Xcode. Homebrew is working great with those and it's a 110MB download instead of 1.81GB. RubyGems requires Xcode and nothing else...  

And it's a system-wide install. You'd better use [rvm](https://rvm.io/) or [rbenv](https://github.com/sstephenson/rbenv) to make sure you don't have version issues later on...  

Oh and the fact you have to do all of this with root privileges...

So I gave up and decided to accelerate this little project I've been working on for a while, [Gumdrop](http://simonjodet.github.com/gumdrop/) ([Github project](https://github.com/simonjodet/gumdrop)).

Essentially, it's similar to Jekyll. But there are significant differences:

- It's less orientated toward blogs. It can handle any kind of site, not just blogs. It actually has zero blog-specific features today.
- It's written in PHP. "Why?!? Oh why?!? Not in PHP!!!" is probably screaming Jeff Atwood right now if he reads me (I doubt he is ^^).
<div align="center">![image](/img/2012-04-10-good-and-bad-languages/jeff_atwood_tweet.png.jpg)</div>

  So why PHP?
	- I consider myself a PHP expert and I didn't want to learn a new language. I needed it pretty bad, I actually like writing blog posts once in a while.
	- There is a [PHP library](http://michelf.ca/projects/php-markdown/) available for parsing Markdown files.
	- The biggest reason why Gumdrop is so flexible (believe me, it is) is because it's using [Twig](http://twig.sensiolabs.org/), the best PHP template engine out there and it looks to me it's miles ahead of [Liquid](http://liquidmarkup.org/), the engine Jekyll uses.
	- The whole project was also an excuse to practice TDD and BDD (I'll talk about BDD in a future post).


Gumdrop reached a state of Release Candidate a couple of days ago. It has some bugs, some stuff is missing, I need to write more tests and more documentation but I can use it.

And it's so flexible I was able in a few hours to convert my whole blog and add something that I wanted to do since I've moved to Jekyll: a client-side search.

No more NodeJS server, no more PHP, no more SQL database. Pure JavaScript. How? Just because Gumdrop and Twig are powerful enough to let me write a full extract of the blog in a JSON object. Something Jekyll and Liquid wouldn't let me do. I didn't even have to write a Twig extension, JSON encoding is supported natively by Twig.

The whole JavaScript search function (without the DOM manipulation) is 15 lines long:
<pre class="prettyprint">
var JsonSearch = function (search) {
  var search = search;
  $.getJSON("search_db.json", function (json) {
    jsonCallback(json, search);
  });
  function jsonCallback(json, search) {
    var pages = json.pages;
    var results = jQuery.grep(pages, function (page, index) {
      if (page.title.toLowerCase().indexOf(search.toLowerCase()) != -1) {
        return true;
      }
      if (page.content.toLowerCase().indexOf(search.toLowerCase()) != -1) {
        return true;
      }
    });
    displaySearchResults(results);
  }
};
</pre>

Every dynamic part on this blog is now done using JavaScript: search, pagination, twitter timeline, links manipulation (`target="_blank"`), syntax highlighting. Soon, I'll had a tag list too.

Gumdrop is a fun project: I used [Behat](http://behat.org/) — a BDD framework, I wrote an helper for filesystem-dependant tests, I used [Mockery](https://github.com/padraic/mockery) — a great mocking library. I'll talk about those in later posts.