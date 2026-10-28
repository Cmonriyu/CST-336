const seasonInput = document.querySelectorAll('input[name="season"]');

seasonInput.forEach(input => { input.addEventListener("click", display)});

document.querySelector("#sort").addEventListener("change",display);
document.querySelector("#reset").addEventListener("click",reset)
// document.querySelector("#textinput").addEventListener("input",display);


let fishCall, fishData, seasonValue, fish, insidediv, newElementdiv, newElement, displayDiv, newElementLabel
let sortfilter, inputfilter, areaFilterdiv, amount;
let areas = ["Ocean", "Beach Farm", "Pelican Town", "River", "Cindersap Forest", "Lake", "Forest Pond", "Forest Farm", "Mines", "Sewer", "Mutant Bug Lair", "Secret Woods", "The Desert", "Witch's Swamp", "Pirate Cove", "Volcano Caldera", "Night Market", "Ginger Island"]
let qualities = [" ", "https://www.stardewvalleywiki.com/mediawiki/images/thumb/8/8a/Silver_Quality_Icon.png/24px-Silver_Quality_Icon.png", "https://www.stardewvalleywiki.com/mediawiki/images/thumb/4/47/Gold_Quality_Icon.png/24px-Gold_Quality_Icon.png", "https://www.stardewvalleywiki.com/mediawiki/images/thumb/e/e4/Iridium_Quality_Icon.png/24px-Iridium_Quality_Icon.png"]


async function setUpFunction(){
    fishCall = await fetch('https://www.stardewvalleywiki.net/api/v1/fish.json');
    fishData = await fishCall.json();
    fishData = fishData["data"];
    for (fishind in fishData){
        if (fishData[fishind]["is_crab_pot"] == true){
            delete fishData[fishind];
        }
    }

    
}

setUpFunction()
setUpAreas();

function setUpAreas(){
    let areaFilterdiv = document.querySelector("#areaFilter");
    for (let area in areas){
        newElementdiv = document.createElement("div");
        newElementdiv.id = areas[area] + "div";
        newElementdiv.className = "areaFilters";


        newElement = document.createElement("input");
        newElement.type = "checkbox";
        newElement.name = "areas";
        newElement.value = areas[area].toLowerCase().replaceAll(" ", "_");

        newElementLabel = document.createElement("label");
        newElementLabel.appendChild(newElement);
        newElementLabel.append(" " + areas[area]);

        newElementdiv.appendChild(newElementLabel);
        areaFilterdiv.appendChild(newElementdiv);
    }
    const areasInput = document.querySelectorAll('input[name="areas"]');
    areasInput.forEach(input => { input.addEventListener("change", display)});
}

function display(){
    fish = useFilter(fishData);
    inputdiv = document.querySelector("#mainbody");
    while (inputdiv.firstChild) {
        inputdiv.removeChild(inputdiv.firstChild);
    }

    for (fishind in fish){
        newElementdiv = document.createElement("div");
        newElementdiv.id = fish[fishind]["name_en"] + "div"
        newElementdiv.className = "fish"

        newImagediv = document.createElement("div");
        newImagediv.id = fish[fishind]["name_en"] + "imgdiv"

        newImageElement = document.createElement("img");
        newImageElement.id = fish[fishind]["name_en"] + "img"
        newImageElement.src = "https://www.stardewvalleywiki.net/images/fish/" + fish[fishind]["name_en"].replaceAll(" ", "_").replaceAll(".","").toLowerCase() + ".png";
        newImageElement.className = "fishimg"

        newElementName = document.createElement("p");
        newElementName.textContent = fish[fishind]["name_en"];
        newElementName.className = "fishnames";

        newElement = document.createElement("p");
        newElement.append("Difficulty: " + fish[fishind]["difficulty"]);
        newElement.append(document.createElement("br"))
        newElement.append("Found In: ");
        newElement.append(document.createElement("br"))
        let locations = fish[fishind]["location"].split(",")
        for (let i = 0; i < locations.length; i++){
            newElement.append(locations[i].replaceAll("_", " "));
            newElement.append(document.createElement("br"))
        }
        newElement.append(document.createElement("br"))
        newElement.id = fish[fishind]["name_en"] + "text";

        newElementTextdiv = document.createElement("div");
        newElementTextdiv.id = fish[fishind]["name_en"] + "Textdiv"
        newElementTextdiv.append("Sell Price: ");
        newElementTextdiv.append(document.createElement("br"));
        for (let i = 0; i < 4; i++){
            newElementTextdiv.append(document.createElement("br"))
            let baseFishimg = document.createElement("img")
            baseFishimg.src = "https://www.stardewvalleywiki.net/images/fish/" + fish[fishind]["name_en"].replaceAll(" ", "_").replaceAll(".","").toLowerCase() + ".png"
            let fishQualityimg = document.createElement("img")
            fishQualityimg.src = qualities[i];
            newElementTextdiv.appendChild(baseFishimg)
            newElementTextdiv.append(fishQualityimg);
            newElementTextdiv.append(fish[fishind]["sell_prices"][i]);
            newElementTextdiv.append(" Gold");
        }

        seasonTimediv = document.createElement("div");
        seasonTimediv.id = fish[fishind]["name_en"] + "STdiv"
        seasonTimediv.append("Season: ")
        seasonTimediv.append(document.createElement("br"));
        for (let i = 0; i < fish[fishind]["season"].length; i++){
            seasonTimediv.append(fish[fishind]["season"][i])
            seasonTimediv.append(document.createElement("br"))
        }
        seasonTimediv.append(document.createElement("br"))
        seasonTimediv.append("Time:")
        seasonTimediv.append(document.createElement("br"))
        seasonTimediv.append(fish[fishind]["time"]);


        newImagediv.appendChild(newImageElement);
        newElementdiv.appendChild(newImagediv);
        newImagediv.appendChild(newElementName);
        newImagediv.appendChild(newElement);
        newElementdiv.appendChild(newElementTextdiv)
        newElementdiv.appendChild(seasonTimediv);
        inputdiv.appendChild(newElementdiv);
    }
    amount = document.querySelector("#amount");
    amount.textContent = "Displaying " + fish.length + " Out of " + fishData.length;
}

function useFilter(fish){
    seasonValue = document.querySelector('input[name="season"]:checked');
    if (seasonValue == null || seasonValue.value == ""){
        fish = fishData;
    } else {
        fish = fishData.filter((f) => (f.season || []).includes(seasonValue.value))
    }

    // inputfilter = document.querySelector("#textinput").value;
    // console.log(inputfilter);
    // if (!(inputfilter == null || inputfilter == "")){
    //     console.log(fish)
    //     fish = fishData.filter((f) => 
    //     {
    //         console.log(f.name_en.toLowerCase().includes(inputfilter)) || (f.location.toLowerCase().includes(inputfilter)) || (f.season.some(s => s.toLowerCase().includes(inputfilter)))
    //     })
    // }

    let checkedAreas = document.querySelectorAll('input[name="areas"]:checked');

    if (checkedAreas.length > 0) {
        fish = fish.filter((f) => {
            if (!f.location) return false;
            let locations = f.location.split(", ");
            for (let areas of checkedAreas) {
                if (locations.includes(areas.value)) return true;
            }
            return false;
        });
    }

    sortfilter = document.querySelector("#sort").value;
    if (sortfilter === "Alphabetical A-Z") {
        fish.sort((a, b) => a["name_en"].localeCompare(b["name_en"]));
    }
    else if (sortfilter === "Alphabetical Z-A") {
        fish.sort((a, b) => b["name_en"].localeCompare(a["name_en"]));
    }
    else if (sortfilter === "Price Low to High") {
        fish.sort((a, b) => a["sell_prices"][0] - b["sell_prices"][0]);
    }
    else if (sortfilter === "Price High to Low") {
        fish.sort((a, b) => b["sell_prices"][0] - a["sell_prices"][0]);
    }
    else if (sortfilter === "Difficulty Low to High") {
        fish.sort((a, b) => a["difficulty"] - b["difficulty"]);
    }
    else if (sortfilter === "Difficulty High to Low") {
        fish.sort((a, b) => b["difficulty"] - a["difficulty"]);
    }
    return fish;

}

function reset(){
    inputdiv = document.querySelector("#mainbody");
    while (inputdiv.firstChild) {
        inputdiv.removeChild(inputdiv.firstChild);
    }
    sortfilter = document.querySelector("#sort");
    sortfilter.value = "Alphabetical A-Z"

    seasonValue = document.querySelectorAll('input[name="season"]');
    for (let season of seasonValue) {
        season.checked = false;
    }


    areaFilter = document.querySelectorAll('input[name="areas"]');
    for (let area of areaFilter) {
        area.checked = false;
    }

    amount = document.querySelector("#amount");
    amount.textContent = "Displaying 0 Out of 70";
}