window.addEventListener("load", function () {
    populateFish();
    setFishEnterKeyHandlers();
    setFishSoftLeftKeyHandlers();
})

function populateFish() {
    const storedOrder = JSON.parse(localStorage.getItem("fishOrder"));
    if (storedOrder) {
        for (let i = 0; i < storedOrder.length; i++) {
            addNewFish(fishesConfig[storedOrder[i]].filePath, fishesConfig[storedOrder[i]].speciesName, fishesConfig[storedOrder[i]].id);
        }
    } else {
        for (let i = 0; i < fishesConfig.length; i++) {
            addNewFish(fishesConfig[i].filePath, fishesConfig[i].speciesName, fishesConfig[i].id)
        }
    }
    addDoneButton("fishView");
}

function addNewFish(file_loc, name, localId) {
    addNewImageBox("fishView", localId, file_loc, name);
}

function setFishEnterKeyHandlers() {

    document.getElementById("fishView").enterKeyHandler = event => {

        const allElements = getAllElements();
        const currentIndex = getTheIndexOfTheSelectedElement();
        const currentElement = allElements[currentIndex];

        if (parseInt(event.target.getAttribute("localid")) === -1) {
                STATE.chosenFish = [];
            // Clear all selected elements for next time
            const selectedElements = STATE.activeView.querySelectorAll("[image-selected=true]");
            for (let i = 0; i < selectedElements.length; i++) {
                STATE.chosenFish.push(selectedElements[i]);
                selectedElements[i].setAttribute("image-selected", false);
            }

            setFirstFishInput();
            reorderFish();

            changeViewTo("fishCaughtView");
        } else if (currentElement.getAttribute('image-selected') === 'true') {
            // If already selected, toggle unselected and remove from selected list
            currentElement.setAttribute('image-selected', 'false');
        } else {
            // If not selected, select and add to selected list
            currentElement.setAttribute('image-selected', 'true');
        }
    };

    document.getElementById("fishCaughtView").enterKeyHandler = event => {

        // Whether the current data is for total caught fish or fish returned to sea
        if (STATE.isCaught) {
            // Set the state to be for fish returned to sea
            const box = document.getElementById("caughtOrThrown");
            box.querySelector("b").textContent = "Fish Thrown"
            box.querySelector("img").src = "../resources/fishBackToSea.png"

            const newCatch = {
                id: STATE.chosenFish[STATE.fishIndex].getAttribute("localid"),
                numberOfUnitsCaught: parseInt(STATE.activeView.querySelector("#numberText").textContent),
                numberOfUnitsReturned: null,
            }

            STATE.currentRecord.fishesCaught.push(newCatch);

            // reset tallies
            STATE.activeView.querySelector("#numberText").textContent = "0";
            setTallies(0);
            STATE.isCaught = false;
        } else {

            STATE.currentRecord.fishesCaught[STATE.currentRecord.fishesCaught.length - 1].numberOfUnitsReturned = parseInt(STATE.activeView.querySelector("#numberText").textContent);

            // Check if there are more selected fish
            if (STATE.fishIndex < STATE.chosenFish.length - 1) {
                STATE.fishIndex += 1;

                // change to the next fish
                let fishBox = document.getElementById("fishType");
                let fish = STATE.chosenFish[STATE.fishIndex];
                fishBox.querySelector("b").textContent = fish.querySelector("img").alt;
                fishBox.querySelector("img").src = fish.querySelector("img").src;

                // change to fish caught
                const box = document.getElementById("caughtOrThrown");
                box.querySelector("b").textContent = "Fish Caught"
                box.querySelector("img").src = "../resources/fishInNet.png"

                // reset tallies
                STATE.activeView.querySelector("#numberText").textContent = "0";
                setTallies(0);

                STATE.isCaught = true;
            } else {
                // if no more fish, clear chosen fish and move on
                changeViewTo("mapView");
            }
        }
    }

    document.getElementById("mapView").enterKeyHandler = event => {
        changeViewTo("gearRecordView");
    }
}

function setFishSoftLeftKeyHandlers() {
    document.getElementById("fishView").softleftKeyHandler = event => {
        changeViewTo("unitView");
    };

    document.getElementById("fishCaughtView").softleftKeyHandler = event => {

        // Whether the current data is for total caught fish or fish returned to sea
        if (STATE.isCaught) {

            if (STATE.fishIndex === 0) {
                STATE.currentRecord.fishesCaught = [];
                STATE.chosenFish = [];
                changeViewTo("fishView");
            } else {

                STATE.fishIndex--;
                STATE.currentRecord.fishesCaught.pop();

                // change to fish caught
                const box = document.getElementById("caughtOrThrown");
                box.querySelector("b").textContent = "Fish Thrown"
                box.querySelector("img").src = "../resources/fishBackToSea.png"

                // change to the previous fish
                let fishBox = document.getElementById("fishType");
                let fish = STATE.chosenFish[STATE.fishIndex];
                fishBox.querySelector("b").textContent = fish.querySelector("img").alt;
                fishBox.querySelector("img").src = fish.querySelector("img").src;

                const prevNumberOfUnitsReturned = STATE.currentRecord.fishesCaught[STATE.currentRecord.fishesCaught.length - 1].numberOfUnitsReturned;
                STATE.activeView.querySelector("#numberText").textContent = prevNumberOfUnitsReturned;
                setTallies(parseInt(prevNumberOfUnitsReturned));

                STATE.isCaught = false;
            }


        } else {

            // change to fish caught
            const box = document.getElementById("caughtOrThrown");
            box.querySelector("b").textContent = "Fish Caught"
            box.querySelector("img").src = "../resources/fishInNet.png"

            const prevNumberOfUnitsCaught = STATE.currentRecord.fishesCaught[STATE.currentRecord.fishesCaught.length - 1].numberOfUnitsCaught;
            STATE.activeView.querySelector("#numberText").textContent = prevNumberOfUnitsCaught;
            setTallies(parseInt(prevNumberOfUnitsCaught));

            STATE.isCaught = true;

        }
    }

    document.getElementById("mapView").softleftKeyHandler = event => {
        changeViewTo("fishCaughtView");
    }
}

// Set up the input view for the first fish that has been chosen
function setFirstFishInput() {

    // clear view
    const view = document.getElementById("fishCaughtView");
    view.innerHTML = "";

    // Set the first fish
    const fishID = parseInt(STATE.chosenFish[0].getAttribute("localid"));
    STATE.isCaught = true;
    STATE.fishIndex = 0;
    const unit = unitsConfig[STATE.currentRecord.unitID];

    addStaticImageBox("fishCaughtView", "fishType", fishesConfig[fishID].filePath, fishesConfig[fishID].speciesName);
    addStaticImageBox("fishCaughtView", "caughtOrThrown", "../resources/fishInNet.png", "Fish Caught");
    addInputArea();
    addStaticImageBox("fishCaughtView", "unitBox", unit.filePath, unit.unitName);
}

// Add the input area which keeps track of the tallies
function addInputArea() {
    var gridContainer = document.getElementById("fishCaughtView");

    var container = document.createElement("div");
    var paragraph = document.createElement("p");

    var tag = document.createElement("b");
    tag.id = "numberText"
    tag.textContent = 0;
    var entry = document.createElement("b");
    entry.id = "tallyText"
    entry.textContent = " ";

    // Needed to make the box focusable
    container.tabIndex = -1;
    container.id = "inputNumberBox"
    container.className = "imageBox";

    container.setAttribute('nav-selectable', 'true');

    container.appendChild(paragraph);
    paragraph.appendChild(entry);
    container.appendChild(tag);

    gridContainer.appendChild(container);
}

// Reorder the fish based on previous selections
// Bump the selected fish to the top of the list
function reorderFish() {
    let allElements = getAllElements();
    STATE.fishOrder = [];
    for (let i = 0; i < STATE.chosenFish.length; i++) {
        STATE.activeView.insertBefore(STATE.chosenFish[i], allElements[0]);
    }

    allElements = getAllElements();
    // -1 to ignore done button
    for (let i = 0; i < allElements.length - 1; i++) {
        STATE.fishOrder.push(parseInt(allElements[i].getAttribute("localid")));
    }

    localStorage.setItem("fishOrder", JSON.stringify(STATE.fishOrder));

}