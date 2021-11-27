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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGljdHVlcy1tYXNzLWVkaXQtanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsU0FBU0EsR0FBVCxHQUFlO0FBQ1hDLEVBQUFBLENBQUMsQ0FBQyxlQUFELENBQUQsQ0FBbUJDLFFBQW5CLENBQTRCLFVBQTVCO0FBQ0g7O0FBRUQsU0FBU0MsSUFBVCxHQUFnQjtBQUNaRixFQUFBQSxDQUFDLENBQUMsZUFBRCxDQUFELENBQW1CRyxXQUFuQixDQUErQixVQUEvQjtBQUNIOztBQUVELFNBQVNDLE1BQVQsR0FBa0I7QUFDZEosRUFBQUEsQ0FBQyxDQUFDLHNCQUFELENBQUQsQ0FBMEJHLFdBQTFCLENBQXNDLFFBQXRDO0FBQ0FILEVBQUFBLENBQUMsQ0FBQywrQkFBRCxDQUFELENBQW1DQyxRQUFuQyxDQUE0QyxRQUE1QztBQUNIOztBQUVELFNBQVNJLFdBQVQsR0FBdUI7QUFDbkJMLEVBQUFBLENBQUMsQ0FBQyxvQ0FBRCxDQUFELENBQXdDTSxJQUF4QyxDQUE2QyxVQUE3QyxFQUF5RCxLQUF6RDtBQUNBTixFQUFBQSxDQUFDLENBQUNPLElBQUYsQ0FBT1AsQ0FBQyxDQUFDLHdCQUFELENBQVIsRUFBb0MsVUFBVVEsR0FBVixFQUFlQyxJQUFmLEVBQXFCO0FBQ3JELFFBQUlDLFNBQVMsR0FBR1YsQ0FBQyxDQUFDUyxJQUFELENBQUQsQ0FBUUUsSUFBUixDQUFhLElBQWIsQ0FBaEI7QUFDQVgsSUFBQUEsQ0FBQyxzREFBOENVLFNBQTlDLFNBQUQsQ0FBOERKLElBQTlELENBQW1FLFVBQW5FLEVBQStFLElBQS9FO0FBQ0gsR0FIRDtBQUlIOztBQUVETixDQUFDLENBQUMsWUFBWTtBQUNWQSxFQUFBQSxDQUFDLENBQUMsZUFBRCxDQUFELENBQW1CWSxFQUFuQixDQUFzQixPQUF0QixFQUErQixZQUFZO0FBQ3ZDWixJQUFBQSxDQUFDLENBQUMsSUFBRCxDQUFELENBQVFhLFdBQVIsQ0FBb0IsVUFBcEI7QUFDQVIsSUFBQUEsV0FBVztBQUNYRCxJQUFBQSxNQUFNO0FBQ1QsR0FKRDtBQU1BSixFQUFBQSxDQUFDLENBQUMsc0JBQUQsQ0FBRCxDQUEwQlksRUFBMUIsQ0FBNkIsT0FBN0IsRUFBc0MsWUFBWTtBQUM5Q1osSUFBQUEsQ0FBQyxDQUFDLHNCQUFELENBQUQsQ0FBMEJHLFdBQTFCLENBQXNDLFFBQXRDO0FBQ0FILElBQUFBLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUUMsUUFBUixDQUFpQixRQUFqQjs7QUFFQSxZQUFRRCxDQUFDLENBQUMsSUFBRCxDQUFELENBQVFjLElBQVIsQ0FBYSxlQUFiLENBQVI7QUFDSSxXQUFLLEtBQUw7QUFDSWYsUUFBQUEsR0FBRztBQUNIOztBQUNKLFdBQUssTUFBTDtBQUNJRyxRQUFBQSxJQUFJO0FBQ0o7QUFOUjs7QUFRQUcsSUFBQUEsV0FBVztBQUNkLEdBYkQ7QUFjSCxDQXJCQSxDQUFEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2FkbWluL2NhdGFsb2cvcGljdHVlcy1tYXNzLWVkaXQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gYWxsKCkge1xuICAgICQoJy5waWN0dXJlLWNhcmQnKS5hZGRDbGFzcygnc2VsZWN0ZWQnKTtcbn1cblxuZnVuY3Rpb24gbm9uZSgpIHtcbiAgICAkKCcucGljdHVyZS1jYXJkJykucmVtb3ZlQ2xhc3MoJ3NlbGVjdGVkJyk7XG59XG5cbmZ1bmN0aW9uIGN1c3RvbSgpIHtcbiAgICAkKCdbZGF0YS1idXR0b24tYWN0aW9uXScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAkKCdbZGF0YS1idXR0b24tYWN0aW9uPVwiY3VzdG9tXCJdJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xufVxuXG5mdW5jdGlvbiByZWZyZXNoZm9ybSgpIHtcbiAgICAkKCcjcGljdHVyZV9tYXNzX2VkaXRfcGljdHVyZXMgb3B0aW9uJykucHJvcChcInNlbGVjdGVkXCIsIGZhbHNlKVxuICAgICQuZWFjaCgkKCcucGljdHVyZS1jYXJkLnNlbGVjdGVkJyksIGZ1bmN0aW9uIChrZXksIGl0ZW0pIHtcbiAgICAgICAgbGV0IHBpY3R1cmVJRCA9ICQoaXRlbSkuYXR0cignaWQnKTtcbiAgICAgICAgJChgI3BpY3R1cmVfbWFzc19lZGl0X3BpY3R1cmVzIG9wdGlvblt2YWx1ZT1cIiR7cGljdHVyZUlEfVwiXWApLnByb3AoXCJzZWxlY3RlZFwiLCB0cnVlKVxuICAgIH0pXG59XG5cbiQoZnVuY3Rpb24gKCkge1xuICAgICQoJy5waWN0dXJlLWNhcmQnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ3NlbGVjdGVkJyk7XG4gICAgICAgIHJlZnJlc2hmb3JtKCk7XG4gICAgICAgIGN1c3RvbSgpO1xuICAgIH0pXG5cbiAgICAkKCdbZGF0YS1idXR0b24tYWN0aW9uXScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCgnW2RhdGEtYnV0dG9uLWFjdGlvbl0nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXG4gICAgICAgIHN3aXRjaCAoJCh0aGlzKS5kYXRhKCdidXR0b24tYWN0aW9uJykpIHtcbiAgICAgICAgICAgIGNhc2UgJ2FsbCc6XG4gICAgICAgICAgICAgICAgYWxsKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdub25lJzpcbiAgICAgICAgICAgICAgICBub25lKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgcmVmcmVzaGZvcm0oKTtcbiAgICB9KVxufSlcblxuIl0sIm5hbWVzIjpbImFsbCIsIiQiLCJhZGRDbGFzcyIsIm5vbmUiLCJyZW1vdmVDbGFzcyIsImN1c3RvbSIsInJlZnJlc2hmb3JtIiwicHJvcCIsImVhY2giLCJrZXkiLCJpdGVtIiwicGljdHVyZUlEIiwiYXR0ciIsIm9uIiwidG9nZ2xlQ2xhc3MiLCJkYXRhIl0sInNvdXJjZVJvb3QiOiIifQ==