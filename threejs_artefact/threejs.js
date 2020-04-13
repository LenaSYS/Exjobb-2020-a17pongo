/*
    Purpose of this JS file is to load all dependencies
    create initial setup needed for both artefacts
    This will minimize the potential effect these initial steps can have on the experiments
*/
console.log("Threejs artefact - Initiating application");

//function for retrieving data from json file with fetch API
function fetchData(){
    fetch('../data/SMHI_merged_simplified_data.json')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
    addCylinders(data)
  });
}

/*THREEJS RELATED CODE*/

//Creating a global scene needed for showing anything graphics related
var scene = new THREE.Scene();

//fetching data before initiating threeJS scene
fetchData();
//Function for initiating scene configuration and starting to draw objects to scene
threejs_init();

function threejs_init(){
    //Setting up threejs
    const FOV = 45;
    const WIDTH = window.innerWidth;
    const HEIGHT = window.innerHeight;
    const ASPECT = WIDTH / HEIGHT;
    const NEAR = 0.1;
    const FAR = 10000;

    const camera = new THREE.PerspectiveCamera(FOV, ASPECT, NEAR, FAR);
    var canvas = document.getElementById("map");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const renderer = new THREE.WebGLRenderer({ alpha: true, canvas: canvas });

    //Adding plane for showing the map as a texture
    var texture = new THREE.TextureLoader().load( '../img/3_no_ice_clouds_16k_modified.jpg' );
    var pm = new THREE.MeshBasicMaterial({ map: texture });
    var pg = new THREE.PlaneBufferGeometry( 10000, 10000 );
    var mesh = new THREE.Mesh(pg , pm );
    mesh.position.y = - 250;
    mesh.rotation.x = - Math.PI / 2;
    scene.add( mesh );

    camera.position.y = 2000;
    camera.position.z = 4000;

    //adding light source to scene
    const light = new THREE.PointLight(0xffffff, 1.2);
    light.position.set(0, 0, 6);
    scene.add(light);

	// controls
    var controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.maxPolarAngle = Math.PI * 0.5;
	controls.minDistance = 1000;
	controls.maxDistance = 5000;
    controls.update();

    //Animate funktion to draw 3D object to scene
    function animate() {
        requestAnimationFrame( animate );
        controls.update();
        renderer.render( scene, camera );
    }
    animate();
}

//funktion for adding multiple Cylinder 3D objects to scene
function addCylinders(data){
    var material = new THREE.MeshBasicMaterial( {color:"rgb(81, 63, 196)",wireframe:true} );

    for(var i=0; i < data.length; i++){
        var geometry = new THREE.CylinderBufferGeometry( 5, 5, data[i].year, 32 );
        var cylinder = new THREE.Mesh( geometry, material );
        cylinder.position.x = Math.random() *  -900 + -700;
        cylinder.position.z = Math.random() *  3000 + 400;
        scene.add( cylinder );
    }
}