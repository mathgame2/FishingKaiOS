window.addEventListener("load", function () {
    populateGear();
    setGearEnterKeyHandlers();
    setGearSoftleftKeyHandlers();
})

// Add new gear types here
// Loads gear images into the correct views
function populateGear() {
    const rootView = document.getElementById("rootView");
    for (let i = 0; i < gearConfig.length; i++) {
        const newView = createNewGearTypeView(gearConfig[i].viewName, gearConfig[i].gearType, gearConfig[i].filePath, gearConfig[i].id);
        rootView.appendChild(newView);
        attachGearsToView(newView, gearConfig[i].gears);
    }

    // Update all views
    STATE.views = document.getElementById("rootView").querySelectorAll(".view");

    addDoneButton('gearView');
    addDoneButton('staticGearView');
    addDoneButton('encirclingGearView');
    addDoneButton('towedGearView');

}

function createNewGearTypeView(viewName, gearType, filePath, typeID) {
    const view = document.createElement("div");
    view.classList.add("view");
    view.id = viewName;
    view.setAttribute("nav-column-size", "2");

    addNewImageBox("gearView", typeID, filePath, gearType);

    return view;
}

function attachGearsToView(gearView, gears) {
    for (let i = 0; i < gears.length; i++) {
        addNewImageBox(gearView.id, gears[i].id, gears[i].filePath, gears[i].gearName)
    }
}

function setGearEnterKeyHandlers() {
    var gridViewContainer = document.getElementById('gearView');

    gridViewContainer.enterKeyHandler = event => {
        const gearViewIndex = parseInt(event.target.getAttribute("localid"));
        if (gearViewIndex === -1) {
            populateChosenGear();
            storeChosenGear();
            changeViewTo("gearRecordView");
        } else {
            changeViewTo(gearConfig[gearViewIndex].viewName);
        }
    }

    const specificGearViewEnterKeyHandler = event => {
        const allElements = getAllElements();
        const currentIndex = getTheIndexOfTheSelectedElement();
        const currentElement = allElements[currentIndex];
        const currentElementId = currentElement.getAttribute("localid");

        // If done is selected, return back to gearView view
        if (parseInt(event.target.getAttribute("localid")) === -1) {
            changeViewTo("gearView");
            // If not, toggle the currently focused gear
        } else if (currentElement.getAttribute('image-selected') === 'true') {
            // Remove the gear from the selected list if already chosen
            currentElement.setAttribute('image-selected', 'false');
            for (let i = 0; i < STATE.registeredGear.length; i++) {
                if (STATE.registeredGear[i] === currentElementId) {
                    STATE.registeredGear.splice(i, 1);
                }
            }
        } else {
            // Add gear to selected list if not already chosen
            currentElement.setAttribute('image-selected', 'true');
            STATE.registeredGear.push(currentElementId);
        }
    };

    for (let i = 0; i < gearConfig.length; i++) {
        document.getElementById(gearConfig[i].viewName).enterKeyHandler = specificGearViewEnterKeyHandler;
    }

    document.getElementById("gearRecordView").enterKeyHandler = event => {
        const curElement = event.target;
        // current record is for persistence, currently not fully utilised or implemented except for image loading purposes
        STATE.currentRecord.gearID = parseInt(curElement.getAttribute("localid"));
        changeViewTo("unitView");
    }

}

function setGearSoftleftKeyHandlers(){
    var gridViewContainer = document.getElementById('gearView');

    gridViewContainer.softleftKeyHandler = event => {
        changeViewTo("registerView");
    }

    const specificGearViewSoftLeftKeyHandler = event => {
        changeViewTo("gearView");
    };

    for (let i = 0; i < gearConfig.length; i++) {
        document.getElementById(gearConfig[i].viewName).softleftKeyHandler = specificGearViewSoftLeftKeyHandler;
    }

    document.getElementById("gearRecordView").softleftKeyHandler = event => {
        changeViewTo("gearView")
    }
}

// Add the registered gear to the screen for choosing gear
function populateChosenGear() {
    const gearRecordView = document.getElementById("gearRecordView");

    // Clear children nodes
    while (gearRecordView.firstChild) {
        gearRecordView.removeChild(gearRecordView.lastChild);
    }

    for (let i = 0; i < STATE.registeredGear.length; i++) {
        const gearInfo = findGearWithId(parseInt(STATE.registeredGear[i]));
        addNewImageBox("gearRecordView", gearInfo.id, gearInfo.filePath, gearInfo.gearName);
    }
}

function storeChosenGear(){
    localStorage.setItem("registeredGear", JSON.stringify(STATE.registeredGear));
    localStorage.setItem("registered", "true");
}

function findGearWithId(id){
    for (let i = 0; i < gearConfig.length; i++) {
        for (let j = 0; j < gearConfig[i].gears.length; j++) {
            if (gearConfig[i].gears[j].id === id) {
                return gearConfig[i].gears[j];
            }
        }
    }
}