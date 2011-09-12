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
  
  var resetSearch = function() {
    $('.search_result').detach();
    $('#no_result_message').hide();
    $('#searching_message').show();
  }
  
  $('#search_close_btn').click(function(event){
    event.preventDefault();
    $('#search_container').hide();
    $('#content_container').show();
    resetSearch();
  });

  $('#search_btn').click(function(event){
    event.preventDefault();
    $('#content_container').hide();
    $('#search_container').show();
    resetSearch();
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
    $.getJSON('http://blog.jodet.com/search/?search=' + $('#search_field').attr('value'), displaySearchResults);
  });
});
