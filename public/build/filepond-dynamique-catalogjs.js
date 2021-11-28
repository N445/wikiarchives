"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["filepond-dynamique-catalogjs"],{

/***/ "./assets/admin/filepond-dynamique-catalog.js":
/*!****************************************************!*\
  !*** ./assets/admin/filepond-dynamique-catalog.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _vendor_friendsofsymfony_jsrouting_bundle_Resources_public_js_router_min_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../vendor/friendsofsymfony/jsrouting-bundle/Resources/public/js/router.min.js */ "./vendor/friendsofsymfony/jsrouting-bundle/Resources/public/js/router.min.js");
/* harmony import */ var _vendor_friendsofsymfony_jsrouting_bundle_Resources_public_js_router_min_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_vendor_friendsofsymfony_jsrouting_bundle_Resources_public_js_router_min_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var filepond__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! filepond */ "./node_modules/filepond/dist/filepond.js");
/* harmony import */ var filepond__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(filepond__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var filepond_plugin_file_validate_type__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! filepond-plugin-file-validate-type */ "./node_modules/filepond-plugin-file-validate-type/dist/filepond-plugin-file-validate-type.js");
/* harmony import */ var filepond_plugin_file_validate_type__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(filepond_plugin_file_validate_type__WEBPACK_IMPORTED_MODULE_2__);
/* provided dependency */ var jQuery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
var $ = jQuery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");

var routes = __webpack_require__(/*! ../../public/js/fos_js_routes.json */ "./public/js/fos_js_routes.json");




filepond__WEBPACK_IMPORTED_MODULE_1__.registerPlugin((filepond_plugin_file_validate_type__WEBPACK_IMPORTED_MODULE_2___default()));
_vendor_friendsofsymfony_jsrouting_bundle_Resources_public_js_router_min_js__WEBPACK_IMPORTED_MODULE_0___default().setRoutingData(routes);
var filepond;
var inputElement;
var form = $('form');
$(function () {
  inputElement = document.querySelector('.filepond');
  filepond = filepond__WEBPACK_IMPORTED_MODULE_1__.create(inputElement, {
    allowMultiple: true,
    server: $('.filepond').closest('form').attr('action'),
    maxParallelUploads: 10,
    allowDrop: true,
    allowRevert: false,
    labelIdle: 'Glissez et déposez vos fichiers ou <span class="filepond--label-action"> Parcourir </span>',
    allowFileTypeValidation: true,
    acceptedFileTypes: ['image/*', 'application/zip']
  });
  setUrl($('select[name="catalog"]').val());
  $('select[name="catalog"]').on('change', function (e) {
    setUrl($(this).val());
  });
});

function setUrl(catalogId) {
  form.attr('action', _vendor_friendsofsymfony_jsrouting_bundle_Resources_public_js_router_min_js__WEBPACK_IMPORTED_MODULE_0___default().generate('AJAX_CATALOG_PICTURE_FILEPOND', {
    'catalogId': catalogId
  }));
  filepond.server.url = form.attr('action');
}

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_jquery_dist_jquery_js","vendors-node_modules_core-js_internals_array-iteration_js-node_modules_core-js_internals_export_js","vendors-node_modules_core-js_internals_add-to-unscopables_js-node_modules_core-js_modules_es_-4a17ad","vendors-node_modules_filepond-plugin-file-validate-type_dist_filepond-plugin-file-validate-ty-f96cf8","vendors-node_modules_core-js_modules_es_array_for-each_js-node_modules_core-js_modules_es_obj-04c62c","vendor_friendsofsymfony_jsrouting-bundle_Resources_public_js_router_min_js-public_js_fos_js_r-064a7f"], () => (__webpack_exec__("./assets/admin/filepond-dynamique-catalog.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZXBvbmQtZHluYW1pcXVlLWNhdGFsb2dqcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQU1BLENBQUMsR0FBR0MsTUFBTSxHQUFHQyxtQkFBTyxDQUFDLG9EQUFELENBQTFCOztBQUNBLElBQU1DLE1BQU0sR0FBR0QsbUJBQU8sQ0FBQywwRUFBRCxDQUF0Qjs7QUFDQTtBQUNBO0FBQ0E7QUFDQUcsb0RBQUEsQ0FBd0JDLDJFQUF4QjtBQUVBRixpSUFBQSxDQUF1QkQsTUFBdkI7QUFFQSxJQUFJTSxRQUFKO0FBQ0EsSUFBSUMsWUFBSjtBQUNBLElBQUlDLElBQUksR0FBR1gsQ0FBQyxDQUFDLE1BQUQsQ0FBWjtBQUVBQSxDQUFDLENBQUMsWUFBWTtBQUNWVSxFQUFBQSxZQUFZLEdBQUdFLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixXQUF2QixDQUFmO0FBQ0FKLEVBQUFBLFFBQVEsR0FBR0osNENBQUEsQ0FBZ0JLLFlBQWhCLEVBQThCO0FBQ3JDSyxJQUFBQSxhQUFhLEVBQUUsSUFEc0I7QUFFckNDLElBQUFBLE1BQU0sRUFBRWhCLENBQUMsQ0FBQyxXQUFELENBQUQsQ0FBZWlCLE9BQWYsQ0FBdUIsTUFBdkIsRUFBK0JDLElBQS9CLENBQW9DLFFBQXBDLENBRjZCO0FBR3JDQyxJQUFBQSxrQkFBa0IsRUFBRSxFQUhpQjtBQUlyQ0MsSUFBQUEsU0FBUyxFQUFFLElBSjBCO0FBS3JDQyxJQUFBQSxXQUFXLEVBQUUsS0FMd0I7QUFNckNDLElBQUFBLFNBQVMsRUFBRSw0RkFOMEI7QUFPckNDLElBQUFBLHVCQUF1QixFQUFFLElBUFk7QUFRckNDLElBQUFBLGlCQUFpQixFQUFFLENBQUMsU0FBRCxFQUFXLGlCQUFYO0FBUmtCLEdBQTlCLENBQVg7QUFXQUMsRUFBQUEsTUFBTSxDQUFDekIsQ0FBQyxDQUFDLHdCQUFELENBQUQsQ0FBNEIwQixHQUE1QixFQUFELENBQU47QUFDQTFCLEVBQUFBLENBQUMsQ0FBQyx3QkFBRCxDQUFELENBQTRCMkIsRUFBNUIsQ0FBK0IsUUFBL0IsRUFBeUMsVUFBVUMsQ0FBVixFQUFhO0FBQ2xESCxJQUFBQSxNQUFNLENBQUN6QixDQUFDLENBQUMsSUFBRCxDQUFELENBQVEwQixHQUFSLEVBQUQsQ0FBTjtBQUNILEdBRkQ7QUFHSCxDQWpCQSxDQUFEOztBQW1CQSxTQUFTRCxNQUFULENBQWdCSSxTQUFoQixFQUEyQjtBQUN2QmxCLEVBQUFBLElBQUksQ0FBQ08sSUFBTCxDQUFVLFFBQVYsRUFBb0JkLDJIQUFBLENBQWlCLCtCQUFqQixFQUFrRDtBQUNsRSxpQkFBYXlCO0FBRHFELEdBQWxELENBQXBCO0FBR0FwQixFQUFBQSxRQUFRLENBQUNPLE1BQVQsQ0FBZ0JlLEdBQWhCLEdBQXNCcEIsSUFBSSxDQUFDTyxJQUFMLENBQVUsUUFBVixDQUF0QjtBQUNIIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2FkbWluL2ZpbGVwb25kLWR5bmFtaXF1ZS1jYXRhbG9nLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0ICQgPSBqUXVlcnkgPSByZXF1aXJlKFwianF1ZXJ5XCIpO1xuY29uc3Qgcm91dGVzID0gcmVxdWlyZSgnLi4vLi4vcHVibGljL2pzL2Zvc19qc19yb3V0ZXMuanNvbicpO1xuaW1wb3J0IFJvdXRpbmcgZnJvbSAnLi4vLi4vdmVuZG9yL2ZyaWVuZHNvZnN5bWZvbnkvanNyb3V0aW5nLWJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2pzL3JvdXRlci5taW4uanMnO1xuaW1wb3J0ICogYXMgRmlsZVBvbmQgZnJvbSBcImZpbGVwb25kXCI7XG5pbXBvcnQgRmlsZVBvbmRQbHVnaW5GaWxlVmFsaWRhdGVUeXBlIGZyb20gJ2ZpbGVwb25kLXBsdWdpbi1maWxlLXZhbGlkYXRlLXR5cGUnO1xuRmlsZVBvbmQucmVnaXN0ZXJQbHVnaW4oRmlsZVBvbmRQbHVnaW5GaWxlVmFsaWRhdGVUeXBlKTtcblxuUm91dGluZy5zZXRSb3V0aW5nRGF0YShyb3V0ZXMpO1xuXG5sZXQgZmlsZXBvbmQ7XG5sZXQgaW5wdXRFbGVtZW50O1xubGV0IGZvcm0gPSAkKCdmb3JtJyk7XG5cbiQoZnVuY3Rpb24gKCkge1xuICAgIGlucHV0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5maWxlcG9uZCcpO1xuICAgIGZpbGVwb25kID0gRmlsZVBvbmQuY3JlYXRlKGlucHV0RWxlbWVudCwge1xuICAgICAgICBhbGxvd011bHRpcGxlOiB0cnVlLFxuICAgICAgICBzZXJ2ZXI6ICQoJy5maWxlcG9uZCcpLmNsb3Nlc3QoJ2Zvcm0nKS5hdHRyKCdhY3Rpb24nKSxcbiAgICAgICAgbWF4UGFyYWxsZWxVcGxvYWRzOiAxMCxcbiAgICAgICAgYWxsb3dEcm9wOiB0cnVlLFxuICAgICAgICBhbGxvd1JldmVydDogZmFsc2UsXG4gICAgICAgIGxhYmVsSWRsZTogJ0dsaXNzZXogZXQgZMOpcG9zZXogdm9zIGZpY2hpZXJzIG91IDxzcGFuIGNsYXNzPVwiZmlsZXBvbmQtLWxhYmVsLWFjdGlvblwiPiBQYXJjb3VyaXIgPC9zcGFuPicsXG4gICAgICAgIGFsbG93RmlsZVR5cGVWYWxpZGF0aW9uOiB0cnVlLFxuICAgICAgICBhY2NlcHRlZEZpbGVUeXBlczogWydpbWFnZS8qJywnYXBwbGljYXRpb24vemlwJ10sXG4gICAgfSk7XG5cbiAgICBzZXRVcmwoJCgnc2VsZWN0W25hbWU9XCJjYXRhbG9nXCJdJykudmFsKCkpO1xuICAgICQoJ3NlbGVjdFtuYW1lPVwiY2F0YWxvZ1wiXScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBzZXRVcmwoJCh0aGlzKS52YWwoKSk7XG4gICAgfSlcbn0pO1xuXG5mdW5jdGlvbiBzZXRVcmwoY2F0YWxvZ0lkKSB7XG4gICAgZm9ybS5hdHRyKCdhY3Rpb24nLCBSb3V0aW5nLmdlbmVyYXRlKCdBSkFYX0NBVEFMT0dfUElDVFVSRV9GSUxFUE9ORCcsIHtcbiAgICAgICAgJ2NhdGFsb2dJZCc6IGNhdGFsb2dJZCxcbiAgICB9KSk7XG4gICAgZmlsZXBvbmQuc2VydmVyLnVybCA9IGZvcm0uYXR0cignYWN0aW9uJyk7XG59Il0sIm5hbWVzIjpbIiQiLCJqUXVlcnkiLCJyZXF1aXJlIiwicm91dGVzIiwiUm91dGluZyIsIkZpbGVQb25kIiwiRmlsZVBvbmRQbHVnaW5GaWxlVmFsaWRhdGVUeXBlIiwicmVnaXN0ZXJQbHVnaW4iLCJzZXRSb3V0aW5nRGF0YSIsImZpbGVwb25kIiwiaW5wdXRFbGVtZW50IiwiZm9ybSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImNyZWF0ZSIsImFsbG93TXVsdGlwbGUiLCJzZXJ2ZXIiLCJjbG9zZXN0IiwiYXR0ciIsIm1heFBhcmFsbGVsVXBsb2FkcyIsImFsbG93RHJvcCIsImFsbG93UmV2ZXJ0IiwibGFiZWxJZGxlIiwiYWxsb3dGaWxlVHlwZVZhbGlkYXRpb24iLCJhY2NlcHRlZEZpbGVUeXBlcyIsInNldFVybCIsInZhbCIsIm9uIiwiZSIsImNhdGFsb2dJZCIsImdlbmVyYXRlIiwidXJsIl0sInNvdXJjZVJvb3QiOiIifQ==