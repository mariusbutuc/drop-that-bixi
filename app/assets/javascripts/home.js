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
    $('#location').text('latitude: ' + location.coords.latitude + ' longitude: ' + location.coords.longitude);
    console.log(location.coords);
  },
  
  loadLocationError: function (e) {
    console.log(e);
  }

}

$(function () {
  DTB.home.init();
});