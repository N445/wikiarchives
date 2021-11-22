"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["filepondjs"],{

/***/ "./assets/admin/filepond.js":
/*!**********************************!*\
  !*** ./assets/admin/filepond.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var filepond__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! filepond */ "./node_modules/filepond/dist/filepond.js");
/* harmony import */ var filepond__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(filepond__WEBPACK_IMPORTED_MODULE_0__);
/* provided dependency */ var jQuery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
var $ = jQuery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");


var filepond;
$(function () {
  var inputElement = document.querySelector('.filepond');
  filepond = filepond__WEBPACK_IMPORTED_MODULE_0__.create(inputElement, {
    allowMultiple: true,
    server: $('.filepond').closest('form').attr('action'),
    maxParallelUploads: 10,
    allowDrop: true,
    allowRevert: false,
    labelIdle: 'Glissez et déposez vos fichiers ou <span class="filepond--label-action"> Parcourir </span>'
  }); // document.addEventListener('FilePond:processfiles', (e) => {
  //     filepond.removeFiles();
  // });
});

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_jquery_dist_jquery_js","vendors-node_modules_filepond_dist_filepond_js"], () => (__webpack_exec__("./assets/admin/filepond.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZXBvbmRqcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsSUFBTUEsQ0FBQyxHQUFHQyxNQUFNLEdBQUdDLG1CQUFPLENBQUMsb0RBQUQsQ0FBMUI7O0FBRUE7QUFFQSxJQUFJRSxRQUFKO0FBRUFKLENBQUMsQ0FBQyxZQUFZO0FBQ1YsTUFBTUssWUFBWSxHQUFHQyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsV0FBdkIsQ0FBckI7QUFDQUgsRUFBQUEsUUFBUSxHQUFHRCw0Q0FBQSxDQUFnQkUsWUFBaEIsRUFBOEI7QUFDckNJLElBQUFBLGFBQWEsRUFBRSxJQURzQjtBQUVyQ0MsSUFBQUEsTUFBTSxFQUFFVixDQUFDLENBQUMsV0FBRCxDQUFELENBQWVXLE9BQWYsQ0FBdUIsTUFBdkIsRUFBK0JDLElBQS9CLENBQW9DLFFBQXBDLENBRjZCO0FBR3JDQyxJQUFBQSxrQkFBa0IsRUFBRSxFQUhpQjtBQUlyQ0MsSUFBQUEsU0FBUyxFQUFFLElBSjBCO0FBS3JDQyxJQUFBQSxXQUFXLEVBQUUsS0FMd0I7QUFNckNDLElBQUFBLFNBQVMsRUFBRTtBQU4wQixHQUE5QixDQUFYLENBRlUsQ0FZVjtBQUNBO0FBQ0E7QUFDSCxDQWZBLENBQUQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvYWRtaW4vZmlsZXBvbmQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgJCA9IGpRdWVyeSA9IHJlcXVpcmUoXCJqcXVlcnlcIik7XG5cbmltcG9ydCAqIGFzIEZpbGVQb25kIGZyb20gXCJmaWxlcG9uZFwiO1xuXG5sZXQgZmlsZXBvbmQ7XG5cbiQoZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGlucHV0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5maWxlcG9uZCcpO1xuICAgIGZpbGVwb25kID0gRmlsZVBvbmQuY3JlYXRlKGlucHV0RWxlbWVudCwge1xuICAgICAgICBhbGxvd011bHRpcGxlOiB0cnVlLFxuICAgICAgICBzZXJ2ZXI6ICQoJy5maWxlcG9uZCcpLmNsb3Nlc3QoJ2Zvcm0nKS5hdHRyKCdhY3Rpb24nKSxcbiAgICAgICAgbWF4UGFyYWxsZWxVcGxvYWRzOiAxMCxcbiAgICAgICAgYWxsb3dEcm9wOiB0cnVlLFxuICAgICAgICBhbGxvd1JldmVydDogZmFsc2UsXG4gICAgICAgIGxhYmVsSWRsZTogJ0dsaXNzZXogZXQgZMOpcG9zZXogdm9zIGZpY2hpZXJzIG91IDxzcGFuIGNsYXNzPVwiZmlsZXBvbmQtLWxhYmVsLWFjdGlvblwiPiBQYXJjb3VyaXIgPC9zcGFuPicsXG4gICAgfSk7XG5cblxuICAgIC8vIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0ZpbGVQb25kOnByb2Nlc3NmaWxlcycsIChlKSA9PiB7XG4gICAgLy8gICAgIGZpbGVwb25kLnJlbW92ZUZpbGVzKCk7XG4gICAgLy8gfSk7XG59KTsiXSwibmFtZXMiOlsiJCIsImpRdWVyeSIsInJlcXVpcmUiLCJGaWxlUG9uZCIsImZpbGVwb25kIiwiaW5wdXRFbGVtZW50IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY3JlYXRlIiwiYWxsb3dNdWx0aXBsZSIsInNlcnZlciIsImNsb3Nlc3QiLCJhdHRyIiwibWF4UGFyYWxsZWxVcGxvYWRzIiwiYWxsb3dEcm9wIiwiYWxsb3dSZXZlcnQiLCJsYWJlbElkbGUiXSwic291cmNlUm9vdCI6IiJ9