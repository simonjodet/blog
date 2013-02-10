***
{
    "title":"Development environments with Vagrant",
    "date":"2013-02-10",
    "category":"development",
    "layout":"post.twig",
    "tags":["vagrant","development","ubuntu"]
}
***
<img src="/posts/img/2013-02-10-development-environments-with-vagrant/vagrant.jpg" class="post-img float-right"/>
As promised on Twitter, I'm going to explain how I'm now using [Vagrant](http://www.vagrantup.com/) to develop Gitrepos instead of running it on my development Macbook Air.

#### Technical debt
Against my better judgment, I started developing Gitrepos on my Mac without bothering with creating an Ubuntu VM running on VMWare Fusion as I did for other projects in the past. At the time, I figured that if I used the correct libraries and abstracting my code enough, I could develop with PHP built-in server and SQLite. I already wrote here that I don't like running servers on my Mac for 2 reasons:

* It's a security risk I don't want to be bothered with. I don't want to check the servers are protected behind my firewall, I don't want to keep them up to date. I'm way too <span style="text-decoration: line-through;">lazy</span> busy for that.
* It doesn't make a sense because I'm using Mac OS to develop but I certainly won't run my code on this OS in production. So why bother trying to mimic a production environment when it will never be the same: different versions, different configuration, different performances, everything actually a bit different...

While I was working on Gitrepos, I had this nagging feeling that I should start testing it on a production-like environment ASAP. I was sure I was building [technical debt](http://techcrunch.com/2013/02/09/technical-debt-will-kill-you/) and, guess what, I was...

<blockquote class="twitter-tweet" align="center" data-cards="hidden"><p>In this commit (<a href="https://t.co/hwFQEVJq" title="https://github.com/simonjodet/gitrepos/commit/1697136112fbde2463d040a392569e3a44468d5b">github.com/simonjodet/git…</a>) I've switched my dev environment to a vagrant VM. PHP server -&gt; Apache, SQLite -&gt; MySQL...</p>&mdash; Simon Jodet (@sjodet) <a href="https://twitter.com/sjodet/status/299939650649333760">February 8, 2013</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
<blockquote class="twitter-tweet" align="center"><p>...I found out Apache changes exotic HTTP codes such as 230 into 500 and that "keys" is a reserved word for MySQL but not for SQLite.</p>&mdash; Simon Jodet (@sjodet) <a href="https://twitter.com/sjodet/status/299939663957864448">February 8, 2013</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

#### Enters Vagrant
Then the other day, I went through my (very long) [Pocket](http://getpocket.com/) list and took a look at Vagrant. I mainly use Pocket as note pad/todo list and I had flagged Vagrant as something I should take a look at. It looked exactly as the best solution to solve my environment problem.

But I used VirtualBox in the past and I remember it being a PITA to setup, especially the folder sharing stuff. So I gave Vagrant a try, almost convinced it would failed. But it didn't!
<blockquote class="twitter-tweet" align="center"><p>I'm amazed how little hassle it is to use Vagrant: in 2 hours, I've created a base box from scratch and setup Chef to create a LAMP server</p>&mdash; Simon Jodet (@sjodet) <a href="https://twitter.com/sjodet/status/299471302404763648">February 7, 2013</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

I eventually dumped Chef to use a basic [shell script](https://github.com/simonjodet/gitrepos/blob/150ec043f066f4be63a582bace7ba2fb1ae18640/deploy/deploy.sh) though.

But I have 2 issues with Vagrant:

* I'd like a provisioner that let me upload a file to the VM during setup. [It's coming soon](https://twitter.com/sjodet/statuses/299554780467052544).
* I didn't look hard but I'd like a repository of [base boxes](http://docs.vagrantup.com/v1/docs/base_boxes.html) I can really trust.

I'm not a paranoiac but since I worked for a security company, I smell a security issue here. Gitrepos' code is [public](https://github.com/simonjodet/gitrepos) but I wouldn't trust a base box built by an unknown 3rd-party for private code. It's way too easy to make one that would leak code.

So I decided to build my own Ubuntu Server 12.10 amd64 base box.

#### Build your own base box
##### Creating the VM
First, you'll need to install [Virtualbox](https://www.virtualbox.org/wiki/Downloads) and download the [Ubuntu Server image](http://www.ubuntu.com/download/server).

In a few screenshots, here's how to start the setup:
<img src="/posts/img/2013-02-10-development-environments-with-vagrant/setup_01.png" align="center"/><br>
<img src="/posts/img/2013-02-10-development-environments-with-vagrant/setup_02.png" align="center"/><br>
<img src="/posts/img/2013-02-10-development-environments-with-vagrant/setup_03.png" align="center"/><br>
<img src="/posts/img/2013-02-10-development-environments-with-vagrant/setup_04.png" align="center"/><br>
<img src="/posts/img/2013-02-10-development-environments-with-vagrant/setup_05.png" align="center"/><br>
<img src="/posts/img/2013-02-10-development-environments-with-vagrant/setup_06.png" align="center"/><br>
<img src="/posts/img/2013-02-10-development-environments-with-vagrant/setup_07.png" align="center"/><br>
<img src="/posts/img/2013-02-10-development-environments-with-vagrant/setup_08.png" align="center"/><br>
<img src="/posts/img/2013-02-10-development-environments-with-vagrant/setup_09.png" align="center"/><br>
<img src="/posts/img/2013-02-10-development-environments-with-vagrant/setup_10.png" align="center"/><br>

##### Installing Ubuntu
