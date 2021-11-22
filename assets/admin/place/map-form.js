const L = require('leaflet');

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

let marker;

let map = L.map('map', {
    center: [28.396837, -80.605659],
    zoom: 5
});

L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {}).addTo(map);


if ($('#map').data('position') !== undefined) {
    let position = $('#map').data('position');
    marker = L.marker([position.lat, position.lng]).addTo(map);
    map.setView([position.lat, position.lng]);
}

if(!$('#map').hasClass('read-only')){
    map.on('click', function (e) {
        $('#place_lat').val(e.latlng.lat);
        $('#place_lng').val(e.latlng.lng);
        if (marker !== undefined) {
            map.removeLayer(marker)
        }
        marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
    });
}
