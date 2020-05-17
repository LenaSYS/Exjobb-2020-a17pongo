console.log('Threejs artefact - running');

// constant RGB color values for coloring cylinders depending on data value
//Although should not, as of today, be seen as 100% accurate representing the data
//RED: alot of data
//yellow: medium amount of data
//green: not alot of data
const red = 'rgb(255, 0, 0)';
const yellow = 'rgb(255, 184, 0)';
const green = 'rgb(134, 234, 52)';

//Creating a global scene needed for showing anything graphics related
var scene = new THREE.Scene();

var seed = new Chance(12345);
var heightARR = [];

//function for retrieving data from json file with fetch API
function fetchData() {
	fetch('../data/SMHI_merged_simplified_data.json')
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			data.forEach(item => {
				heightARR.push(item.year)
			});
		}).then(function () {
			//adds wanted amount of values to heightArr representing the same data value year in dataset from SMHI
			//seed is used to get the same random numbers
			for(var i=0; i<15460; i++){
				heightARR.push(seed.floating({ min: 1, max: 1500 }))
			}
		}).then(function () {
			addCylinders();
		});
}

function threejs_init() {
	//Setting up threejs
	const FOV = 45;
	const WIDTH = window.innerWidth;
	const HEIGHT = window.innerHeight;
	const ASPECT = WIDTH / HEIGHT;
	const NEAR = 0.1;
	const FAR = 10000;

	const camera = new THREE.PerspectiveCamera(FOV, ASPECT, NEAR, FAR);
	var canvas = document.getElementById('map');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	const renderer = new THREE.WebGLRenderer({ alpha: true, canvas: canvas });

	//Adding plane for showing the map as a texture
	var texture = new THREE.TextureLoader().load('../img/3_no_ice_clouds_16k_modified.jpg');
	var pm = new THREE.MeshBasicMaterial({ map: texture });
	var pg = new THREE.PlaneBufferGeometry(10000, 10000);
	var mesh = new THREE.Mesh(pg, pm);
	mesh.position.y = -250;
	mesh.rotation.x = -Math.PI / 2;
	scene.add(mesh);

	camera.position.y = 4000;
	camera.position.x = 4000;
	camera.position.z = 4000;

	// controls
	var controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.maxPolarAngle = Math.PI * 0.5;
	controls.minDistance = 1000;
	controls.maxDistance = 5000;
	controls.update();

	//Animate funktion to draw 3D object to scene
	function animate() {
		requestAnimationFrame(animate);
		controls.update();
		renderer.render(scene, camera);
	}

	animate();

	//fetching data after scene is created and animated
	//function then calls addCylinders function to write out wanted amount of cylinders to scene
	fetchData();
}

//funktion for adding multiple Cylinder 3D objects to scene
function addCylinders() {
	localStorage.setItem('startTime', performance.now());
	console.log("threejs-startTime: " + performance.now())

	var material;
	//bottom of sweden, change the value compared to i depending on the amount of data you want to be writen to scene
	for (var i = 0; i < 1000; i++) {
		if (heightARR[i] > 700) {
			material = new THREE.MeshBasicMaterial({ color: red });
		} else if (heightARR[i] > 500) {
			material = new THREE.MeshBasicMaterial({ color: yellow });
		} else {
			material = new THREE.MeshBasicMaterial({ color: green });
		}
		var geometry = new THREE.CylinderBufferGeometry(5, 5, Math.round(heightARR[i]), 32);
		var cylinder = new THREE.Mesh(geometry, material);
		cylinder.position.x = seed.floating({ min: -1800, max: -800 });
		cylinder.position.z = seed.floating({ min: -600, max: 2500 });
		scene.add(cylinder);
	}

	//Middle of sweden 1
	/*for (var i = 4000; i < 8000; i++) {
		if (heightARR[i] > 700) {
			material = new THREE.MeshBasicMaterial({ color: red });
		} else if (heightARR[i] < 699) {
			material = new THREE.MeshBasicMaterial({ color: yellow });
		} else {
			material = new THREE.MeshBasicMaterial({ color: green });
		}
		var geometry = new THREE.CylinderBufferGeometry(5, 5, Math.round(heightARR[i]), 32);
		var cylinder = new THREE.Mesh(geometry, material);
		cylinder.position.x = seed.floating({ min: 200, max: 700 });
		cylinder.position.z = seed.floating({ min: -1900, max: -600 });
		scene.add(cylinder);
	}

	//Middle of sweden 2
	for (var i = 8000; i < 12000; i++) {
		if (heightARR[i]> 700) {
			material = new THREE.MeshBasicMaterial({ color: red });
		} else if (heightARR[i] < 699) {
			material = new THREE.MeshBasicMaterial({ color: yellow });
		} else {
			material = new THREE.MeshBasicMaterial({ color: green });
		}
		var geometry = new THREE.CylinderBufferGeometry(5, 5, Math.round(heightARR[i]), 32);
		var cylinder = new THREE.Mesh(geometry, material);
		cylinder.position.x = seed.floating({ min: -200, max: 300 });
		cylinder.position.z = seed.floating({ min: -1300, max: -400 });
		scene.add(cylinder);
	}

	//top of sweden
	for (var i = 12000; i < 16000; i++) {
		if (heightARR[i] > 700) {
			material = new THREE.MeshBasicMaterial({ color: red });
		} else if (heightARR[i] < 699) {
			material = new THREE.MeshBasicMaterial({ color: yellow });
		} else {
			material = new THREE.MeshBasicMaterial({ color: green });
		}
		var geometry = new THREE.CylinderBufferGeometry(5, 5, heightARR[i], 32);
		var cylinder = new THREE.Mesh(geometry, material);
		cylinder.position.x = seed.floating({ min: 300, max: 1900 });
		cylinder.position.z = seed.floating({ min: -2600, max: -1600 });
		scene.add(cylinder);
	}*/

	localStorage.setItem('endTime', performance.now());
	console.log("threejs-endtime: " + performance.now())
}

//Function for initiating scene configuration and starting to draw objects to scene
threejs_init();