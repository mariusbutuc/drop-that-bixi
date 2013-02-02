// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

var DTB = DTB || {};

DTB.home = {

  init: function () {
    if ($('html.geolocation').length) {
      navigator.geolocation.getCurrentPosition(this.loadLocation, this.loadLocationError);
    }
  },

  loadLocation: function (location) {
    var latitude = location.coords.latitude;
    var longitude = location.coords.longitude;

    DTB.maps.init(latitude, longitude);

    $('#location').text('latitude: ' + latitude + ' longitude: ' + longitude);
    console.log(location.coords);

    // send request to ajax endpoint
    var url = '/stations.json';
    $.ajax(url, {
      success: DTB.home.getStations
    });


  },

  getStations: function (data, status, jqXHR) {
    var marker, station;
    var map = DTB.maps.map;
    var bikeIcon = L.icon({
      iconUrl: '/assets/marker-bike.png',
      shadowUrl: '/assets/marker-shadow.png',

      iconSize:     [32, 37], // size of the icon
      shadowSize:   [41, 41], // size of the shadow
      iconAnchor:   [20, 36], // point of the icon which will correspond to marker's location
      shadowAnchor: [17, 38], // the same for the shadow
      popupAnchor:  [0, -26]  // point from which the popup should open relative to the iconAnchor
    });

    for (station in data) {
      marker = L.marker([data[station].latitude, data[station].longitude], {icon: bikeIcon}).addTo(map);
    }
  },

  loadLocationError: function (e) {
    console.log(e);
  }

}

$(function () {
  DTB.home.init();
});