---
layout: post
title: Recent PHP discoveries
categories:
  - geek-technology
  - PHP
---

<img src="/img/2011-08-25-recent-php-discoveries/php-med-trans.png" class="post-img"/>

###Trim
I just discovered the [trim](http://us.php.net/manual/en/function.trim.php "trim documentation") function I've been using for so long to remove whitespaces around strings can also remove any other character. I've been cleaning _by hand_ those path items of possible trailing slashes for so long...

###Curl issue with PHP 5.3.8
I've encountered an issue on a project after updating to PHP 5.3.8 (the dotdeb package on Debian).  
If you're calling a HTTPS domain with a self-signed certificate, `CURLOPT_SSL_VERIFYPEER` to 0 is not enough anymore. `CURLOPT_SSL_VERIFYHOST` should be also set to 0.

###HEAD stop
Accordind to [this](https://students.mimuw.edu.pl/~ai292615/php_head_trick.pdf), calling PHP with the HEAD http method will make stop execution on the first output. This is potentially dangerous and a security breach.

###British PHP
What would have happened if PHP had been invented by some British chap? The answer is [here](http://www.addedbytes.com/blog/if-php-were-british/).