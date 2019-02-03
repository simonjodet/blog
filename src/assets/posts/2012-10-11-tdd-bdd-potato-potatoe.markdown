**ARCHIVE**

I already twitted about it but it's worth repeating as I got the same discussion a couple of days ago. TDD and BDD are not the same thing but TDD and BDD frameworks are often the same thing.

<blockquote class="twitter-tweet tw-align-center"><p>TDD=unit tests, BDD=end-to-end tests. You can do TDD with BDD frameworks but don’t call it BDD like here: <a href="http://t.co/0VuKLfZQ" title="http://www.slideshare.net/bmabey/the-why-behind-tddbdd-and-the-how-with-rspec">slideshare.net/bmabey/the-why…</a> (cc @<a href="https://twitter.com/damln">damln</a>)</p>&mdash; Simon Jodet (@sjodet) <a href="https://twitter.com/sjodet/status/237544589085511680" data-datetime="2012-08-20T13:40:18+00:00">August 20, 2012</a></blockquote>
<script src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

TDD (_Test Driven Development_) is a programming methodology that produces unit tests. They automatically test **units** as in methods or functions. They're a developer's tool.
BDD (_Behavior Driven Development_) is a programming methodology that produces behavioral tests also called automated tests. They automatically test the program's **behavior**. They're a tester and developer's tool.

Both behavioral tests and unit tests are automated. That's why most BDD frameworks and TDD frameworks are interchangeable. One example: [Jasmine](http://pivotal.github.com/jasmine/) is a JavaScript BDD framework that can be used solely for TDD if you want to. It has a [Gherkin](https://github.com/cucumber/cucumber/wiki/Gherkin)-like syntax, used in BDD but is low-level enough to do TDD.

And nothing prevents you to use a xUnit framework to write and execute behavioral tests.

So that's not because you're using PHPUnit that you're doing TDD and don't call it BDD when you're testing methods. Strictly speaking, you're testing the methods' *behavior* but it's just confusing.

Oh and one last thing: `(TDD != BDD) == true` but `(TDD > BDD) == false` and `(TDD < BDD) == false`.


**PS**: *Yes I know I misspelled "Potatoe" in the title here on purpose... Geez, it's a reference to a [Louis Amstrong's song](http://www.youtube.com/watch?v=J2oEmPP5dTM&t=50s).*
