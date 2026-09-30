document.querySelector("#submit").addEventListener("click",checkSignUp);
document.querySelector("#password").addEventListener("click",suggestPassword);

getStatesAPI();


let password;
let passwordConfirm;
let username;
let usernameCall;
let usernameData;
let zip;
let zipCall;
let zipData;
let city = document.querySelector("#city");
let latitude = document.querySelector("#lat");
let longitude = document.querySelector("#long");
let suggested = document.querySelector("#suggested");
let suggestedPassword;
let suggestedPasswordData;
let passwordSuggested;
let error = document.querySelector("#error");
let passworderror = document.querySelector("#passworderror");


function checkSignUp(){
    checkUsername();
    checkZipCode();
    checkPassword();

}

async function checkUsername(){
    username = document.querySelector('input[id="username"]').value;
    usernameCall = await fetch("https://csumb.space/api/usernamesAPI.php?username=" + username);
    usernameData =  await usernameCall.json();  
    if (usernameData.available){
        error.textContent = "";
        return true;
    }
    error.textContent = "This Username is Not Available";
    return false;
}

async function checkZipCode(){
    zip = document.querySelector('input[id="zip"]').value;
    zipCall = await fetch("https://csumb.space/api/cityInfoAPI.php?zip="+ zip);
    zipData = await zipCall.json();
    city.textContent = zipData.city;
    latitude.textContent = zipData.latitude;
    longitude.textContent = zipData.longitude;
}

async function getStatesAPI() {
    let allStates  = await fetch(" https://csumb.space/api/allStatesAPI.php");
    let StatesData = await allStates.json();
    console.log(StatesData);

}

async function suggestPassword() {
    if (!passwordSuggested){
        suggestedPassword = await fetch("https://csumb.space/api/suggestedPassword.php?length=8");
        suggestedPasswordData = await suggestedPassword.json();
        suggested.textContent = "Suggested Password: " + suggestedPasswordData.password;
        passwordSuggested = true;
    }
}


function checkPassword(){
    password.style.color
    password = document.querySelector('input[id="password"]').value;
    passwordConfirm = document.querySelector('input[id="passwordConfirm"]').value;
    if (password != passwordConfirm){
        passworderror.textContent = "Passwords must match";
        return;
    }
    if (password.length < 6){
        passworderror.textContent = "Password must be atleast 6 letters or numbers.";
        return;
    }
    if (password.toLowerCase() == password){
        passworderror.textContent = "Password needs to contain an Uppercase letter";
        return;
    }
    passworderror.textContent = "";


}