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
/******/ __webpack_require__.O(0, ["vendors-node_modules_jquery_dist_jquery_js","vendors-node_modules_core-js_modules_es_array_find_js","vendors-node_modules_noty_lib_noty_js"], () => (__webpack_exec__("./assets/main.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsSUFBTUEsSUFBSSxHQUFHQyxtQkFBTyxDQUFDLDZDQUFELENBQXBCOztBQUVBQyxDQUFDLENBQUMsWUFBVztBQUNULE1BQUlDLGNBQWMsR0FBR0QsQ0FBQyxDQUFDLHdCQUFELENBQXRCO0FBQ0EsTUFBSUUsYUFBYSxHQUFJRCxjQUFjLENBQUNFLElBQWYsQ0FBb0IsZ0JBQXBCLENBQXJCOztBQUNBLE1BQUdELGFBQWEsQ0FBQ0UsTUFBZCxHQUF1QixDQUExQixFQUE2QjtBQUN6QkosSUFBQUEsQ0FBQyxDQUFDSyxJQUFGLENBQU9ILGFBQVAsRUFBc0IsVUFBVUksR0FBVixFQUFlQyxPQUFmLEVBQXdCO0FBQzFDQSxNQUFBQSxPQUFPLEdBQUlQLENBQUMsQ0FBQ08sT0FBRCxDQUFaO0FBQ0EsVUFBSVQsSUFBSixDQUFTO0FBQ0xVLFFBQUFBLEtBQUssRUFBRSxjQURGO0FBRUxDLFFBQUFBLElBQUksRUFBRUYsT0FBTyxDQUFDRyxJQUFSLENBQWEsV0FBYixDQUZEO0FBR0xDLFFBQUFBLElBQUksRUFBRUosT0FBTyxDQUFDRyxJQUFSLENBQWEsY0FBYixDQUhEO0FBSUxFLFFBQUFBLE9BQU8sRUFBRSxPQUFPTixHQUpYO0FBS0xPLFFBQUFBLEtBQUssRUFBRTtBQUxGLE9BQVQsRUFNR0MsSUFOSDtBQU9ILEtBVEQ7QUFVSDtBQUNKLENBZkEsQ0FBRCIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2Fzc2V0cy9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IE5vdHkgPSByZXF1aXJlKCdub3R5Jyk7XG5cbiQoZnVuY3Rpb24oKSB7XG4gICAgdmFyIGZsYXNoQ29udGFpbmVyID0gJCgnLmZsYXNoLW1lc3NhZ2Utd3JhcHBlcicpO1xuICAgIHZhciBmbGFzaE1lc3NhZ2VzICA9IGZsYXNoQ29udGFpbmVyLmZpbmQoJy5mbGFzaC1tZXNzYWdlJyk7XG4gICAgaWYoZmxhc2hNZXNzYWdlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICQuZWFjaChmbGFzaE1lc3NhZ2VzLCBmdW5jdGlvbiAoa2V5LCBtZXNzYWdlKSB7XG4gICAgICAgICAgICBtZXNzYWdlICA9ICQobWVzc2FnZSk7XG4gICAgICAgICAgICBuZXcgTm90eSh7XG4gICAgICAgICAgICAgICAgdGhlbWU6ICdib290c3RyYXAtdjQnLFxuICAgICAgICAgICAgICAgIHR5cGU6IG1lc3NhZ2UuYXR0cignZGF0YS10eXBlJyksXG4gICAgICAgICAgICAgICAgdGV4dDogbWVzc2FnZS5hdHRyKCdkYXRhLW1lc3NhZ2UnKSxcbiAgICAgICAgICAgICAgICB0aW1lb3V0OiA4MDAwICsga2V5LFxuICAgICAgICAgICAgICAgIHF1ZXVlOiAnbm90aWZpY2F0aW9uJyxcbiAgICAgICAgICAgIH0pLnNob3coKTtcbiAgICAgICAgfSk7XG4gICAgfVxufSkiXSwibmFtZXMiOlsiTm90eSIsInJlcXVpcmUiLCIkIiwiZmxhc2hDb250YWluZXIiLCJmbGFzaE1lc3NhZ2VzIiwiZmluZCIsImxlbmd0aCIsImVhY2giLCJrZXkiLCJtZXNzYWdlIiwidGhlbWUiLCJ0eXBlIiwiYXR0ciIsInRleHQiLCJ0aW1lb3V0IiwicXVldWUiLCJzaG93Il0sInNvdXJjZVJvb3QiOiIifQ==