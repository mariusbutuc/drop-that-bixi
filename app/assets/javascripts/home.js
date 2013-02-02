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

    $('#location').text('latitude: ' + latitude + ' longitude: ' + longitude);
    console.log(location.coords);

    // send request to ajax endpoint
    var url = '/stations.json?lat=' + latitude + '&long=' + longitude;
    console.log(url);
    // $.ajax(url, {
    //   success: this.getClosestStations
    // });

    var map = L.map('map').setView([latitude, longitude], 17);

    // add an OpenStreetMap tile layer
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // add Leaflet.Locate: A useful control to geolocate the user with many options.
    L.control.locate({
      position: 'topleft',  // set the location of the control
      drawCircle: true,  // controls whether a circle is drawn that shows the uncertainty about the location
      follow: false,  // follow the location if `watch` and `setView` are set to true in locateOptions
      circleStyle: {},  // change the style of the circle around the user's location
      markerStyle: {},
      metric: true  // use metric or imperial units
    }).addTo(map);

    // var circle = L.circle([latitude, longitude], 70, {
    //   color: 'red',
    //   fillColor: '#f03',
    //   fillOpacity: 0.5
    // }).addTo(map);

    var bikeIcon = L.icon({
      iconUrl: '/assets/marker-bike.png',
      shadowUrl: '/assets/marker-shadow.png',

      iconSize:     [32, 37], // size of the icon
      shadowSize:   [41, 41], // size of the shadow
      iconAnchor:   [20, 36], // point of the icon which will correspond to marker's location
      shadowAnchor: [17, 38],  // the same for the shadow
      popupAnchor:  [0, -26] // point from which the popup should open relative to the iconAnchor
    });

    var marker = L.marker([latitude, longitude], {icon: bikeIcon}).addTo(map);
    marker.bindPopup('<strong>5/17</strong> bycicles,<br/> available <em>5 mins ago</em>.');
    // marker.openPopup();
  },

  getClosestStations: function (data, status, jqXKR) {
    var $stations = $('#stations');
  },

  loadLocationError: function (e) {
    console.log(e);
  }

}

$(function () {
  DTB.home.init();
});