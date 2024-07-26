window.addEventListener("load", function () {
    createMap();
    setMapEnterKeyHandlers();
})

function setMapEnterKeyHandlers() {
    document.getElementById("mapView").enterKeyHandler = event => {
        const coords = STATE.mymap.getCenter();
        STATE.currentRecord.locationOfCatch = [coords.lat, coords.lng];
        changeViewTo("gearRecordView");
    }
}


function createMap() {

    STATE.mymap = L.map('map', { zoomControl: false, keyboard: false }).setView([11.393879, 1.085331], 6);

    // Define where the directory with map tiles are
    // if using a directory other than maptiles, please rename it
    L.tileLayer('maptiles/{z}/{x}/{y}.png',
        { maxZoom: 9, minZoom: 3 }).addTo(STATE.mymap);

    //Set the range that you have tiles for
    STATE.mymap.setMaxBounds([
        [25.204941, -13.338142],
        [5.484, 13.573]
    ]);
    STATE.centerMarker = L.marker(STATE.mymap.getCenter());
    STATE.centerMarker.addTo(STATE.mymap);

    STATE.mymap.on("moveend", centerMarker);
}

function panOnMap(map, offset) {
    if (!map._panAnim || !map._panAnim._inProgress) {

        if (map.options.maxBounds) {
            offset = map._limitOffset(L.point(offset), map.options.maxBounds);
        }

        map.panBy(offset);
        // centerMarker();
    }
}

function tryLoadCurrentPos(){
    if (STATE.geolocation[STATE.geolocation.length - 1]) {
        const position = STATE.geolocation[STATE.geolocation.length - 1];
        STATE.mymap.setView([position.coords.latitude, position.coords.longitude], 6);
        centerMarker();
    }
}

function centerMarker(){
    const center = STATE.mymap.getCenter();
    STATE.centerMarker.setLatLng(center);
}