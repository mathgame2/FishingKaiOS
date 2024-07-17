window.addEventListener("load", function () {
    populateFish();
    setFishEnterKeyHandlers();
})

function populateFish() {
    for (let i = 0; i < fishesConfig.length; i++) {
        add_new_fish(fishesConfig[i].filePath, fishesConfig[i].speciesName, fishesConfig[i].id)
    }
    addDoneButton("fishView");
}

function add_new_fish(file_loc, name, localId) {
    add_new_image_box("fishView", localId, file_loc, name);
}

function setFishEnterKeyHandlers() {

    document.getElementById("fishView").enterKeyHandler = event => {

        const allElements = getAllElements();
        const currentIndex = getTheIndexOfTheSelectedElement();
        const currentElement = allElements[currentIndex];

        if (parseInt(event.target.getAttribute("localid")) === -1) {
            // Clear all selected elements for next time
            const selectedElements = STATE.activeView.querySelectorAll("[image-selected=true]");
            for (let i = 0; i < selectedElements.length; i++) {
                selectedElements[i].setAttribute("image-selected", false);
            }

            setFirstFishInput();
            reorderFish();

            changeViewTo("fishCaughtView");
        } else if (currentElement.getAttribute('image-selected') === 'true') {
            // If already selected, toggle unselected and remove from selected list
            currentElement.setAttribute('image-selected', 'false');
            for (let i = 0; i < STATE.chosenFish.length; i++) {
                if (STATE.chosenFish[i].getAttribute("localid") === currentElement.getAttribute("localid")) {
                    STATE.chosenFish.splice(i, 1);
                }
            }

        } else {
            // If not selected, select and add to selected list
            currentElement.setAttribute('image-selected', 'true');
            STATE.chosenFish.push(currentElement);
        }
    };

    document.getElementById("fishCaughtView").enterKeyHandler = event => {

        // Whether the current data is for total caught fish or fish returned to sea
        if (STATE.isCaught) {
            // Set the state to be for fish returned to sea
            const box = document.getElementById("caughtOrThrown");
            box.querySelector("b").textContent = "Fish Thrown"
            box.querySelector("img").src = "../resources/fishBackToSea.png"

            // reset tallies
            STATE.activeView.querySelector("#numberText").textContent = "0";
            set_tallies();
            STATE.isCaught = false;
        } else {

            // Check if there are more selected fish
            if (STATE.fishIndex < STATE.chosenFish.length - 1) {
                STATE.fishIndex += 1;

                // change to the next fish
                let fishBox = document.getElementById("fishType");
                let fish = STATE.chosenFish[STATE.fishIndex];
                fishBox.querySelector("b").textContent = fish.querySelector("img").alt;
                fishBox.querySelector("img").src = fish.querySelector("img").src

                // change to fish caught
                const box = document.getElementById("caughtOrThrown");
                box.querySelector("b").textContent = "Fish Caught"
                box.querySelector("img").src = "../resources/fishInNet.png"

                // reset tallies
                STATE.activeView.querySelector("#numberText").textContent = "0";
                set_tallies();

                STATE.isCaught = true;
            } else {
                // if no more fish, clear chosen fish and move on
                STATE.chosenFish = new Array();
                changeViewTo("mapView");
            }
        }
    }

    document.getElementById("mapView").enterKeyHandler = event => {
        changeViewTo("gearRecordView");
    }
}

// Set up the input view for the first fish that has been chosen
function setFirstFishInput() {

    // clear view
    const view = document.getElementById("fishCaughtView");
    view.innerHTML = "";

    // Set the first fish
    const fish = STATE.chosenFish[0];
    STATE.isCaught = true;
    STATE.fishIndex = 0;

    add_static_image_box("fishCaughtView", "fishType", fish.querySelector("img").src, fish.querySelector("img").alt);
    add_static_image_box("fishCaughtView", "caughtOrThrown", "../resources/fishInNet.png", "Fish Caught");
    add_input_area();
    add_static_image_box("fishCaughtView", "unitBox", STATE.currentUnit.querySelector("img").src, STATE.currentUnit.querySelector("img").alt)
}

// Add the input area which keeps track of the tallies
function add_input_area() {
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
    const allElements = getAllElements();
    for (let i = 0; i < STATE.chosenFish.length; i++) {
        STATE.activeView.insertBefore(STATE.chosenFish[i], allElements[0]);
    }


}