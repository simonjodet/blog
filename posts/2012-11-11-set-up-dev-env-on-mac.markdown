***
{
    "title":"How I set up my development environment on Mac",
    "date":"2012-11-11",
    "category":"development",
    "layout":"post.twig",
    "tags":["PHP", "Mac", "Homebrew", "PHPUnit"]
}
***

I thought the other day I should share how I setup my development environment on OS X. It'll serve as a reminder for me too.

The first part is language-agnostic but the second part focuses on PHP.

### Install [Homebrew](http://mxcl.github.com/homebrew/):

<pre class="prettyprint lang-sh">ruby -e "$(curl -fsSkL raw.github.com/mxcl/homebrew/go)"</pre>

### Install ZSH and [Oh My Zsh](https://github.com/robbyrussell/oh-my-zsh):

<pre class="prettyprint lang-sh">
brew install zsh zsh-completions
curl -L https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh | sh
</pre>
### Configure ZSH `mate ~/.zshrc`:  
Some notes here:

* I changed the default theme to "af-magic" ( `ZSH_THEME="af-magic"` )
* I've added the fpath command as told by the "zsh-completions" brew
* Activated and added some alias
* Added some plugins related to the tools I most often use
* **Important**: I've changed the path so `/usr/local/bin` and `/usr/local/sbin` are upfront. Otherwise system binaries will be used instead of homebrew binaries (you get OS X's php binary instead of the homebrew one).

<pre class="prettyprint lang-sh">
# Path to your oh-my-zsh configuration.
ZSH=$HOME/.oh-my-zsh

# Set name of the theme to load.
# Look in ~/.oh-my-zsh/themes/
# Optionally, if you set this to "random", it'll load a random theme each
# time that oh-my-zsh is loaded.
ZSH_THEME="af-magic"

# Completion
fpath=(/usr/local/share/zsh-completions $fpath)

# Example aliases
alias zshconfig="mate ~/.zshrc"
alias ohmyzsh="mate ~/.oh-my-zsh"
alias la="ls -la"

# Set to this to use case-sensitive completion
# CASE_SENSITIVE="true"

# Comment this out to disable weekly auto-update checks
# DISABLE_AUTO_UPDATE="true"

# Uncomment following line if you want to disable colors in ls
# DISABLE_LS_COLORS="true"

# Uncomment following line if you want to disable autosetting terminal title.
# DISABLE_AUTO_TITLE="true"

# Uncomment following line if you want red dots to be displayed while waiting for completion
# COMPLETION_WAITING_DOTS="true"

# Which plugins would you like to load? (plugins can be found in ~/.oh-my-zsh/plugins/*)
# Custom plugins may be added to ~/.oh-my-zsh/custom/plugins/
# Example format: plugins=(rails git textmate ruby lighthouse)
plugins=(git brew composer git-flow github node npm osx textmate)

source $ZSH/oh-my-zsh.sh

# Customize to your needs...
export PATH=/usr/local/bin:/usr/local/sbin:/usr/local/git/bin:/usr/bin:/bin:/usr/sbin:/sbin:/opt/X11/bin:/usr/X11/bin
</pre>

### Install the github gem
Just use Homebrew:
<pre class="prettyprint lang-sh">
sudo gem install github
</pre>

### What about HTTP and database servers?
That's right, how do I install Apache (or nginx)? How do I setup MySQL (or PostgreSQL)?

Well I don't. I don't like adding listening services on my Mac. It's a security concern I don't want to bother myself with.  
So either I use PHP's 5.4 built-in web server + SQLite databases or I use a debian/ubuntu virtual machine, something I only run when I'm coding. The virtual machine setup also limit what you expose to the outer world. Your mails and other personal stuff are isolated.  
Another reason why I use a virtual machine is that my production servers will use Linux, not Mac OS and you should do development and continuous integration on the production system.

### Install PHP

* Tap the PHP repository formula

<pre class="prettyprint lang-sh">
brew tap homebrew/dupes
brew tap josegonzalez/homebrew-php
</pre>

* I suggest you take a look at the options before installing PHP:
  
<pre class="prettyprint lang-sh">
brew options php54
</pre>
I usually use `--with-pgsql`, `--with-mysql`, `--with-suhosin`, `--with-fpm`, `--with-intl`.

Now add the following path to your PATH (in the `~/.zshrc` file): `$(brew --prefix php54)/bin`
<pre class="prettyprint lang-sh">
export PATH=/usr/local/bin:/usr/local/sbin:/usr/local/git/bin:/usr/bin:/bin:/usr/sbin:/sbin:/opt/X11/bin:/usr/X11/bin
</pre>
becomes
<pre class="prettyprint lang-sh">
export PATH=$(brew --prefix php54)/bin:/usr/local/bin:/usr/local/sbin:/usr/local/git/bin:/usr/bin:/bin:/usr/sbin:/sbin:/opt/X11/bin:/usr/X11/bin
</pre>
This will make php binaries such as `phpunit` available.

### Install PHPUnit

<pre class="prettyprint lang-sh">
chmod -R ug+w `brew --prefix php54`/lib/php
pear config-set php_ini /usr/local/etc/php/5.4/php.ini
pear config-set auto_discover 1
pear update-channels
pear upgrade
pear install pear.phpunit.de/PHPUnit
brew unlink php54
brew link php54
</pre>
The first command is to make it so you don't have to use `sudo` when you install PEAR packages.

### Install Composer
Just use Homebrew:
<pre class="prettyprint lang-sh">
brew install composer
</pre>

### Bonus: IntelliJ IDEA PHP project setup
A nice little tip if you're an IntelliJ IDEA user: go to Preferences (cmd+,)/Project Settings/PHP/Include path and add (with the `+` button) the following path: `/usr/local/opt/php54/lib/php/PHPUnit`.  
Autocompletion for PHPUnit should now work. Do the same with any other system-wide PHP library you'd like to use.