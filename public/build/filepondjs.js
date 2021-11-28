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
/* harmony import */ var filepond_plugin_file_validate_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! filepond-plugin-file-validate-type */ "./node_modules/filepond-plugin-file-validate-type/dist/filepond-plugin-file-validate-type.js");
/* harmony import */ var filepond_plugin_file_validate_type__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(filepond_plugin_file_validate_type__WEBPACK_IMPORTED_MODULE_1__);
/* provided dependency */ var jQuery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
var $ = jQuery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");



filepond__WEBPACK_IMPORTED_MODULE_0__.registerPlugin((filepond_plugin_file_validate_type__WEBPACK_IMPORTED_MODULE_1___default()));
var filepond;
$(function () {
  var inputElement = document.querySelector('.filepond');
  filepond = filepond__WEBPACK_IMPORTED_MODULE_0__.create(inputElement, {
    allowMultiple: true,
    server: $('.filepond').closest('form').attr('action'),
    maxParallelUploads: 10,
    allowDrop: true,
    allowRevert: false,
    labelIdle: 'Glissez et déposez vos fichiers ou <span class="filepond--label-action"> Parcourir </span>',
    allowFileTypeValidation: true,
    acceptedFileTypes: ['image/png']
  }); // document.addEventListener('FilePond:processfiles', (e) => {
  //     filepond.removeFiles();
  // });
});

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_jquery_dist_jquery_js","vendors-node_modules_filepond-plugin-file-validate-type_dist_filepond-plugin-file-validate-ty-f96cf8"], () => (__webpack_exec__("./assets/admin/filepond.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZXBvbmRqcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFNQSxDQUFDLEdBQUdDLE1BQU0sR0FBR0MsbUJBQU8sQ0FBQyxvREFBRCxDQUExQjs7QUFFQTtBQUNBO0FBQ0FDLG9EQUFBLENBQXdCQywyRUFBeEI7QUFFQSxJQUFJRSxRQUFKO0FBRUFOLENBQUMsQ0FBQyxZQUFZO0FBQ1YsTUFBTU8sWUFBWSxHQUFHQyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsV0FBdkIsQ0FBckI7QUFDQUgsRUFBQUEsUUFBUSxHQUFHSCw0Q0FBQSxDQUFnQkksWUFBaEIsRUFBOEI7QUFDckNJLElBQUFBLGFBQWEsRUFBRSxJQURzQjtBQUVyQ0MsSUFBQUEsTUFBTSxFQUFFWixDQUFDLENBQUMsV0FBRCxDQUFELENBQWVhLE9BQWYsQ0FBdUIsTUFBdkIsRUFBK0JDLElBQS9CLENBQW9DLFFBQXBDLENBRjZCO0FBR3JDQyxJQUFBQSxrQkFBa0IsRUFBRSxFQUhpQjtBQUlyQ0MsSUFBQUEsU0FBUyxFQUFFLElBSjBCO0FBS3JDQyxJQUFBQSxXQUFXLEVBQUUsS0FMd0I7QUFNckNDLElBQUFBLFNBQVMsRUFBRSw0RkFOMEI7QUFPckNDLElBQUFBLHVCQUF1QixFQUFFLElBUFk7QUFRckNDLElBQUFBLGlCQUFpQixFQUFFLENBQUMsV0FBRDtBQVJrQixHQUE5QixDQUFYLENBRlUsQ0FjVjtBQUNBO0FBQ0E7QUFDSCxDQWpCQSxDQUFEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2FkbWluL2ZpbGVwb25kLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0ICQgPSBqUXVlcnkgPSByZXF1aXJlKFwianF1ZXJ5XCIpO1xuXG5pbXBvcnQgKiBhcyBGaWxlUG9uZCBmcm9tIFwiZmlsZXBvbmRcIjtcbmltcG9ydCBGaWxlUG9uZFBsdWdpbkZpbGVWYWxpZGF0ZVR5cGUgZnJvbSAnZmlsZXBvbmQtcGx1Z2luLWZpbGUtdmFsaWRhdGUtdHlwZSc7XG5GaWxlUG9uZC5yZWdpc3RlclBsdWdpbihGaWxlUG9uZFBsdWdpbkZpbGVWYWxpZGF0ZVR5cGUpO1xuXG5sZXQgZmlsZXBvbmQ7XG5cbiQoZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGlucHV0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5maWxlcG9uZCcpO1xuICAgIGZpbGVwb25kID0gRmlsZVBvbmQuY3JlYXRlKGlucHV0RWxlbWVudCwge1xuICAgICAgICBhbGxvd011bHRpcGxlOiB0cnVlLFxuICAgICAgICBzZXJ2ZXI6ICQoJy5maWxlcG9uZCcpLmNsb3Nlc3QoJ2Zvcm0nKS5hdHRyKCdhY3Rpb24nKSxcbiAgICAgICAgbWF4UGFyYWxsZWxVcGxvYWRzOiAxMCxcbiAgICAgICAgYWxsb3dEcm9wOiB0cnVlLFxuICAgICAgICBhbGxvd1JldmVydDogZmFsc2UsXG4gICAgICAgIGxhYmVsSWRsZTogJ0dsaXNzZXogZXQgZMOpcG9zZXogdm9zIGZpY2hpZXJzIG91IDxzcGFuIGNsYXNzPVwiZmlsZXBvbmQtLWxhYmVsLWFjdGlvblwiPiBQYXJjb3VyaXIgPC9zcGFuPicsXG4gICAgICAgIGFsbG93RmlsZVR5cGVWYWxpZGF0aW9uOiB0cnVlLFxuICAgICAgICBhY2NlcHRlZEZpbGVUeXBlczogWydpbWFnZS9wbmcnXSxcbiAgICB9KTtcblxuXG4gICAgLy8gZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRmlsZVBvbmQ6cHJvY2Vzc2ZpbGVzJywgKGUpID0+IHtcbiAgICAvLyAgICAgZmlsZXBvbmQucmVtb3ZlRmlsZXMoKTtcbiAgICAvLyB9KTtcbn0pOyJdLCJuYW1lcyI6WyIkIiwialF1ZXJ5IiwicmVxdWlyZSIsIkZpbGVQb25kIiwiRmlsZVBvbmRQbHVnaW5GaWxlVmFsaWRhdGVUeXBlIiwicmVnaXN0ZXJQbHVnaW4iLCJmaWxlcG9uZCIsImlucHV0RWxlbWVudCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImNyZWF0ZSIsImFsbG93TXVsdGlwbGUiLCJzZXJ2ZXIiLCJjbG9zZXN0IiwiYXR0ciIsIm1heFBhcmFsbGVsVXBsb2FkcyIsImFsbG93RHJvcCIsImFsbG93UmV2ZXJ0IiwibGFiZWxJZGxlIiwiYWxsb3dGaWxlVHlwZVZhbGlkYXRpb24iLCJhY2NlcHRlZEZpbGVUeXBlcyJdLCJzb3VyY2VSb290IjoiIn0=