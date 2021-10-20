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
/******/ __webpack_require__.O(0, ["vendors-node_modules_jquery_dist_jquery_js","vendors-node_modules_core-js_internals_export_js-node_modules_core-js_internals_is-array_js-n-e836c4","vendors-node_modules_core-js_modules_es_array_find_js-node_modules_noty_lib_noty_js"], () => (__webpack_exec__("./assets/main.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsSUFBTUEsSUFBSSxHQUFHQyxtQkFBTyxDQUFDLDZDQUFELENBQXBCOztBQUVBQyxDQUFDLENBQUMsWUFBWTtBQUNWLE1BQUlDLGNBQWMsR0FBR0QsQ0FBQyxDQUFDLHdCQUFELENBQXRCO0FBQ0EsTUFBSUUsYUFBYSxHQUFHRCxjQUFjLENBQUNFLElBQWYsQ0FBb0IsZ0JBQXBCLENBQXBCOztBQUNBLE1BQUlELGFBQWEsQ0FBQ0UsTUFBZCxHQUF1QixDQUEzQixFQUE4QjtBQUMxQkosSUFBQUEsQ0FBQyxDQUFDSyxJQUFGLENBQU9ILGFBQVAsRUFBc0IsVUFBVUksR0FBVixFQUFlQyxPQUFmLEVBQXdCO0FBQzFDQSxNQUFBQSxPQUFPLEdBQUdQLENBQUMsQ0FBQ08sT0FBRCxDQUFYO0FBQ0EsVUFBSVQsSUFBSixDQUFTO0FBQ0xVLFFBQUFBLEtBQUssRUFBRSxjQURGO0FBRUxDLFFBQUFBLElBQUksRUFBRUYsT0FBTyxDQUFDRyxJQUFSLENBQWEsV0FBYixDQUZEO0FBR0xDLFFBQUFBLElBQUksRUFBRUosT0FBTyxDQUFDRyxJQUFSLENBQWEsY0FBYixDQUhEO0FBSUxFLFFBQUFBLE9BQU8sRUFBRSxPQUFPTixHQUpYO0FBS0xPLFFBQUFBLEtBQUssRUFBRTtBQUxGLE9BQVQsRUFNR0MsSUFOSDtBQU9ILEtBVEQ7QUFVSDtBQUlKLENBbEJBLENBQUQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvbWFpbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBOb3R5ID0gcmVxdWlyZSgnbm90eScpO1xuXG4kKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZmxhc2hDb250YWluZXIgPSAkKCcuZmxhc2gtbWVzc2FnZS13cmFwcGVyJyk7XG4gICAgdmFyIGZsYXNoTWVzc2FnZXMgPSBmbGFzaENvbnRhaW5lci5maW5kKCcuZmxhc2gtbWVzc2FnZScpO1xuICAgIGlmIChmbGFzaE1lc3NhZ2VzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgJC5lYWNoKGZsYXNoTWVzc2FnZXMsIGZ1bmN0aW9uIChrZXksIG1lc3NhZ2UpIHtcbiAgICAgICAgICAgIG1lc3NhZ2UgPSAkKG1lc3NhZ2UpO1xuICAgICAgICAgICAgbmV3IE5vdHkoe1xuICAgICAgICAgICAgICAgIHRoZW1lOiAnYm9vdHN0cmFwLXY0JyxcbiAgICAgICAgICAgICAgICB0eXBlOiBtZXNzYWdlLmF0dHIoJ2RhdGEtdHlwZScpLFxuICAgICAgICAgICAgICAgIHRleHQ6IG1lc3NhZ2UuYXR0cignZGF0YS1tZXNzYWdlJyksXG4gICAgICAgICAgICAgICAgdGltZW91dDogODAwMCArIGtleSxcbiAgICAgICAgICAgICAgICBxdWV1ZTogJ25vdGlmaWNhdGlvbicsXG4gICAgICAgICAgICB9KS5zaG93KCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG5cbn0pIl0sIm5hbWVzIjpbIk5vdHkiLCJyZXF1aXJlIiwiJCIsImZsYXNoQ29udGFpbmVyIiwiZmxhc2hNZXNzYWdlcyIsImZpbmQiLCJsZW5ndGgiLCJlYWNoIiwia2V5IiwibWVzc2FnZSIsInRoZW1lIiwidHlwZSIsImF0dHIiLCJ0ZXh0IiwidGltZW91dCIsInF1ZXVlIiwic2hvdyJdLCJzb3VyY2VSb290IjoiIn0=