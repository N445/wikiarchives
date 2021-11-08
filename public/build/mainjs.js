(self["webpackChunk"] = self["webpackChunk"] || []).push([["mainjs"],{

/***/ "./assets/main.js":
/*!************************!*\
  !*** ./assets/main.js ***!
  \************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
__webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");

var Noty = __webpack_require__(/*! noty */ "./node_modules/noty/lib/noty.js");

$(function () {
  var flashContainer = $('.flash-message-wrapper');
  var flashMessages = flashContainer.find('.flash-message');

  if (flashMessages.length > 0) {
    $.each(flashMessages, function (key, message) {
      message = $(message);
      new Noty({
        theme: 'bootstrap-v4',
        type: message.attr('data-type'),
        text: message.attr('data-message'),
        timeout: 8000 + key,
        queue: 'notification'
      }).show();
    });
  }
});

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_jquery_dist_jquery_js","vendors-node_modules_core-js_internals_array-iteration_js-node_modules_core-js_internals_export_js","vendors-node_modules_core-js_modules_es_array_find_js-node_modules_noty_lib_noty_js"], () => (__webpack_exec__("./assets/main.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsSUFBTUEsSUFBSSxHQUFHQyxtQkFBTyxDQUFDLDZDQUFELENBQXBCOztBQUVBQyxDQUFDLENBQUMsWUFBWTtBQUNWLE1BQUlDLGNBQWMsR0FBR0QsQ0FBQyxDQUFDLHdCQUFELENBQXRCO0FBQ0EsTUFBSUUsYUFBYSxHQUFHRCxjQUFjLENBQUNFLElBQWYsQ0FBb0IsZ0JBQXBCLENBQXBCOztBQUNBLE1BQUlELGFBQWEsQ0FBQ0UsTUFBZCxHQUF1QixDQUEzQixFQUE4QjtBQUMxQkosSUFBQUEsQ0FBQyxDQUFDSyxJQUFGLENBQU9ILGFBQVAsRUFBc0IsVUFBVUksR0FBVixFQUFlQyxPQUFmLEVBQXdCO0FBQzFDQSxNQUFBQSxPQUFPLEdBQUdQLENBQUMsQ0FBQ08sT0FBRCxDQUFYO0FBQ0EsVUFBSVQsSUFBSixDQUFTO0FBQ0xVLFFBQUFBLEtBQUssRUFBRSxjQURGO0FBRUxDLFFBQUFBLElBQUksRUFBRUYsT0FBTyxDQUFDRyxJQUFSLENBQWEsV0FBYixDQUZEO0FBR0xDLFFBQUFBLElBQUksRUFBRUosT0FBTyxDQUFDRyxJQUFSLENBQWEsY0FBYixDQUhEO0FBSUxFLFFBQUFBLE9BQU8sRUFBRSxPQUFPTixHQUpYO0FBS0xPLFFBQUFBLEtBQUssRUFBRTtBQUxGLE9BQVQsRUFNR0MsSUFOSDtBQU9ILEtBVEQ7QUFVSDtBQUNKLENBZkEsQ0FBRCIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2Fzc2V0cy9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IE5vdHkgPSByZXF1aXJlKCdub3R5Jyk7XG5cbiQoZnVuY3Rpb24gKCkge1xuICAgIHZhciBmbGFzaENvbnRhaW5lciA9ICQoJy5mbGFzaC1tZXNzYWdlLXdyYXBwZXInKTtcbiAgICB2YXIgZmxhc2hNZXNzYWdlcyA9IGZsYXNoQ29udGFpbmVyLmZpbmQoJy5mbGFzaC1tZXNzYWdlJyk7XG4gICAgaWYgKGZsYXNoTWVzc2FnZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAkLmVhY2goZmxhc2hNZXNzYWdlcywgZnVuY3Rpb24gKGtleSwgbWVzc2FnZSkge1xuICAgICAgICAgICAgbWVzc2FnZSA9ICQobWVzc2FnZSk7XG4gICAgICAgICAgICBuZXcgTm90eSh7XG4gICAgICAgICAgICAgICAgdGhlbWU6ICdib290c3RyYXAtdjQnLFxuICAgICAgICAgICAgICAgIHR5cGU6IG1lc3NhZ2UuYXR0cignZGF0YS10eXBlJyksXG4gICAgICAgICAgICAgICAgdGV4dDogbWVzc2FnZS5hdHRyKCdkYXRhLW1lc3NhZ2UnKSxcbiAgICAgICAgICAgICAgICB0aW1lb3V0OiA4MDAwICsga2V5LFxuICAgICAgICAgICAgICAgIHF1ZXVlOiAnbm90aWZpY2F0aW9uJyxcbiAgICAgICAgICAgIH0pLnNob3coKTtcbiAgICAgICAgfSk7XG4gICAgfVxufSkiXSwibmFtZXMiOlsiTm90eSIsInJlcXVpcmUiLCIkIiwiZmxhc2hDb250YWluZXIiLCJmbGFzaE1lc3NhZ2VzIiwiZmluZCIsImxlbmd0aCIsImVhY2giLCJrZXkiLCJtZXNzYWdlIiwidGhlbWUiLCJ0eXBlIiwiYXR0ciIsInRleHQiLCJ0aW1lb3V0IiwicXVldWUiLCJzaG93Il0sInNvdXJjZVJvb3QiOiIifQ==