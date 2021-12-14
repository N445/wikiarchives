(self["webpackChunk"] = self["webpackChunk"] || []).push([["pictues-mass-edit-js"],{

/***/ "./assets/admin/catalog/pictues-mass-edit.js":
/*!***************************************************!*\
  !*** ./assets/admin/catalog/pictues-mass-edit.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
__webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");

__webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");

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

var previousSelected = null;
$(function () {
  $('.picture-card').on('click', function (e) {
    var clickedCard = $(this);
    clickedCard.addClass('multi-selected');
    clickedCard.toggleClass('selected');
    var isSelected = clickedCard.hasClass('selected');

    if (e.shiftKey) {
      var parentCol = clickedCard.closest('.picture-card-col');

      if (null === previousSelected) {
        parentCol.find('.picture-card').addClass('multi-selected');
        previousSelected = parentCol;
      } else {
        var cardsToChange = previousSelected.nextUntil(parentCol).find('.picture-card');
        cardsToChange.addClass('multi-selected');

        if (isSelected) {
          cardsToChange.addClass('selected');
        } else {
          cardsToChange.removeClass('selected');
        }

        previousSelected = null;
        parentCol.find('.picture-card').removeClass('multi-selected');
      }
    } else {
      $('.picture-card').removeClass('multi-selected');
      previousSelected = null;
    }

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

/***/ }),

/***/ "./node_modules/core-js/modules/es.array.find.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.find.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var $find = (__webpack_require__(/*! ../internals/array-iteration */ "./node_modules/core-js/internals/array-iteration.js").find);
var addToUnscopables = __webpack_require__(/*! ../internals/add-to-unscopables */ "./node_modules/core-js/internals/add-to-unscopables.js");

var FIND = 'find';
var SKIPS_HOLES = true;

// Shouldn't skip holes
if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

// `Array.prototype.find` method
// https://tc39.es/ecma262/#sec-array.prototype.find
$({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables(FIND);


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_jquery_dist_jquery_js","vendors-node_modules_core-js_internals_export_js","vendors-node_modules_core-js_internals_add-to-unscopables_js-node_modules_core-js_internals_a-464164"], () => (__webpack_exec__("./assets/admin/catalog/pictues-mass-edit.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGljdHVlcy1tYXNzLWVkaXQtanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLFNBQVNBLEdBQVQsR0FBZTtBQUNYQyxFQUFBQSxDQUFDLENBQUMsZUFBRCxDQUFELENBQW1CQyxRQUFuQixDQUE0QixVQUE1QjtBQUNIOztBQUVELFNBQVNDLElBQVQsR0FBZ0I7QUFDWkYsRUFBQUEsQ0FBQyxDQUFDLGVBQUQsQ0FBRCxDQUFtQkcsV0FBbkIsQ0FBK0IsVUFBL0I7QUFDSDs7QUFFRCxTQUFTQyxNQUFULEdBQWtCO0FBQ2RKLEVBQUFBLENBQUMsQ0FBQyxzQkFBRCxDQUFELENBQTBCRyxXQUExQixDQUFzQyxRQUF0QztBQUNBSCxFQUFBQSxDQUFDLENBQUMsK0JBQUQsQ0FBRCxDQUFtQ0MsUUFBbkMsQ0FBNEMsUUFBNUM7QUFDSDs7QUFFRCxTQUFTSSxXQUFULEdBQXVCO0FBQ25CTCxFQUFBQSxDQUFDLENBQUMsb0NBQUQsQ0FBRCxDQUF3Q00sSUFBeEMsQ0FBNkMsVUFBN0MsRUFBeUQsS0FBekQ7QUFDQU4sRUFBQUEsQ0FBQyxDQUFDTyxJQUFGLENBQU9QLENBQUMsQ0FBQyx3QkFBRCxDQUFSLEVBQW9DLFVBQVVRLEdBQVYsRUFBZUMsSUFBZixFQUFxQjtBQUNyRCxRQUFJQyxTQUFTLEdBQUdWLENBQUMsQ0FBQ1MsSUFBRCxDQUFELENBQVFFLElBQVIsQ0FBYSxJQUFiLENBQWhCO0FBQ0FYLElBQUFBLENBQUMsc0RBQThDVSxTQUE5QyxTQUFELENBQThESixJQUE5RCxDQUFtRSxVQUFuRSxFQUErRSxJQUEvRTtBQUNILEdBSEQ7QUFJQU4sRUFBQUEsQ0FBQyxDQUFDLHNCQUFELENBQUQsQ0FBMEJZLElBQTFCLENBQStCWixDQUFDLENBQUMsd0JBQUQsQ0FBRCxDQUE0QmEsTUFBM0Q7QUFDSDs7QUFHRCxTQUFTQyxTQUFULEdBQXFCO0FBQ2pCZCxFQUFBQSxDQUFDLENBQUMsZUFBRCxDQUFELENBQW1CZSxPQUFuQixDQUEyQixXQUEzQixFQUF3Q0MsR0FBeEMsQ0FBNEMsU0FBNUMsRUFBdUQsT0FBdkQ7QUFDQWhCLEVBQUFBLENBQUMsQ0FBQyxzQkFBRCxDQUFELENBQTBCRyxXQUExQixDQUFzQyxRQUF0QztBQUNBSCxFQUFBQSxDQUFDLENBQUMsNEJBQUQsQ0FBRCxDQUFnQ0MsUUFBaEMsQ0FBeUMsUUFBekM7QUFDSDs7QUFFRCxTQUFTZ0IsY0FBVCxHQUEwQjtBQUN0QmpCLEVBQUFBLENBQUMsQ0FBQyx3QkFBRCxDQUFELENBQTRCZSxPQUE1QixDQUFvQyxXQUFwQyxFQUFpREMsR0FBakQsQ0FBcUQsU0FBckQsRUFBZ0UsT0FBaEU7QUFDQWhCLEVBQUFBLENBQUMsQ0FBQyw4QkFBRCxDQUFELENBQWtDZSxPQUFsQyxDQUEwQyxXQUExQyxFQUF1REMsR0FBdkQsQ0FBMkQsU0FBM0QsRUFBc0UsTUFBdEU7QUFDSDs7QUFFRCxTQUFTRSxpQkFBVCxHQUE2QjtBQUN6QmxCLEVBQUFBLENBQUMsQ0FBQyx3QkFBRCxDQUFELENBQTRCZSxPQUE1QixDQUFvQyxXQUFwQyxFQUFpREMsR0FBakQsQ0FBcUQsU0FBckQsRUFBZ0UsTUFBaEU7QUFDQWhCLEVBQUFBLENBQUMsQ0FBQyw4QkFBRCxDQUFELENBQWtDZSxPQUFsQyxDQUEwQyxXQUExQyxFQUF1REMsR0FBdkQsQ0FBMkQsU0FBM0QsRUFBc0UsT0FBdEU7QUFDSDs7QUFFRCxJQUFJRyxnQkFBZ0IsR0FBRyxJQUF2QjtBQUVBbkIsQ0FBQyxDQUFDLFlBQVk7QUFDVkEsRUFBQUEsQ0FBQyxDQUFDLGVBQUQsQ0FBRCxDQUFtQm9CLEVBQW5CLENBQXNCLE9BQXRCLEVBQStCLFVBQVVDLENBQVYsRUFBYTtBQUN4QyxRQUFJQyxXQUFXLEdBQUd0QixDQUFDLENBQUMsSUFBRCxDQUFuQjtBQUNBc0IsSUFBQUEsV0FBVyxDQUFDckIsUUFBWixDQUFxQixnQkFBckI7QUFFQXFCLElBQUFBLFdBQVcsQ0FBQ0MsV0FBWixDQUF3QixVQUF4QjtBQUNBLFFBQUlDLFVBQVUsR0FBR0YsV0FBVyxDQUFDRyxRQUFaLENBQXFCLFVBQXJCLENBQWpCOztBQUVBLFFBQUlKLENBQUMsQ0FBQ0ssUUFBTixFQUFnQjtBQUNaLFVBQUlDLFNBQVMsR0FBR0wsV0FBVyxDQUFDUCxPQUFaLENBQW9CLG1CQUFwQixDQUFoQjs7QUFDQSxVQUFJLFNBQVNJLGdCQUFiLEVBQStCO0FBQzNCUSxRQUFBQSxTQUFTLENBQUNDLElBQVYsQ0FBZSxlQUFmLEVBQWdDM0IsUUFBaEMsQ0FBeUMsZ0JBQXpDO0FBQ0FrQixRQUFBQSxnQkFBZ0IsR0FBR1EsU0FBbkI7QUFDSCxPQUhELE1BR087QUFDSCxZQUFJRSxhQUFhLEdBQUdWLGdCQUFnQixDQUFDVyxTQUFqQixDQUEyQkgsU0FBM0IsRUFBc0NDLElBQXRDLENBQTJDLGVBQTNDLENBQXBCO0FBQ0FDLFFBQUFBLGFBQWEsQ0FBQzVCLFFBQWQsQ0FBdUIsZ0JBQXZCOztBQUNBLFlBQUd1QixVQUFILEVBQWM7QUFDVkssVUFBQUEsYUFBYSxDQUFDNUIsUUFBZCxDQUF1QixVQUF2QjtBQUNILFNBRkQsTUFFSztBQUNENEIsVUFBQUEsYUFBYSxDQUFDMUIsV0FBZCxDQUEwQixVQUExQjtBQUNIOztBQUNEZ0IsUUFBQUEsZ0JBQWdCLEdBQUcsSUFBbkI7QUFDQVEsUUFBQUEsU0FBUyxDQUFDQyxJQUFWLENBQWUsZUFBZixFQUFnQ3pCLFdBQWhDLENBQTRDLGdCQUE1QztBQUNIO0FBQ0osS0FoQkQsTUFnQk87QUFDSEgsTUFBQUEsQ0FBQyxDQUFDLGVBQUQsQ0FBRCxDQUFtQkcsV0FBbkIsQ0FBK0IsZ0JBQS9CO0FBQ0FnQixNQUFBQSxnQkFBZ0IsR0FBRyxJQUFuQjtBQUNIOztBQUNEZCxJQUFBQSxXQUFXO0FBQ1hELElBQUFBLE1BQU0sR0E1QmtDLENBNkJ4QztBQUNILEdBOUJEO0FBZ0NBSixFQUFBQSxDQUFDLENBQUMsc0JBQUQsQ0FBRCxDQUEwQm9CLEVBQTFCLENBQTZCLE9BQTdCLEVBQXNDLFlBQVk7QUFDOUNwQixJQUFBQSxDQUFDLENBQUMsc0JBQUQsQ0FBRCxDQUEwQkcsV0FBMUIsQ0FBc0MsUUFBdEM7QUFDQUgsSUFBQUEsQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRQyxRQUFSLENBQWlCLFFBQWpCOztBQUVBLFlBQVFELENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUStCLElBQVIsQ0FBYSxlQUFiLENBQVI7QUFDSSxXQUFLLEtBQUw7QUFDSWhDLFFBQUFBLEdBQUc7QUFDSDs7QUFDSixXQUFLLE1BQUw7QUFDSUcsUUFBQUEsSUFBSTtBQUNKO0FBTlI7O0FBUUFHLElBQUFBLFdBQVc7QUFDZCxHQWJEO0FBZUFMLEVBQUFBLENBQUMsQ0FBQyxzQkFBRCxDQUFELENBQTBCb0IsRUFBMUIsQ0FBNkIsT0FBN0IsRUFBc0MsWUFBWTtBQUM5Q3BCLElBQUFBLENBQUMsQ0FBQyxzQkFBRCxDQUFELENBQTBCRyxXQUExQixDQUFzQyxRQUF0QztBQUNBSCxJQUFBQSxDQUFDLENBQUMsSUFBRCxDQUFELENBQVFDLFFBQVIsQ0FBaUIsUUFBakI7O0FBRUEsWUFBUUQsQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRK0IsSUFBUixDQUFhLGVBQWIsQ0FBUjtBQUNJLFdBQUssS0FBTDtBQUNJakIsUUFBQUEsU0FBUztBQUNUOztBQUNKLFdBQUssVUFBTDtBQUNJRyxRQUFBQSxjQUFjO0FBQ2Q7O0FBQ0osV0FBSyxhQUFMO0FBQ0lDLFFBQUFBLGlCQUFpQjtBQUNqQjtBQVRSOztBQVdBYixJQUFBQSxXQUFXO0FBQ2QsR0FoQkQ7QUFpQkgsQ0FqRUEsQ0FBRDs7Ozs7Ozs7Ozs7QUN6Q2E7QUFDYixRQUFRLG1CQUFPLENBQUMsdUVBQXFCO0FBQ3JDLFlBQVkscUhBQTRDO0FBQ3hELHVCQUF1QixtQkFBTyxDQUFDLCtGQUFpQzs7QUFFaEU7QUFDQTs7QUFFQTtBQUNBLDZDQUE2QyxzQkFBc0I7O0FBRW5FO0FBQ0E7QUFDQSxJQUFJLG1EQUFtRDtBQUN2RDtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvYWRtaW4vY2F0YWxvZy9waWN0dWVzLW1hc3MtZWRpdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLmFycmF5LmZpbmQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gYWxsKCkge1xuICAgICQoJy5waWN0dXJlLWNhcmQnKS5hZGRDbGFzcygnc2VsZWN0ZWQnKTtcbn1cblxuZnVuY3Rpb24gbm9uZSgpIHtcbiAgICAkKCcucGljdHVyZS1jYXJkJykucmVtb3ZlQ2xhc3MoJ3NlbGVjdGVkJyk7XG59XG5cbmZ1bmN0aW9uIGN1c3RvbSgpIHtcbiAgICAkKCdbZGF0YS1idXR0b24tYWN0aW9uXScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAkKCdbZGF0YS1idXR0b24tYWN0aW9uPVwiY3VzdG9tXCJdJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xufVxuXG5mdW5jdGlvbiByZWZyZXNoZm9ybSgpIHtcbiAgICAkKCcjcGljdHVyZV9tYXNzX2VkaXRfcGljdHVyZXMgb3B0aW9uJykucHJvcChcInNlbGVjdGVkXCIsIGZhbHNlKVxuICAgICQuZWFjaCgkKCcucGljdHVyZS1jYXJkLnNlbGVjdGVkJyksIGZ1bmN0aW9uIChrZXksIGl0ZW0pIHtcbiAgICAgICAgbGV0IHBpY3R1cmVJRCA9ICQoaXRlbSkuYXR0cignaWQnKTtcbiAgICAgICAgJChgI3BpY3R1cmVfbWFzc19lZGl0X3BpY3R1cmVzIG9wdGlvblt2YWx1ZT1cIiR7cGljdHVyZUlEfVwiXWApLnByb3AoXCJzZWxlY3RlZFwiLCB0cnVlKVxuICAgIH0pXG4gICAgJCgnI25iLXBpY3R1cmVzLXRvLWVkaXQnKS5odG1sKCQoJy5waWN0dXJlLWNhcmQuc2VsZWN0ZWQnKS5sZW5ndGgpXG59XG5cblxuZnVuY3Rpb24gZmlsdGVyQWxsKCkge1xuICAgICQoJy5waWN0dXJlLWNhcmQnKS5jbG9zZXN0KCcuY29sLW1kLTQnKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgICAkKCdbZGF0YS1idXR0b24tZmlsdGVyXScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAkKCdbZGF0YS1idXR0b24tZmlsdGVyPVwiYWxsXCJdJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xufVxuXG5mdW5jdGlvbiBmaWx0ZXJTZWxlY3RlZCgpIHtcbiAgICAkKCcucGljdHVyZS1jYXJkLnNlbGVjdGVkJykuY2xvc2VzdCgnLmNvbC1tZC00JykuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgJCgnLnBpY3R1cmUtY2FyZDpub3QoLnNlbGVjdGVkKScpLmNsb3Nlc3QoJy5jb2wtbWQtNCcpLmNzcygnZGlzcGxheScsICdub25lJyk7XG59XG5cbmZ1bmN0aW9uIGZpbHRlck5vdHNlbGVjdGVkKCkge1xuICAgICQoJy5waWN0dXJlLWNhcmQuc2VsZWN0ZWQnKS5jbG9zZXN0KCcuY29sLW1kLTQnKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICQoJy5waWN0dXJlLWNhcmQ6bm90KC5zZWxlY3RlZCknKS5jbG9zZXN0KCcuY29sLW1kLTQnKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcbn1cblxubGV0IHByZXZpb3VzU2VsZWN0ZWQgPSBudWxsO1xuXG4kKGZ1bmN0aW9uICgpIHtcbiAgICAkKCcucGljdHVyZS1jYXJkJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgbGV0IGNsaWNrZWRDYXJkID0gJCh0aGlzKTtcbiAgICAgICAgY2xpY2tlZENhcmQuYWRkQ2xhc3MoJ211bHRpLXNlbGVjdGVkJyk7XG5cbiAgICAgICAgY2xpY2tlZENhcmQudG9nZ2xlQ2xhc3MoJ3NlbGVjdGVkJyk7XG4gICAgICAgIGxldCBpc1NlbGVjdGVkID0gY2xpY2tlZENhcmQuaGFzQ2xhc3MoJ3NlbGVjdGVkJyk7XG5cbiAgICAgICAgaWYgKGUuc2hpZnRLZXkpIHtcbiAgICAgICAgICAgIGxldCBwYXJlbnRDb2wgPSBjbGlja2VkQ2FyZC5jbG9zZXN0KCcucGljdHVyZS1jYXJkLWNvbCcpO1xuICAgICAgICAgICAgaWYgKG51bGwgPT09IHByZXZpb3VzU2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICBwYXJlbnRDb2wuZmluZCgnLnBpY3R1cmUtY2FyZCcpLmFkZENsYXNzKCdtdWx0aS1zZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgIHByZXZpb3VzU2VsZWN0ZWQgPSBwYXJlbnRDb2w7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCBjYXJkc1RvQ2hhbmdlID0gcHJldmlvdXNTZWxlY3RlZC5uZXh0VW50aWwocGFyZW50Q29sKS5maW5kKCcucGljdHVyZS1jYXJkJyk7XG4gICAgICAgICAgICAgICAgY2FyZHNUb0NoYW5nZS5hZGRDbGFzcygnbXVsdGktc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICBpZihpc1NlbGVjdGVkKXtcbiAgICAgICAgICAgICAgICAgICAgY2FyZHNUb0NoYW5nZS5hZGRDbGFzcygnc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgY2FyZHNUb0NoYW5nZS5yZW1vdmVDbGFzcygnc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcHJldmlvdXNTZWxlY3RlZCA9IG51bGw7XG4gICAgICAgICAgICAgICAgcGFyZW50Q29sLmZpbmQoJy5waWN0dXJlLWNhcmQnKS5yZW1vdmVDbGFzcygnbXVsdGktc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoJy5waWN0dXJlLWNhcmQnKS5yZW1vdmVDbGFzcygnbXVsdGktc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgIHByZXZpb3VzU2VsZWN0ZWQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJlZnJlc2hmb3JtKCk7XG4gICAgICAgIGN1c3RvbSgpO1xuICAgICAgICAvLyBmaWx0ZXJBbGwoKTtcbiAgICB9KVxuXG4gICAgJCgnW2RhdGEtYnV0dG9uLWFjdGlvbl0nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoJ1tkYXRhLWJ1dHRvbi1hY3Rpb25dJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKTtcblxuICAgICAgICBzd2l0Y2ggKCQodGhpcykuZGF0YSgnYnV0dG9uLWFjdGlvbicpKSB7XG4gICAgICAgICAgICBjYXNlICdhbGwnOlxuICAgICAgICAgICAgICAgIGFsbCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnbm9uZSc6XG4gICAgICAgICAgICAgICAgbm9uZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHJlZnJlc2hmb3JtKCk7XG4gICAgfSlcblxuICAgICQoJ1tkYXRhLWJ1dHRvbi1maWx0ZXJdJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAkKCdbZGF0YS1idXR0b24tZmlsdGVyXScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XG5cbiAgICAgICAgc3dpdGNoICgkKHRoaXMpLmRhdGEoJ2J1dHRvbi1maWx0ZXInKSkge1xuICAgICAgICAgICAgY2FzZSAnYWxsJzpcbiAgICAgICAgICAgICAgICBmaWx0ZXJBbGwoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3NlbGVjdGVkJzpcbiAgICAgICAgICAgICAgICBmaWx0ZXJTZWxlY3RlZCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnbm90c2VsZWN0ZWQnOlxuICAgICAgICAgICAgICAgIGZpbHRlck5vdHNlbGVjdGVkKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgcmVmcmVzaGZvcm0oKTtcbiAgICB9KVxufSlcblxuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgJGZpbmQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktaXRlcmF0aW9uJykuZmluZDtcbnZhciBhZGRUb1Vuc2NvcGFibGVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FkZC10by11bnNjb3BhYmxlcycpO1xuXG52YXIgRklORCA9ICdmaW5kJztcbnZhciBTS0lQU19IT0xFUyA9IHRydWU7XG5cbi8vIFNob3VsZG4ndCBza2lwIGhvbGVzXG5pZiAoRklORCBpbiBbXSkgQXJyYXkoMSlbRklORF0oZnVuY3Rpb24gKCkgeyBTS0lQU19IT0xFUyA9IGZhbHNlOyB9KTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5maW5kYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmZpbmRcbiQoeyB0YXJnZXQ6ICdBcnJheScsIHByb3RvOiB0cnVlLCBmb3JjZWQ6IFNLSVBTX0hPTEVTIH0sIHtcbiAgZmluZDogZnVuY3Rpb24gZmluZChjYWxsYmFja2ZuIC8qICwgdGhhdCA9IHVuZGVmaW5lZCAqLykge1xuICAgIHJldHVybiAkZmluZCh0aGlzLCBjYWxsYmFja2ZuLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCk7XG4gIH1cbn0pO1xuXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS1AQHVuc2NvcGFibGVzXG5hZGRUb1Vuc2NvcGFibGVzKEZJTkQpO1xuIl0sIm5hbWVzIjpbImFsbCIsIiQiLCJhZGRDbGFzcyIsIm5vbmUiLCJyZW1vdmVDbGFzcyIsImN1c3RvbSIsInJlZnJlc2hmb3JtIiwicHJvcCIsImVhY2giLCJrZXkiLCJpdGVtIiwicGljdHVyZUlEIiwiYXR0ciIsImh0bWwiLCJsZW5ndGgiLCJmaWx0ZXJBbGwiLCJjbG9zZXN0IiwiY3NzIiwiZmlsdGVyU2VsZWN0ZWQiLCJmaWx0ZXJOb3RzZWxlY3RlZCIsInByZXZpb3VzU2VsZWN0ZWQiLCJvbiIsImUiLCJjbGlja2VkQ2FyZCIsInRvZ2dsZUNsYXNzIiwiaXNTZWxlY3RlZCIsImhhc0NsYXNzIiwic2hpZnRLZXkiLCJwYXJlbnRDb2wiLCJmaW5kIiwiY2FyZHNUb0NoYW5nZSIsIm5leHRVbnRpbCIsImRhdGEiXSwic291cmNlUm9vdCI6IiJ9