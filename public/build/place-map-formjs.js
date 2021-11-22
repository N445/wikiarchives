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
    $('#place_lat').val(e.latlng.lat);
    $('#place_lng').val(e.latlng.lng);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhY2UtbWFwLWZvcm1qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLElBQU1BLENBQUMsR0FBR0MsbUJBQU8sQ0FBQywyREFBRCxDQUFqQjs7QUFFQSxPQUFPRCxDQUFDLENBQUNFLElBQUYsQ0FBT0MsT0FBUCxDQUFlQyxTQUFmLENBQXlCQyxXQUFoQztBQUVBTCxDQUFDLENBQUNFLElBQUYsQ0FBT0MsT0FBUCxDQUFlRyxZQUFmLENBQTRCO0FBQ3hCQyxFQUFBQSxhQUFhLEVBQUVOLG1CQUFPLENBQUMscUdBQUQsQ0FERTtBQUV4Qk8sRUFBQUEsT0FBTyxFQUFFUCxtQkFBTyxDQUFDLCtGQUFELENBRlE7QUFHeEJRLEVBQUFBLFNBQVMsRUFBRVIsbUJBQU8sQ0FBQyxtR0FBRDtBQUhNLENBQTVCO0FBTUEsSUFBSVMsTUFBSjtBQUVBLElBQUlDLEdBQUcsR0FBR1gsQ0FBQyxDQUFDVyxHQUFGLENBQU0sS0FBTixFQUFhO0FBQ25CQyxFQUFBQSxNQUFNLEVBQUUsQ0FBQyxTQUFELEVBQVksQ0FBQyxTQUFiLENBRFc7QUFFbkJDLEVBQUFBLElBQUksRUFBRTtBQUZhLENBQWIsQ0FBVjtBQUtBYixDQUFDLENBQUNjLFNBQUYsQ0FBWSwrREFBWixFQUE2RSxFQUE3RSxFQUFpRkMsS0FBakYsQ0FBdUZKLEdBQXZGOztBQUdBLElBQUlLLENBQUMsQ0FBQyxNQUFELENBQUQsQ0FBVUMsSUFBVixDQUFlLFVBQWYsTUFBK0JDLFNBQW5DLEVBQThDO0FBQzFDLE1BQUlDLFFBQVEsR0FBR0gsQ0FBQyxDQUFDLE1BQUQsQ0FBRCxDQUFVQyxJQUFWLENBQWUsVUFBZixDQUFmO0FBQ0FQLEVBQUFBLE1BQU0sR0FBR1YsQ0FBQyxDQUFDVSxNQUFGLENBQVMsQ0FBQ1MsUUFBUSxDQUFDQyxHQUFWLEVBQWVELFFBQVEsQ0FBQ0UsR0FBeEIsQ0FBVCxFQUF1Q04sS0FBdkMsQ0FBNkNKLEdBQTdDLENBQVQ7QUFDQUEsRUFBQUEsR0FBRyxDQUFDVyxPQUFKLENBQVksQ0FBQ0gsUUFBUSxDQUFDQyxHQUFWLEVBQWVELFFBQVEsQ0FBQ0UsR0FBeEIsQ0FBWjtBQUNIOztBQUVELElBQUcsQ0FBQ0wsQ0FBQyxDQUFDLE1BQUQsQ0FBRCxDQUFVTyxRQUFWLENBQW1CLFdBQW5CLENBQUosRUFBb0M7QUFDaENaLEVBQUFBLEdBQUcsQ0FBQ2EsRUFBSixDQUFPLE9BQVAsRUFBZ0IsVUFBVUMsQ0FBVixFQUFhO0FBQ3pCVCxJQUFBQSxDQUFDLENBQUMsWUFBRCxDQUFELENBQWdCVSxHQUFoQixDQUFvQkQsQ0FBQyxDQUFDRSxNQUFGLENBQVNQLEdBQTdCO0FBQ0FKLElBQUFBLENBQUMsQ0FBQyxZQUFELENBQUQsQ0FBZ0JVLEdBQWhCLENBQW9CRCxDQUFDLENBQUNFLE1BQUYsQ0FBU04sR0FBN0I7O0FBQ0EsUUFBSVgsTUFBTSxLQUFLUSxTQUFmLEVBQTBCO0FBQ3RCUCxNQUFBQSxHQUFHLENBQUNpQixXQUFKLENBQWdCbEIsTUFBaEI7QUFDSDs7QUFDREEsSUFBQUEsTUFBTSxHQUFHVixDQUFDLENBQUNVLE1BQUYsQ0FBUyxDQUFDZSxDQUFDLENBQUNFLE1BQUYsQ0FBU1AsR0FBVixFQUFlSyxDQUFDLENBQUNFLE1BQUYsQ0FBU04sR0FBeEIsQ0FBVCxFQUF1Q04sS0FBdkMsQ0FBNkNKLEdBQTdDLENBQVQ7QUFDSCxHQVBEO0FBUUgiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvYWRtaW4vcGxhY2UvbWFwLWZvcm0uanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgTCA9IHJlcXVpcmUoJ2xlYWZsZXQnKTtcblxuZGVsZXRlIEwuSWNvbi5EZWZhdWx0LnByb3RvdHlwZS5fZ2V0SWNvblVybDtcblxuTC5JY29uLkRlZmF1bHQubWVyZ2VPcHRpb25zKHtcbiAgICBpY29uUmV0aW5hVXJsOiByZXF1aXJlKCdsZWFmbGV0L2Rpc3QvaW1hZ2VzL21hcmtlci1pY29uLTJ4LnBuZycpLFxuICAgIGljb25Vcmw6IHJlcXVpcmUoJ2xlYWZsZXQvZGlzdC9pbWFnZXMvbWFya2VyLWljb24ucG5nJyksXG4gICAgc2hhZG93VXJsOiByZXF1aXJlKCdsZWFmbGV0L2Rpc3QvaW1hZ2VzL21hcmtlci1zaGFkb3cucG5nJyksXG59KTtcblxubGV0IG1hcmtlcjtcblxubGV0IG1hcCA9IEwubWFwKCdtYXAnLCB7XG4gICAgY2VudGVyOiBbMjguMzk2ODM3LCAtODAuNjA1NjU5XSxcbiAgICB6b29tOiA1XG59KTtcblxuTC50aWxlTGF5ZXIoJ2h0dHBzOi8ve3N9LmJhc2VtYXBzLmNhcnRvY2RuLmNvbS9kYXJrX2FsbC97en0ve3h9L3t5fXtyfS5wbmcnLCB7fSkuYWRkVG8obWFwKTtcblxuXG5pZiAoJCgnI21hcCcpLmRhdGEoJ3Bvc2l0aW9uJykgIT09IHVuZGVmaW5lZCkge1xuICAgIGxldCBwb3NpdGlvbiA9ICQoJyNtYXAnKS5kYXRhKCdwb3NpdGlvbicpO1xuICAgIG1hcmtlciA9IEwubWFya2VyKFtwb3NpdGlvbi5sYXQsIHBvc2l0aW9uLmxuZ10pLmFkZFRvKG1hcCk7XG4gICAgbWFwLnNldFZpZXcoW3Bvc2l0aW9uLmxhdCwgcG9zaXRpb24ubG5nXSk7XG59XG5cbmlmKCEkKCcjbWFwJykuaGFzQ2xhc3MoJ3JlYWQtb25seScpKXtcbiAgICBtYXAub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgJCgnI3BsYWNlX2xhdCcpLnZhbChlLmxhdGxuZy5sYXQpO1xuICAgICAgICAkKCcjcGxhY2VfbG5nJykudmFsKGUubGF0bG5nLmxuZyk7XG4gICAgICAgIGlmIChtYXJrZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbWFwLnJlbW92ZUxheWVyKG1hcmtlcilcbiAgICAgICAgfVxuICAgICAgICBtYXJrZXIgPSBMLm1hcmtlcihbZS5sYXRsbmcubGF0LCBlLmxhdGxuZy5sbmddKS5hZGRUbyhtYXApO1xuICAgIH0pO1xufVxuIl0sIm5hbWVzIjpbIkwiLCJyZXF1aXJlIiwiSWNvbiIsIkRlZmF1bHQiLCJwcm90b3R5cGUiLCJfZ2V0SWNvblVybCIsIm1lcmdlT3B0aW9ucyIsImljb25SZXRpbmFVcmwiLCJpY29uVXJsIiwic2hhZG93VXJsIiwibWFya2VyIiwibWFwIiwiY2VudGVyIiwiem9vbSIsInRpbGVMYXllciIsImFkZFRvIiwiJCIsImRhdGEiLCJ1bmRlZmluZWQiLCJwb3NpdGlvbiIsImxhdCIsImxuZyIsInNldFZpZXciLCJoYXNDbGFzcyIsIm9uIiwiZSIsInZhbCIsImxhdGxuZyIsInJlbW92ZUxheWVyIl0sInNvdXJjZVJvb3QiOiIifQ==