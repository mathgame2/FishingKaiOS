var wakeLock, watchPositionID;

function successfulGPS(pos){
  const lastPos = STATE.geolocation[STATE.geolocation.length - 1];
  if (pos.coords.latitute === lastPos.coords.latitute && pos.coords.longitute === lastPos.coords.longitute ) {
      // Do Nothing if previous coord is same as current one
  }else {
    STATE.geolocation.push(pos);
  }
  
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