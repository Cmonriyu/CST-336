document.querySelector("#search").addEventListener("click",setUpFunction);
let user, tag, puuid, call, data, champData, champCall, championMap;
let displaydiv, championInfo, inputElementdiv, textElementdiv, nameElement, pointElement, levelElement, imageElement;
const key = '?api_key=RGAPI-5a25632d-50db-44b2-88f2-1928379c08d6';

setUpChampFunction()

async function setUpChampFunction(){
    champCall = await fetch("https://ddragon.leagueoflegends.com/cdn/12.6.1/data/en_US/champion.json");
    champData = await champCall.json();
    champData = champData["data"];
    championMap = new Map();
    for(let champ of Object.values(champData)){
        championMap.set(champ["key"],champ);
    }
}


async function setUpFunction(){
    // user = document.querySelector("#username").value
    // tag = document.querySelector("#tag").value;
    // if (user  == "" || tag == ""){
    //     console.log("username or tag cannot be empty");
    //     return;
    // }

    // call = await fetch('https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/' + user + '/' + tag + key  );
    // data = await call.json();
    // if (data["puuid"] == null){
    //     console.log("Cannot find user, Try again")
    //     return;
    // }
    // puuid = data["puuid"];

    call = await fetch('https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/' + "mrwp_y7nsnlPD2g7StrXPQIHvMZ2EzSyGK_5tAENLDYw9WjzapY3jvoAml6Qsv7-9pbXOBnuh5wO6Q" + key); 
    // call = await fetch('https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/' + puuid + key); 
    data = await call.json();
    display();
}

function display(){
    displaydiv = document.querySelector("#displaydiv");
    while (displaydiv.firstChild){
        displaydiv.removeChild(displaydiv.firstChild);
    }
    for (let i = 0; i < 10; i++){
        championInfo = championMap.get(String(data[i]["championId"]))

        inputElementdiv = document.createElement("div");
        inputElementdiv.id = championInfo["name"];
        inputElementdiv.className = "champions";

        imageElementdiv = document.createElement("div");
        imageElementdiv.id = championInfo["name"] + "imgdiv";

        textElementdiv = document.createElement("div");
        textElementdiv.id = championInfo["name"] + "textdiv";

        nameElement = document.createElement("p");
        nameElement.textContent = championInfo["name"] + ", " + championInfo["title"];

        pointElement = document.createElement("p");
        pointElement.textContent = "Mastery Points = " + data[i]["championPoints"];

        levelElement = document.createElement("p");
        levelElement.textContent = "Mastery Level = " + data[i]["championLevel"];

        imageElement = document.createElement("img");
        imageElement.src = "https://ddragon.leagueoflegends.com/cdn/12.6.1/img/champion/" + championInfo["image"]["full"];

        inputElementdiv.appendChild(imageElementdiv);
        imageElementdiv.appendChild(imageElement);
        textElementdiv.appendChild(nameElement);
        textElementdiv.appendChild(pointElement);
        textElementdiv.appendChild(levelElement);
        inputElementdiv.appendChild(textElementdiv);
        displaydiv.appendChild(inputElementdiv)
    }
}

