jQuery(function($){
  //Launch tweeter feed
  $(".tweet").tweet({
    username: "simonjodet",
    avatar_size: 32,
    count: 10,
    loading_text: "loading tweets...",
    refresh_interval: 60,
    template: '{text}{join}{time}<br/><img src="/style/dummy.gif" class="tweet_icon tweet_reply_icon" />{reply_action} <img src="/style/dummy.gif" class="tweet_icon tweet_retweet_icon" />{retweet_action} <img src="/style/dummy.gif" class="tweet_icon tweet_favorite_icon" />{favorite_action}'
  });
  //Add tooltip to home link
  $('#home').mouseenter(function(){
    $('#home-tooltip').show();
  });
  $('#home').mouseleave(function(){
    $('#home-tooltip').hide();
  });
  $('#menu_title').mouseenter(function(){
    $('#menu_title-tooltip').show();
  });
  $('#menu_title').mouseleave(function(){
    $('#menu_title-tooltip').hide();
  });
  //Add tooltip to twitter link
  $('#twitter-link').mouseenter(function(){
    $('#twitter-tooltip').show();
  });
  $('#twitter-link').mouseleave(function(){
    $('#twitter-tooltip').hide();
  });
  //Change target attribute of external links
  var domain_root = document.location.protocol+'//'+document.location.host;
  var all_links = $('a').each(function(index,element){
    if(element.href.substr(0,domain_root.length) !== domain_root)
    {
      element.target = '_blank';
    }
  });
  $('#search_close_btn').click(function(event){
    event.preventDefault();
    $('#search_container').hide();
    $('#content_container').show();
    $('#searching_message').show();
    $('#no_result_message').hide();
    $('.search_result').detach();
  }
);

$('#search_btn').click(function(event){
  event.preventDefault();
  $('#content_container').hide();
  $('#search_container').show();
  var displaySearchResults = function(data) {
    $('#searching_message').hide();
    if(!$.isArray(data) || data.length < 1) {
      $('#no_result_message').show();
    }
    else {
      $('#search_container').show();
      $.each(data, function(index, post){
        var search_result = $('#search_result_template').clone().insertAfter($('#search_result_template')).addClass('search_result').removeAttr('id').show();
        search_result.find('.search_post_link').html(post.title).attr('href', post.post);
        search_result.find('.search_post_date').html(post.date);
        search_result.find('.search_post_content').html(post.content);
      });
    }
  }
  // var data = '[{"post":"/mixing-up-tdd-phpunit-namespaces-and-jenkins","title":"Mixing up TDD, PHPUnit, Namespaces and Jenkins","date":"2011/02/22","content":"Mixing up TDD, PHPUnit, Namespaces and Jenkins Hi all, First of all, if you\'re not a PHP developer, don\'t read this. This post will be about my tries and misses with TDD . To make things harder, I\'m adding into the mix PHPUnit (of which I have minimal knowledge), namespaces (because I\'m also a JavaScript developer and I feel at home now) and Jenkins (fka Hudson). First of all and against all odds, TDD is fun! I swear, I really enjoy it. And adding Jenkins multiply the fun because you can gloat, showing off you 100% test coverage, your sky-rocketing test count, etc. Now, I wouldn\'t write a post just to say TDD is fun. Anyway TDD becomes fun and worthy of the effort when you have figured out some quirks of the different tools. PHPUnit is a pain in the a**. But it seems to be the de facto standard so... I\'m waiting for a stable version of Atoum though. I got 3 major issues with PHPUnit: 1- On a previous project, I found out the process isolation support is incomplete. To have a real process isolation, you have to put your tests in separate files! And it is really long to run the complete test suite. So you\'ve got 3 options: multiply the file count of your project, curse PHPUnit\'s author or rewrite your project and stop using constants for everything... 2- Namespace support is weird, especially when using type hinting of classes. My advice: use full-qualified names. Not a big deal, you SHOULD always use full-qualified names anyway. That way, your fellow developer will not have to learn the whole namespace hierarchy to understand your code. 3- Mocks are cool but they\'re not meant to fix all your problems. You want to test if an object\'s method is called: mocks are the solution. You want to make sure that during a future rewrite your fellow developer will not forget to update the client class of another? Use a real instance of the object, not a mock of it. Here\'s a stupid example: &lt;?php class Conf { public function get_conf ( $key ) { //do something } public function set_conf ( $key , $value ) { //do something } } class Client { public function construct ( Conf $conf ) { $conf_entry = $conf -&gt; get_conf ( &#39;key&#39; ); $conf -&gt; set_conf ( &#39;key2&#39; , &#39;value2&#39; ); $conf_entry_2 = $conf -&gt; get_conf ( &#39;key2&#39; ); if ( $conf_entry_2 === false ) { throw new Exception (); } } } ?&gt; To make sure the get_conf method is called by Client \'s constructor, use a mock.<br/>To make sure the exception is thrown if $conf_entry_2 is empty, use an instance of Conf . Why?<br/>Because someday, Conf may return null instead of false after a rewrite. The Conf unit tests will be changed and the developer will be happy, he\'s got 100% passed tests. But the Client class has not been changed because you\'ve mocked Conf to return false. The tests are passing but the developer didn\'t rewrite Client to test $conf_entry_2 against null instead of false . I\'ve also got an issue using autoloading with namespaces. I\'m not sure it\'s related to PHPUnit but anyway... I liked the solution I found because it will prevent some possible code collision which is the main benefit of namespaces in the first place. The solution? Instead of naming your autoload function autoload() , use a specific and very unique name such as myFantasticAutoloadingFunctionThatKicksAss() and use the spl_autoload_register() function to register it as an autoload function. After that PHPUnit was able to find my classes by himself. Now TDD is starting to be fun. PS: I will update this page if I find other quirks. Update: I\'ve got 2 new quick tips: I use Netbeans to code and it is really simple to have a split screen in Netbeans. Just drag the file tab you want to split to the right and you\'ll have a split screen. Really handy for TDD to write your test and your code side by side. I found out that mocking 2 consecutive calls to the same method is not explained in PHPUnit\'s documentation. But it\'s simple: instead of using once() , any() or none() in expects() , use at(0) for the first call and at(1) in the second and so on. You can even make the mock return different values each time. I needed this in my previous example because you usually retrieve configuration more than once. "},{"post":"/recent-php-discoveries","title":"Recent PHP discoveries","date":"2011/08/25","content":" Recent PHP discoveries Trim I just discovered that the trim function I\'ve been using for so long to remove whitespaces around strings can also remove any other character. I\'ve been cleaning by hand those path items of possible trailing slashes for so long... Curl issue with PHP 5.3.8 I\'ve encountered an issue on a project after updating to PHP 5.3.8 (the dotdeb package on Debian).<br/>If you\'re calling a HTTPS domain with a self-signed certificate, CURLOPT_SSL_VERIFYPEER to 0 is not enough anymore. CURLOPT_SSL_VERIFYHOST should be also set to 0. HEAD stop Accordind to this , calling PHP with the HEAD http method will make stop execution on the first output. This is potentially dangerous and a security breach. British PHP What would have happened if PHP had been invented by some British chap? The answer is here . "}]';
  // data = '[]';
  // displaySearchResults($.parseJSON(data));

  //*
  $.getJSON('http://blog.jodet.com/search/?search=php', displaySearchResults);
  //*/
});
});
