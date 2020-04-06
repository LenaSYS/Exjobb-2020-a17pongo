/*
    Purpose of this JS file is to load all dependencies
    create initial setup needed for both artefacts
    This will minimize the potential effect these initial steps can have on the experiments
*/

console.log("index.js - Initiating application");
threejs_init();

/*LEAFLET RELATED CODE*//*
var mymap = L.map('mapid').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', 
    {foo: 'bar', 
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'}
    )
.addTo(mymap);
*/

/*THREEJS RELATED CODE*/
// Scene Configurations


function threejs_init(){
    //Setting up threejs
    const FOV = 45;
    const WIDTH = window.innerWidth;
    const HEIGHT = window.innerHeight;
    const ASPECT = WIDTH / HEIGHT;
    const NEAR = 0.1;
    const FAR = 10000;

    var scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(FOV, ASPECT, NEAR, FAR);
    var canvas = document.getElementById("map");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const renderer = new THREE.WebGLRenderer({ alpha: true, canvas: canvas });

    //Adding plane for showing the leaflet map
    var pm = new THREE.MeshBasicMaterial({color:0x57a53c});
    var pg = new THREE.PlaneBufferGeometry( 20000, 20000 );
    var mesh = new THREE.Mesh(pg , pm );
    mesh.position.y = - 250;
    mesh.rotation.x = - Math.PI / 2;
    scene.add( mesh );

    //adding a 3D object
    var geometry = new THREE.CylinderBufferGeometry( 5, 5, 20, 32 );
    var material = new THREE.MeshBasicMaterial( {color: 0x0000ff,wireframe:false} );
    var cylinder = new THREE.Mesh( geometry, material );
    scene.add( cylinder );

    camera.position.z = 50;

    //adding light source to scene
    const light = new THREE.PointLight(0xffffff, 1.2);
    light.position.set(0, 0, 6);
    scene.add(light);

    //Animate funktion to draw 3D object to scene
    function animate() {
        requestAnimationFrame( animate );
        renderer.render( scene, camera );
    }
    animate();
}