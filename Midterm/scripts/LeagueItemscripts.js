let itemCall, itemData, filteredData, statFilterdiv, stat, newElementdiv, newElement, imgdiv, statimg, textdiv, newElementLabel, itemsArray, input;
let displaydiv, championInfo, inputElementdiv, textElementdiv, statElementdiv, nameElement, priceElement, imageElement;
let classFilter, sortFilter, textFilter, statFilter, statInputs, amount;
const statNames = ["Attack Damage", "Ability Power", "Health", "Armor", "Magic Resist", "Attack Speed", "Critical Strike Chance", "Ability Haste", "Mana", "Movement Speed"];
const itemClasses = ["Fighter", "Marksman", "Assassin", "Mage", "Tank", "Support"];
const basesrc = "https://raw.communitydragon.org/latest/game/assets/perks/statmods/";
const statIcon = new Map([
    ["Attack Damage", basesrc + "statmodsattackdamageicon.png"],
    ["Ability Power", basesrc + "statmodsabilitypowericon.png"],
    ["Health", basesrc + "statmodshealthplusicon.png"],
    ["Armor", basesrc + "statmodsarmoricon.png"],
    ["Mana", "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/ux/fonts/texticons/lol/statsicon/scalemana.png"],
    ["Magic Resist", basesrc + "statmodsmagicresicon.png"],
    ["Attack Speed", basesrc + "statmodsattackspeedicon.png"],
    ["Critical Strike Chance", "https://raw.communitydragon.org/latest/game/assets/ux/floatingtext/criticon.png"],
    ["Movement Speed", basesrc + "statmodsmovementspeedicon.png"],
    ["Ability Haste", basesrc + "statmodscdrscalingicon.png"]
]);

const statKey = {
    "Attack Damage": "FlatPhysicalDamageMod",
    "Ability Power": "FlatMagicDamageMod",
    "Health": "FlatHPPoolMod",
    "Armor": "FlatArmorMod",
    "Magic Resist": "FlatSpellBlockMod",
    "Attack Speed": "PercentAttackSpeedMod",
    "Critical Strike Chance": "FlatCritChanceMod",
    "Ability Haste": "rPercentCooldownMod",
    "Mana": "FlatMPPoolMod",
    "Movement Speed": "FlatMovementSpeedMod"
};

classFilter = document.querySelectorAll('input[name="class"]')
classFilter.forEach(input => { input.addEventListener("change", display) });

textFilter = document.querySelector("#input");
textFilter.addEventListener("input", display);

document.querySelector("#sort").addEventListener("change", display);
document.querySelector("#reset").addEventListener("click", reset)

setUpItemFunction();
setUpStats()


async function setUpItemFunction() {
    itemCall = await fetch("https://ddragon.leagueoflegends.com/cdn/16.20.1/data/en_US/item.json");
    itemData = await itemCall.json();
    itemData = itemData["data"];
    for (let key of Object.keys(itemData)) {
        let item = itemData[key];
        if (item["inStore"] == false || item["gold"]["purchasable"] == false || item["maps"]["11"] == false || !(item["stats"] && Object.keys(item["stats"]).length > 0)) {
            delete itemData[key];
        }
    }
}

function setUpStats() {
    statFilterdiv = document.querySelector("#statFilterdiv");

    for (let [statName, iconsrc] of statIcon) {
        stat = statName.replaceAll(" ", "");

        newElementdiv = document.createElement("div");
        newElementdiv.id = stat + "div";
        newElementdiv.className = "stats";

        newElement = document.createElement("input");
        newElement.type = "checkbox";
        newElement.name = "statboxes";
        newElement.id = stat + "box";
        newElement.value = statName;

        imgdiv = document.createElement("div");
        statimg = document.createElement("img");
        statimg.id = statName + "img";
        statimg.src = iconsrc;
        imgdiv.appendChild(statimg);

        textdiv = document.createElement("div");
        textdiv.textContent = statName;

        newElementLabel = document.createElement("label");
        newElementLabel.appendChild(newElement);
        newElementLabel.appendChild(imgdiv);
        newElementLabel.appendChild(textdiv);

        newElementdiv.appendChild(newElementLabel);
        statFilterdiv.appendChild(newElementdiv);
    };

    statInputs = document.querySelectorAll('input[name="statboxes"]');
    statInputs.forEach(input => { input.addEventListener("change", display); });
}

function display() {
    displaydiv = document.querySelector("#displaydiv");
    while (displaydiv.firstChild) {
        displaydiv.removeChild(displaydiv.firstChild);
    }

    itemsArray = Object.values(itemData);
    sortFilter = document.querySelector("#sort").value;


    if (sortFilter === "Alphabetical A-Z") {
        itemsArray.sort((a, b) => a["name"].localeCompare(b["name"]));
    } else if (sortFilter === "Alphabetical Z-A") {
        itemsArray.sort((a, b) => b["name"].localeCompare(a["name"]));
    } else if (sortFilter === "Price Low to High") {
        itemsArray.sort((a, b) => a["gold"]["total"] - b["gold"]["total"]);
    } else if (sortFilter === "Price High to Low") {
        itemsArray.sort((a, b) => b["gold"]["total"] - a["gold"]["total"]);
    }

    for (let item of itemsArray) {
        if (!filter(item)) {
            continue;
        }
        inputElementdiv = document.createElement("div");
        inputElementdiv.id = item["name"];
        inputElementdiv.className = "items";

        imageElementdiv = document.createElement("div");
        imageElementdiv.id = item["name"] + "imgdiv";

        textElementdiv = document.createElement("div");
        textElementdiv.id = item["name"] + "textdiv";

        nameElement = document.createElement("p");
        nameElement.textContent = item["name"];

        priceElement = document.createElement("p");
        priceElement.textContent = "Gold: " + item["gold"]["total"];

        statElementdiv = document.createElement("div")
        statElementdiv.id = item["name"] + "statdiv";

        if (item["description"]) {
            let lines = item["description"].replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]*>/g, " ").split("\n");     // I asked AI to help me with this block to properly display my description as it uses embedded tags
            for (let line of lines) {
                let cleanLine = line.replace(/\s+/g, " ").trim();
                if (cleanLine !== "") { 
                    let statElement = document.createElement("p");
                    statElement.textContent = cleanLine;
                    statElementdiv.appendChild(statElement);
                }
            }
        }

        imageElement = document.createElement("img");
        imageElement.src = "https://ddragon.leagueoflegends.com/cdn/16.20.1/img/item/" + item["image"]["full"]
        imageElement.id = item["name"] + "img"
        imageElement.className = "itemimages";

        inputElementdiv.appendChild(imageElementdiv);
        imageElementdiv.appendChild(imageElement);
        textElementdiv.appendChild(nameElement);
        textElementdiv.appendChild(priceElement);
        inputElementdiv.appendChild(textElementdiv);
        inputElementdiv.appendChild(statElementdiv);
        displaydiv.appendChild(inputElementdiv)

        amount = document.querySelector("#amount");
        amount.textContent = "Displaying " + displaydiv.children.length + " Out of " + Object.keys(itemData).length;

    }
}


function filter(item) {
    classFilter = document.querySelector('input[name="class"]:checked');
    if (!(classFilter == null || classFilter.value == "")) {
        if (!(checkItemClass(item).includes(classFilter.value))) {
            return false;
        }
    }

    textFilter = document.querySelector("#input");
    if (textFilter == null || textFilter.value.trim() !== "") {
        input = textFilter.value.toLowerCase();
        if (!item["name"].toLowerCase().includes(input)) {
            return false;
        }
    }

    statInputs = document.querySelectorAll('input[name="statboxes"]:checked');
    if (statInputs.length > 0) {
        for (let statName of statInputs) {
            if (statName.value === "Critical Strike Chance" || statName.value === "Ability Haste") {
                console.log(item["description"])
                console.log(statName)
                if (item["description"] == null || !item["description"].toLowerCase().includes(statName.value.toLowerCase())) {
                    return false;
                }
            } else {
                stat = statKey[statName.value];
                if (item["stats"] == null || item["stats"][stat] === undefined) {
                    return false;
                }
            }
        }
    }

    return true;
}


function reset() {
    displaydiv = document.querySelector("#displaydiv");
    while (displaydiv.firstChild) {
        displaydiv.removeChild(displaydiv.firstChild);
    }

    classFilter = document.querySelectorAll('input[name="class"]')
    for (let classSelect of classFilter) {
        classSelect.checked = false;
    }

    textFilter = document.querySelector("#input");
    textFilter.value = "";

    statInputs = document.querySelectorAll('input[name="statboxes"]');
    for (let stat of statInputs) {
        stat.checked = false;
    }

    sortFilter = document.querySelector("#sort");
    sortFilter.value = "Alphabetical A-Z"

    amount = document.querySelector("#amount");
    amount.textContent = "Displaying 0 Out of 227";

}

function checkItemClass(item) {
    let classes = []
    let itemTags = item["tags"];

    if (itemTags.includes("SpellDamage") || itemTags.includes("MagicPenetration") || itemTags.includes("Mana")) classes.push("Mage");
    if (itemTags.includes("CriticalStrike") || itemTags.includes("AttackSpeed") || itemTags.includes("OnHit")) classes.push("Marksman");
    if (itemTags.includes("Armor") || itemTags.includes("MagicResist") || itemTags.includes("SpellBlock") || itemTags.includes("Health")) classes.push("Tank");
    if (itemTags.includes("ArmorPenetration") || itemTags.includes("MagicPenetration")) classes.push("Assassin");
    if (itemTags.includes("GoldPer") || (itemTags.includes("Mana") && itemTags.includes("Health")) || (itemTags.includes("ManaRegen"))) classes.push("Support");
    if (itemTags.includes("LifeSteal") || itemTags.includes("SpellVamp") || itemTags.includes("Damage") || itemTags.includes("CooldownReduction")) classes.push("Fighter");

    return classes;
}