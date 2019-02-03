**ARCHIVE**

Anonymous classes are already there in PHP with the StdClass but it was not designed to be used with method but just properties.

So I wrote a small class to create Anonymous classes that accept closure members and consider them methods.

I especially like to use it with [Pimple](https://github.com/fabpot/Pimple). Now when I need to inject some dependency, I can quickly do it without having to create a class.
The example below shows how I can wrap the PHP `exec` method, inject it as a dependency and mock it in my unit tests.

<script src="https://gist.github.com/2867181.js"> </script>
