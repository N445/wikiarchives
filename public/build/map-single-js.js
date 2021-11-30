(self["webpackChunk"] = self["webpackChunk"] || []).push([["map-single-js"],{

/***/ "./assets/front/map-single.js":
/*!************************************!*\
  !*** ./assets/front/map-single.js ***!
  \************************************/
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
});

if ($('[data-picture]').length > 0) {
  // initialize the map on the "map" div with a given center and zoom
  var picture = JSON.parse($('[data-picture]').attr('data-picture'));
  var map = L.map('map', {
    center: [picture.lat, picture.lng],
    zoom: 12
  }); // L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {}).addTo(map);

  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {}).addTo(map);
  L.marker([picture.lat, picture.lng]).addTo(map);
}

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_jquery_dist_jquery_js","vendors-node_modules_core-js_internals_array-iteration_js-node_modules_core-js_internals_export_js","vendors-node_modules_core-js_modules_es_array_map_js-node_modules_leaflet_dist_leaflet-src_js-e0c243","vendors-node_modules_leaflet_markercluster_dist_leaflet_markercluster-src_js"], () => (__webpack_exec__("./assets/front/map-single.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLXNpbmdsZS1qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLElBQU1BLENBQUMsR0FBR0MsbUJBQU8sQ0FBQywyREFBRCxDQUFqQjs7QUFDQUEsbUJBQU8sQ0FBQyxxR0FBRCxDQUFQLEVBQ0E7OztBQUVBLE9BQU9ELENBQUMsQ0FBQ0UsSUFBRixDQUFPQyxPQUFQLENBQWVDLFNBQWYsQ0FBeUJDLFdBQWhDO0FBRUFMLENBQUMsQ0FBQ0UsSUFBRixDQUFPQyxPQUFQLENBQWVHLFlBQWYsQ0FBNEI7QUFDeEJDLEVBQUFBLGFBQWEsRUFBRU4sbUJBQU8sQ0FBQyxxR0FBRCxDQURFO0FBRXhCTyxFQUFBQSxPQUFPLEVBQUVQLG1CQUFPLENBQUMsK0ZBQUQsQ0FGUTtBQUd4QlEsRUFBQUEsU0FBUyxFQUFFUixtQkFBTyxDQUFDLG1HQUFEO0FBSE0sQ0FBNUI7O0FBTUEsSUFBR1MsQ0FBQyxDQUFDLGdCQUFELENBQUQsQ0FBb0JDLE1BQXBCLEdBQTZCLENBQWhDLEVBQWtDO0FBQzlCO0FBQ0EsTUFBTUMsT0FBTyxHQUFHQyxJQUFJLENBQUNDLEtBQUwsQ0FBV0osQ0FBQyxDQUFDLGdCQUFELENBQUQsQ0FBb0JLLElBQXBCLENBQXlCLGNBQXpCLENBQVgsQ0FBaEI7QUFDQSxNQUFJQyxHQUFHLEdBQUdoQixDQUFDLENBQUNnQixHQUFGLENBQU0sS0FBTixFQUFZO0FBQ2xCQyxJQUFBQSxNQUFNLEVBQUUsQ0FBQ0wsT0FBTyxDQUFDTSxHQUFULEVBQWNOLE9BQU8sQ0FBQ08sR0FBdEIsQ0FEVTtBQUVsQkMsSUFBQUEsSUFBSSxFQUFDO0FBRmEsR0FBWixDQUFWLENBSDhCLENBUWxDOztBQUNJcEIsRUFBQUEsQ0FBQyxDQUFDcUIsU0FBRixDQUFZLCtEQUFaLEVBQTZFLEVBQTdFLEVBQWlGQyxLQUFqRixDQUF1Rk4sR0FBdkY7QUFFQWhCLEVBQUFBLENBQUMsQ0FBQ3VCLE1BQUYsQ0FBUyxDQUFDWCxPQUFPLENBQUNNLEdBQVQsRUFBY04sT0FBTyxDQUFDTyxHQUF0QixDQUFULEVBQXFDRyxLQUFyQyxDQUEyQ04sR0FBM0M7QUFDSCIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2Fzc2V0cy9mcm9udC9tYXAtc2luZ2xlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IEwgPSByZXF1aXJlKCdsZWFmbGV0Jyk7XG5yZXF1aXJlKCdsZWFmbGV0Lm1hcmtlcmNsdXN0ZXInKTtcbi8vIHJlcXVpcmUoJ2xlYWZsZXQvZGlzdC9pbWFnZXMvJyk7XG5cbmRlbGV0ZSBMLkljb24uRGVmYXVsdC5wcm90b3R5cGUuX2dldEljb25Vcmw7XG5cbkwuSWNvbi5EZWZhdWx0Lm1lcmdlT3B0aW9ucyh7XG4gICAgaWNvblJldGluYVVybDogcmVxdWlyZSgnbGVhZmxldC9kaXN0L2ltYWdlcy9tYXJrZXItaWNvbi0yeC5wbmcnKSxcbiAgICBpY29uVXJsOiByZXF1aXJlKCdsZWFmbGV0L2Rpc3QvaW1hZ2VzL21hcmtlci1pY29uLnBuZycpLFxuICAgIHNoYWRvd1VybDogcmVxdWlyZSgnbGVhZmxldC9kaXN0L2ltYWdlcy9tYXJrZXItc2hhZG93LnBuZycpLFxufSk7XG5cbmlmKCQoJ1tkYXRhLXBpY3R1cmVdJykubGVuZ3RoID4gMCl7XG4gICAgLy8gaW5pdGlhbGl6ZSB0aGUgbWFwIG9uIHRoZSBcIm1hcFwiIGRpdiB3aXRoIGEgZ2l2ZW4gY2VudGVyIGFuZCB6b29tXG4gICAgY29uc3QgcGljdHVyZSA9IEpTT04ucGFyc2UoJCgnW2RhdGEtcGljdHVyZV0nKS5hdHRyKCdkYXRhLXBpY3R1cmUnKSk7XG4gICAgdmFyIG1hcCA9IEwubWFwKCdtYXAnLHtcbiAgICAgICAgY2VudGVyOiBbcGljdHVyZS5sYXQsIHBpY3R1cmUubG5nXSxcbiAgICAgICAgem9vbToxMlxuICAgIH0pO1xuXG4vLyBMLnRpbGVMYXllcignaHR0cHM6Ly90aWxlcy5zdGFkaWFtYXBzLmNvbS90aWxlcy9hbGlkYWRlX3Ntb290aF9kYXJrL3t6fS97eH0ve3l9e3J9LnBuZycsIHt9KS5hZGRUbyhtYXApO1xuICAgIEwudGlsZUxheWVyKCdodHRwczovL3tzfS5iYXNlbWFwcy5jYXJ0b2Nkbi5jb20vZGFya19hbGwve3p9L3t4fS97eX17cn0ucG5nJywge30pLmFkZFRvKG1hcCk7XG5cbiAgICBMLm1hcmtlcihbcGljdHVyZS5sYXQsIHBpY3R1cmUubG5nXSkuYWRkVG8obWFwKTtcbn1cbiJdLCJuYW1lcyI6WyJMIiwicmVxdWlyZSIsIkljb24iLCJEZWZhdWx0IiwicHJvdG90eXBlIiwiX2dldEljb25VcmwiLCJtZXJnZU9wdGlvbnMiLCJpY29uUmV0aW5hVXJsIiwiaWNvblVybCIsInNoYWRvd1VybCIsIiQiLCJsZW5ndGgiLCJwaWN0dXJlIiwiSlNPTiIsInBhcnNlIiwiYXR0ciIsIm1hcCIsImNlbnRlciIsImxhdCIsImxuZyIsInpvb20iLCJ0aWxlTGF5ZXIiLCJhZGRUbyIsIm1hcmtlciJdLCJzb3VyY2VSb290IjoiIn0=