The other day, I found out some things in [AngularJS](http://angularjs.org/) are still not really well polished. One of those things in internationalization. 

I18n and l10n in AngularJS are ["natively"](http://docs.angularjs.org/guide/i18n) supported. First of all, that's not completely true. Components of AngularJS can be easily localized (and yet not really, we'll talk about that). For your code and your texts, you're on your own.  
I chose to write my own directive and filter because that's actually really easy with AngularJS. You can also look around, I found several libraries for that purpose and more. Whatever solution you choose, you'll have a dynamically localizable app. Except for that part that AngularJS localize himself.

There is no official way to change the locale of the AngularJS components without reloading the page. And if like me the other day, you're working on an app that is completely client-side (no server-side code to load the correct locale file), you're screwed.
I found a couple of libs but they were either deprecated already or such a nasty hack that they were sure to be incompatible with the next AngularJS version.

So the goal was to be able to load the correct locale file from the [official bower package](https://github.com/angular/bower-angular-i18n) dynamically after figuring out with some JS code what locale the user should see.

The trick is with AngularJS that you **must** do it **before** your app is started but **after** AngularJS is loaded.

My first idea was to:

1. include AngularJS,
2. include jQuery,
3. load the locale file dynamically with [`$.getScript()`](http://api.jquery.com/jQuery.getScript/)
4. include my app's files

Something like this:

	<!DOCTYPE html>
	<html ng-app="myApp">
	<head>
	    <script src="lib/angular/angular.js"></script>
	    <script src="lib/jquery/jquery.js"></script>
	    <script>
	    //Some code to find out the locale
	    var locale = "fr";
	    $.getScript("lib/angular-i18n/angular-locale_" + locale + ".js");
	    </script>
	    <script src="js/myApp.js"></script>
	    <script src="js/controllers/myController.js"></script>
	    <script src="js/factories/myFactory.js"></script>
	    <!--etc.-->
	</head>
	<body ng-controller="myController">

That will probably work if you have enough files in your app that AngularJS, jQuery and your locale file are downloaded before your app starts. But that's not certain and that's a dirty trick anyway - inline code = not good.

Another issue is that it makes things significantly more difficult when you want to concatenate and minify your JS code. At that point, the hack doesn't work anymore because there is a good chance that `AngularJS + jQuery > your code`.

So how did I fixed this?

First the inline code went in its own file and function so it can be concatenated and localized like the rest of my code:

	var myAppUtils = myAppUtils || {};
	myAppUtils.i18nUtils = {
	    "loadAngularLocaleFile": function(callback) {
	        //Some code to find out the locale
		    var locale = "fr";
		    $.getScript("lib/angular-i18n/angular-locale_" + locale + ".js");
	    }
	};

Then I removed the `ng-app="myApp"` directive from the `html` tag. It is necessary because this directive [automatically bootstraps](http://docs.angularjs.org/guide/bootstrap) AngularJS, starting your app as soon as possible.

Finally, I added this code at the bottom of `js/myApp.js`:

	myAppUtils.i18nUtils.loadAngularLocaleFile(function() {
	    angular.bootstrap(document, ["myApp"]);
	});

It bootstraps my app in the callback of the locale loading, that way I'm sure the locale file and the libs are loaded before the app starts.
