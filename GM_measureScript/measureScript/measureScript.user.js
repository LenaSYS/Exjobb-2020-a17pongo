// ==UserScript==
// @name     measureScript
// @version  1
// @description performance test
// @include     http://localhost/A17PONGO-EXJOBB2020/threejs_artefact/threejs.html
// @include     http://127.0.0.1:5500/threejs_artefact/threejs.html
// @include     http://localhost:5500/x3dom_artefakt/x3dom.html
// @include     http://127.0.0.1:5500/x3dom_artefakt/x3dom.html
// ==/UserScript==

console.log('GM RUNNING');

var artefact = '';

if (window.location.href.endsWith('threejs.html')) {
	artefact = 'Threejs';
	console.log(artefact);
} else if (window.location.href.endsWith('x3dom.html')) {
	artefact = 'X3DOM';
	console.log(artefact);
}

//Function for saving measured data
//and downloading it as a plain .txt file
function saveDatatoFile() {
	console.log('Creating file to save measuredata to');
	var data = localStorage.getItem('measure');
	var blob = new Blob([ data ], { type: 'text/plain' });
	var url = window.URL.createObjectURL(blob);
	var a = document.createElement('a');
	a.href = url;
	a.download = artefact + '.txt';
	a.click();
}

//retrieving measured data from localstorage
//calculating the difference and storing the resault
function saveMeasure() {
	var startTime = localStorage.getItem('startTime');
	var endTime = localStorage.getItem('endTime');
	var delta = endTime - startTime;
	//console.log('delta: ', delta);
	var str = localStorage.getItem('measure');
	str += ',' + Math.round(delta) + '\n';
	localStorage.setItem('measure', str);
	//console.log(localStorage.getItem('measure'));
}

window.addEventListener(
	'load',
	function() {
		(async () => {
			//console.log('startTimeGM ' + localStorage.getItem('startTime'));
			//console.log('endTime ' + localStorage.getItem('endTime'));
			var count = localStorage.getItem('count');
			var runs = 10;

			if(count == null ||count == '' || count == "NaN"){
				count = 0;
				localStorage.setItem('count', count)
			}

			if (count != runs) {
				saveMeasure();
				localStorage.setItem('count',++count);
				console.log('count:' + count);
				location.reload(true);
			} else {
				saveDatatoFile();
				console.log('finished measuring, cleaning up');
				count = 0;
				localStorage.setItem('count', '0');
				localStorage.setItem('startTime', '');
				localStorage.setItem('endTime', '');
				localStorage.clear();
				console.log('count:' + localStorage.getItem('count'));
			}
		})();
	},
	false
);
