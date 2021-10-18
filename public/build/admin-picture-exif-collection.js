(self["webpackChunk"] = self["webpackChunk"] || []).push([["admin-picture-exif-collection"],{

/***/ "./assets/admin/catalog/picture-exif-collection.js":
/*!*********************************************************!*\
  !*** ./assets/admin/catalog/picture-exif-collection.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var jQuery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
__webpack_require__(/*! core-js/modules/es.array.for-each.js */ "./node_modules/core-js/modules/es.array.for-each.js");

__webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");

__webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");

__webpack_require__(/*! core-js/modules/es.string.replace.js */ "./node_modules/core-js/modules/es.string.replace.js");

__webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");

// add-collection-widget.js
jQuery(document).ready(function () {
  var tags = document.querySelectorAll('.exif-row');
  tags.forEach(function (tag) {
    addDeleteEventForRow($(tag));
    addTypeEventForRow($(tag));
  });
  jQuery('.add-another-collection-widget').click(function (e) {
    var list = jQuery(jQuery(this).attr('data-list-selector')); // Try to find the counter of the list or use the length of the list

    var counter = list.data('widget-counter') || list.children().length; // grab the prototype template

    var newWidget = list.attr('data-prototype'); // replace the "__name__" used in the id and name of the prototype
    // with a number that's unique to your emails
    // end name attribute looks like name="contact[emails][2]"

    newWidget = newWidget.replace(/__name__/g, counter); // Increase the counter

    counter++; // And store it, the length cannot be used if deleting widgets is allowed

    list.data('widget-counter', counter); // create a new list element and add it to the list

    var newElem = jQuery(list.attr('data-widget-tags')).html(newWidget);
    addDeleteEventForRow(newElem);
    addTypeEventForRow(newElem);
    newElem.appendTo(list);
  });
});

function addDeleteEventForRow(tag) {
  tag.find('.delete-collection-widget').on('click', function () {
    tag.remove();
  });
}

function addTypeEventForRow(tag) {
  tag.find('.type').on('change', function () {
    if ($(this).val() === 'string') {
      tag.find('.value').attr('type', 'string');
    }

    if ($(this).val() === 'DateTime') {
      tag.find('.value').attr('type', 'date');
    }
  });
}

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_jquery_dist_jquery_js","vendors-node_modules_core-js_modules_es_array_find_js","vendors-node_modules_core-js_modules_es_array_for-each_js-node_modules_core-js_modules_es_str-cc3808"], () => (__webpack_exec__("./assets/admin/catalog/picture-exif-collection.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRtaW4tcGljdHVyZS1leGlmLWNvbGxlY3Rpb24uanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBQSxNQUFNLENBQUNDLFFBQUQsQ0FBTixDQUFpQkMsS0FBakIsQ0FBdUIsWUFBWTtBQUUvQixNQUFNQyxJQUFJLEdBQUdGLFFBQVEsQ0FBQ0csZ0JBQVQsQ0FBMEIsV0FBMUIsQ0FBYjtBQUNBRCxFQUFBQSxJQUFJLENBQUNFLE9BQUwsQ0FBYSxVQUFDQyxHQUFELEVBQVM7QUFDbEJDLElBQUFBLG9CQUFvQixDQUFDQyxDQUFDLENBQUNGLEdBQUQsQ0FBRixDQUFwQjtBQUNBRyxJQUFBQSxrQkFBa0IsQ0FBQ0QsQ0FBQyxDQUFDRixHQUFELENBQUYsQ0FBbEI7QUFDSCxHQUhEO0FBTUFOLEVBQUFBLE1BQU0sQ0FBQyxnQ0FBRCxDQUFOLENBQXlDVSxLQUF6QyxDQUErQyxVQUFVQyxDQUFWLEVBQWE7QUFDeEQsUUFBSUMsSUFBSSxHQUFHWixNQUFNLENBQUNBLE1BQU0sQ0FBQyxJQUFELENBQU4sQ0FBYWEsSUFBYixDQUFrQixvQkFBbEIsQ0FBRCxDQUFqQixDQUR3RCxDQUV4RDs7QUFDQSxRQUFJQyxPQUFPLEdBQUdGLElBQUksQ0FBQ0csSUFBTCxDQUFVLGdCQUFWLEtBQStCSCxJQUFJLENBQUNJLFFBQUwsR0FBZ0JDLE1BQTdELENBSHdELENBS3hEOztBQUNBLFFBQUlDLFNBQVMsR0FBR04sSUFBSSxDQUFDQyxJQUFMLENBQVUsZ0JBQVYsQ0FBaEIsQ0FOd0QsQ0FPeEQ7QUFDQTtBQUNBOztBQUNBSyxJQUFBQSxTQUFTLEdBQUdBLFNBQVMsQ0FBQ0MsT0FBVixDQUFrQixXQUFsQixFQUErQkwsT0FBL0IsQ0FBWixDQVZ3RCxDQVd4RDs7QUFDQUEsSUFBQUEsT0FBTyxHQVppRCxDQWF4RDs7QUFDQUYsSUFBQUEsSUFBSSxDQUFDRyxJQUFMLENBQVUsZ0JBQVYsRUFBNEJELE9BQTVCLEVBZHdELENBZ0J4RDs7QUFDQSxRQUFJTSxPQUFPLEdBQUdwQixNQUFNLENBQUNZLElBQUksQ0FBQ0MsSUFBTCxDQUFVLGtCQUFWLENBQUQsQ0FBTixDQUFzQ1EsSUFBdEMsQ0FBMkNILFNBQTNDLENBQWQ7QUFDQVgsSUFBQUEsb0JBQW9CLENBQUNhLE9BQUQsQ0FBcEI7QUFDQVgsSUFBQUEsa0JBQWtCLENBQUNXLE9BQUQsQ0FBbEI7QUFDQUEsSUFBQUEsT0FBTyxDQUFDRSxRQUFSLENBQWlCVixJQUFqQjtBQUNILEdBckJEO0FBc0JILENBL0JEOztBQWlDQSxTQUFTTCxvQkFBVCxDQUE4QkQsR0FBOUIsRUFBbUM7QUFDL0JBLEVBQUFBLEdBQUcsQ0FBQ2lCLElBQUosQ0FBUywyQkFBVCxFQUFzQ0MsRUFBdEMsQ0FBeUMsT0FBekMsRUFBa0QsWUFBWTtBQUMxRGxCLElBQUFBLEdBQUcsQ0FBQ21CLE1BQUo7QUFDSCxHQUZEO0FBR0g7O0FBRUQsU0FBU2hCLGtCQUFULENBQTRCSCxHQUE1QixFQUFpQztBQUM3QkEsRUFBQUEsR0FBRyxDQUFDaUIsSUFBSixDQUFTLE9BQVQsRUFBa0JDLEVBQWxCLENBQXFCLFFBQXJCLEVBQStCLFlBQVk7QUFDdkMsUUFBSWhCLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUWtCLEdBQVIsT0FBa0IsUUFBdEIsRUFBZ0M7QUFDNUJwQixNQUFBQSxHQUFHLENBQUNpQixJQUFKLENBQVMsUUFBVCxFQUFtQlYsSUFBbkIsQ0FBd0IsTUFBeEIsRUFBZ0MsUUFBaEM7QUFDSDs7QUFDRCxRQUFJTCxDQUFDLENBQUMsSUFBRCxDQUFELENBQVFrQixHQUFSLE9BQWtCLFVBQXRCLEVBQWtDO0FBQzlCcEIsTUFBQUEsR0FBRyxDQUFDaUIsSUFBSixDQUFTLFFBQVQsRUFBbUJWLElBQW5CLENBQXdCLE1BQXhCLEVBQWdDLE1BQWhDO0FBQ0g7QUFDSixHQVBEO0FBUUgiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvYWRtaW4vY2F0YWxvZy9waWN0dXJlLWV4aWYtY29sbGVjdGlvbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBhZGQtY29sbGVjdGlvbi13aWRnZXQuanNcbmpRdWVyeShkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuXG4gICAgY29uc3QgdGFncyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5leGlmLXJvdycpXG4gICAgdGFncy5mb3JFYWNoKCh0YWcpID0+IHtcbiAgICAgICAgYWRkRGVsZXRlRXZlbnRGb3JSb3coJCh0YWcpKVxuICAgICAgICBhZGRUeXBlRXZlbnRGb3JSb3coJCh0YWcpKTtcbiAgICB9KVxuXG5cbiAgICBqUXVlcnkoJy5hZGQtYW5vdGhlci1jb2xsZWN0aW9uLXdpZGdldCcpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHZhciBsaXN0ID0galF1ZXJ5KGpRdWVyeSh0aGlzKS5hdHRyKCdkYXRhLWxpc3Qtc2VsZWN0b3InKSk7XG4gICAgICAgIC8vIFRyeSB0byBmaW5kIHRoZSBjb3VudGVyIG9mIHRoZSBsaXN0IG9yIHVzZSB0aGUgbGVuZ3RoIG9mIHRoZSBsaXN0XG4gICAgICAgIHZhciBjb3VudGVyID0gbGlzdC5kYXRhKCd3aWRnZXQtY291bnRlcicpIHx8IGxpc3QuY2hpbGRyZW4oKS5sZW5ndGg7XG5cbiAgICAgICAgLy8gZ3JhYiB0aGUgcHJvdG90eXBlIHRlbXBsYXRlXG4gICAgICAgIHZhciBuZXdXaWRnZXQgPSBsaXN0LmF0dHIoJ2RhdGEtcHJvdG90eXBlJyk7XG4gICAgICAgIC8vIHJlcGxhY2UgdGhlIFwiX19uYW1lX19cIiB1c2VkIGluIHRoZSBpZCBhbmQgbmFtZSBvZiB0aGUgcHJvdG90eXBlXG4gICAgICAgIC8vIHdpdGggYSBudW1iZXIgdGhhdCdzIHVuaXF1ZSB0byB5b3VyIGVtYWlsc1xuICAgICAgICAvLyBlbmQgbmFtZSBhdHRyaWJ1dGUgbG9va3MgbGlrZSBuYW1lPVwiY29udGFjdFtlbWFpbHNdWzJdXCJcbiAgICAgICAgbmV3V2lkZ2V0ID0gbmV3V2lkZ2V0LnJlcGxhY2UoL19fbmFtZV9fL2csIGNvdW50ZXIpO1xuICAgICAgICAvLyBJbmNyZWFzZSB0aGUgY291bnRlclxuICAgICAgICBjb3VudGVyKys7XG4gICAgICAgIC8vIEFuZCBzdG9yZSBpdCwgdGhlIGxlbmd0aCBjYW5ub3QgYmUgdXNlZCBpZiBkZWxldGluZyB3aWRnZXRzIGlzIGFsbG93ZWRcbiAgICAgICAgbGlzdC5kYXRhKCd3aWRnZXQtY291bnRlcicsIGNvdW50ZXIpO1xuXG4gICAgICAgIC8vIGNyZWF0ZSBhIG5ldyBsaXN0IGVsZW1lbnQgYW5kIGFkZCBpdCB0byB0aGUgbGlzdFxuICAgICAgICB2YXIgbmV3RWxlbSA9IGpRdWVyeShsaXN0LmF0dHIoJ2RhdGEtd2lkZ2V0LXRhZ3MnKSkuaHRtbChuZXdXaWRnZXQpO1xuICAgICAgICBhZGREZWxldGVFdmVudEZvclJvdyhuZXdFbGVtKTtcbiAgICAgICAgYWRkVHlwZUV2ZW50Rm9yUm93KG5ld0VsZW0pO1xuICAgICAgICBuZXdFbGVtLmFwcGVuZFRvKGxpc3QpO1xuICAgIH0pO1xufSk7XG5cbmZ1bmN0aW9uIGFkZERlbGV0ZUV2ZW50Rm9yUm93KHRhZykge1xuICAgIHRhZy5maW5kKCcuZGVsZXRlLWNvbGxlY3Rpb24td2lkZ2V0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB0YWcucmVtb3ZlKCk7XG4gICAgfSlcbn1cblxuZnVuY3Rpb24gYWRkVHlwZUV2ZW50Rm9yUm93KHRhZykge1xuICAgIHRhZy5maW5kKCcudHlwZScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICgkKHRoaXMpLnZhbCgpID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGFnLmZpbmQoJy52YWx1ZScpLmF0dHIoJ3R5cGUnLCAnc3RyaW5nJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCQodGhpcykudmFsKCkgPT09ICdEYXRlVGltZScpIHtcbiAgICAgICAgICAgIHRhZy5maW5kKCcudmFsdWUnKS5hdHRyKCd0eXBlJywgJ2RhdGUnKTtcbiAgICAgICAgfVxuICAgIH0pXG59Il0sIm5hbWVzIjpbImpRdWVyeSIsImRvY3VtZW50IiwicmVhZHkiLCJ0YWdzIiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJ0YWciLCJhZGREZWxldGVFdmVudEZvclJvdyIsIiQiLCJhZGRUeXBlRXZlbnRGb3JSb3ciLCJjbGljayIsImUiLCJsaXN0IiwiYXR0ciIsImNvdW50ZXIiLCJkYXRhIiwiY2hpbGRyZW4iLCJsZW5ndGgiLCJuZXdXaWRnZXQiLCJyZXBsYWNlIiwibmV3RWxlbSIsImh0bWwiLCJhcHBlbmRUbyIsImZpbmQiLCJvbiIsInJlbW92ZSIsInZhbCJdLCJzb3VyY2VSb290IjoiIn0=