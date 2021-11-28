(self["webpackChunk"] = self["webpackChunk"] || []).push([["place-map-formjs"],{

/***/ "./assets/admin/place/map-form.js":
/*!****************************************!*\
  !*** ./assets/admin/place/map-form.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
__webpack_require__(/*! core-js/modules/es.array.map.js */ "./node_modules/core-js/modules/es.array.map.js");

var L = __webpack_require__(/*! leaflet */ "./node_modules/leaflet/dist/leaflet-src.js");

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: __webpack_require__(/*! leaflet/dist/images/marker-icon-2x.png */ "./node_modules/leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: __webpack_require__(/*! leaflet/dist/images/marker-icon.png */ "./node_modules/leaflet/dist/images/marker-icon.png"),
  shadowUrl: __webpack_require__(/*! leaflet/dist/images/marker-shadow.png */ "./node_modules/leaflet/dist/images/marker-shadow.png")
});
var marker;
var map = L.map('map', {
  center: [28.396837, -80.605659],
  zoom: 5
});
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {}).addTo(map);

if ($('#map').data('position') !== undefined) {
  var position = $('#map').data('position');
  marker = L.marker([position.lat, position.lng]).addTo(map);
  map.setView([position.lat, position.lng]);
}

if (!$('#map').hasClass('read-only')) {
  map.on('click', function (e) {
    $('.place-map-lat').val(e.latlng.lat);
    $('.place-map-lng').val(e.latlng.lng);

    if (marker !== undefined) {
      map.removeLayer(marker);
    }

    marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
  });
}

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_jquery_dist_jquery_js","vendors-node_modules_core-js_internals_array-iteration_js-node_modules_core-js_internals_export_js","vendors-node_modules_core-js_modules_es_array_map_js-node_modules_leaflet_dist_leaflet-src_js-e0c243"], () => (__webpack_exec__("./assets/admin/place/map-form.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhY2UtbWFwLWZvcm1qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLElBQU1BLENBQUMsR0FBR0MsbUJBQU8sQ0FBQywyREFBRCxDQUFqQjs7QUFFQSxPQUFPRCxDQUFDLENBQUNFLElBQUYsQ0FBT0MsT0FBUCxDQUFlQyxTQUFmLENBQXlCQyxXQUFoQztBQUVBTCxDQUFDLENBQUNFLElBQUYsQ0FBT0MsT0FBUCxDQUFlRyxZQUFmLENBQTRCO0FBQ3hCQyxFQUFBQSxhQUFhLEVBQUVOLG1CQUFPLENBQUMscUdBQUQsQ0FERTtBQUV4Qk8sRUFBQUEsT0FBTyxFQUFFUCxtQkFBTyxDQUFDLCtGQUFELENBRlE7QUFHeEJRLEVBQUFBLFNBQVMsRUFBRVIsbUJBQU8sQ0FBQyxtR0FBRDtBQUhNLENBQTVCO0FBTUEsSUFBSVMsTUFBSjtBQUVBLElBQUlDLEdBQUcsR0FBR1gsQ0FBQyxDQUFDVyxHQUFGLENBQU0sS0FBTixFQUFhO0FBQ25CQyxFQUFBQSxNQUFNLEVBQUUsQ0FBQyxTQUFELEVBQVksQ0FBQyxTQUFiLENBRFc7QUFFbkJDLEVBQUFBLElBQUksRUFBRTtBQUZhLENBQWIsQ0FBVjtBQUtBYixDQUFDLENBQUNjLFNBQUYsQ0FBWSwrREFBWixFQUE2RSxFQUE3RSxFQUFpRkMsS0FBakYsQ0FBdUZKLEdBQXZGOztBQUdBLElBQUlLLENBQUMsQ0FBQyxNQUFELENBQUQsQ0FBVUMsSUFBVixDQUFlLFVBQWYsTUFBK0JDLFNBQW5DLEVBQThDO0FBQzFDLE1BQUlDLFFBQVEsR0FBR0gsQ0FBQyxDQUFDLE1BQUQsQ0FBRCxDQUFVQyxJQUFWLENBQWUsVUFBZixDQUFmO0FBQ0FQLEVBQUFBLE1BQU0sR0FBR1YsQ0FBQyxDQUFDVSxNQUFGLENBQVMsQ0FBQ1MsUUFBUSxDQUFDQyxHQUFWLEVBQWVELFFBQVEsQ0FBQ0UsR0FBeEIsQ0FBVCxFQUF1Q04sS0FBdkMsQ0FBNkNKLEdBQTdDLENBQVQ7QUFDQUEsRUFBQUEsR0FBRyxDQUFDVyxPQUFKLENBQVksQ0FBQ0gsUUFBUSxDQUFDQyxHQUFWLEVBQWVELFFBQVEsQ0FBQ0UsR0FBeEIsQ0FBWjtBQUNIOztBQUVELElBQUcsQ0FBQ0wsQ0FBQyxDQUFDLE1BQUQsQ0FBRCxDQUFVTyxRQUFWLENBQW1CLFdBQW5CLENBQUosRUFBb0M7QUFDaENaLEVBQUFBLEdBQUcsQ0FBQ2EsRUFBSixDQUFPLE9BQVAsRUFBZ0IsVUFBVUMsQ0FBVixFQUFhO0FBQ3pCVCxJQUFBQSxDQUFDLENBQUMsZ0JBQUQsQ0FBRCxDQUFvQlUsR0FBcEIsQ0FBd0JELENBQUMsQ0FBQ0UsTUFBRixDQUFTUCxHQUFqQztBQUNBSixJQUFBQSxDQUFDLENBQUMsZ0JBQUQsQ0FBRCxDQUFvQlUsR0FBcEIsQ0FBd0JELENBQUMsQ0FBQ0UsTUFBRixDQUFTTixHQUFqQzs7QUFDQSxRQUFJWCxNQUFNLEtBQUtRLFNBQWYsRUFBMEI7QUFDdEJQLE1BQUFBLEdBQUcsQ0FBQ2lCLFdBQUosQ0FBZ0JsQixNQUFoQjtBQUNIOztBQUNEQSxJQUFBQSxNQUFNLEdBQUdWLENBQUMsQ0FBQ1UsTUFBRixDQUFTLENBQUNlLENBQUMsQ0FBQ0UsTUFBRixDQUFTUCxHQUFWLEVBQWVLLENBQUMsQ0FBQ0UsTUFBRixDQUFTTixHQUF4QixDQUFULEVBQXVDTixLQUF2QyxDQUE2Q0osR0FBN0MsQ0FBVDtBQUNILEdBUEQ7QUFRSCIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2Fzc2V0cy9hZG1pbi9wbGFjZS9tYXAtZm9ybS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBMID0gcmVxdWlyZSgnbGVhZmxldCcpO1xuXG5kZWxldGUgTC5JY29uLkRlZmF1bHQucHJvdG90eXBlLl9nZXRJY29uVXJsO1xuXG5MLkljb24uRGVmYXVsdC5tZXJnZU9wdGlvbnMoe1xuICAgIGljb25SZXRpbmFVcmw6IHJlcXVpcmUoJ2xlYWZsZXQvZGlzdC9pbWFnZXMvbWFya2VyLWljb24tMngucG5nJyksXG4gICAgaWNvblVybDogcmVxdWlyZSgnbGVhZmxldC9kaXN0L2ltYWdlcy9tYXJrZXItaWNvbi5wbmcnKSxcbiAgICBzaGFkb3dVcmw6IHJlcXVpcmUoJ2xlYWZsZXQvZGlzdC9pbWFnZXMvbWFya2VyLXNoYWRvdy5wbmcnKSxcbn0pO1xuXG5sZXQgbWFya2VyO1xuXG5sZXQgbWFwID0gTC5tYXAoJ21hcCcsIHtcbiAgICBjZW50ZXI6IFsyOC4zOTY4MzcsIC04MC42MDU2NTldLFxuICAgIHpvb206IDVcbn0pO1xuXG5MLnRpbGVMYXllcignaHR0cHM6Ly97c30uYmFzZW1hcHMuY2FydG9jZG4uY29tL2RhcmtfYWxsL3t6fS97eH0ve3l9e3J9LnBuZycsIHt9KS5hZGRUbyhtYXApO1xuXG5cbmlmICgkKCcjbWFwJykuZGF0YSgncG9zaXRpb24nKSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgbGV0IHBvc2l0aW9uID0gJCgnI21hcCcpLmRhdGEoJ3Bvc2l0aW9uJyk7XG4gICAgbWFya2VyID0gTC5tYXJrZXIoW3Bvc2l0aW9uLmxhdCwgcG9zaXRpb24ubG5nXSkuYWRkVG8obWFwKTtcbiAgICBtYXAuc2V0VmlldyhbcG9zaXRpb24ubGF0LCBwb3NpdGlvbi5sbmddKTtcbn1cblxuaWYoISQoJyNtYXAnKS5oYXNDbGFzcygncmVhZC1vbmx5Jykpe1xuICAgIG1hcC5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAkKCcucGxhY2UtbWFwLWxhdCcpLnZhbChlLmxhdGxuZy5sYXQpO1xuICAgICAgICAkKCcucGxhY2UtbWFwLWxuZycpLnZhbChlLmxhdGxuZy5sbmcpO1xuICAgICAgICBpZiAobWFya2VyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIG1hcC5yZW1vdmVMYXllcihtYXJrZXIpXG4gICAgICAgIH1cbiAgICAgICAgbWFya2VyID0gTC5tYXJrZXIoW2UubGF0bG5nLmxhdCwgZS5sYXRsbmcubG5nXSkuYWRkVG8obWFwKTtcbiAgICB9KTtcbn1cbiJdLCJuYW1lcyI6WyJMIiwicmVxdWlyZSIsIkljb24iLCJEZWZhdWx0IiwicHJvdG90eXBlIiwiX2dldEljb25VcmwiLCJtZXJnZU9wdGlvbnMiLCJpY29uUmV0aW5hVXJsIiwiaWNvblVybCIsInNoYWRvd1VybCIsIm1hcmtlciIsIm1hcCIsImNlbnRlciIsInpvb20iLCJ0aWxlTGF5ZXIiLCJhZGRUbyIsIiQiLCJkYXRhIiwidW5kZWZpbmVkIiwicG9zaXRpb24iLCJsYXQiLCJsbmciLCJzZXRWaWV3IiwiaGFzQ2xhc3MiLCJvbiIsImUiLCJ2YWwiLCJsYXRsbmciLCJyZW1vdmVMYXllciJdLCJzb3VyY2VSb290IjoiIn0=