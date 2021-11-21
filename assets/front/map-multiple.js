const L = require('leaflet');
require('leaflet.markercluster');
// require('leaflet/dist/images/');


const markers = [];

L.Icon.Default.imagePath = '.';
// OR
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});


// let markers = [];
var markersCluster = L.markerClusterGroup({
    iconCreateFunction: function (cluster) {
        let size;

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
let picturePoints = [];
// initialize the map on the "map" div with a given center and zoom
var map = L.map('map',{
    zoom:40
});

// L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {}).addTo(map);
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {}).addTo(map);

const pictures = JSON.parse($('[data-pictures]').attr('data-pictures'));

$.each(pictures, function (i, picture) {
    // let lieu = data[n];
    let lat = picture.lat;
    let lng = picture.lng;
    let text = picture.title;
    let html = picture.html;

    var latLng = new L.LatLng(lat, lng);
    var marker = new L.Marker(latLng, {title: text}).bindPopup(html);
    markers.push(marker);
    markersCluster.addLayer(marker);
})

// markers.addLayer(L.marker(getRandomLatLng(map)));
map.addLayer(markersCluster);


// L.layerGroup(markers).eachLayer(function (layer) {
//     layer.setOpacity(0.7);
// }).addTo(map);
//
map.fitBounds(L.featureGroup(markers).getBounds());
