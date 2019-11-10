(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    } else {
        // Browser globals
        root.SunPosition = factory(root);
    }
}(typeof self !== 'undefined' ? self : this, function (window) {
  const location = {}

  //get user position
  window.navigator.geolocation.getCurrentPosition(function(position){
    location.latitude = postion.coords.latitude;
    location.longitude = postion.coords.longitude;
  })


}));