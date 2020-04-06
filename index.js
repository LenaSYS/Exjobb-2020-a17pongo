/*
    Purpose of this JS file is to load all dependencies
    create initial setup needed for both artefacts
    This will minimize the potential effect these initial steps can have on the experiments
*/


var mymap = L.map('mapid').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', 
    {foo: 'bar', 
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'}
    )
.addTo(mymap);