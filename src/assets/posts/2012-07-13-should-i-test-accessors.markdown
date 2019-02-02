Should one test getters and setters? I mean default accessors like these ones:

<pre class="prettyprint">
class MyClass
{
    private $MyProperty;

    public function setMyProperty($MyProperty)
    {
        $this->MyProperty = $MyProperty;
    }

    public function getMyProperty()
    {
        return $this->MyProperty;
    }
}
</pre>

A quick Google search on the topic shows there is no clear agreement on the topic. I would tend to say I should not unit test them if I don't see a point in testing them. Unecessary tests are waste.

And I don't see a point in testing accessors. Why?

First, because the setters don't return anything. So I can't **directly** test what they return. I mean, if the property it sets is private, you can't read it to see if the setter correctly did is job right? Except by using the property's getter. But now you're not writing a unit test anymore because you assume the getter works fine. If the getter changes the property in any way, your test is going to fail but not because of the setter but because of the getter.

For the same reason, testing a basic getter doesn't make more sense to me.

You disagree? Please leave a *civilized and argumented* comment :)

PS: Thanks to [@mageekguy](https://twitter.com/mageekguy) for giving me a topic for a new post ^^

**EDIT:** I asked this question to [J.B. Rainsberger](http://www.jbrains.ca/ "jbrains")  on Twitter. His answer is pretty clear. If you're new to TDD, test everything. But after a while you should consider if accessors are too simple to break.

<blockquote class="twitter-tweet tw-align-center" data-in-reply-to="224756188980584448"><p>@<a href="https://twitter.com/sjodet">sjodet</a> Novices <a href="http://t.co/yVDnqeVg" title="http://link.jbrains.ca/sYj5Y">link.jbrains.ca/sYj5Y</a> should test everything; Advanced Beginners explore Too Simple to Break <a href="http://t.co/cd8JSvlA" title="http://link.jbrains.ca/mZwHzi">link.jbrains.ca/mZwHzi</a></p>&mdash; ☕ J. B. Rainsberger (@jbrains) <a href="https://twitter.com/jbrains/status/224861598739730432" data-datetime="2012-07-16T13:42:37+00:00">July 16, 2012</a></blockquote>
<script src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
