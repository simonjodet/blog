jQuery(function($){
    //Launch tweeter feed
    $(".tweet").tweet({
        username: "simonjodet",
        avatar_size: 32,
        count: 4,
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
    $('#search_test').click(function(event){
        event.preventDefault();
        $.getJSON('http://search.blog.jodet.com/?search=php', function(data) {
            console.log(data);
        });
    });
});
