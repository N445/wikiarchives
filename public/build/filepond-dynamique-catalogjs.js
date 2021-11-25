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
/* provided dependency */ var jQuery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
var $ = jQuery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");

var routes = __webpack_require__(/*! ../../public/js/fos_js_routes.json */ "./public/js/fos_js_routes.json");



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
    labelIdle: 'Glissez et déposez vos fichiers ou <span class="filepond--label-action"> Parcourir </span>'
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
/******/ __webpack_require__.O(0, ["vendors-node_modules_jquery_dist_jquery_js","vendors-node_modules_core-js_internals_array-iteration_js-node_modules_core-js_internals_export_js","vendors-node_modules_filepond_dist_filepond_js","vendors-node_modules_core-js_internals_add-to-unscopables_js-node_modules_core-js_modules_es_-4a17ad","vendors-node_modules_core-js_modules_es_array_for-each_js-node_modules_core-js_modules_es_obj-04c62c","vendor_friendsofsymfony_jsrouting-bundle_Resources_public_js_router_min_js-public_js_fos_js_r-064a7f"], () => (__webpack_exec__("./assets/admin/filepond-dynamique-catalog.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZXBvbmQtZHluYW1pcXVlLWNhdGFsb2dqcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFNQSxDQUFDLEdBQUdDLE1BQU0sR0FBR0MsbUJBQU8sQ0FBQyxvREFBRCxDQUExQjs7QUFDQSxJQUFNQyxNQUFNLEdBQUdELG1CQUFPLENBQUMsMEVBQUQsQ0FBdEI7O0FBQ0E7QUFDQTtBQUVBRSxpSUFBQSxDQUF1QkQsTUFBdkI7QUFFQSxJQUFJSSxRQUFKO0FBQ0EsSUFBSUMsWUFBSjtBQUNBLElBQUlDLElBQUksR0FBR1QsQ0FBQyxDQUFDLE1BQUQsQ0FBWjtBQUVBQSxDQUFDLENBQUMsWUFBWTtBQUNWUSxFQUFBQSxZQUFZLEdBQUdFLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixXQUF2QixDQUFmO0FBQ0FKLEVBQUFBLFFBQVEsR0FBR0YsNENBQUEsQ0FBZ0JHLFlBQWhCLEVBQThCO0FBQ3JDSyxJQUFBQSxhQUFhLEVBQUUsSUFEc0I7QUFFckNDLElBQUFBLE1BQU0sRUFBRWQsQ0FBQyxDQUFDLFdBQUQsQ0FBRCxDQUFlZSxPQUFmLENBQXVCLE1BQXZCLEVBQStCQyxJQUEvQixDQUFvQyxRQUFwQyxDQUY2QjtBQUdyQ0MsSUFBQUEsa0JBQWtCLEVBQUUsRUFIaUI7QUFJckNDLElBQUFBLFNBQVMsRUFBRSxJQUowQjtBQUtyQ0MsSUFBQUEsV0FBVyxFQUFFLEtBTHdCO0FBTXJDQyxJQUFBQSxTQUFTLEVBQUU7QUFOMEIsR0FBOUIsQ0FBWDtBQVNBQyxFQUFBQSxNQUFNLENBQUNyQixDQUFDLENBQUMsd0JBQUQsQ0FBRCxDQUE0QnNCLEdBQTVCLEVBQUQsQ0FBTjtBQUNBdEIsRUFBQUEsQ0FBQyxDQUFDLHdCQUFELENBQUQsQ0FBNEJ1QixFQUE1QixDQUErQixRQUEvQixFQUF5QyxVQUFVQyxDQUFWLEVBQWE7QUFDbERILElBQUFBLE1BQU0sQ0FBQ3JCLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUXNCLEdBQVIsRUFBRCxDQUFOO0FBQ0gsR0FGRDtBQUdILENBZkEsQ0FBRDs7QUFpQkEsU0FBU0QsTUFBVCxDQUFnQkksU0FBaEIsRUFBMkI7QUFDdkJoQixFQUFBQSxJQUFJLENBQUNPLElBQUwsQ0FBVSxRQUFWLEVBQW9CWiwySEFBQSxDQUFpQiwrQkFBakIsRUFBa0Q7QUFDbEUsaUJBQWFxQjtBQURxRCxHQUFsRCxDQUFwQjtBQUdBbEIsRUFBQUEsUUFBUSxDQUFDTyxNQUFULENBQWdCYSxHQUFoQixHQUFzQmxCLElBQUksQ0FBQ08sSUFBTCxDQUFVLFFBQVYsQ0FBdEI7QUFDSCIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2Fzc2V0cy9hZG1pbi9maWxlcG9uZC1keW5hbWlxdWUtY2F0YWxvZy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCAkID0galF1ZXJ5ID0gcmVxdWlyZShcImpxdWVyeVwiKTtcbmNvbnN0IHJvdXRlcyA9IHJlcXVpcmUoJy4uLy4uL3B1YmxpYy9qcy9mb3NfanNfcm91dGVzLmpzb24nKTtcbmltcG9ydCBSb3V0aW5nIGZyb20gJy4uLy4uL3ZlbmRvci9mcmllbmRzb2ZzeW1mb255L2pzcm91dGluZy1idW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qcy9yb3V0ZXIubWluLmpzJztcbmltcG9ydCAqIGFzIEZpbGVQb25kIGZyb20gXCJmaWxlcG9uZFwiO1xuXG5Sb3V0aW5nLnNldFJvdXRpbmdEYXRhKHJvdXRlcyk7XG5cbmxldCBmaWxlcG9uZDtcbmxldCBpbnB1dEVsZW1lbnQ7XG5sZXQgZm9ybSA9ICQoJ2Zvcm0nKTtcblxuJChmdW5jdGlvbiAoKSB7XG4gICAgaW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZpbGVwb25kJyk7XG4gICAgZmlsZXBvbmQgPSBGaWxlUG9uZC5jcmVhdGUoaW5wdXRFbGVtZW50LCB7XG4gICAgICAgIGFsbG93TXVsdGlwbGU6IHRydWUsXG4gICAgICAgIHNlcnZlcjogJCgnLmZpbGVwb25kJykuY2xvc2VzdCgnZm9ybScpLmF0dHIoJ2FjdGlvbicpLFxuICAgICAgICBtYXhQYXJhbGxlbFVwbG9hZHM6IDEwLFxuICAgICAgICBhbGxvd0Ryb3A6IHRydWUsXG4gICAgICAgIGFsbG93UmV2ZXJ0OiBmYWxzZSxcbiAgICAgICAgbGFiZWxJZGxlOiAnR2xpc3NleiBldCBkw6lwb3NleiB2b3MgZmljaGllcnMgb3UgPHNwYW4gY2xhc3M9XCJmaWxlcG9uZC0tbGFiZWwtYWN0aW9uXCI+IFBhcmNvdXJpciA8L3NwYW4+JyxcbiAgICB9KTtcblxuICAgIHNldFVybCgkKCdzZWxlY3RbbmFtZT1cImNhdGFsb2dcIl0nKS52YWwoKSk7XG4gICAgJCgnc2VsZWN0W25hbWU9XCJjYXRhbG9nXCJdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHNldFVybCgkKHRoaXMpLnZhbCgpKTtcbiAgICB9KVxufSk7XG5cbmZ1bmN0aW9uIHNldFVybChjYXRhbG9nSWQpIHtcbiAgICBmb3JtLmF0dHIoJ2FjdGlvbicsIFJvdXRpbmcuZ2VuZXJhdGUoJ0FKQVhfQ0FUQUxPR19QSUNUVVJFX0ZJTEVQT05EJywge1xuICAgICAgICAnY2F0YWxvZ0lkJzogY2F0YWxvZ0lkLFxuICAgIH0pKTtcbiAgICBmaWxlcG9uZC5zZXJ2ZXIudXJsID0gZm9ybS5hdHRyKCdhY3Rpb24nKTtcbn0iXSwibmFtZXMiOlsiJCIsImpRdWVyeSIsInJlcXVpcmUiLCJyb3V0ZXMiLCJSb3V0aW5nIiwiRmlsZVBvbmQiLCJzZXRSb3V0aW5nRGF0YSIsImZpbGVwb25kIiwiaW5wdXRFbGVtZW50IiwiZm9ybSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImNyZWF0ZSIsImFsbG93TXVsdGlwbGUiLCJzZXJ2ZXIiLCJjbG9zZXN0IiwiYXR0ciIsIm1heFBhcmFsbGVsVXBsb2FkcyIsImFsbG93RHJvcCIsImFsbG93UmV2ZXJ0IiwibGFiZWxJZGxlIiwic2V0VXJsIiwidmFsIiwib24iLCJlIiwiY2F0YWxvZ0lkIiwiZ2VuZXJhdGUiLCJ1cmwiXSwic291cmNlUm9vdCI6IiJ9