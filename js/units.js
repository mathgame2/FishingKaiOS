window.addEventListener("load", function () {
    populateUnits();
    setUnitsEnterKeyHandlers();
})

function populateUnits(){
    for (let i = 0; i < unitsConfig.length; i++) {
        add_new_unit(unitsConfig[i].filePath, unitsConfig[i].unitName, unitsConfig[i].id);   
    }
}

function add_new_unit(file_loc, name, localID) {
    add_new_image_box("unitView", localID, file_loc, name);
}

function setUnitsEnterKeyHandlers() {
    const unitView = document.getElementById("unitView");

    unitView.enterKeyHandler = event => {
        const curElement = event.target;
        // Store the current unit chosen for this record
        STATE.currentRecord.unit = curElement.querySelector("b").textContent;
        STATE.currentUnit = curElement;
        changeViewTo("fishView");
    }
}