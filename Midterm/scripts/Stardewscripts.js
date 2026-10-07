document.querySelector("#options").addEventListener("click",setUpFunction);



async function setUpFunction(){
    const res = await fetch('https://www.stardewvalleywiki.net/api/v1/fish.json');
    const { data } = await res.json();
    let value = document.querySelector("#options").value;
    const Fish = data.filter((f) => (f.season || []).includes(value))
    let inside = document.getElementById("mainbody");
    while (inside.firstChild) {
        inside.removeChild(inside.firstChild);
    }

    for (fish in Fish){
        let newElement = document.createElement("p");
        newElement.textContent = Fish[fish].name_en + " found in " + Fish[fish].location;
        let inputLocation = document.querySelector("#mainbody");
        inputLocation.appendChild(newElement);
    }
}



