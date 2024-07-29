window.addEventListener("load", function () {
    createMap();
    setMapEnterKeyHandlers();
    setMapSoftleftKeyHandlers();
})

function setMapEnterKeyHandlers() {
    document.getElementById("mapView").enterKeyHandler = event => {
        const coords = STATE.mymap.getCenter();
        STATE.currentRecord.locationOfCatch = [coords.lat, coords.lng];
        changeViewTo("gearRecordView");
    }
}

function setMapSoftleftKeyHandlers() {
    document.getElementById("mapView").softleftKeyHandler = event => {
        STATE.mymap.setZoom(STATE.mymap.getZoom() - STATE.mymap.options.zoomDelta);
    }
    
}

function createMap() {
    // Disabling keyboard arrow key controls to regain control of key mappings
    // Set view to initial location with initial zoom
    STATE.mymap = L.map('map', { zoomControl: false, keyboard: false }).setView([11.393879, 1.085331], 6);

    // Define where the directory with map tiles are
    // if using a directory other than maptiles, please rename it
    L.tileLayer('maptiles/{z}/{x}/{y}.png',
        { maxZoom: 9, minZoom: 3, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' }).addTo(STATE.mymap);

    //Set the range that you have tiles for
    STATE.mymap.setMaxBounds([
        [25.204941, -13.338142],
        [5.484, 13.573]
    ]);

    // Create marker at center of map
    STATE.centerMarker = L.marker(STATE.mymap.getCenter());
    STATE.centerMarker.addTo(STATE.mymap);

    // Add handler that moves marker to center
    STATE.mymap.on("moveend", centerMarker);
}

// Pan on map by a certain offset
function panOnMap(map, offset) {
    if (!map._panAnim || !map._panAnim._inProgress) {

        if (map.options.maxBounds) {
            offset = map._limitOffset(L.point(offset), map.options.maxBounds);
        }

        map.panBy(offset);
        // centerMarker();
    }
}

// Try to load the latest geolocation ping, if successful, focus there.
function tryLoadCurrentPos() {
    if (STATE.geolocation[STATE.geolocation.length - 1]) {
        const position = STATE.geolocation[STATE.geolocation.length - 1];
        STATE.mymap.setView([position.coords.latitude, position.coords.longitude], 6);
        centerMarker();
    }
}

function centerMarker() {
    const center = STATE.mymap.getCenter();
    STATE.centerMarker.setLatLng(center);
}