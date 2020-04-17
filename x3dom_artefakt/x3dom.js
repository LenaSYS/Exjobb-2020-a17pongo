console.log("Running x3dom artefakt");

//function for retrieving data from json file with fetch API
function fetchData(){
    fetch('../data/SMHI_merged_simplified_data.json')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data)
  });
}

//function for dynamicly add cylinders to scene
function addCylinders(){
    var t = document.createElement('Transform');
    t.setAttribute("translation","2 -0.5 1" );
    var s = document.createElement('Shape');

    // Appearance Node
    var app = document.createElement('Appearance');

    // Material Node
    var mat = document.createElement('Material');

    app.appendChild(mat);

    s.appendChild(app);

    t.appendChild(s);
    var b = document.createElement('Cylinder');
    b.setAttribute("radius",0.1)
    b.setAttribute("height",1)
    s.appendChild(b);

    var ot = document.getElementById('root');
    ot.appendChild(t);
}


fetchData();
addCylinders();
