window.addEventListener("load", function () {
    populateUnits();
    setUnitsEnterKeyHandlers();
})

function populateUnits(){
    add_new_unit("../resources/units/kg.png", "Kg");
    add_new_unit("../resources/units/bushel.png", "Bushel");
}

function add_new_unit(file_loc, name) {
    add_new_choice("unitView", "imageBox", file_loc, name);
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