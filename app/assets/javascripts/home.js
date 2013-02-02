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
    var $stations = $('#stations');
    
    var map = DTB.maps.map;
    
    $stations.text('');
    for (var a in data) {
      $stations.append($('<div>').addClass('station').text(data[a].name));
    }
  },

  loadLocationError: function (e) {
    console.log(e);
  }

}

$(function () {
  DTB.home.init();
});