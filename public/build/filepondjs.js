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
var lang = $('html').attr('lang');
var labelIdle = 'Drag and drop your files or <span class="filepond--label-action"> Browse </span>';

if ('fr' === lang) {
  labelIdle = 'Glissez et déposez vos fichiers ou <span class="filepond--label-action"> Parcourir </span>';
}

$(function () {
  var inputElement = document.querySelector('.filepond');
  filepond = filepond__WEBPACK_IMPORTED_MODULE_0__.create(inputElement, {
    allowMultiple: true,
    server: $('.filepond').closest('form').attr('action'),
    maxParallelUploads: 10,
    allowDrop: true,
    allowRevert: false,
    labelIdle: labelIdle,
    allowFileTypeValidation: true,
    acceptedFileTypes: ['image/*', 'application/zip']
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZXBvbmRqcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFNQSxDQUFDLEdBQUdDLE1BQU0sR0FBR0MsbUJBQU8sQ0FBQyxvREFBRCxDQUExQjs7QUFFQTtBQUNBO0FBRUFDLG9EQUFBLENBQXdCQywyRUFBeEI7QUFFQSxJQUFJRSxRQUFKO0FBRUEsSUFBTUMsSUFBSSxHQUFHUCxDQUFDLENBQUMsTUFBRCxDQUFELENBQVVRLElBQVYsQ0FBZSxNQUFmLENBQWI7QUFDQSxJQUFJQyxTQUFTLEdBQUcsa0ZBQWhCOztBQUNBLElBQUksU0FBU0YsSUFBYixFQUFtQjtBQUNmRSxFQUFBQSxTQUFTLEdBQUcsNEZBQVo7QUFDSDs7QUFFRFQsQ0FBQyxDQUFDLFlBQVk7QUFDVixNQUFNVSxZQUFZLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixXQUF2QixDQUFyQjtBQUNBTixFQUFBQSxRQUFRLEdBQUdILDRDQUFBLENBQWdCTyxZQUFoQixFQUE4QjtBQUNyQ0ksSUFBQUEsYUFBYSxFQUFFLElBRHNCO0FBRXJDQyxJQUFBQSxNQUFNLEVBQUVmLENBQUMsQ0FBQyxXQUFELENBQUQsQ0FBZWdCLE9BQWYsQ0FBdUIsTUFBdkIsRUFBK0JSLElBQS9CLENBQW9DLFFBQXBDLENBRjZCO0FBR3JDUyxJQUFBQSxrQkFBa0IsRUFBRSxFQUhpQjtBQUlyQ0MsSUFBQUEsU0FBUyxFQUFFLElBSjBCO0FBS3JDQyxJQUFBQSxXQUFXLEVBQUUsS0FMd0I7QUFNckNWLElBQUFBLFNBQVMsRUFBRUEsU0FOMEI7QUFPckNXLElBQUFBLHVCQUF1QixFQUFFLElBUFk7QUFRckNDLElBQUFBLGlCQUFpQixFQUFFLENBQUMsU0FBRCxFQUFXLGlCQUFYO0FBUmtCLEdBQTlCLENBQVgsQ0FGVSxDQWNWO0FBQ0E7QUFDQTtBQUNILENBakJBLENBQUQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvYWRtaW4vZmlsZXBvbmQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgJCA9IGpRdWVyeSA9IHJlcXVpcmUoXCJqcXVlcnlcIik7XG5cbmltcG9ydCAqIGFzIEZpbGVQb25kIGZyb20gXCJmaWxlcG9uZFwiO1xuaW1wb3J0IEZpbGVQb25kUGx1Z2luRmlsZVZhbGlkYXRlVHlwZSBmcm9tICdmaWxlcG9uZC1wbHVnaW4tZmlsZS12YWxpZGF0ZS10eXBlJztcblxuRmlsZVBvbmQucmVnaXN0ZXJQbHVnaW4oRmlsZVBvbmRQbHVnaW5GaWxlVmFsaWRhdGVUeXBlKTtcblxubGV0IGZpbGVwb25kO1xuXG5jb25zdCBsYW5nID0gJCgnaHRtbCcpLmF0dHIoJ2xhbmcnKTtcbmxldCBsYWJlbElkbGUgPSAnRHJhZyBhbmQgZHJvcCB5b3VyIGZpbGVzIG9yIDxzcGFuIGNsYXNzPVwiZmlsZXBvbmQtLWxhYmVsLWFjdGlvblwiPiBCcm93c2UgPC9zcGFuPic7XG5pZiAoJ2ZyJyA9PT0gbGFuZykge1xuICAgIGxhYmVsSWRsZSA9ICdHbGlzc2V6IGV0IGTDqXBvc2V6IHZvcyBmaWNoaWVycyBvdSA8c3BhbiBjbGFzcz1cImZpbGVwb25kLS1sYWJlbC1hY3Rpb25cIj4gUGFyY291cmlyIDwvc3Bhbj4nO1xufVxuXG4kKGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBpbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmlsZXBvbmQnKTtcbiAgICBmaWxlcG9uZCA9IEZpbGVQb25kLmNyZWF0ZShpbnB1dEVsZW1lbnQsIHtcbiAgICAgICAgYWxsb3dNdWx0aXBsZTogdHJ1ZSxcbiAgICAgICAgc2VydmVyOiAkKCcuZmlsZXBvbmQnKS5jbG9zZXN0KCdmb3JtJykuYXR0cignYWN0aW9uJyksXG4gICAgICAgIG1heFBhcmFsbGVsVXBsb2FkczogMTAsXG4gICAgICAgIGFsbG93RHJvcDogdHJ1ZSxcbiAgICAgICAgYWxsb3dSZXZlcnQ6IGZhbHNlLFxuICAgICAgICBsYWJlbElkbGU6IGxhYmVsSWRsZSxcbiAgICAgICAgYWxsb3dGaWxlVHlwZVZhbGlkYXRpb246IHRydWUsXG4gICAgICAgIGFjY2VwdGVkRmlsZVR5cGVzOiBbJ2ltYWdlLyonLCdhcHBsaWNhdGlvbi96aXAnXSxcbiAgICB9KTtcblxuXG4gICAgLy8gZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRmlsZVBvbmQ6cHJvY2Vzc2ZpbGVzJywgKGUpID0+IHtcbiAgICAvLyAgICAgZmlsZXBvbmQucmVtb3ZlRmlsZXMoKTtcbiAgICAvLyB9KTtcbn0pO1xuIl0sIm5hbWVzIjpbIiQiLCJqUXVlcnkiLCJyZXF1aXJlIiwiRmlsZVBvbmQiLCJGaWxlUG9uZFBsdWdpbkZpbGVWYWxpZGF0ZVR5cGUiLCJyZWdpc3RlclBsdWdpbiIsImZpbGVwb25kIiwibGFuZyIsImF0dHIiLCJsYWJlbElkbGUiLCJpbnB1dEVsZW1lbnQiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJjcmVhdGUiLCJhbGxvd011bHRpcGxlIiwic2VydmVyIiwiY2xvc2VzdCIsIm1heFBhcmFsbGVsVXBsb2FkcyIsImFsbG93RHJvcCIsImFsbG93UmV2ZXJ0IiwiYWxsb3dGaWxlVHlwZVZhbGlkYXRpb24iLCJhY2NlcHRlZEZpbGVUeXBlcyJdLCJzb3VyY2VSb290IjoiIn0=