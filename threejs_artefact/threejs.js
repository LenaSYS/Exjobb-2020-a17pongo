console.log('Threejs artefact - running');

// constant RGB color values for coloring cylinders depending on data value
//Although should not, as of today, be seen as 100% accurate representing the data
//RED: alot of data
//yellow: medium amount of data
//green: not alot of data

const red = 'rgb(255, 0, 0)';
const yellow = 'rgb(255, 184, 0)';
const green = 'rgb(134, 234, 52)';

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
			addCylinders();
		});
}

//Creating a global scene needed for showing anything graphics related
var scene = new THREE.Scene();

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
	fetchData();
}

//funktion for adding multiple Cylinder 3D objects to scene
function addCylinders() {
	startTime = performance.now();
	localStorage.setItem('startTime', JSON.stringify(startTime));
	console.log("threejs-startTime: " + startTime)

	var material;
	//bottom of sweden
	for (var i = 0; i < 500; i++) {
		console.log("heightarr: " + heightARR[0]);
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
	for (var i = 500; i < 750; i++) {
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
	for (var i = 750; i < 1000; i++) {
		if (heightARR[i]> 700) {
			material = new THREE.MeshBasicMaterial({ color: red });
		} else if (heightARR[i] < 699) {
			material = new THREE.MeshBasicMaterial({ color: yellow });
		} else {
			material = new THREE.MeshBasicMaterial({ color: green });
		}
		var geometry = new THREE.CylinderBufferGeometry(5, 5, Math.round(heightARR[i]), 32);
		var cylinder = new THREE.Mesh(geometry, material);
		cylinder.position.x = Math.random() * (300 + 200) - 200;
		cylinder.position.z = seed.floating({ min: -1300, max: -400 });
		console.log("x:"+cylinder.position.x)
		scene.add(cylinder);
	}

	//top of sweden
	for (var i = 1000; i < 1449; i++) {
		if (data[i].year > 700) {
			material = new THREE.MeshBasicMaterial({ color: red });
		} else if (data[i].year < 699) {
			material = new THREE.MeshBasicMaterial({ color: yellow });
		} else {
			material = new THREE.MeshBasicMaterial({ color: green });
		}
		var geometry = new THREE.CylinderBufferGeometry(5, 5, data[i].year, 32);
		var cylinder = new THREE.Mesh(geometry, material);
		cylinder.position.x = Math.random() * -1700 + 2000;
		cylinder.position.z = Math.random() * 1000 - 2600;
		scene.add(cylinder);
	}

	endTime = performance.now();
	localStorage.setItem('endTime', JSON.stringify(endTime));
	console.log("threejs-endtime: " + endTime)
}


//Function for initiating scene configuration and starting to draw objects to scene
threejs_init();