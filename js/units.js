window.addEventListener("load", function () {
    populateUnits();
    // populateGear();
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
        STATE.currentRecord.unit = curElement.querySelector("b").textContent;
        changeViewTo("fishView");
    }
}