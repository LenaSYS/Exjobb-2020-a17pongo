// ==UserScript==
// @name measureScript
// @version  1
// @description performance test
// @include http://localhost/A17PONGO-EXJOBB2020/threejs_artefact/threejs.html
// @include http://localhost/A17PONGO-EXJOBB2020/x3dom_artefakt/x3dom.html
// ==/UserScript==

console.log('GM RUNNING');

//Function for saving measured data
//and downloading it as a plain .txt file
function saveDatatoFile() {
	var artefact = '';

	//sets the name of file == artefact that is running
	if (window.location.href.endsWith('threejs.html')) {
		artefact = 'Threejs';
	} else if (window.location.href.endsWith('x3dom.html')) {
		artefact = 'X3DOM';
	}

	//console.log('Creating file to save measuredata to');
	var data = localStorage.getItem('measure');
	var blob = new Blob([data], { type: 'text/plain' });
	var url = window.URL.createObjectURL(blob);
	var a = document.createElement('a');
	a.href = url;
	a.download = artefact + '.txt';
	a.click();
}

//retrieving measured data from localstorage
//calculating the difference and storing the resault
function saveMeasure() {
	var str = localStorage.getItem('measure');
	str += ',' + localStorage.getItem('timeSum') + '\n';
	localStorage.setItem('measure', str);
}

window.addEventListener(
	'load',
	function () {
		(async () => {
			var count = localStorage.getItem('count');
			var runs = 10;

			if (count == null || count == '' || count == "NaN") {
				count = 0;
				localStorage.setItem('count', count)
			}

			console.log('count:' + count);

			if (count != runs) {
				setTimeout(function () {
					saveMeasure();
					localStorage.setItem('count', ++count);
					location.reload(true);
				}, 3000)
			} else {
				saveDatatoFile();
				console.log('finished measuring, cleaning up');
				count = 0;
				localStorage.setItem('count', '0');
				localStorage.setItem('startTime', '');
				localStorage.setItem('endTime', '');
				localStorage.clear();
			}
		})();
	},
	false
);