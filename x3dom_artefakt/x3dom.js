console.log('Running x3dom artefakt');

//Constant RGB color values for coloring cylinders depending on data value
//RED: alot of data
//yellow: medium amount of data
//green: not alot of data

const red = '#ff0000';
const yellow = '#f9b700';
const green = '#86ea34';

//function for retrieving data from json file with fetch API
function fetchData() {
	fetch('../data/SMHI_merged_simplified_data.json')
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			console.log(data);
			addCylinders(data);
		});
}

//function for dynamicly add cylinders to scene
function addCylinders(data) {
	var xCord = new Chance();
	var yCord = new Chance();

	//bottom of sweden
	for (var i = 0; i < 500; i++) {
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
			xCord.floating({ min: -6.7, max: 8.7 }) + ' -0.5 ' + yCord.floating({ min: -9, max: 4 })
		);
		var s = document.createElement('Shape');

		s.appendChild(app);

		t.appendChild(s);
		var b = document.createElement('Cylinder');
		b.setAttribute('radius', 0.01);
		b.setAttribute('height', 0.55);
		s.appendChild(b);

		var ot = document.getElementById('root');
		ot.appendChild(t);
	}

  //top of sweden
  /*
	for (var i = 0; i < 50; i++) {
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
			xCord.integer({ min: -3, max: 6 }) + ' -0.5 ' + yCord.integer({ min: -5, max: 3 })
		);
		var s = document.createElement('Shape');

		s.appendChild(app);

		t.appendChild(s);
		var b = document.createElement('Cylinder');
		b.setAttribute('radius', 0.01);
		b.setAttribute('height', 0.55);
		s.appendChild(b);

		var ot = document.getElementById('root');
		ot.appendChild(t);
  }
  */
}

fetchData();
