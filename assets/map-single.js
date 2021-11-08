const L = require('leaflet');
require('leaflet.markercluster');
// require('leaflet/dist/images/');

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});


// initialize the map on the "map" div with a given center and zoom
const picture = JSON.parse($('[data-picture]').attr('data-picture'));
var map = L.map('map',{
    center: [picture.lat, picture.lng],
    zoom:12
});

L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {}).addTo(map);

L.marker([picture.lat, picture.lng]).addTo(map);

