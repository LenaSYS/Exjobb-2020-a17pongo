console.log('Running x3dom artefakt');

//Constant RGB color values for coloring cylinders depending on data value
//RED: alot of data
//yellow: medium amount of data
//green: not alot of data

const red = '#ff0000';
const yellow = '#f9b700';
const green = '#86ea34';

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
			//adds wanted amount of values to heightArr 
			//representing the same data value year in dataset from SMHI
			//seed is used to get the same random numbers
			for (var i = 0; i < 15460; i++) {
				heightARR.push(seed.floating({ min: 1, max: 1500 }))
			}
		}).then(function () {
			addCylinders();
		});
}

//function for dynamicly add cylinders to scene
function addCylinders(data) {
	localStorage.setItem('startTime', performance.now());
	console.log("threejs-startTime: " + performance.now())

	//bottom of sweden
	for (var i = 0; i < 1000; i++) {
		var mat = document.createElement('Material');

		var app = document.createElement('Appearance');

		if (heightARR[i] > 700) {
			mat.setAttribute('diffuseColor', red);
			app.appendChild(mat);
		} else if (heightARR[i] > 500) {
			mat.setAttribute('diffuseColor', yellow);
			app.appendChild(mat);
		} else {
			mat.setAttribute('diffuseColor', green);
			app.appendChild(mat);
		}

		var t = document.createElement('Transform');
		t.setAttribute(
			'translation',
			seed.floating({ min: -5.8, max: -1.8 }) + ' -0.5 ' + seed.floating({ min: -10.5, max: -3.5 })
		);
		var s = document.createElement('Shape');

		s.appendChild(app);

		t.appendChild(s);
		var b = document.createElement('Cylinder');
		b.setAttribute('radius', 0.01);
		b.setAttribute('height', "0." + Math.round(heightARR[i]));
		s.appendChild(b);

		var ot = document.getElementById('root');
		ot.appendChild(t);
	}

	/*
  //middle of sweden 1
	for (var i = 500; i < 750; i++) {
		// Material Node
		var mat = document.createElement('Material');
		// Appearance Node
		var app = document.createElement('Appearance');

		if (data[i].year > 700) {
			mat.setAttribute('diffuseColor', red);
			app.appendChild(mat);
		} else if (data[i].year > 500) {
			mat.setAttribute('diffuseColor', yellow);
			app.appendChild(mat);
		} else {
			mat.setAttribute('diffuseColor', green);
			app.appendChild(mat);
		}

		var t = document.createElement('Transform');
		t.setAttribute(
			'translation',
			xCord.floating({ min: -4.8, max: -2.8 }) + ' -0.5 ' + yCord.floating({ min: -2.5, max: 2.5 })
		);
		var s = document.createElement('Shape');

		s.appendChild(app);

		t.appendChild(s);
		var b = document.createElement('Cylinder');
		b.setAttribute('radius', 0.01);
		b.setAttribute('height', "0."+Math.round(data[i].year));
		s.appendChild(b);

		var ot = document.getElementById('root');
		ot.appendChild(t);
  }
    //middle of sweden 2
	for (var i = 750; i < 1000; i++) {
		// Material Node
		var mat = document.createElement('Material');
		// Appearance Node
		var app = document.createElement('Appearance');

		if (data[i].year > 700) {
			mat.setAttribute('diffuseColor', red);
			app.appendChild(mat);
		} else if (data[i].year > 500) {
			mat.setAttribute('diffuseColor', yellow);
			app.appendChild(mat);
		} else {
			mat.setAttribute('diffuseColor', green);
			app.appendChild(mat);
		}

		var t = document.createElement('Transform');
		t.setAttribute(
			'translation',
			xCord.floating({ min: -2.8, max: 1.8 }) + ' -0.5 ' + yCord.floating({ min: 0.5, max: 3.5 })
		);
		var s = document.createElement('Shape');

		s.appendChild(app);

		t.appendChild(s);
		var b = document.createElement('Cylinder');
		b.setAttribute('radius', 0.01);
		b.setAttribute('height', "0."+Math.round(data[i].year));
		s.appendChild(b);

		var ot = document.getElementById('root');
		ot.appendChild(t);
  }

  //top of sweden 2
	for (var i = 1000; i < 1449; i++) {
		// Material Node
		var mat = document.createElement('Material');
		// Appearance Node
		var app = document.createElement('Appearance');

		if (data[i].year > 700) {
			mat.setAttribute('diffuseColor', red);
			app.appendChild(mat);
		} else if (data[i].year > 500) {
			mat.setAttribute('diffuseColor', yellow);
			app.appendChild(mat);
		} else {
			mat.setAttribute('diffuseColor', green);
			app.appendChild(mat);
		}

		var t = document.createElement('Transform');
		t.setAttribute(
			'translation',
			xCord.floating({ min: 1.8, max: 4.8 }) + ' -0.5 ' + yCord.floating({ min: 5.5, max: 7.5 })
		);
		var s = document.createElement('Shape');

		s.appendChild(app);

		t.appendChild(s);
		var b = document.createElement('Cylinder');
		b.setAttribute('radius', 0.01);
		b.setAttribute('height', "0."+Math.round(data[i].year));
		s.appendChild(b);

		var ot = document.getElementById('root');
		ot.appendChild(t);
  }*/

	localStorage.setItem('endTime', performance.now());
	localStorage.setItem('timeSum', Math.round((localStorage.getItem('endTime')) - (localStorage.getItem("startTime"))));
	console.log("threejs-endtime: " + performance.now());
	console.log("delta: " + localStorage.getItem("timeSum"))
}

fetchData();