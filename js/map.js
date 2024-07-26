window.addEventListener("load", function () {
    createMap();
    setMapEnterKeyHandlers();
    setMapSoftleftKeyHandlers();
})

function setMapEnterKeyHandlers() {
    document.getElementById("mapView").enterKeyHandler = event => {

        changeViewTo("gearRecordView");
    }
}

function setMapSoftleftKeyHandlers() {
    // Going straight back should be okay as previous state has not been modified
    document.getElementById("mapView").softleftKeyHandler = event => {
        changeViewTo("fishCaughtView");
    }
}

function createMap() {

    STATE.mymap = L.map('map', { zoomControl: false, keyboard: false }).setView([11.393879, 1.085331], 6);
    STATE.mymap.setView([11.393879, 1.085331], 6)

    // Define where the directory with map tiles are
    // if using a directory other than maptiles, please rename it
    L.tileLayer('maptiles/{z}/{x}/{y}.png',
        { maxZoom: 9 }).addTo(STATE.mymap);

    //Set the range that you have tiles for
    STATE.mymap.setMaxBounds([
        [25.204941, -13.338142],
        [5.484, 13.573]
    ])

    setTimeout(function () {
        STATE.mymap.invalidateSize();
    }, 1);
}

function move(map, offset) {
    if (!map._panAnim || !map._panAnim._inProgress) {

        if (map.options.maxBounds) {
            offset = map._limitOffset(L.point(offset), map.options.maxBounds);
            console.log("internals");
        }

        console.log("further down");
        map.panBy(offset);

        console.log("attempted pan")
    }
}