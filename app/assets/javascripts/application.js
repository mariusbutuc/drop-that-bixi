// This is a manifest file that'll be compiled into including all the files listed below.
// Add new JavaScript/Coffee code in separate files in this directory and they'll automatically
// be included in the compiled file accessible from http://example.com/assets/application.js
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
//= require jquery
//= require jquery_ujs
//= require twitter/bootstrap
//= require leaflet
//= require L.Control.Locate
//= require_tree .

var DTB = DTB || {}

DTB.maps = {
  
  map: {},
  init: function(latitude, longitude) {
     this.map = L.map('map').setView([latitude, longitude], 17);

    // add an OpenStreetMap tile layer
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    // add Leaflet.Locate: A useful control to geolocate the user with many options.
    L.control.locate({
      position: 'topleft',  // set the location of the control
      drawCircle: true,  // controls whether a circle is drawn that shows the uncertainty about the location
      follow: false,  // follow the location if `watch` and `setView` are set to true in locateOptions
      circleStyle: {},  // change the style of the circle around the user's location
      markerStyle: {},
      metric: true  // use metric or imperial units
    }).addTo(this.map);

    var bikeIcon = L.icon({
      iconUrl: '/assets/marker-bike.png',
      shadowUrl: '/assets/marker-shadow.png',

      iconSize:     [32, 37], // size of the icon
      shadowSize:   [41, 41], // size of the shadow
      iconAnchor:   [20, 36], // point of the icon which will correspond to marker's location
      shadowAnchor: [17, 38],  // the same for the shadow
      popupAnchor:  [0, -26] // point from which the popup should open relative to the iconAnchor
    });

    var marker = L.marker([latitude, longitude], {icon: bikeIcon}).addTo(this.map);
    marker.bindPopup('<strong>5/17</strong> bycicles,<br/> available <em>5 mins ago</em>.');
    // marker.openPopup();
  }

}