// ==UserScript==
// @name     threejs
// @version  1
// @description performance test
// @include     http://localhost:5500/threejs_artefact/threejs.html
// @grant       GM.setValue
// @grant       GM.getValue
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
	const blob = new Blob([ data ], { type: 'text/plain' });
	const url = window.URL.createObjectURL(blob);
	const a = document.createElement('a');
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
	console.log('delta: ', delta);
	var str = localStorage.getItem('measure');
	str += ',' + Math.round(delta) + '\n';
	localStorage.setItem('measure', str);
	console.log(localStorage.getItem('measure'));
}

window.addEventListener(
	'load',
	function() {
		(async () => {
			console.log('startTimeGM ' + localStorage.getItem('startTime'));
			console.log('endTime ' + localStorage.getItem('endTime'));
			var count = await GM.getValue('count', 0);
			var runs = 1;

			if (count != runs) {
				console.log(count);
				await GM.setValue('count', count + 1);
				console.log('count:' + count);
				location.reload(true);
			} else {
				//saveDatatoFile();
				console.log('finished measuring, cleaning up');
				count = 0;
				await GM.setValue('count', 0);
				console.log('count:' + count);
				localStorage.setItem('startTime', '');
				localStorage.setItem('endTime', '');
				localStorage.clear();
			}
		})();
	},
	false
);