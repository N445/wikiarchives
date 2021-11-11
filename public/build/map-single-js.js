(self["webpackChunk"] = self["webpackChunk"] || []).push([["map-single-js"],{

/***/ "./assets/map-single.js":
/*!******************************!*\
  !*** ./assets/map-single.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
__webpack_require__(/*! core-js/modules/es.array.map.js */ "./node_modules/core-js/modules/es.array.map.js");

var L = __webpack_require__(/*! leaflet */ "./node_modules/leaflet/dist/leaflet-src.js");

__webpack_require__(/*! leaflet.markercluster */ "./node_modules/leaflet.markercluster/dist/leaflet.markercluster-src.js"); // require('leaflet/dist/images/');


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: __webpack_require__(/*! leaflet/dist/images/marker-icon-2x.png */ "./node_modules/leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: __webpack_require__(/*! leaflet/dist/images/marker-icon.png */ "./node_modules/leaflet/dist/images/marker-icon.png"),
  shadowUrl: __webpack_require__(/*! leaflet/dist/images/marker-shadow.png */ "./node_modules/leaflet/dist/images/marker-shadow.png")
}); // initialize the map on the "map" div with a given center and zoom

var picture = JSON.parse($('[data-picture]').attr('data-picture'));
var map = L.map('map', {
  center: [picture.lat, picture.lng],
  zoom: 12
}); // L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {}).addTo(map);

L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {}).addTo(map);
L.marker([picture.lat, picture.lng]).addTo(map);

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_jquery_dist_jquery_js","vendors-node_modules_core-js_internals_array-iteration_js-node_modules_core-js_internals_export_js","vendors-node_modules_core-js_modules_es_array_map_js-node_modules_leaflet_markercluster_dist_-332fac"], () => (__webpack_exec__("./assets/map-single.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLXNpbmdsZS1qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLElBQU1BLENBQUMsR0FBR0MsbUJBQU8sQ0FBQywyREFBRCxDQUFqQjs7QUFDQUEsbUJBQU8sQ0FBQyxxR0FBRCxDQUFQLEVBQ0E7OztBQUVBLE9BQU9ELENBQUMsQ0FBQ0UsSUFBRixDQUFPQyxPQUFQLENBQWVDLFNBQWYsQ0FBeUJDLFdBQWhDO0FBRUFMLENBQUMsQ0FBQ0UsSUFBRixDQUFPQyxPQUFQLENBQWVHLFlBQWYsQ0FBNEI7QUFDeEJDLEVBQUFBLGFBQWEsRUFBRU4sbUJBQU8sQ0FBQyxxR0FBRCxDQURFO0FBRXhCTyxFQUFBQSxPQUFPLEVBQUVQLG1CQUFPLENBQUMsK0ZBQUQsQ0FGUTtBQUd4QlEsRUFBQUEsU0FBUyxFQUFFUixtQkFBTyxDQUFDLG1HQUFEO0FBSE0sQ0FBNUIsR0FPQTs7QUFDQSxJQUFNUyxPQUFPLEdBQUdDLElBQUksQ0FBQ0MsS0FBTCxDQUFXQyxDQUFDLENBQUMsZ0JBQUQsQ0FBRCxDQUFvQkMsSUFBcEIsQ0FBeUIsY0FBekIsQ0FBWCxDQUFoQjtBQUNBLElBQUlDLEdBQUcsR0FBR2YsQ0FBQyxDQUFDZSxHQUFGLENBQU0sS0FBTixFQUFZO0FBQ2xCQyxFQUFBQSxNQUFNLEVBQUUsQ0FBQ04sT0FBTyxDQUFDTyxHQUFULEVBQWNQLE9BQU8sQ0FBQ1EsR0FBdEIsQ0FEVTtBQUVsQkMsRUFBQUEsSUFBSSxFQUFDO0FBRmEsQ0FBWixDQUFWLEVBS0E7O0FBQ0FuQixDQUFDLENBQUNvQixTQUFGLENBQVksK0RBQVosRUFBNkUsRUFBN0UsRUFBaUZDLEtBQWpGLENBQXVGTixHQUF2RjtBQUVBZixDQUFDLENBQUNzQixNQUFGLENBQVMsQ0FBQ1osT0FBTyxDQUFDTyxHQUFULEVBQWNQLE9BQU8sQ0FBQ1EsR0FBdEIsQ0FBVCxFQUFxQ0csS0FBckMsQ0FBMkNOLEdBQTNDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vYXNzZXRzL21hcC1zaW5nbGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgTCA9IHJlcXVpcmUoJ2xlYWZsZXQnKTtcbnJlcXVpcmUoJ2xlYWZsZXQubWFya2VyY2x1c3RlcicpO1xuLy8gcmVxdWlyZSgnbGVhZmxldC9kaXN0L2ltYWdlcy8nKTtcblxuZGVsZXRlIEwuSWNvbi5EZWZhdWx0LnByb3RvdHlwZS5fZ2V0SWNvblVybDtcblxuTC5JY29uLkRlZmF1bHQubWVyZ2VPcHRpb25zKHtcbiAgICBpY29uUmV0aW5hVXJsOiByZXF1aXJlKCdsZWFmbGV0L2Rpc3QvaW1hZ2VzL21hcmtlci1pY29uLTJ4LnBuZycpLFxuICAgIGljb25Vcmw6IHJlcXVpcmUoJ2xlYWZsZXQvZGlzdC9pbWFnZXMvbWFya2VyLWljb24ucG5nJyksXG4gICAgc2hhZG93VXJsOiByZXF1aXJlKCdsZWFmbGV0L2Rpc3QvaW1hZ2VzL21hcmtlci1zaGFkb3cucG5nJyksXG59KTtcblxuXG4vLyBpbml0aWFsaXplIHRoZSBtYXAgb24gdGhlIFwibWFwXCIgZGl2IHdpdGggYSBnaXZlbiBjZW50ZXIgYW5kIHpvb21cbmNvbnN0IHBpY3R1cmUgPSBKU09OLnBhcnNlKCQoJ1tkYXRhLXBpY3R1cmVdJykuYXR0cignZGF0YS1waWN0dXJlJykpO1xudmFyIG1hcCA9IEwubWFwKCdtYXAnLHtcbiAgICBjZW50ZXI6IFtwaWN0dXJlLmxhdCwgcGljdHVyZS5sbmddLFxuICAgIHpvb206MTJcbn0pO1xuXG4vLyBMLnRpbGVMYXllcignaHR0cHM6Ly90aWxlcy5zdGFkaWFtYXBzLmNvbS90aWxlcy9hbGlkYWRlX3Ntb290aF9kYXJrL3t6fS97eH0ve3l9e3J9LnBuZycsIHt9KS5hZGRUbyhtYXApO1xuTC50aWxlTGF5ZXIoJ2h0dHBzOi8ve3N9LmJhc2VtYXBzLmNhcnRvY2RuLmNvbS9kYXJrX2FsbC97en0ve3h9L3t5fXtyfS5wbmcnLCB7fSkuYWRkVG8obWFwKTtcblxuTC5tYXJrZXIoW3BpY3R1cmUubGF0LCBwaWN0dXJlLmxuZ10pLmFkZFRvKG1hcCk7XG5cbiJdLCJuYW1lcyI6WyJMIiwicmVxdWlyZSIsIkljb24iLCJEZWZhdWx0IiwicHJvdG90eXBlIiwiX2dldEljb25VcmwiLCJtZXJnZU9wdGlvbnMiLCJpY29uUmV0aW5hVXJsIiwiaWNvblVybCIsInNoYWRvd1VybCIsInBpY3R1cmUiLCJKU09OIiwicGFyc2UiLCIkIiwiYXR0ciIsIm1hcCIsImNlbnRlciIsImxhdCIsImxuZyIsInpvb20iLCJ0aWxlTGF5ZXIiLCJhZGRUbyIsIm1hcmtlciJdLCJzb3VyY2VSb290IjoiIn0=