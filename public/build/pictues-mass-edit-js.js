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

function filterAll() {
  $('.picture-card').closest('.col-md-4').css('display', 'block');
  $('[data-button-filter]').removeClass('active');
  $('[data-button-filter="all"]').addClass('active');
}

function filterSelected() {
  $('.picture-card.selected').closest('.col-md-4').css('display', 'block');
  $('.picture-card:not(.selected)').closest('.col-md-4').css('display', 'none');
}

function filterNotselected() {
  $('.picture-card.selected').closest('.col-md-4').css('display', 'none');
  $('.picture-card:not(.selected)').closest('.col-md-4').css('display', 'block');
}

$(function () {
  $('.picture-card').on('click', function () {
    $(this).toggleClass('selected');
    refreshform();
    custom(); // filterAll();
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
  $('[data-button-filter]').on('click', function () {
    $('[data-button-filter]').removeClass('active');
    $(this).addClass('active');

    switch ($(this).data('button-filter')) {
      case 'all':
        filterAll();
        break;

      case 'selected':
        filterSelected();
        break;

      case 'notselected':
        filterNotselected();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUQsQ0FBMEJHLFdBQTFCLENBQXNDLFFBQXRDO0FBQ0FILElBQUFBLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUUMsUUFBUixDQUFpQixRQUFqQjs7QUFFQSxZQUFRRCxDQUFDLENBQUMsSUFBRCxDQUFELENBQVFxQixJQUFSLENBQWEsZUFBYixDQUFSO0FBQ0ksV0FBSyxLQUFMO0FBQ0l0QixRQUFBQSxHQUFHO0FBQ0g7O0FBQ0osV0FBSyxNQUFMO0FBQ0lHLFFBQUFBLElBQUk7QUFDSjtBQU5SOztBQVFBRyxJQUFBQSxXQUFXO0FBQ2QsR0FiRDtBQWVBTCxFQUFBQSxDQUFDLENBQUMsc0JBQUQsQ0FBRCxDQUEwQm1CLEVBQTFCLENBQTZCLE9BQTdCLEVBQXNDLFlBQVk7QUFDOUNuQixJQUFBQSxDQUFDLENBQUMsc0JBQUQsQ0FBRCxDQUEwQkcsV0FBMUIsQ0FBc0MsUUFBdEM7QUFDQUgsSUFBQUEsQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRQyxRQUFSLENBQWlCLFFBQWpCOztBQUVBLFlBQVFELENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUXFCLElBQVIsQ0FBYSxlQUFiLENBQVI7QUFDSSxXQUFLLEtBQUw7QUFDSVAsUUFBQUEsU0FBUztBQUNUOztBQUNKLFdBQUssVUFBTDtBQUNJRyxRQUFBQSxjQUFjO0FBQ2Q7O0FBQ0osV0FBSyxhQUFMO0FBQ0lDLFFBQUFBLGlCQUFpQjtBQUNqQjtBQVRSOztBQVdBYixJQUFBQSxXQUFXO0FBQ2QsR0FoQkQ7QUFpQkgsQ0F4Q0EsQ0FBRCIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2Fzc2V0cy9hZG1pbi9jYXRhbG9nL3BpY3R1ZXMtbWFzcy1lZGl0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGFsbCgpIHtcbiAgICAkKCcucGljdHVyZS1jYXJkJykuYWRkQ2xhc3MoJ3NlbGVjdGVkJyk7XG59XG5cbmZ1bmN0aW9uIG5vbmUoKSB7XG4gICAgJCgnLnBpY3R1cmUtY2FyZCcpLnJlbW92ZUNsYXNzKCdzZWxlY3RlZCcpO1xufVxuXG5mdW5jdGlvbiBjdXN0b20oKSB7XG4gICAgJCgnW2RhdGEtYnV0dG9uLWFjdGlvbl0nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgJCgnW2RhdGEtYnV0dG9uLWFjdGlvbj1cImN1c3RvbVwiXScpLmFkZENsYXNzKCdhY3RpdmUnKTtcbn1cblxuZnVuY3Rpb24gcmVmcmVzaGZvcm0oKSB7XG4gICAgJCgnI3BpY3R1cmVfbWFzc19lZGl0X3BpY3R1cmVzIG9wdGlvbicpLnByb3AoXCJzZWxlY3RlZFwiLCBmYWxzZSlcbiAgICAkLmVhY2goJCgnLnBpY3R1cmUtY2FyZC5zZWxlY3RlZCcpLCBmdW5jdGlvbiAoa2V5LCBpdGVtKSB7XG4gICAgICAgIGxldCBwaWN0dXJlSUQgPSAkKGl0ZW0pLmF0dHIoJ2lkJyk7XG4gICAgICAgICQoYCNwaWN0dXJlX21hc3NfZWRpdF9waWN0dXJlcyBvcHRpb25bdmFsdWU9XCIke3BpY3R1cmVJRH1cIl1gKS5wcm9wKFwic2VsZWN0ZWRcIiwgdHJ1ZSlcbiAgICB9KVxuICAgICQoJyNuYi1waWN0dXJlcy10by1lZGl0JykuaHRtbCgkKCcucGljdHVyZS1jYXJkLnNlbGVjdGVkJykubGVuZ3RoKVxufVxuXG5cbmZ1bmN0aW9uIGZpbHRlckFsbCgpIHtcbiAgICAkKCcucGljdHVyZS1jYXJkJykuY2xvc2VzdCgnLmNvbC1tZC00JykuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgJCgnW2RhdGEtYnV0dG9uLWZpbHRlcl0nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgJCgnW2RhdGEtYnV0dG9uLWZpbHRlcj1cImFsbFwiXScpLmFkZENsYXNzKCdhY3RpdmUnKTtcbn1cblxuZnVuY3Rpb24gZmlsdGVyU2VsZWN0ZWQoKSB7XG4gICAgJCgnLnBpY3R1cmUtY2FyZC5zZWxlY3RlZCcpLmNsb3Nlc3QoJy5jb2wtbWQtNCcpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xuICAgICQoJy5waWN0dXJlLWNhcmQ6bm90KC5zZWxlY3RlZCknKS5jbG9zZXN0KCcuY29sLW1kLTQnKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xufVxuXG5mdW5jdGlvbiBmaWx0ZXJOb3RzZWxlY3RlZCgpIHtcbiAgICAkKCcucGljdHVyZS1jYXJkLnNlbGVjdGVkJykuY2xvc2VzdCgnLmNvbC1tZC00JykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAkKCcucGljdHVyZS1jYXJkOm5vdCguc2VsZWN0ZWQpJykuY2xvc2VzdCgnLmNvbC1tZC00JykuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG59XG5cbiQoZnVuY3Rpb24gKCkge1xuICAgICQoJy5waWN0dXJlLWNhcmQnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ3NlbGVjdGVkJyk7XG4gICAgICAgIHJlZnJlc2hmb3JtKCk7XG4gICAgICAgIGN1c3RvbSgpO1xuICAgICAgICAvLyBmaWx0ZXJBbGwoKTtcbiAgICB9KVxuXG4gICAgJCgnW2RhdGEtYnV0dG9uLWFjdGlvbl0nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoJ1tkYXRhLWJ1dHRvbi1hY3Rpb25dJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKTtcblxuICAgICAgICBzd2l0Y2ggKCQodGhpcykuZGF0YSgnYnV0dG9uLWFjdGlvbicpKSB7XG4gICAgICAgICAgICBjYXNlICdhbGwnOlxuICAgICAgICAgICAgICAgIGFsbCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnbm9uZSc6XG4gICAgICAgICAgICAgICAgbm9uZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHJlZnJlc2hmb3JtKCk7XG4gICAgfSlcblxuICAgICQoJ1tkYXRhLWJ1dHRvbi1maWx0ZXJdJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAkKCdbZGF0YS1idXR0b24tZmlsdGVyXScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XG5cbiAgICAgICAgc3dpdGNoICgkKHRoaXMpLmRhdGEoJ2J1dHRvbi1maWx0ZXInKSkge1xuICAgICAgICAgICAgY2FzZSAnYWxsJzpcbiAgICAgICAgICAgICAgICBmaWx0ZXJBbGwoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3NlbGVjdGVkJzpcbiAgICAgICAgICAgICAgICBmaWx0ZXJTZWxlY3RlZCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnbm90c2VsZWN0ZWQnOlxuICAgICAgICAgICAgICAgIGZpbHRlck5vdHNlbGVjdGVkKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgcmVmcmVzaGZvcm0oKTtcbiAgICB9KVxufSlcblxuIl0sIm5hbWVzIjpbImFsbCIsIiQiLCJhZGRDbGFzcyIsIm5vbmUiLCJyZW1vdmVDbGFzcyIsImN1c3RvbSIsInJlZnJlc2hmb3JtIiwicHJvcCIsImVhY2giLCJrZXkiLCJpdGVtIiwicGljdHVyZUlEIiwiYXR0ciIsImh0bWwiLCJsZW5ndGgiLCJmaWx0ZXJBbGwiLCJjbG9zZXN0IiwiY3NzIiwiZmlsdGVyU2VsZWN0ZWQiLCJmaWx0ZXJOb3RzZWxlY3RlZCIsIm9uIiwidG9nZ2xlQ2xhc3MiLCJkYXRhIl0sInNvdXJjZVJvb3QiOiIifQ==