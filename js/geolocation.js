var wakeLock, watchPositionID;

function successfulGPS(pos){
  STATE.geolocation.push(crd);
}

function failedGPS(pos){

}

var gpsOptions = {
  enableHighAccuracy: false,
  timeout: 5000,
  maximumAge: 120000,
}

window.addEventListener("load", function () {

  // Request that the location service is kept alive, prevents phone from going to deep sleep
  wakeLock = navigator.requestWakeLock("gps");
  watchPositionID = this.navigator.geolocation.watchPosition(success, error, options);
  

})


// function success(pos) {
//   var crd = pos.coords;

//   STATE.geolocation.push(crd);
//   console.log("Pushed: " + crd);
// }

// function error(err) {
//   console.warn('ERROR(' + err.code + '): ' + err.message);
// }

// options = {
//   enableHighAccuracy: false,
//   timeout: 5000,
//   maximumAge: 120000,
// };

// wakeLock = navigator.requestWakeLock("gps");

// id = navigator.geolocation.watchPosition(success, error, options);