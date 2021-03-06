(self["webpackChunk"] = self["webpackChunk"] || []).push([["map-multiple-js"],{

/***/ "./assets/front/map-multiple.js":
/*!**************************************!*\
  !*** ./assets/front/map-multiple.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
__webpack_require__(/*! core-js/modules/es.array.map.js */ "./node_modules/core-js/modules/es.array.map.js");

var L = __webpack_require__(/*! leaflet */ "./node_modules/leaflet/dist/leaflet-src.js");

__webpack_require__(/*! leaflet.markercluster */ "./node_modules/leaflet.markercluster/dist/leaflet.markercluster-src.js"); // require('leaflet/dist/images/');


var markers = [];
L.Icon.Default.imagePath = '.'; // OR

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: __webpack_require__(/*! leaflet/dist/images/marker-icon-2x.png */ "./node_modules/leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: __webpack_require__(/*! leaflet/dist/images/marker-icon.png */ "./node_modules/leaflet/dist/images/marker-icon.png"),
  shadowUrl: __webpack_require__(/*! leaflet/dist/images/marker-shadow.png */ "./node_modules/leaflet/dist/images/marker-shadow.png")
}); // let markers = [];

var markersCluster = L.markerClusterGroup({
  iconCreateFunction: function iconCreateFunction(cluster) {
    var size;

    if (cluster._childCount < 3) {
      size = 'xs';
    } else if (cluster._childCount < 7) {
      size = 'sm';
    } else if (cluster._childCount < 15) {
      size = 'md';
    } else if (cluster._childCount < 30) {
      size = 'lg';
    } else if (cluster._childCount < 80) {
      size = 'vlg';
    } else if (cluster._childCount < 200) {
      size = 'xlg';
    } else {
      size = 'all';
    }

    return L.divIcon({
      html: cluster.getChildCount(),
      className: 'mycluster mycluster-' + size,
      iconSize: null
    });
  }
});
var picturePoints = []; // initialize the map on the "map" div with a given center and zoom

var map = L.map('map', {
  zoom: 40
}); // L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {}).addTo(map);

L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {}).addTo(map);
var pictures = JSON.parse($('[data-pictures]').attr('data-pictures'));
$.each(pictures, function (i, picture) {
  // let lieu = data[n];
  var lat = picture.lat;
  var lng = picture.lng;
  var text = picture.title;
  var html = picture.html;
  var latLng = new L.LatLng(lat, lng);
  var marker = new L.Marker(latLng, {
    title: text
  }).bindPopup(html);
  markers.push(marker);
  markersCluster.addLayer(marker);
}); // markers.addLayer(L.marker(getRandomLatLng(map)));

map.addLayer(markersCluster); // L.layerGroup(markers).eachLayer(function (layer) {
//     layer.setOpacity(0.7);
// }).addTo(map);
//

map.fitBounds(L.featureGroup(markers).getBounds());

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_jquery_dist_jquery_js","vendors-node_modules_core-js_internals_export_js","vendors-node_modules_core-js_modules_es_array_map_js-node_modules_leaflet_dist_leaflet-src_js-e0c243","vendors-node_modules_leaflet_markercluster_dist_leaflet_markercluster-src_js"], () => (__webpack_exec__("./assets/front/map-multiple.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNJLEtBQW5CO0FBQ0EsTUFBSXBCLElBQUksR0FBR2dCLE9BQU8sQ0FBQ2hCLElBQW5CO0FBRUEsTUFBSXFCLE1BQU0sR0FBRyxJQUFJeEMsQ0FBQyxDQUFDeUMsTUFBTixDQUFhTCxHQUFiLEVBQWtCQyxHQUFsQixDQUFiO0FBQ0EsTUFBSUssTUFBTSxHQUFHLElBQUkxQyxDQUFDLENBQUMyQyxNQUFOLENBQWFILE1BQWIsRUFBcUI7QUFBQ0QsSUFBQUEsS0FBSyxFQUFFRDtBQUFSLEdBQXJCLEVBQW9DTSxTQUFwQyxDQUE4Q3pCLElBQTlDLENBQWI7QUFDQWpCLEVBQUFBLE9BQU8sQ0FBQzJDLElBQVIsQ0FBYUgsTUFBYjtBQUNBOUIsRUFBQUEsY0FBYyxDQUFDa0MsUUFBZixDQUF3QkosTUFBeEI7QUFDSCxDQVhELEdBYUE7O0FBQ0FsQixHQUFHLENBQUNzQixRQUFKLENBQWFsQyxjQUFiLEdBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0FZLEdBQUcsQ0FBQ3VCLFNBQUosQ0FBYy9DLENBQUMsQ0FBQ2dELFlBQUYsQ0FBZTlDLE9BQWYsRUFBd0IrQyxTQUF4QixFQUFkIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2Zyb250L21hcC1tdWx0aXBsZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBMID0gcmVxdWlyZSgnbGVhZmxldCcpO1xucmVxdWlyZSgnbGVhZmxldC5tYXJrZXJjbHVzdGVyJyk7XG4vLyByZXF1aXJlKCdsZWFmbGV0L2Rpc3QvaW1hZ2VzLycpO1xuXG5cbmNvbnN0IG1hcmtlcnMgPSBbXTtcblxuTC5JY29uLkRlZmF1bHQuaW1hZ2VQYXRoID0gJy4nO1xuLy8gT1JcbmRlbGV0ZSBMLkljb24uRGVmYXVsdC5wcm90b3R5cGUuX2dldEljb25Vcmw7XG5cbkwuSWNvbi5EZWZhdWx0Lm1lcmdlT3B0aW9ucyh7XG4gICAgaWNvblJldGluYVVybDogcmVxdWlyZSgnbGVhZmxldC9kaXN0L2ltYWdlcy9tYXJrZXItaWNvbi0yeC5wbmcnKSxcbiAgICBpY29uVXJsOiByZXF1aXJlKCdsZWFmbGV0L2Rpc3QvaW1hZ2VzL21hcmtlci1pY29uLnBuZycpLFxuICAgIHNoYWRvd1VybDogcmVxdWlyZSgnbGVhZmxldC9kaXN0L2ltYWdlcy9tYXJrZXItc2hhZG93LnBuZycpLFxufSk7XG5cblxuLy8gbGV0IG1hcmtlcnMgPSBbXTtcbnZhciBtYXJrZXJzQ2x1c3RlciA9IEwubWFya2VyQ2x1c3Rlckdyb3VwKHtcbiAgICBpY29uQ3JlYXRlRnVuY3Rpb246IGZ1bmN0aW9uIChjbHVzdGVyKSB7XG4gICAgICAgIGxldCBzaXplO1xuXG4gICAgICAgIGlmIChjbHVzdGVyLl9jaGlsZENvdW50IDwgMykge1xuICAgICAgICAgICAgc2l6ZSA9ICd4cyc7XG4gICAgICAgIH0gZWxzZSBpZiAoY2x1c3Rlci5fY2hpbGRDb3VudCA8IDcpIHtcbiAgICAgICAgICAgIHNpemUgPSAnc20nO1xuICAgICAgICB9IGVsc2UgaWYgKGNsdXN0ZXIuX2NoaWxkQ291bnQgPCAxNSkge1xuICAgICAgICAgICAgc2l6ZSA9ICdtZCc7XG4gICAgICAgIH0gZWxzZSBpZiAoY2x1c3Rlci5fY2hpbGRDb3VudCA8IDMwKSB7XG4gICAgICAgICAgICBzaXplID0gJ2xnJztcbiAgICAgICAgfSBlbHNlIGlmIChjbHVzdGVyLl9jaGlsZENvdW50IDwgODApIHtcbiAgICAgICAgICAgIHNpemUgPSAndmxnJztcbiAgICAgICAgfSBlbHNlIGlmIChjbHVzdGVyLl9jaGlsZENvdW50IDwgMjAwKSB7XG4gICAgICAgICAgICBzaXplID0gJ3hsZyc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzaXplID0gJ2FsbCc7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gTC5kaXZJY29uKHtcbiAgICAgICAgICAgIGh0bWw6IGNsdXN0ZXIuZ2V0Q2hpbGRDb3VudCgpLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiAnbXljbHVzdGVyIG15Y2x1c3Rlci0nICsgc2l6ZSxcbiAgICAgICAgICAgIGljb25TaXplOiBudWxsXG4gICAgICAgIH0pO1xuICAgIH1cbn0pO1xubGV0IHBpY3R1cmVQb2ludHMgPSBbXTtcbi8vIGluaXRpYWxpemUgdGhlIG1hcCBvbiB0aGUgXCJtYXBcIiBkaXYgd2l0aCBhIGdpdmVuIGNlbnRlciBhbmQgem9vbVxudmFyIG1hcCA9IEwubWFwKCdtYXAnLHtcbiAgICB6b29tOjQwXG59KTtcblxuLy8gTC50aWxlTGF5ZXIoJ2h0dHBzOi8vdGlsZXMuc3RhZGlhbWFwcy5jb20vdGlsZXMvYWxpZGFkZV9zbW9vdGhfZGFyay97en0ve3h9L3t5fXtyfS5wbmcnLCB7fSkuYWRkVG8obWFwKTtcbkwudGlsZUxheWVyKCdodHRwczovL3tzfS5iYXNlbWFwcy5jYXJ0b2Nkbi5jb20vZGFya19hbGwve3p9L3t4fS97eX17cn0ucG5nJywge30pLmFkZFRvKG1hcCk7XG5cbmNvbnN0IHBpY3R1cmVzID0gSlNPTi5wYXJzZSgkKCdbZGF0YS1waWN0dXJlc10nKS5hdHRyKCdkYXRhLXBpY3R1cmVzJykpO1xuXG4kLmVhY2gocGljdHVyZXMsIGZ1bmN0aW9uIChpLCBwaWN0dXJlKSB7XG4gICAgLy8gbGV0IGxpZXUgPSBkYXRhW25dO1xuICAgIGxldCBsYXQgPSBwaWN0dXJlLmxhdDtcbiAgICBsZXQgbG5nID0gcGljdHVyZS5sbmc7XG4gICAgbGV0IHRleHQgPSBwaWN0dXJlLnRpdGxlO1xuICAgIGxldCBodG1sID0gcGljdHVyZS5odG1sO1xuXG4gICAgdmFyIGxhdExuZyA9IG5ldyBMLkxhdExuZyhsYXQsIGxuZyk7XG4gICAgdmFyIG1hcmtlciA9IG5ldyBMLk1hcmtlcihsYXRMbmcsIHt0aXRsZTogdGV4dH0pLmJpbmRQb3B1cChodG1sKTtcbiAgICBtYXJrZXJzLnB1c2gobWFya2VyKTtcbiAgICBtYXJrZXJzQ2x1c3Rlci5hZGRMYXllcihtYXJrZXIpO1xufSlcblxuLy8gbWFya2Vycy5hZGRMYXllcihMLm1hcmtlcihnZXRSYW5kb21MYXRMbmcobWFwKSkpO1xubWFwLmFkZExheWVyKG1hcmtlcnNDbHVzdGVyKTtcblxuXG4vLyBMLmxheWVyR3JvdXAobWFya2VycykuZWFjaExheWVyKGZ1bmN0aW9uIChsYXllcikge1xuLy8gICAgIGxheWVyLnNldE9wYWNpdHkoMC43KTtcbi8vIH0pLmFkZFRvKG1hcCk7XG4vL1xubWFwLmZpdEJvdW5kcyhMLmZlYXR1cmVHcm91cChtYXJrZXJzKS5nZXRCb3VuZHMoKSk7XG4iXSwibmFtZXMiOlsiTCIsInJlcXVpcmUiLCJtYXJrZXJzIiwiSWNvbiIsIkRlZmF1bHQiLCJpbWFnZVBhdGgiLCJwcm90b3R5cGUiLCJfZ2V0SWNvblVybCIsIm1lcmdlT3B0aW9ucyIsImljb25SZXRpbmFVcmwiLCJpY29uVXJsIiwic2hhZG93VXJsIiwibWFya2Vyc0NsdXN0ZXIiLCJtYXJrZXJDbHVzdGVyR3JvdXAiLCJpY29uQ3JlYXRlRnVuY3Rpb24iLCJjbHVzdGVyIiwic2l6ZSIsIl9jaGlsZENvdW50IiwiZGl2SWNvbiIsImh0bWwiLCJnZXRDaGlsZENvdW50IiwiY2xhc3NOYW1lIiwiaWNvblNpemUiLCJwaWN0dXJlUG9pbnRzIiwibWFwIiwiem9vbSIsInRpbGVMYXllciIsImFkZFRvIiwicGljdHVyZXMiLCJKU09OIiwicGFyc2UiLCIkIiwiYXR0ciIsImVhY2giLCJpIiwicGljdHVyZSIsImxhdCIsImxuZyIsInRleHQiLCJ0aXRsZSIsImxhdExuZyIsIkxhdExuZyIsIm1hcmtlciIsIk1hcmtlciIsImJpbmRQb3B1cCIsInB1c2giLCJhZGRMYXllciIsImZpdEJvdW5kcyIsImZlYXR1cmVHcm91cCIsImdldEJvdW5kcyJdLCJzb3VyY2VSb290IjoiIn0=