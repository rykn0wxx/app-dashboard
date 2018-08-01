//= require perfect-scrollbar/dist/js/perfect-scrollbar.jquery
//= require app/mud

(function (global, factory) {
  'use strict';
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery')) :
  typeof define === 'function' && define.amd ? define(['exports', 'jquery'], factory) :
  (factory((global.bootstrap = {}), global.jQuery));
}(this, (function (exports, $) {
  'use strict';

  function _init () {
    $('body').bootstrapMaterialDesign();
    $('.sidebar .sidebar-wrapper, .main-panel').perfectScrollbar();
    $('body').mudhead();
  }

  if (document.readyState!='loading') {
    _init();
  } else if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', _init);
  } else {
    document.attachEvent('onreadystatechange', function () {
      if (document.readyState=='complete') _init();
    });
  }

})));

