console.log("this script is run");

//Setting up threejs
const FOV = 45;
const WIDTH = 800;
const HEIGHT = 600;
const ASPECT = WIDTH / HEIGHT;
const NEAR = 0.1;
const FAR = 10000;

var scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(FOV, ASPECT, NEAR, FAR);

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//adding a 3D object
var geometry = new THREE.CylinderBufferGeometry( 5, 5, 20, 32 );
var material = new THREE.MeshBasicMaterial( {color: 0x0000ff,wireframe:true} );
var cylinder = new THREE.Mesh( geometry, material );
scene.add( cylinder );

camera.position.z = 100;

//adding light source to scene
const light = new THREE.PointLight(0xffffff, 1.2);
light.position.set(0, 0, 6);
scene.add(light);

//Animate funktion to draw 3D object to scene
function animate() {
	requestAnimationFrame( animate );
    renderer.render( scene, camera );
    cylinder.rotation.x += 0.01;
    cylinder.rotation.y += 0.01;
}
animate();