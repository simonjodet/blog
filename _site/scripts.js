jQuery(function($){
    //Launch tweeter feed
    $(".tweet").tweet({
        username: "simonjodet",
        avatar_size: 32,
        count: 4,
        loading_text: "loading tweets...",
        template: '{text}{join}{time}<br/><img src="/style/dummy.gif" class="tweet_icon tweet_reply_icon" />{reply_action} <img src="/style/dummy.gif" class="tweet_icon tweet_retweet_icon" />{retweet_action} <img src="/style/dummy.gif" class="tweet_icon tweet_favorite_icon" />{favorite_action}'
    });
    //Add tooltip to home link
    $('#home').mouseenter(function(){
        $('#home-tooltip').show();
    });
    $('#home').mouseleave(function(){
        $('#home-tooltip').hide();
    });
    //Add tooltip to twitter link
    $('#twitter-link').mouseenter(function(){
        $('#twitter-tooltip').show();
    });
    $('#twitter-link').mouseleave(function(){
        $('#twitter-tooltip').hide();
    });
});