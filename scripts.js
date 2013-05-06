jQuery(function ($) {
  //Change target attribute of external links
  var domain_root = document.location.protocol + '//' + document.location.host;
  var all_links = $('a').each(function (index, element) {
    if (element.href.substr(0, domain_root.length) !== domain_root) {
      element.target = '_blank';
    }
  });

  //Search and tags
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

  var JsonSearch = function (search, criteria) {
    var search = search;
    var criteria = criteria;
    $.getJSON("/search_db.json", function (json) {
      jsonCallback(json, search);
    });

    function jsonCallback(json, search) {
      var pages = json.pages;
      var stringData = '';
      var results = jQuery.grep(pages, function (page, index) {
        for (var i = 0; i < criteria.length; i += 1) {
          if ($.isArray(page[criteria[i]])) {
            stringData = page[criteria[i]].join(',').toLowerCase();
          }
          else {
            stringData = page[criteria[i]].toLowerCase();
          }
          if (stringData.indexOf(search.toLowerCase()) != -1) {
            return true;
          }
        }
      });
      displaySearchResults(results);
    }
  };

  var initiateSearch = function () {
    $('#content_container').hide();
    $('#search_container').show();
    resetSearch();
  };

  $('#search_btn').click(function (event) {
    event.preventDefault();
    initiateSearch();
    JsonSearch($('#search_field').attr('value'), ['title', 'content']);

  });

  $('#search_field').keypress(function (e) {
    if (e.which == 13) {
      e.preventDefault();
      jQuery('#search_btn').click();
    }
  });

  var attachTagSearch = function () {
    $('.post_tag').each(function (index, element) {
      $(element).off("click.search");
      $(element).on("click.search", function (event) {
        event.preventDefault();
        initiateSearch();
        JsonSearch(element.innerText, ['tags']);
      });
    });
  };

  //Pagination
  if ($('#pagination_btn').length == 1) {
    var isLoadingNewPage = false;
    var drawNewPage = function (page) {
      var clone = $('#page-list-item-tpl').clone();
      clone.children('div.well').children('div.page-header').children('h3').children('a')[0].setAttribute('href', page.location);
      clone.children('div.well').children('div.page-header').children('h3').children('a')[0].innerHTML = page.title;
      var subtitle = clone.children('div.well').children('div.page-header').children('h3').children('small')[0].innerHTML;
      subtitle = subtitle.replace("__page.date__", page.date);
      subtitle = subtitle.replace("__page.tags__", '<span class="post_tag">' + page.tags.join('</span>, <span class="post_tag">')) + '</span>';
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
            attachTagSearch();
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

  attachTagSearch();

  //Pretty print of code blocks
  prettyPrint();

  //Background
  var bg_min = 101;
  var bg_max = 115;
  var background_id = Math.floor(Math.random() * (bg_max - bg_min + 1)) + bg_min;
  $(document.body).css('background-image', 'url(/static/img/bg/bg' + background_id + '.jpg?cache=' + blog_jodet.cache_date + ')');

  var background_code_files = [
    'gumdrop/contents/Gumdrop/Commands/Generate.php',
    'piaf/contents/web/app.js',
    'gitrepos/contents/src/Gitrepos/Database.php',
    'smb_auto_mount/contents/smb_auto_mount.py',
    'budget/contents/web/js/views/newCategoryView.js'
  ];
  var background_code_file_id = Math.floor(Math.random() * (background_code_files.length));
  var background_code_file = background_code_files[background_code_file_id];
  $.getJSON('https://api.github.com/repos/simonjodet/' + background_code_file + '?access_token=f105a2aca4634d782f4b1651b762ed4347ddf2ef&callback=?', function (response) {
    try {
      var code = Base64.decode(response.data.content);
      var container_height = $('.container').height();
      var elements = $('.bgtext_container');
      elements.each(function (index, element) {
        $(element).attr('data-code', code);
        $(element).height(container_height);
      });
    }
    catch (e) {
    }
  });
});

/*
 * $Id: base64.js,v 2.12 2013/05/06 07:54:20 dankogai Exp dankogai $
 *
 *  Licensed under the MIT license.
 *    http://opensource.org/licenses/mit-license
 *
 *  References:
 *    http://en.wikipedia.org/wiki/Base64
 */

(function(global) {
  'use strict';
  if (global.Base64) return;
  var version = "2.1.2";
  // if node.js, we use Buffer
  var buffer;
  if (typeof module !== 'undefined' && module.exports) {
    buffer = require('buffer').Buffer;
  }
  // constants
  var b64chars
    = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  var b64tab = function(bin) {
    var t = {};
    for (var i = 0, l = bin.length; i < l; i++) t[bin.charAt(i)] = i;
    return t;
  }(b64chars);
  var fromCharCode = String.fromCharCode;
  // encoder stuff
  var cb_utob = function(c) {
    if (c.length < 2) {
      var cc = c.charCodeAt(0);
      return cc < 0x80 ? c
        : cc < 0x800 ? (fromCharCode(0xc0 | (cc >>> 6))
        + fromCharCode(0x80 | (cc & 0x3f)))
        : (fromCharCode(0xe0 | ((cc >>> 12) & 0x0f))
        + fromCharCode(0x80 | ((cc >>>  6) & 0x3f))
        + fromCharCode(0x80 | ( cc         & 0x3f)));
    } else {
      var cc = 0x10000
        + (c.charCodeAt(0) - 0xD800) * 0x400
        + (c.charCodeAt(1) - 0xDC00);
      return (fromCharCode(0xf0 | ((cc >>> 18) & 0x07))
        + fromCharCode(0x80 | ((cc >>> 12) & 0x3f))
        + fromCharCode(0x80 | ((cc >>>  6) & 0x3f))
        + fromCharCode(0x80 | ( cc         & 0x3f)));
    }
  };
  var re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
  var utob = function(u) {
    return u.replace(re_utob, cb_utob);
  };
  var cb_encode = function(ccc) {
    var padlen = [0, 2, 1][ccc.length % 3],
      ord = ccc.charCodeAt(0) << 16
        | ((ccc.length > 1 ? ccc.charCodeAt(1) : 0) << 8)
        | ((ccc.length > 2 ? ccc.charCodeAt(2) : 0)),
      chars = [
        b64chars.charAt( ord >>> 18),
        b64chars.charAt((ord >>> 12) & 63),
        padlen >= 2 ? '=' : b64chars.charAt((ord >>> 6) & 63),
        padlen >= 1 ? '=' : b64chars.charAt(ord & 63)
      ];
    return chars.join('');
  };
  var btoa = global.btoa || function(b) {
    return b.replace(/[\s\S]{1,3}/g, cb_encode);
  };
  var _encode = buffer
      ? function (u) { return (new buffer(u)).toString('base64') }
      : function (u) { return btoa(utob(u)) }
    ;
  var encode = function(u, urisafe) {
    return !urisafe
      ? _encode(u)
      : _encode(u).replace(/[+\/]/g, function(m0) {
      return m0 == '+' ? '-' : '_';
    }).replace(/=/g, '');
  };
  var encodeURI = function(u) { return encode(u, true) };
  // decoder stuff
  var re_btou = new RegExp([
    '[\xC0-\xDF][\x80-\xBF]',
    '[\xE0-\xEF][\x80-\xBF]{2}',
    '[\xF0-\xF7][\x80-\xBF]{3}'
  ].join('|'), 'g');
  var cb_btou = function(cccc) {
    switch(cccc.length) {
      case 4:
        var cp = ((0x07 & cccc.charCodeAt(0)) << 18)
            |    ((0x3f & cccc.charCodeAt(1)) << 12)
            |    ((0x3f & cccc.charCodeAt(2)) <<  6)
            |     (0x3f & cccc.charCodeAt(3)),
          offset = cp - 0x10000;
        return (fromCharCode((offset  >>> 10) + 0xD800)
          + fromCharCode((offset & 0x3FF) + 0xDC00));
      case 3:
        return fromCharCode(
          ((0x0f & cccc.charCodeAt(0)) << 12)
            | ((0x3f & cccc.charCodeAt(1)) << 6)
            |  (0x3f & cccc.charCodeAt(2))
        );
      default:
        return  fromCharCode(
          ((0x1f & cccc.charCodeAt(0)) << 6)
            |  (0x3f & cccc.charCodeAt(1))
        );
    }
  };
  var btou = function(b) {
    return b.replace(re_btou, cb_btou);
  };
  var cb_decode = function(cccc) {
    var len = cccc.length,
      padlen = len % 4,
      n = (len > 0 ? b64tab[cccc.charAt(0)] << 18 : 0)
        | (len > 1 ? b64tab[cccc.charAt(1)] << 12 : 0)
        | (len > 2 ? b64tab[cccc.charAt(2)] <<  6 : 0)
        | (len > 3 ? b64tab[cccc.charAt(3)]       : 0),
      chars = [
        fromCharCode( n >>> 16),
        fromCharCode((n >>>  8) & 0xff),
        fromCharCode( n         & 0xff)
      ];
    chars.length -= [0, 0, 2, 1][padlen];
    return chars.join('');
  };
  var atob = global.atob || function(a){
    return a.replace(/[\s\S]{1,4}/g, cb_decode);
  };
  var _decode = buffer
    ? function(a) { return (new buffer(a, 'base64')).toString() }
    : function(a) { return btou(atob(a)) };
  var decode = function(a){
    return _decode(
      a.replace(/[-_]/g, function(m0) { return m0 == '-' ? '+' : '/' })
        .replace(/[^A-Za-z0-9\+\/]/g, '')
    );
  };
  // export Base64
  global.Base64 = {
    VERSION: version,
    atob: atob,
    btoa: btoa,
    fromBase64: decode,
    toBase64: encode,
    utob: utob,
    encode: encode,
    encodeURI: encodeURI,
    btou: btou,
    decode: decode
  };
  // if ES5 is available, make Base64.extendString() available
  if (typeof Object.defineProperty === 'function') {
    var noEnum = function(v){
      return {value:v,enumerable:false,writable:true,configurable:true};
    };
    global.Base64.extendString = function () {
      Object.defineProperty(
        String.prototype, 'fromBase64', noEnum(function () {
          return decode(this)
        }));
      Object.defineProperty(
        String.prototype, 'toBase64', noEnum(function (urisafe) {
          return encode(this, urisafe)
        }));
      Object.defineProperty(
        String.prototype, 'toBase64URI', noEnum(function () {
          return encode(this, true)
        }));
    };
  }
  // that's it!
})(this);
