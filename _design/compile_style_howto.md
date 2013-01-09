Create your own swatch
======================

1. Download Bootstrap
------
Download and unpack [Bootswatch](https://github.com/thomaspark/bootswatch/tags). In terminal, navigate to `swatchmaker/` and run the command `make bootstrap` to update to the latest version of Bootstrap.


2. Install LESS
------
If you haven't already, install LESS to your machine via NPM. More information on that here: http://lesscss.org/#-server-side-usage


3. Customize Bootstrap
------
Make your customizations to the two files found in the `swatch` directory, `variables.less` and `bootswatch.less`.


4. Build Customized Bootstrap
------
In the `swatchmaker` directory, run `make bootswatch`. The compiled CSS files will be created in the `swatch` directory.

You can run the watcher to automatically build Bootstrap whenever changes are saved with `ruby watcher.rb`. Requires `gem install directory_watcher`.


5. Reset Bootstrap
------
If you want to reset `variables.less` and `bootswatch.less` to defaults, run `make default`.

Copy the elusive-iconfont directory into your project.
Copy elusive-webfont.less into your bootstrap/less directory.
Open bootstrap.less and replace @import "sprites.less"; with @import "elusive-webfont.less";
Open your project's elusive-webfont.less and edit the font url to ensure it points to the right place.
@font-face {
  font-family: 'Elusive-Icons';
  src:url('../font/Elusive-Icons.eot');
  src:url('../font/Elusive-Icons.eot?#iefix') format('embedded-opentype'),
    url('../font/Elusive-Icons.svg#Elusive-Icons') format('svg'),
    url('../font/Elusive-Icons.woff') format('woff'),
    url('../font/Elusive-Icons.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}
Re-compile your LESS if using a static compiler.
You should be good to go!
