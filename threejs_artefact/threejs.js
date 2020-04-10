/*
    Purpose of this JS file is to load all dependencies
    create initial setup needed for both artefacts
    This will minimize the potential effect these initial steps can have on the experiments
*/
console.log("Threejs artefact - Initiating application");

/*THREEJS RELATED CODE*/

//Creating a global scene needed for showing anything graphics related
var scene = new THREE.Scene();

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
    var texture = new THREE.TextureLoader().load( '../img/3_no_ice_clouds_16k_original.jpg' );
    var pm = new THREE.MeshBasicMaterial({ map: texture });
    var pg = new THREE.PlaneBufferGeometry( 20000, 20000 );
    var mesh = new THREE.Mesh(pg , pm );
    mesh.position.y = - 250;
    mesh.rotation.x = - Math.PI / 2;
    scene.add( mesh );

    addCylinders(1000);

    camera.position.y = 300;
    camera.position.z = 100;

    //adding light source to scene
    const light = new THREE.PointLight(0xffffff, 1.2);
    light.position.set(0, 0, 6);
    scene.add(light);

	// controls
    var controls = new THREE.OrbitControls( camera, renderer.domElement );
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
function addCylinders(amount){

    var geometry = new THREE.CylinderBufferGeometry( 5, 5, 20, 32 );
    var material = new THREE.MeshBasicMaterial( {color:"rgb(255, 0, 0)",wireframe:true} );

    for(var i=0; i < amount; i++){
        var cylinder = new THREE.Mesh( geometry, material );
        cylinder.position.x = Math.random() * 800 - 400;
        cylinder.position.y = Math.random() * 800 - 400;
        cylinder.position.z = Math.random() * 800 - 400;
        scene.add( cylinder );
    }
}