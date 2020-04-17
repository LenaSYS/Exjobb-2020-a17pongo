console.log("Running x3dom artefakt");

//Constant RGB color values for coloring cylinders depending on data value
//RED: alot of data
//yellow: medium amount of data
//green: not alot of data

const red = "#ff0000";
const yellow = "#00ff00)";
const green = "#0000ff";

//function for retrieving data from json file with fetch API
function fetchData(){
    fetch('../data/SMHI_merged_simplified_data.json')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data)
    addCylinders(data)
  });
}

//function for dynamicly add cylinders to scene
function addCylinders(data){
    
    for(var i = 0; i<data.length; i++){
        var t = document.createElement('Transform');
        t.setAttribute("translation", i + " -0.5 1" );
        var s = document.createElement('Shape');

        // Appearance Node
        var app = document.createElement('Appearance');

        // Material Node
        var mat = document.createElement('Material');
        mat.setAttribute("diffuseColor",yellow);
        app.appendChild(mat);

        s.appendChild(app);

        t.appendChild(s);
        var b = document.createElement('Cylinder');
        b.setAttribute("radius",0.1)
        b.setAttribute("height",0.55)
        s.appendChild(b);

        var ot = document.getElementById('root');
        ot.appendChild(t);
    }
}


fetchData();
