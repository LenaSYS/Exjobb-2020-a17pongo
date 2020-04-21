console.log("Measuring render time");

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

function readToFile(){

}

