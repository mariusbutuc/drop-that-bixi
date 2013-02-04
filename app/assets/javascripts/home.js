// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

var DTB = DTB || {};

DTB.home = {

  init: function () {
    if ($('html.geolocation').length) {
      navigator.geolocation.getCurrentPosition(this.loadAllLocations, this.loadLocationError);
      $('#find-bixi').button('toggle');
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
    var
      all_stations_layer,
      base_maps,
      current_position, 
      href_parts,
      open_street_map_tiles_layer,
      overlay_maps;
    var map = L.map('map');
    var all_stations = []
    var params = {};

    href_parts = window.location.href.split("/#");
    if (href_parts.length > 1) {
      var scraped_params = href_parts[1].split("/");
      params['z']   = scraped_params[0];
      params['lat'] = scraped_params[1];
      params['lng'] = scraped_params[2];
    }

    if( params.hasOwnProperty('lat') && params.hasOwnProperty('lng') ) {
      map.setView([params['lat'], params['lng']], params['z']);
    } else {
      map.locate({setView: true, maxZoom: 16});
    }

    // add an OpenStreetMap tile layer
    open_street_map_tiles_layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      maxZoom: 18
    });

    open_street_map_tiles_layer.addTo(map);

    // persist app state in the URL
    // hash = new L.Hash(map);
    map.addHash();


    // add the Locate control
    L.control.locate().addTo(map);

    var defaultIcon = L.icon({
      iconUrl:      '/assets/marker-red-pin.png',
      iconSize:     [64, 64],
      iconAnchor:   [32, 60],
      popupAnchor:  [0, -60]
    });

    var bikeIcon = L.icon({
      iconUrl: '/assets/marker-bike.png',
      shadowUrl: '/assets/marker-shadow.png',
      iconSize:     [32, 37], // size of the icon
      shadowSize:   [41, 41], // size of the shadow
      iconAnchor:   [20, 36], // point of the icon which will correspond to marker's location
      shadowAnchor: [17, 38], // the same for the shadow
      popupAnchor:  [0, -26]  // point from which the popup should open relative to the iconAnchor
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

    var maybeBikeIcon = L.icon({
      iconUrl: '/assets/marker-bike-good.png',
      shadowUrl: '/assets/marker-shadow.png',

      iconSize:     [32, 37], // size of the icon
      shadowSize:   [41, 41], // size of the shadow
      iconAnchor:   [20, 36], // point of the icon which will correspond to marker's location
      shadowAnchor: [17, 38], // the same for the shadow
      popupAnchor:  [0, -26]  // point from which the popup should open relative to the iconAnchor
    });

    for (station_id in data) {
      var marker;
      var station = data[station_id];
      var date = $.timeago( new Date(Number(station.lastUpdate)));
      var icon = bikeIcon;

      if (station.numBikes == 0) {
        icon = badBikeIcon;
      } else if (station.numBikes < 4) {
        icon = maybeBikeIcon;
      } else {
        icon = goodBikeIcon;
      }

      marker = L.marker([station.latitude, station.longitude], {icon: icon});
      marker.bindPopup('<strong>' + station.name + '</strong><br>'
        + '&middot; ' + station.numBikes + ' available Bixi bikes<br/>'
        + '&middot; ' + station.spacesFree + ' empty spaces<br>'
        + 'Last change ' + date + '</br></br>'
        + '<button class="btn location-share" onclick="DTB.home.locationSharing();">Share this link</button>'
      );

      all_stations.push(marker);
    }
    all_stations_layer = L.layerGroup(all_stations);
    all_stations_layer.addTo(map);

    base_maps = {
        "OpenStreetMap": open_street_map_tiles_layer
    };
    overlay_maps = {
        "All stations": all_stations_layer
    };
    L.control.layers(base_maps, overlay_maps).addTo(map);

    function onLocationFound(e) {
      var radius = e.accuracy / 2;
      current_position = L.marker(e.latlng, {icon: defaultIcon}).addTo(map)
        .bindPopup("You are here").openPopup();
      L.circle(e.latlng, radius).addTo(map);
    }

    map.on('locationfound', onLocationFound);
  },

  loadLocationError: function (e) {
    console.log(e);
  },

  locationSharing: function(e) {
    prompt("Share this link",window.location.href);
  }

}

$(function () {
  DTB.home.init();

  $('#find-bixi').click(function() {
    $('#find-bixi').button('toggle');
  });
  $('#drop-bixi').click(function() {
    $('#drop-bixi').button('toggle');
  });

});
