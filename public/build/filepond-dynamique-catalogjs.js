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
var lang = $('html').attr('lang');
var labelIdle = 'Drag and drop your files or <span class="filepond--label-action"> Browse </span>';

if ('fr' === lang) {
  labelIdle = 'Glissez et déposez vos fichiers ou <span class="filepond--label-action"> Parcourir </span>';
}

$(function () {
  inputElement = document.querySelector('.filepond');
  filepond = filepond__WEBPACK_IMPORTED_MODULE_1__.create(inputElement, {
    allowMultiple: true,
    server: $('.filepond').closest('form').attr('action'),
    maxParallelUploads: 10,
    allowDrop: true,
    allowRevert: false,
    labelIdle: labelIdle,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZXBvbmQtZHluYW1pcXVlLWNhdGFsb2dqcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQU1BLENBQUMsR0FBR0MsTUFBTSxHQUFHQyxtQkFBTyxDQUFDLG9EQUFELENBQTFCOztBQUNBLElBQU1DLE1BQU0sR0FBR0QsbUJBQU8sQ0FBQywwRUFBRCxDQUF0Qjs7QUFDQTtBQUNBO0FBQ0E7QUFDQUcsb0RBQUEsQ0FBd0JDLDJFQUF4QjtBQUVBRixpSUFBQSxDQUF1QkQsTUFBdkI7QUFFQSxJQUFJTSxRQUFKO0FBQ0EsSUFBSUMsWUFBSjtBQUNBLElBQUlDLElBQUksR0FBR1gsQ0FBQyxDQUFDLE1BQUQsQ0FBWjtBQUVBLElBQU1ZLElBQUksR0FBR1osQ0FBQyxDQUFDLE1BQUQsQ0FBRCxDQUFVYSxJQUFWLENBQWUsTUFBZixDQUFiO0FBQ0EsSUFBSUMsU0FBUyxHQUFHLGtGQUFoQjs7QUFDQSxJQUFJLFNBQVNGLElBQWIsRUFBbUI7QUFDZkUsRUFBQUEsU0FBUyxHQUFHLDRGQUFaO0FBQ0g7O0FBRURkLENBQUMsQ0FBQyxZQUFZO0FBQ1ZVLEVBQUFBLFlBQVksR0FBR0ssUUFBUSxDQUFDQyxhQUFULENBQXVCLFdBQXZCLENBQWY7QUFDQVAsRUFBQUEsUUFBUSxHQUFHSiw0Q0FBQSxDQUFnQkssWUFBaEIsRUFBOEI7QUFDckNRLElBQUFBLGFBQWEsRUFBRSxJQURzQjtBQUVyQ0MsSUFBQUEsTUFBTSxFQUFFbkIsQ0FBQyxDQUFDLFdBQUQsQ0FBRCxDQUFlb0IsT0FBZixDQUF1QixNQUF2QixFQUErQlAsSUFBL0IsQ0FBb0MsUUFBcEMsQ0FGNkI7QUFHckNRLElBQUFBLGtCQUFrQixFQUFFLEVBSGlCO0FBSXJDQyxJQUFBQSxTQUFTLEVBQUUsSUFKMEI7QUFLckNDLElBQUFBLFdBQVcsRUFBRSxLQUx3QjtBQU1yQ1QsSUFBQUEsU0FBUyxFQUFFQSxTQU4wQjtBQU9yQ1UsSUFBQUEsdUJBQXVCLEVBQUUsSUFQWTtBQVFyQ0MsSUFBQUEsaUJBQWlCLEVBQUUsQ0FBQyxTQUFELEVBQVcsaUJBQVg7QUFSa0IsR0FBOUIsQ0FBWDtBQVdBQyxFQUFBQSxNQUFNLENBQUMxQixDQUFDLENBQUMsd0JBQUQsQ0FBRCxDQUE0QjJCLEdBQTVCLEVBQUQsQ0FBTjtBQUNBM0IsRUFBQUEsQ0FBQyxDQUFDLHdCQUFELENBQUQsQ0FBNEI0QixFQUE1QixDQUErQixRQUEvQixFQUF5QyxVQUFVQyxDQUFWLEVBQWE7QUFDbERILElBQUFBLE1BQU0sQ0FBQzFCLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUTJCLEdBQVIsRUFBRCxDQUFOO0FBQ0gsR0FGRDtBQUdILENBakJBLENBQUQ7O0FBbUJBLFNBQVNELE1BQVQsQ0FBZ0JJLFNBQWhCLEVBQTJCO0FBQ3ZCbkIsRUFBQUEsSUFBSSxDQUFDRSxJQUFMLENBQVUsUUFBVixFQUFvQlQsMkhBQUEsQ0FBaUIsK0JBQWpCLEVBQWtEO0FBQ2xFLGlCQUFhMEI7QUFEcUQsR0FBbEQsQ0FBcEI7QUFHQXJCLEVBQUFBLFFBQVEsQ0FBQ1UsTUFBVCxDQUFnQmEsR0FBaEIsR0FBc0JyQixJQUFJLENBQUNFLElBQUwsQ0FBVSxRQUFWLENBQXRCO0FBQ0giLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvYWRtaW4vZmlsZXBvbmQtZHluYW1pcXVlLWNhdGFsb2cuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgJCA9IGpRdWVyeSA9IHJlcXVpcmUoXCJqcXVlcnlcIik7XG5jb25zdCByb3V0ZXMgPSByZXF1aXJlKCcuLi8uLi9wdWJsaWMvanMvZm9zX2pzX3JvdXRlcy5qc29uJyk7XG5pbXBvcnQgUm91dGluZyBmcm9tICcuLi8uLi92ZW5kb3IvZnJpZW5kc29mc3ltZm9ueS9qc3JvdXRpbmctYnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvanMvcm91dGVyLm1pbi5qcyc7XG5pbXBvcnQgKiBhcyBGaWxlUG9uZCBmcm9tIFwiZmlsZXBvbmRcIjtcbmltcG9ydCBGaWxlUG9uZFBsdWdpbkZpbGVWYWxpZGF0ZVR5cGUgZnJvbSAnZmlsZXBvbmQtcGx1Z2luLWZpbGUtdmFsaWRhdGUtdHlwZSc7XG5GaWxlUG9uZC5yZWdpc3RlclBsdWdpbihGaWxlUG9uZFBsdWdpbkZpbGVWYWxpZGF0ZVR5cGUpO1xuXG5Sb3V0aW5nLnNldFJvdXRpbmdEYXRhKHJvdXRlcyk7XG5cbmxldCBmaWxlcG9uZDtcbmxldCBpbnB1dEVsZW1lbnQ7XG5sZXQgZm9ybSA9ICQoJ2Zvcm0nKTtcblxuY29uc3QgbGFuZyA9ICQoJ2h0bWwnKS5hdHRyKCdsYW5nJyk7XG5sZXQgbGFiZWxJZGxlID0gJ0RyYWcgYW5kIGRyb3AgeW91ciBmaWxlcyBvciA8c3BhbiBjbGFzcz1cImZpbGVwb25kLS1sYWJlbC1hY3Rpb25cIj4gQnJvd3NlIDwvc3Bhbj4nO1xuaWYgKCdmcicgPT09IGxhbmcpIHtcbiAgICBsYWJlbElkbGUgPSAnR2xpc3NleiBldCBkw6lwb3NleiB2b3MgZmljaGllcnMgb3UgPHNwYW4gY2xhc3M9XCJmaWxlcG9uZC0tbGFiZWwtYWN0aW9uXCI+IFBhcmNvdXJpciA8L3NwYW4+Jztcbn1cblxuJChmdW5jdGlvbiAoKSB7XG4gICAgaW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZpbGVwb25kJyk7XG4gICAgZmlsZXBvbmQgPSBGaWxlUG9uZC5jcmVhdGUoaW5wdXRFbGVtZW50LCB7XG4gICAgICAgIGFsbG93TXVsdGlwbGU6IHRydWUsXG4gICAgICAgIHNlcnZlcjogJCgnLmZpbGVwb25kJykuY2xvc2VzdCgnZm9ybScpLmF0dHIoJ2FjdGlvbicpLFxuICAgICAgICBtYXhQYXJhbGxlbFVwbG9hZHM6IDEwLFxuICAgICAgICBhbGxvd0Ryb3A6IHRydWUsXG4gICAgICAgIGFsbG93UmV2ZXJ0OiBmYWxzZSxcbiAgICAgICAgbGFiZWxJZGxlOiBsYWJlbElkbGUsXG4gICAgICAgIGFsbG93RmlsZVR5cGVWYWxpZGF0aW9uOiB0cnVlLFxuICAgICAgICBhY2NlcHRlZEZpbGVUeXBlczogWydpbWFnZS8qJywnYXBwbGljYXRpb24vemlwJ10sXG4gICAgfSk7XG5cbiAgICBzZXRVcmwoJCgnc2VsZWN0W25hbWU9XCJjYXRhbG9nXCJdJykudmFsKCkpO1xuICAgICQoJ3NlbGVjdFtuYW1lPVwiY2F0YWxvZ1wiXScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBzZXRVcmwoJCh0aGlzKS52YWwoKSk7XG4gICAgfSlcbn0pO1xuXG5mdW5jdGlvbiBzZXRVcmwoY2F0YWxvZ0lkKSB7XG4gICAgZm9ybS5hdHRyKCdhY3Rpb24nLCBSb3V0aW5nLmdlbmVyYXRlKCdBSkFYX0NBVEFMT0dfUElDVFVSRV9GSUxFUE9ORCcsIHtcbiAgICAgICAgJ2NhdGFsb2dJZCc6IGNhdGFsb2dJZCxcbiAgICB9KSk7XG4gICAgZmlsZXBvbmQuc2VydmVyLnVybCA9IGZvcm0uYXR0cignYWN0aW9uJyk7XG59Il0sIm5hbWVzIjpbIiQiLCJqUXVlcnkiLCJyZXF1aXJlIiwicm91dGVzIiwiUm91dGluZyIsIkZpbGVQb25kIiwiRmlsZVBvbmRQbHVnaW5GaWxlVmFsaWRhdGVUeXBlIiwicmVnaXN0ZXJQbHVnaW4iLCJzZXRSb3V0aW5nRGF0YSIsImZpbGVwb25kIiwiaW5wdXRFbGVtZW50IiwiZm9ybSIsImxhbmciLCJhdHRyIiwibGFiZWxJZGxlIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY3JlYXRlIiwiYWxsb3dNdWx0aXBsZSIsInNlcnZlciIsImNsb3Nlc3QiLCJtYXhQYXJhbGxlbFVwbG9hZHMiLCJhbGxvd0Ryb3AiLCJhbGxvd1JldmVydCIsImFsbG93RmlsZVR5cGVWYWxpZGF0aW9uIiwiYWNjZXB0ZWRGaWxlVHlwZXMiLCJzZXRVcmwiLCJ2YWwiLCJvbiIsImUiLCJjYXRhbG9nSWQiLCJnZW5lcmF0ZSIsInVybCJdLCJzb3VyY2VSb290IjoiIn0=