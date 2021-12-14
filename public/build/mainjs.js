(self["webpackChunk"] = self["webpackChunk"] || []).push([["mainjs"],{

/***/ "./assets/front/main.js":
/*!******************************!*\
  !*** ./assets/front/main.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
__webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");

__webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");

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
/******/ __webpack_require__.O(0, ["vendors-node_modules_jquery_dist_jquery_js","vendors-node_modules_core-js_internals_export_js","vendors-node_modules_core-js_internals_add-to-unscopables_js-node_modules_core-js_internals_a-464164","vendors-node_modules_core-js_modules_es_array_find_js-node_modules_noty_lib_noty_js"], () => (__webpack_exec__("./assets/front/main.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFNQSxJQUFJLEdBQUdDLG1CQUFPLENBQUMsNkNBQUQsQ0FBcEI7O0FBRUFDLENBQUMsQ0FBQyxZQUFZO0FBQ1YsTUFBSUMsY0FBYyxHQUFHRCxDQUFDLENBQUMsd0JBQUQsQ0FBdEI7QUFDQSxNQUFJRSxhQUFhLEdBQUdELGNBQWMsQ0FBQ0UsSUFBZixDQUFvQixnQkFBcEIsQ0FBcEI7O0FBQ0EsTUFBSUQsYUFBYSxDQUFDRSxNQUFkLEdBQXVCLENBQTNCLEVBQThCO0FBQzFCSixJQUFBQSxDQUFDLENBQUNLLElBQUYsQ0FBT0gsYUFBUCxFQUFzQixVQUFVSSxHQUFWLEVBQWVDLE9BQWYsRUFBd0I7QUFDMUNBLE1BQUFBLE9BQU8sR0FBR1AsQ0FBQyxDQUFDTyxPQUFELENBQVg7QUFDQSxVQUFJVCxJQUFKLENBQVM7QUFDTFUsUUFBQUEsS0FBSyxFQUFFLGNBREY7QUFFTEMsUUFBQUEsSUFBSSxFQUFFRixPQUFPLENBQUNHLElBQVIsQ0FBYSxXQUFiLENBRkQ7QUFHTEMsUUFBQUEsSUFBSSxFQUFFSixPQUFPLENBQUNHLElBQVIsQ0FBYSxjQUFiLENBSEQ7QUFJTEUsUUFBQUEsT0FBTyxFQUFFLE9BQU9OLEdBSlg7QUFLTE8sUUFBQUEsS0FBSyxFQUFFO0FBTEYsT0FBVCxFQU1HQyxJQU5IO0FBT0gsS0FURDtBQVVIO0FBQ0osQ0FmQSxDQUFEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2Zyb250L21haW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgTm90eSA9IHJlcXVpcmUoJ25vdHknKTtcblxuJChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGZsYXNoQ29udGFpbmVyID0gJCgnLmZsYXNoLW1lc3NhZ2Utd3JhcHBlcicpO1xuICAgIHZhciBmbGFzaE1lc3NhZ2VzID0gZmxhc2hDb250YWluZXIuZmluZCgnLmZsYXNoLW1lc3NhZ2UnKTtcbiAgICBpZiAoZmxhc2hNZXNzYWdlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICQuZWFjaChmbGFzaE1lc3NhZ2VzLCBmdW5jdGlvbiAoa2V5LCBtZXNzYWdlKSB7XG4gICAgICAgICAgICBtZXNzYWdlID0gJChtZXNzYWdlKTtcbiAgICAgICAgICAgIG5ldyBOb3R5KHtcbiAgICAgICAgICAgICAgICB0aGVtZTogJ2Jvb3RzdHJhcC12NCcsXG4gICAgICAgICAgICAgICAgdHlwZTogbWVzc2FnZS5hdHRyKCdkYXRhLXR5cGUnKSxcbiAgICAgICAgICAgICAgICB0ZXh0OiBtZXNzYWdlLmF0dHIoJ2RhdGEtbWVzc2FnZScpLFxuICAgICAgICAgICAgICAgIHRpbWVvdXQ6IDgwMDAgKyBrZXksXG4gICAgICAgICAgICAgICAgcXVldWU6ICdub3RpZmljYXRpb24nLFxuICAgICAgICAgICAgfSkuc2hvdygpO1xuICAgICAgICB9KTtcbiAgICB9XG59KSJdLCJuYW1lcyI6WyJOb3R5IiwicmVxdWlyZSIsIiQiLCJmbGFzaENvbnRhaW5lciIsImZsYXNoTWVzc2FnZXMiLCJmaW5kIiwibGVuZ3RoIiwiZWFjaCIsImtleSIsIm1lc3NhZ2UiLCJ0aGVtZSIsInR5cGUiLCJhdHRyIiwidGV4dCIsInRpbWVvdXQiLCJxdWV1ZSIsInNob3ciXSwic291cmNlUm9vdCI6IiJ9