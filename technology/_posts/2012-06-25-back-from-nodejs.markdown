---
layout: post
title: Back from NodeJS
category: technology
tags: [PHP]

---
I just realized I didn't tell you about the latest changes on this blog. A couple of weeks ago, I've updated my server to the latest Ubuntu.  
Everything went find except for 2 things: my installed gems and my nodejs search tool.

I just reinstalled the gems to fix the first issue. Bt I was pretty busy at the time and I didn't want to dive back into NodeJS, change the sqlite library I was using, etc. So I went the easy way for me to solve the second issue: I quickly ported the nodejs code to PHP.

Nothing fancy there, you can check the sources on [Github](https://github.com/simonjodet/blog/). You can also report issues there - Thanks to [joshkerr](https://github.com/simonjodet/blog/issues/1) for letting me know I forgot to talk about this switch to PHP in the first place.

As with the nodejs engine, there is [an indexer](https://github.com/simonjodet/blog/blob/master/search_indexer/search_indexer.php) and [a query script](https://github.com/simonjodet/blog/blob/master/search/search.php).

So here's how I set up my blog and how I publish changes such as this new post.

I have a bare git repository hosted on my server in `/var/www/blog_repo/`. It's the `origin` remote for my blog sources on my desktop and also for the hosted files on my server (in `/var/www/blog/`).

When I push commits to `/var/www/blog_repo/`, a post-receive hook will update my blog hosted sources and push the commits to Github.  
Here's the content of the hook (`/var/www/blog_repo/hooks/post-receive`):
<script src="https://gist.github.com/2988870.js"> </script>

To replace the nodejs http server, I'm now using the Nginx server that was already serving the blog static files and use PHP-FPM in FastCGI mode.  
Here are the virtual host file and `/etc/nginx/fastcgi_params` file:
<script src="https://gist.github.com/2988891.js"> </script>

You also may need to install php5-sqlite and php5-fpm: `apt-get install php5-sqlite php5-fpm`.

I hope it helps those who want to add a search engine to their jekyll-powered blog. Please remember it's a really simple and stupid search engine. It accepts only words and will probably not find entire sentences (as it is easier to avoid SQL injections that way).