window.TOUCH = "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch;
(function($) {
  $.belowthefold = function(element, settings) {
    var fold = $(window).height() + $(window).scrollTop();
    return fold <= $(element).offset().top - settings.threshold;
  };
  $.abovethetop = function(element, settings) {
    var top = $(window).scrollTop();
    return top >= $(element).offset().top + $(element).height() - settings.threshold;
  };
  $.rightofscreen = function(element, settings) {
    var fold = $(window).width() + $(window).scrollLeft();
    return fold <= $(element).offset().left - settings.threshold;
  };
  $.leftofscreen = function(element, settings) {
    var left = $(window).scrollLeft();
    return left >= $(element).offset().left + $(element).width() - settings.threshold;
  };
  $.inviewport = function(element, settings) {
    return !$.rightofscreen(element, settings) && !$.leftofscreen(element, settings) && !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
  };
  $.extend($.expr[':'], {
    "below-the-fold": function(a, i, m) {
      return $.belowthefold(a, {
        threshold: 0
      });
    },
    "above-the-top": function(a, i, m) {
      return $.abovethetop(a, {
        threshold: 0
      });
    },
    "left-of-screen": function(a, i, m) {
      return $.leftofscreen(a, {
        threshold: 0
      });
    },
    "right-of-screen": function(a, i, m) {
      return $.rightofscreen(a, {
        threshold: 0
      });
    },
    "in-viewport": function(a, i, m) {
      return $.inviewport(a, {
        threshold: 0
      });
    }
  });
})(jQuery);

$(document).ready(function() {
  $('h1').each(function() {
    var $t = $(this),
      tx = $t.html();
    words = $t.text().split(' ').length;
    if (words > 2) {
      $t.html(tx.replace(/\s([^\s<]{0,10})\s*$/, '&nbsp;$1'));
    }
  });
  $('.gallery-icon a').magnificPopup({
    type: 'image',
    gallery: {
      enabled: true
    },
    image: {
      titleSrc: function(item) {
        return $(item.el).parent().find('figcaption').text();
      },
      verticalFit: true
    },
    zoom: {
      enabled: true,
      duration: 300,
      easing: 'ease-out'
    }
  });
  $('#main').removeClass('unloaded');

  $(window).load(function() {
    if ($('body.home').length) {
      $('.box').css({
        opacity: 0,
        top: '200px'
      }).each(function(i, e) {
        $(this).css({
          transition: 'all ' + (300 + (i * 0)) + 'ms ease-out',
          transitionDelay: (300 + (i * 100)) + 'ms',
          opacity: 1,
          top: 0
        });
      });
    }

  }).resize(function() {
    // createShadowElements();
  })

  $('.sidenav.nav-previous').hover(function() {
    $('body').addClass('prev-hover');
  }, function() {
    $('body').removeClass('prev-hover');
  });

  $('.sidenav.nav-next').hover(function() {
    $('body').addClass('next-hover');
  }, function() {
    $('body').removeClass('next-hover');
  });

  $('.mainnav').click(function() {
    $(this).toggleClass('open');
  })

  // know when we are scrolled down on the home
  $(window).scroll(menuStick);
  menuStick();
});

// sticky menu/header
function menuStick() {
  var sT = $(window).scrollTop(),
    hh = 200,
    $B = $('body');
  if (sT > hh) {
    if (!$B.hasClass('scolledPastHeader')) {
      $B.addClass('scolledPastHeader');
    }
  } else {
    if ($B.hasClass('scolledPastHeader')) {
      $B.removeClass('scolledPastHeader');
    }
  }
};
