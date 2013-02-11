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

I eventually dumped Chef to use a basic [shell script](https://github.com/simonjodet/gitrepos/blob/150ec043f066f4be63a582bace7ba2fb1ae18640/deploy/deploy.sh) though:

<pre class="prettyprint lang-bash">
#!/bin/sh
echo mysql-server mysql-server/root_password select "vagrant" | debconf-set-selections
echo mysql-server mysql-server/root_password_again select "vagrant" | debconf-set-selections
apt-get install -y mysql-server apache2 php5 libapache2-mod-php5 php5-mysql
VHOST=$(cat &lt;&lt;EOF
&lt;VirtualHost *:80&gt;
  DocumentRoot "/vagrant/web"
  ServerName localhost
  &lt;Directory "/vagrant/web"&gt;
    AllowOverride All
  &lt;/Directory&gt;
&lt;/VirtualHost&gt;
EOF
)
echo "${VHOST}" &gt; /etc/apache2/sites-enabled/000-default
sudo a2enmod rewrite
service apache2 restart
mysql -u root -p"vagrant" -e ";DROP DATABASE test;DROP USER ''@'localhost';CREATE DATABASE gitrepos;GRANT ALL ON gitrepos.* TO gitrepos@localhost IDENTIFIED BY 'gitrepos';GRANT ALL ON gitrepos.* TO gitrepos@'%' IDENTIFIED BY 'gitrepos'"
sed -i 's/127.0.0.1/0.0.0.0/g' /etc/mysql/my.cnf
service mysql restart
apt-get clean
</pre>
Going through this script quickly:

* I pre-configure MySQL so `apt-get` runs silently and set the correct passwords
* I create a basic virtual host file for Apache
* I configure MySQL so I can query it from the host
* Some cleaning

And here's my `Vagrantfile`:

<pre class="prettyprint lang-ruby">
# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant::Config.run do |config|
  config.vm.box = "ubuntu_server_12_10_amd64"
  config.vm.network :hostonly, "192.168.242.2"
  config.vm.provision :shell, :path => "deploy/deploy.sh"
end
</pre>
As you may have noticed I don't use a NAT network for my VM but a "Host-Only" network so I have a fixed IP that is only accessible from the host it's running on. That way I don't expose my application to the outer world.

But I have 2 issues with Vagrant:

* I'd like a provisioner that let me upload a file to the VM during setup. [It's coming soon](https://twitter.com/sjodet/statuses/299554780467052544).
* I didn't look hard but I'd like a repository of [base boxes](http://docs.vagrantup.com/v1/docs/base_boxes.html) I can really trust.

I'm not a paranoiac but since I worked for a security company, I smell a security issue here. Gitrepos' code is [public](https://github.com/simonjodet/gitrepos) but I wouldn't trust a base box built by an unknown 3rd-party for private code. It's way too easy to make one that would leak code.

So I decided to build my own Ubuntu Server 12.10 amd64 base box.
<a href="{{ page.location }}#read_more" class="read_more"><strong>Read more...</strong></a>
<div class="below_fold" markdown="1">
<a id="read_more"></a>
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

The first step of the Ubuntu installer are pretty straight forward and entirely up to you.

Then you get asked for the Hostname. [Vagrant's documentation](http://docs.vagrantup.com/v1/docs/base_boxes.html) suggests to follow a convention: `vagrant-[os-name]`, e.g. `vagrant-ubuntu-12-10-amd64` in our case.

Then for the next steps:

* Root Password: `vagrant`
* Main account login: `vagrant`
* Main account password: `vagrant`

I don't encrypt the disk because we don't care in this setup. For partitioning, I use the simplest option, skipping LVM because we want to avoid unnecessary stuff that could impair performance and make the VM larger than necessary.

Let it then install stuff. I don't enable automatic updates, it could mess up some test runs, just remember to `apt-get update; apt-get upgrade` once in a while. At the "software selection" step, don't check anything, we'll take care of that later.

Finally, install Grub with the default options and reboot.

##### Configuring the system
At this step, since the VM's network uses NAT, you can't login through SSH and copy-pasting to the VM is not possible.

Login as vagrant/vagrant. I've aggregated the different steps in a [bash script](http://blog.jodet.com/uploads/vagrant.sh). Just follow these steps:
<pre class="prettyprint lang-bash">
cd /tmp
wget http://blog.jodet.com/uploads/vagrant.sh
chmod +x vagrant.sh
sudo ./vagrant.sh
</pre>

The last step is to let the `vagrant` user "sudo" without having to type his password.

<pre class="prettyprint lang-bash">
sudo chmod 644 /etc/sudoers
sudo vim /etc/sudoers
</pre>

Add `Defaults    env_keep="SSH_AUTH_SOCK"` to the "Defaults" and replace `%admin ALL=(ALL) ALL` by `%admin ALL=NOPASSWD: ALL`.

It should look like this:
<pre class="prettyprint lang-bash">
#
# This file MUST be edited with the 'visudo' command as root.
#
# Please consider adding local content in /etc/sudoers.d/ instead of
# directly modifying this file.
#
# See the man page for details on how to write a sudoers file.
#
Defaults    env_reset
Defaults    mail_badpass
Defaults    secure_path="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
Defaults    env_keep="SSH_AUTH_SOCK"

# Host alias specification

# User alias specification

# Cmnd alias specification

# User privilege specification
root    ALL=(ALL:ALL) ALL

# Members of the admin group may gain root privileges
%admin ALL=NOPASSWD: ALL

# Allow members of group sudo to execute any command
%sudo   ALL=(ALL:ALL) ALL

# See sudoers(5) for more information on "#include" directives:

#includedir /etc/sudoers.d
</pre>

Now you're done, just shutdown the system with `sudo shutdown -h now`.

##### Packaging the base box

Open a terminal, go to the folder containing your VM and run:

<pre class="prettyprint lang-bash">
cd VirtualBox\ VMs/ubuntu_base
vagrant package --base ubuntu_base 
</pre>

Your new base box is named `package.box`. You can now add it to your system and use it in a project like this:

<pre class="prettyprint lang-bash">
vagrant box add vagrant-ubuntu-12-10-amd64 package.box
mkdir test_environment
cd test_environment
vagrant init vagrant-ubuntu-12-10-amd64
vagrant up
vagrant ssh
</pre>

You can store the package.box file in a safe location and delete the VirtualBox VM if you need space.

Sources: [Creating a vagrant base box for ubuntu 12.04 32bit server](https://github.com/fespinoza/checklist_and_guides/wiki/Creating-a-vagrant-base-box-for-ubuntu-12.04-32bit-server) and the [official documentation](http://docs.vagrantup.com/v1/docs/base_boxes.html).

</div>