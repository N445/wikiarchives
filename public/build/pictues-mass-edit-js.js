(self["webpackChunk"] = self["webpackChunk"] || []).push([["pictues-mass-edit-js"],{

/***/ "./assets/admin/catalog/pictues-mass-edit.js":
/*!***************************************************!*\
  !*** ./assets/admin/catalog/pictues-mass-edit.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
function all() {
  $('.picture-card').addClass('selected');
}

function none() {
  $('.picture-card').removeClass('selected');
}

function custom() {
  $('[data-button-action]').removeClass('active');
  $('[data-button-action="custom"]').addClass('active');
}

function refreshform() {
  $('#picture_mass_edit_pictures option').prop("selected", false);
  $.each($('.picture-card.selected'), function (key, item) {
    var pictureID = $(item).attr('id');
    $("#picture_mass_edit_pictures option[value=\"".concat(pictureID, "\"]")).prop("selected", true);
  });
  $('#nb-pictures-to-edit').html($('.picture-card.selected').length);
}

$(function () {
  $('.picture-card').on('click', function () {
    $(this).toggleClass('selected');
    refreshform();
    custom();
  });
  $('[data-button-action]').on('click', function () {
    $('[data-button-action]').removeClass('active');
    $(this).addClass('active');

    switch ($(this).data('button-action')) {
      case 'all':
        all();
        break;

      case 'none':
        none();
        break;
    }

    refreshform();
  });
});

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_jquery_dist_jquery_js"], () => (__webpack_exec__("./assets/admin/catalog/pictues-mass-edit.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGljdHVlcy1tYXNzLWVkaXQtanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsU0FBU0EsR0FBVCxHQUFlO0FBQ1hDLEVBQUFBLENBQUMsQ0FBQyxlQUFELENBQUQsQ0FBbUJDLFFBQW5CLENBQTRCLFVBQTVCO0FBQ0g7O0FBRUQsU0FBU0MsSUFBVCxHQUFnQjtBQUNaRixFQUFBQSxDQUFDLENBQUMsZUFBRCxDQUFELENBQW1CRyxXQUFuQixDQUErQixVQUEvQjtBQUNIOztBQUVELFNBQVNDLE1BQVQsR0FBa0I7QUFDZEosRUFBQUEsQ0FBQyxDQUFDLHNCQUFELENBQUQsQ0FBMEJHLFdBQTFCLENBQXNDLFFBQXRDO0FBQ0FILEVBQUFBLENBQUMsQ0FBQywrQkFBRCxDQUFELENBQW1DQyxRQUFuQyxDQUE0QyxRQUE1QztBQUNIOztBQUVELFNBQVNJLFdBQVQsR0FBdUI7QUFDbkJMLEVBQUFBLENBQUMsQ0FBQyxvQ0FBRCxDQUFELENBQXdDTSxJQUF4QyxDQUE2QyxVQUE3QyxFQUF5RCxLQUF6RDtBQUNBTixFQUFBQSxDQUFDLENBQUNPLElBQUYsQ0FBT1AsQ0FBQyxDQUFDLHdCQUFELENBQVIsRUFBb0MsVUFBVVEsR0FBVixFQUFlQyxJQUFmLEVBQXFCO0FBQ3JELFFBQUlDLFNBQVMsR0FBR1YsQ0FBQyxDQUFDUyxJQUFELENBQUQsQ0FBUUUsSUFBUixDQUFhLElBQWIsQ0FBaEI7QUFDQVgsSUFBQUEsQ0FBQyxzREFBOENVLFNBQTlDLFNBQUQsQ0FBOERKLElBQTlELENBQW1FLFVBQW5FLEVBQStFLElBQS9FO0FBQ0gsR0FIRDtBQUlBTixFQUFBQSxDQUFDLENBQUMsc0JBQUQsQ0FBRCxDQUEwQlksSUFBMUIsQ0FBK0JaLENBQUMsQ0FBQyx3QkFBRCxDQUFELENBQTRCYSxNQUEzRDtBQUNIOztBQUVEYixDQUFDLENBQUMsWUFBWTtBQUNWQSxFQUFBQSxDQUFDLENBQUMsZUFBRCxDQUFELENBQW1CYyxFQUFuQixDQUFzQixPQUF0QixFQUErQixZQUFZO0FBQ3ZDZCxJQUFBQSxDQUFDLENBQUMsSUFBRCxDQUFELENBQVFlLFdBQVIsQ0FBb0IsVUFBcEI7QUFDQVYsSUFBQUEsV0FBVztBQUNYRCxJQUFBQSxNQUFNO0FBQ1QsR0FKRDtBQU1BSixFQUFBQSxDQUFDLENBQUMsc0JBQUQsQ0FBRCxDQUEwQmMsRUFBMUIsQ0FBNkIsT0FBN0IsRUFBc0MsWUFBWTtBQUM5Q2QsSUFBQUEsQ0FBQyxDQUFDLHNCQUFELENBQUQsQ0FBMEJHLFdBQTFCLENBQXNDLFFBQXRDO0FBQ0FILElBQUFBLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUUMsUUFBUixDQUFpQixRQUFqQjs7QUFFQSxZQUFRRCxDQUFDLENBQUMsSUFBRCxDQUFELENBQVFnQixJQUFSLENBQWEsZUFBYixDQUFSO0FBQ0ksV0FBSyxLQUFMO0FBQ0lqQixRQUFBQSxHQUFHO0FBQ0g7O0FBQ0osV0FBSyxNQUFMO0FBQ0lHLFFBQUFBLElBQUk7QUFDSjtBQU5SOztBQVFBRyxJQUFBQSxXQUFXO0FBQ2QsR0FiRDtBQWNILENBckJBLENBQUQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvYWRtaW4vY2F0YWxvZy9waWN0dWVzLW1hc3MtZWRpdC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBhbGwoKSB7XG4gICAgJCgnLnBpY3R1cmUtY2FyZCcpLmFkZENsYXNzKCdzZWxlY3RlZCcpO1xufVxuXG5mdW5jdGlvbiBub25lKCkge1xuICAgICQoJy5waWN0dXJlLWNhcmQnKS5yZW1vdmVDbGFzcygnc2VsZWN0ZWQnKTtcbn1cblxuZnVuY3Rpb24gY3VzdG9tKCkge1xuICAgICQoJ1tkYXRhLWJ1dHRvbi1hY3Rpb25dJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICQoJ1tkYXRhLWJ1dHRvbi1hY3Rpb249XCJjdXN0b21cIl0nKS5hZGRDbGFzcygnYWN0aXZlJyk7XG59XG5cbmZ1bmN0aW9uIHJlZnJlc2hmb3JtKCkge1xuICAgICQoJyNwaWN0dXJlX21hc3NfZWRpdF9waWN0dXJlcyBvcHRpb24nKS5wcm9wKFwic2VsZWN0ZWRcIiwgZmFsc2UpXG4gICAgJC5lYWNoKCQoJy5waWN0dXJlLWNhcmQuc2VsZWN0ZWQnKSwgZnVuY3Rpb24gKGtleSwgaXRlbSkge1xuICAgICAgICBsZXQgcGljdHVyZUlEID0gJChpdGVtKS5hdHRyKCdpZCcpO1xuICAgICAgICAkKGAjcGljdHVyZV9tYXNzX2VkaXRfcGljdHVyZXMgb3B0aW9uW3ZhbHVlPVwiJHtwaWN0dXJlSUR9XCJdYCkucHJvcChcInNlbGVjdGVkXCIsIHRydWUpXG4gICAgfSlcbiAgICAkKCcjbmItcGljdHVyZXMtdG8tZWRpdCcpLmh0bWwoJCgnLnBpY3R1cmUtY2FyZC5zZWxlY3RlZCcpLmxlbmd0aClcbn1cblxuJChmdW5jdGlvbiAoKSB7XG4gICAgJCgnLnBpY3R1cmUtY2FyZCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnc2VsZWN0ZWQnKTtcbiAgICAgICAgcmVmcmVzaGZvcm0oKTtcbiAgICAgICAgY3VzdG9tKCk7XG4gICAgfSlcblxuICAgICQoJ1tkYXRhLWJ1dHRvbi1hY3Rpb25dJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAkKCdbZGF0YS1idXR0b24tYWN0aW9uXScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XG5cbiAgICAgICAgc3dpdGNoICgkKHRoaXMpLmRhdGEoJ2J1dHRvbi1hY3Rpb24nKSkge1xuICAgICAgICAgICAgY2FzZSAnYWxsJzpcbiAgICAgICAgICAgICAgICBhbGwoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ25vbmUnOlxuICAgICAgICAgICAgICAgIG5vbmUoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICByZWZyZXNoZm9ybSgpO1xuICAgIH0pXG59KVxuXG4iXSwibmFtZXMiOlsiYWxsIiwiJCIsImFkZENsYXNzIiwibm9uZSIsInJlbW92ZUNsYXNzIiwiY3VzdG9tIiwicmVmcmVzaGZvcm0iLCJwcm9wIiwiZWFjaCIsImtleSIsIml0ZW0iLCJwaWN0dXJlSUQiLCJhdHRyIiwiaHRtbCIsImxlbmd0aCIsIm9uIiwidG9nZ2xlQ2xhc3MiLCJkYXRhIl0sInNvdXJjZVJvb3QiOiIifQ==