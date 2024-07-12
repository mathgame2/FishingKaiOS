window.addEventListener("load", function () {
    populateFish();
    // populateGear();
    setFishEnterKeyHandlers();
})

function populateFish() {
    add_new_fish("../resources/fish/crab.png", "Crab");
    add_new_fish("../resources/fish/lobster.png", "Lobster");

    add_new_fish("../resources/fish/fish1.png", "Fish 1");
    add_new_fish("../resources/fish/fish2.png", "Fish 2");
    add_new_fish("../resources/fish/fish3.png", "Fish 3");
    add_new_fish("../resources/fish/fish4.png", "Fish 4");
    add_new_fish("../resources/fish/fish5.png", "Fish 5");
    add_new_fish("../resources/fish/fish6.png", "Fish 6");
    add_new_fish("../resources/fish/fish7.png", "Fish 7");

    addDoneButton("fishView");

}

function add_new_fish(file_loc, name) {
    add_new_choice("fishView", "imageBox", file_loc, name);
}

function setFishEnterKeyHandlers() {


    event => {
        const allElements = getAllElements();
        const currentIndex = getTheIndexOfTheSelectedElement();
        currentElement = allElements[currentIndex];
        if (currentElement.id === "done") {
            // changeViewTo("gearView");
        } else if (currentElement.getAttribute('fish-selected') === 'true') {

            currentElement.setAttribute('fish-selected', 'false');
            for (let i = 0; i < STATE.chosenFish.length; i++) {
                if (STATE.chosenFish[i].querySelector("b").textContent === currentElement.querySelector("b").textContent) {
                    STATE.chosenFish.splice(i, 1);
                }

            }

        } else {
            currentElement.setAttribute('fish-selected', 'true');
            STATE.chosenFish.push(currentElement);
        }
    };

    // const unitView = document.getElementById("unitView");
    // unitView.enterKeyHandler = event => {
    //     const curElement = event.target;
    //     STATE.currentRecord.unit = curElement.querySelector("b").textContent;
    //     changeViewTo("fishView");
    // }
}