console.log("Measuring render time");

const runs = 10;
let count = 0;



//Function for saving measured data and downloading it as a plain .txt file
function saveDatatoFile(artefact,data){
    console.log("Creating file to save measuredata to");
    const blob = new Blob([data], {type: "text/plain"});
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = artefact+".txt";
    a.click();
}

function measure(){

    if(count != runs){
        console.log("reloading page to run performance test")
        count++;
        console.log(count)
        location.reload(true)
    }
    else {
        console.log("Finished, sending data do saveDatatoFile functions");
    }
    /*
    ideer: 
    efter en rendering, gör en refresh av sidan för att slippa rensa alla object.
    skulle kunna samla in renderingstiden för hela applikationen vid intresse.
    fokusera på att samla in renderingstid för alla cylindrar med data, övriga mätningar kan vara av intresse men inte
    det viktiga just nu!
    */
}

//adding button to run performance test, universal for both artefacts
var btn = document.createElement("BUTTON");
btn.innerHTML = "Start performance test";
btn.addEventListener("click", function() {
    measure();
})
document.body.appendChild(btn);

