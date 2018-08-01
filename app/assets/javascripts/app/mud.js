(function(root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
		// define(['jquery', 'exports'], function ($, exports) {
		// 	root.mudhead = factory(root, exports, $);
    // });
    define(['jquery', 'exports']);
	} else
  if (typeof exports !== 'undefined') {
		var jQuery = window.jQuery;
		if (jQuery === undefined) {
			try {
				jQuery = require('jquery');
			} catch (err) {
				if (!jQuery) throw new Error('jQuery dependency not found');
			}
		}
		factory(root, exports, jQuery);
	} else {
    //root.mudhead = factory(root, {}, (root.jQuery || root.Zepto || root.ender || root.$));
    factory(root, {}, (root.jQuery || root.Zepto || root.ender || root.$));
	}
}(this, function (root, mudhead, $) {
  'use strict';

  var Mudhead = function (element, options) {
    this.options = null;
    this.init(element, options);
  };

  Mudhead.DEFAULTS = {
    breakCards: true,
    searchVisible: 0,
    transparent: true,
    transparentDemo: true, //TODO: validate if needed
    fixedTop: false,
    mobile: {
      menuVisible: 0,
      menuInitialized: false,
      toggleInitiliazed: false,
      bsNavInitialized: false
    },
    seq: 0,
    delays: 180,
    durations: 500,
    misc: {
      navbarMenuVisible: 0,
      activeCollapse: true,
      disabledCollapseInit: 0,
      sidebarMini: false
    }
  };

  var components = {
    sidebar: {
      selector: '.sidebar',
      caller: 'initSidebarsCheck'
    },
    tootip: {
      selector: '[rel="tooltip"]',
      caller: 'initTooltip'
    },
    formControl: {
      selector: '.form-control',
      caller: 'initFormControl'
    },
    checkBoxes: {
      selector: '.rykn0wxx input[type="checkbox"][required="true"], .rykn0wxx input[type="radio"][required="true"]',
      caller: 'clearCheckBoxes'
    }
  };

  Mudhead.prototype = {
    init: function (element, options) {
      this.$element = $(element);
      this.options = this.getOptions(options);
      for (var c in components) {
        var compEl = $(components[c].selector);
        if (compEl.length !== 0) this[components[c].caller](compEl);
      }
      this.setupListeners();
    },
    setupListeners: function () {
      if (document.readyState!='loading') this.globalListeners();
      else if (document.addEventListener) document.addEventListener('DOMContentLoaded', this.globalListeners);
      else if (typeof Turbolinks === 'object') document.addEventListener('turbolinks:load', this.globalListeners);
      else document.attachEvent('onreadystatechange', function(){
        if (document.readyState=='complete') this.globalListeners();
      });
    },
    globalListeners: function () {
      var _this = this;
      $(document).on('click', '.navbar-toggler', function () {
        var $toggle = $(this);
        if (_this.options.mobile.menuVisible === 1) {
          $('html').removeClass('nav-open');
          $('.close-layer').remove();
          setTimeout(function () {
            $toggle.removeClass('toggled');
          }, 400);
          _this.options.mobile.menuVisible === 0;
        } else {
          setTimeout(function () {
            $toggle.addClass('toggled');
          }, 400);
          var $layer = $('<div class="close-layer"></div>');
          if ($('body').find('.main-panel').length != 0) {
            $layer.appendTo(".main-panel");
          } else if (($('body').hasClass('off-canvas-sidebar'))) {
            $layer.appendTo(".wrapper-full-page");
          }
          setTimeout(function () {
            $layer.addClass('visible');
          }, 100);
          $layer.click(function() {
            $('html').removeClass('nav-open');
            _this.options.mobile.menuVisible === 0;
            $layer.removeClass('visible');
            setTimeout(function() {
              $layer.remove();
              $toggle.removeClass('toggled');
            }, 400);
          });
          $('html').addClass('nav-open');
          _this.options.mobile.menuVisible === 1;
        }
      });
      $(window).resize(function () {
        _this.initSidebarsCheck();
      });
      $('#minimizer').click(function (ev) {
        if (_this.options.misc.sidebarMini === true) {
          $('body').removeClass('sidebar-mini');
          _this.options.misc.sidebarMini = false;
        } else {
          $('body').addClass('sidebar-mini');
          _this.options.misc.sidebarMini = true;
        }
        var simulateWindowResize = setInterval(function() {
          window.dispatchEvent(new Event('resize'));
        }, 180);
        setTimeout(function() {
          clearInterval(simulateWindowResize);
        }, 1000);
        ev.preventDefault();
        ev.stopPropagation();
      });
      $(window).on('scroll', _debounce(function () {
        if ($(document).scrollTop() > 260) {
          if (_this.options.transparent) {
            _this.options.transparent = false;
            $('.navbar-color-on-scroll').removeClass('navbar-transparent');
          }
        } else {
          if (!_this.options.transparent) {
            _this.options.transparent = true;
            $('.navbar-color-on-scroll').addClass('navbar-transparent');
          }
        }
      }, 17));
    },
    getOptions: function (options) {
      options = $.extend({}, this.getDefaults(), this.$element.data(), options);
      return options;
    },
    getDefaults: function () {
      return Mudhead.DEFAULTS;
    },
    clearCheckBoxes: function ($el) {
      $el.on('click', function () {
        if ($(this).hasClass('error')) $(this).closest('div').removeClass('has-error');
      });
    },
    initFormControl: function ($el) {
      $el.on('focus', function () {
        $(this).parent('.input-group').addClass('input-group-focus');
      }).on('blur', function () {
        $(this).parent(".input-group").removeClass('input-group-focus');
      });
    },
    initTooltip: function ($el) {
      $el.tooltip();
    },
    sidebarShow: function () {
      return $(window).width() <= 991 && $('.sidebar').length !== 0;
    },
    initSidebarsCheck: function () {
      if (this.sidebarShow()) this.initRightMenu();
    },
    initRightMenu: function () {
      _debounce(function () {
        var $sidebar_wrapper = $('.sidebar-wrapper');
        if (!this.options.mobile.menuInitialized) {
          var $navbar = $('nav').find('.navbar-collapse').children('.navbar-nav');
          var nav_content = $navbar.html();
          nav_content = '<ul class="nav navbar-nav nav-mobile-menu">' + nav_content + '</ul>';
          var $sidebar_nav = $sidebar_wrapper.find(' > .nav');
          var $nav_content = $(nav_content);
          $nav_content.insertBefore($sidebar_nav);
          $('.sidebar-wrapper .dropdown .dropdown-menu > li > a').click(function (ev) {
            ev.stopPropagation();
          });
          window.dispatchEvent(new Event('resize'));
          this.options.mobile.menuInitialized = true;
        } else {
          $sidebar_wrapper.find('.navbar-form').remove();
          $sidebar_wrapper.find('.nav-mobile-menu').remove();
          this.options.mobile.menuInitialized = false;
        }
      }, 200);
    }
  };

  function _debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      }, wait);
      if (immediate && !timeout) func.apply(context, args);
    };
  }

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('mud.head');
      var options = typeof option === 'object' && option;

      if (!data) $this.data('mud.head', (data = new Mudhead(this, options)));
      
    });
  }

  var old = $.fn.mudhead;
  $.fn.mudhead = Plugin;
  $.fn.mudhead.Constructor = Mudhead;

  $.fn.mudhead.noConflict = function () {
    $.fn.mudhead = old;
    return this;
  };

}));