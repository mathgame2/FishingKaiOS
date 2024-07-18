window.addEventListener("load", function () {
    populateUnits();
    setUnitsEnterKeyHandlers();
    setUnitsSoftleftKeyHandlers();
})

function populateUnits(){
    for (let i = 0; i < unitsConfig.length; i++) {
        addNewUnit(unitsConfig[i].filePath, unitsConfig[i].unitName, unitsConfig[i].id);   
    }
}

function addNewUnit(file_loc, name, localID) {
    addNewImageBox("unitView", localID, file_loc, name);
}

function setUnitsEnterKeyHandlers() {
    const unitView = document.getElementById("unitView");

    unitView.enterKeyHandler = event => {
        const curElement = event.target;
        // Store the current unit chosen for this record
        STATE.currentRecord.unitID = parseInt(curElement.getAttribute("localid"));
        changeViewTo("fishView");
    }
}

function setUnitsSoftleftKeyHandlers() {
    const unitView = document.getElementById("unitView");

    unitView.softleftKeyHandler = event => {
        changeViewTo("gearRecordView");
    }
    
}