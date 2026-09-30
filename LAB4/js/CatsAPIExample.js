//"async" is like a stamp that lets the OS know that this function could take
//a long amount of time to finish
async function getCats() {
    //fetch is also an async function because download info from the internet
    //can take milliseconds, seconds, or minutes
    //await tells the browser to not continue running code
    //until the download is finish
    let catsResult = await fetch("https://api.thecatapi.com/v1/images/search?limit=10&order=RAND");

    //json() converts the information to a readable format
    //it's also asynchronous, so we have to wait for it
    let catsData = await catsResult.json();

    //always use this to make sure you understand the data
    console.log(catsData);

    let searchResults = document.querySelector("#search-results");

    for (let cat of catsData) {
        //create the image
        let catImage = document.createElement("img");
        //configure
        catImage.src = cat.url;
        //append it to the page
        searchResults.appendChild(catImage);
    }

}

//since our code is wrapped in an async function, we need to
//call it when the page loads for anything to actually happen
getCats();
