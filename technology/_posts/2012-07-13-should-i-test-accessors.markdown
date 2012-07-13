---
layout: post
title: Should I test accessors?
category: development 
tags: [TDD, PHP, Atoum, Accessors]
---

Should one test getters and setters? I mean default accessors like these ones:

{% highlight php %}
    <?php
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
    ?>
{% endhighlight %}

A quick Google search on the topic shows there is no clear agreement on the topic. I would tend to say I should not unit test them if I don't see a point in testing them. Unecessary tests are waste.

And I don't see a point in testing accessors. Why?

First, because the setters don't return anything. So I can't **directly** test what they return. I mean, if the property it sets is private, you can't read it to see if the setter correctly did is job right? Except by using the property's getter. But now you're not writing a unit test anymore because you assume the getter works fine. If the getter changes the property in any way, your test is going to fail but not because of the setter but because of the getter.

For the same reason, testing a basic getter doesn't make more sense to me.

You disagree? Please leave a *civilized and argumented* comment :)

PS: Thanks to [@mageekguy](https://twitter.com/mageekguy) for giving me a topic for a new post ^^