jQuery(function ($) {
  //Change target attribute of external links
  var domain_root = document.location.protocol + '//' + document.location.host;
  var all_links = $('a').each(function (index, element) {
    if (element.href.substr(0, domain_root.length) !== domain_root) {
      element.target = '_blank';
    }
  });

  var resetSearch = function () {
    $('.search_result').detach();
    $('#no_result_message').hide();
    $('#searching_message').show();
  }

  $('#search_close_btn').click(function (event) {
    event.preventDefault();
    $('#search_container').hide();
    $('#content_container').show();
    resetSearch();
  });

  $('#search_btn').click(function (event) {
    event.preventDefault();
    $('#content_container').hide();
    $('#search_container').show();
    resetSearch();

    var displaySearchResults = function (data) {
      $('#searching_message').hide();
      if (!$.isArray(data) || data.length < 1) {
        $('#no_result_message').show();
      }
      else {
        $('#search_container').show();
        $.each(data, function (index, post) {
          var search_result = $('#search_result_template').clone().insertAfter($('#search_result_template')).addClass('search_result').removeAttr('id').show();
          search_result.find('.search_post_link').html(post.title).attr('href', "/" + post.location);
          search_result.find('.search_post_date').html(post.date);
          search_result.find('.search_post_content').html(post.content);
        });
      }
    };

    var JsonSearch = function (search) {
      var search = search;
      $.getJSON("search_db.json", function (json) {
        jsonCallback(json, search);
      });

      function jsonCallback(json, search) {
        var pages = json.pages;
        var results = jQuery.grep(pages, function (page, index) {
          if (page.title.toLowerCase().indexOf(search.toLowerCase()) != -1) {
            return true;
          }
          if (page.content.toLowerCase().indexOf(search.toLowerCase()) != -1) {
            return true;
          }
        });
        displaySearchResults(results);
      }
    };
    JsonSearch($('#search_field').attr('value'));

  });

  $('#search_field').keypress(function (e) {
    if (e.which == 13) {
      e.preventDefault();
      jQuery('#search_btn').click();
    }
  });

  if ($('#pagination_btn').length == 1) {
    var isLoadingNewPage = false;
    var drawNewPage = function (page) {
      var clone = $('#page-list-item-tpl').clone();
      clone.children('div.well').children('div.page-header').children('h3').children('a')[0].setAttribute('href', page.location);
      clone.children('div.well').children('div.page-header').children('h3').children('a')[0].innerHTML = page.title;
      var subtitle = clone.children('div.well').children('div.page-header').children('h3').children('small')[0].innerHTML;
      subtitle = subtitle.replace("__page.date__", page.date);
      subtitle = subtitle.replace("__page.tags__", page.tags.join(', '));
      clone.children('div.well').children('div.page-header').children('h3').children('small')[0].innerHTML = subtitle;
      clone.children('div.well').children('div.post-content')[0].innerHTML = page.content;
      clone.css('display', 'block');
      clone.animate({
        'opacity': 1
      }, 1000);

      $('#page-list').append(clone);
    };

    var getNewPage = function () {
      if (!isLoadingNewPage) {
        isLoadingNewPage = true;
        var autoreset = window.setTimeout("isLoadingNewPage = false;", 10000);
        $.getJSON("page_db.json", function (json) {
          var post_count = $('.page-list-item').length;

          for (var i = post_count; i < (post_count + 5); i++) {
            if (json.pages[i]) {
              drawNewPage(json.pages[i]);
            }
            if (i >= json.pages.length) {
              $('#pagination_btn').css('display', 'none');
              $(window).off('scroll', infiniteScrolling);
            }
            prettyPrint();
            isLoadingNewPage = false;
            window.clearTimeout(autoreset);
          }
        });
      }
    };

    $('#pagination_btn').click(function (event) {
      event.preventDefault();
      getNewPage();
    });

    var infiniteScrolling = function () {
      if ($(window).scrollTop() + $(window).height() > $(document).height() - 250) {
        getNewPage();
      }
    };

    $(window).on('scroll', infiniteScrolling);
  }

  prettyPrint();
});
