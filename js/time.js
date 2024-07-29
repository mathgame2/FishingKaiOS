window.addEventListener("load", function () {
    loadTimeView();
    setTimeEnterKeyHandlers();
    setTimeSoftleftKeyHandlers();
});


function loadTimeView() {
    addNewImageBox("timeView", 0, YESTERDAY_FILE_PATH, "Yesterday");
    addNewImageBox("timeView", 1, TODAY_FILE_PATH, "Today");
}


function setTimeEnterKeyHandlers(){
    document.getElementById("timeView").enterKeyHandler = event => {
        const allElements = getAllElements();
        const currentIndex = getTheIndexOfTheSelectedElement();
        const currentElement = allElements[currentIndex];
        const currentElementId = currentElement.getAttribute("localid");

        if (currentElementId === "0") {
            let yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            STATE.currentRecord.dateOfCatch = yesterday;
        }else if (currentElementId === "1") {
            STATE.currentRecord.dateOfCatch = new Date();
        }
        
        // Necessary to force map to reload to avoid bug of it loading only one tile at a time
        setTimeout(function () {
            STATE.mymap.invalidateSize();
        }, 1);

        changeViewTo("mapView");

    }
}

function setTimeSoftleftKeyHandlers(){
    document.getElementById("timeView").softleftKeyHandler = event => {
        changeViewTo("fishCaughtView");
    }
}