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
    var url = '/stations/closest.json?lat=' + latitude + '&long=' + longitude;
    console.log(url);
    $.ajax(url, {
      success: this.getClosestStations
    });
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