// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

var DTB = DTB || {};

DTB.home = {

  init: function () {
    if ($('html.geolocation').length) {
      navigator.geolocation.getCurrentPosition(this.loadAllLocations, this.loadLocationError);
    }
  },

  loadAllLocations: function (location) {
    $('#all-locs').button('toggle');
    var latitude = location.coords.latitude;
    var longitude = location.coords.longitude;

    // send request to ajax endpoint
    var url = '/stations.json?latitude=' + latitude + '&longitude=' + longitude;
    $.ajax(url, {
      success: DTB.home.getStations
    });
  },

  getStations: function (data, status, jqXHR) {
    var current_position, marker, station;
    var map = L.map('map');

    // add an OpenStreetMap tile layer
    current_position = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy;2013 Tripod Inc'
    }).addTo(map);

    var hash = new L.Hash(map);

    var defaultIcon = L.icon({
      iconUrl:      '/assets/marker-red-pin.png',
      iconSize:     [64, 64],
      iconAnchor:   [32, 60],
      popupAnchor:  [0, -60]
    });

    var badBikeIcon = L.icon({
      iconUrl: '/assets/marker-bike-bad.png',
      shadowUrl: '/assets/marker-shadow.png',

      iconSize:     [32, 37], // size of the icon
      shadowSize:   [41, 41], // size of the shadow
      iconAnchor:   [20, 36], // point of the icon which will correspond to marker's location
      shadowAnchor: [17, 38], // the same for the shadow
      popupAnchor:  [0, -26]  // point from which the popup should open relative to the iconAnchor
    });
    
    var goodBikeIcon = L.icon({
      iconUrl: '/assets/marker-bike-good.png',
      shadowUrl: '/assets/marker-shadow.png',
      
      iconSize:     [32, 37], // size of the icon
      shadowSize:   [41, 41], // size of the shadow
      iconAnchor:   [20, 36], // point of the icon which will correspond to marker's location
      shadowAnchor: [17, 38], // the same for the shadow
      popupAnchor:  [0, -26]  // point from which the popup should open relative to the iconAnchor
    });

    for (station in data) {
      var s = data[station];
      var date = $.timeago( new Date(Number(data[station].lastUpdate)));
      var icon;
      
      if (s.numBikes == 0) {
        icon = badBikeIcon;
      } else {
        icon = goodBikeIcon;
      }

      marker = L.marker([data[station].latitude, data[station].longitude], {icon: icon}).addTo(map);
      marker.bindPopup('<strong>' + data[station].name + '</strong><br>'
        + '&middot; ' + data[station].numBikes + ' available bixies<br/>'
        + '&middot; ' + data[station].spacesFree + ' free spots<br>'
        + 'Last change ' + date
      );
    }

    function onLocationFound(e) {
      var radius = e.accuracy / 2;
      L.marker(e.latlng, {icon: defaultIcon}).addTo(map)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();
      L.circle(e.latlng, radius).addTo(map);
    }

    map.on('locationfound', onLocationFound);

    map.locate({setView: true, maxZoom: 16});
  },

  loadLocationError: function (e) {
    console.log(e);
  }

}

$(function () {
  DTB.home.init();
});