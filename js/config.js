// File for configuring the options that are shown in the app.
// Ids of different kinds of objects are independent of each other

const unitsConfig = [
    {
        "id": 0,
        "filePath": "../resources/units/kg.png",
        "unitName": "KG"
    },
    {
        "id": 1,
        "filePath": "../resources/units/bushel.png",
        "unitName": "Bushel"
    }
]

const fishesConfig = [
    {
        "id": 0,
        "filePath": "../resources/fish/crab.png",
        "speciesName": "Crab"
    },
    {
        "id": 1,
        "filePath": "../resources/fish/lobster.png",
        "speciesName": "Lobster"
    },
    {
        "id": 2,
        "filePath": "../resources/fish/fish1.png",
        "speciesName": "Fish 1"
    },
    {
        "id": 3,
        "filePath": "../resources/fish/fish2.png",
        "speciesName": "Fish 2"
    },
    {
        "id": 4,
        "filePath": "../resources/fish/fish3.png",
        "speciesName": "Fish 3"
    },
    {
        "id": 5,
        "filePath": "../resources/fish/fish4.png",
        "speciesName": "Fish 4"
    },
    {
        "id": 6,
        "filePath": "../resources/fish/fish5.png",
        "speciesName": "Fish 5"
    },
    {
        "id": 7,
        "filePath": "../resources/fish/fish6.png",
        "speciesName": "Fish 6"
    },
    {
        "id": 8,
        "filePath": "../resources/fish/fish7.png",
        "speciesName": "Fish 7"
    }
]

// Ids of specific gears need to be unique across gear types
// Ids for gear types are independent for specific gears, these ids are used for creating the navigation view for registration
// gearType is the subtitle name under the image, whereas viewName is used as the html ID of the view
const gearConfig = [
    {
        "gearType": "Static Gear",
        "filePath": "../resources/gear/staticGearIcon.png",
        "viewName": "staticGearView",
        "id": 0,
        "gears": [
            {
                "id": 0,
                "filePath": "../resources/gear/static/crabpot.png",
                "gearName": "Crab Pot"
            },
            {
                "id": 1,
                "filePath": "../resources/gear/static/gillnet.png",
                "gearName": "Gillnet"
            },
            {
                "id": 3,
                "filePath": "../resources/gear/static/lining.png",
                "gearName": "Lining"
            },

        ]
    },
    {
        "gearType": "Encircling Gear",
        "filePath": "../resources/gear/encirclingGearIcon.png",
        "viewName": "encirclingGearView",
        "id": 1,
        "gears": [
            {
                "id": 4,
                "filePath": "../resources/gear/encircling/beachSeine.png",
                "gearName": "Beach Seine"
            },
            {
                "id": 5,
                "filePath": "../resources/gear/encircling/purseSeine.png",
                "gearName": "Purse Seine"
            },
            {
                "id": 6,
                "filePath": "../resources/gear/encircling/ringnet.png",
                "gearName": "Ringnet"
            },
        ]
    },
    {
        "gearType": "Towed Gear",
        "filePath": "../resources/gear/towedGearIcon.png",
        "viewName": "towedGearView",
        "id": 2,
        "gears": [
            {
                "id": 7,
                "filePath": "../resources/gear/towed/beamTrawl.png",
                "gearName": "Beam Trawl"
            },
            {
                "id": 8,
                "filePath": "../resources/gear/towed/demersalTrawl.png",
                "gearName": "Demersal Trawl"
            },
            {
                "id": 9,
                "filePath": "../resources/gear/towed/pelagicTrawl.png",
                "gearName": "Pelagic Trawl"
            },
        ]
    }
]

// Source of the image representing the done button
const DONE_BUTTON_FILE_PATH = "../resources/done.png";

const FISH_CAUGHT_FILE_PATH = "../resources/fishInNet.png";

const FISH_RETURNED_FILE_PATH = "../resources/fishBackToSea.png";