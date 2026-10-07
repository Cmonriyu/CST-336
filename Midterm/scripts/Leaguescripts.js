document.querySelector("#search").addEventListener("click",setUpFunction);
let user;
async function setUpFunction(){
    user = document.querySelector("#username").value
    const res = await fetch('');
    // const { data } = await res.json();

}
