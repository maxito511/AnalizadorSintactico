const array_to_set = function (array) {
	for (var i = 0; i < array.length; i += 1) {
		const u = array[i];
		for (var j = i + 1; j < array.length; j += 1) {
			if (u === array[j]) {
				array.splice(j, 1);
				j -= 1;
			}
		}
	}

	return array.sort();
};

var terminales = [];
var no_terminales = [];

onload = function () {

	var terminales = document.getElementById('terminales');
	var no_terminales = document.getElementById('noterminales');

	terminales.value = sessionStorage.getItem('terminales') || '';
    no_terminales.value = sessionStorage.getItem('no_terminales') || '';
    
};


onchange = function () {
    var terminales = document.getElementById('terminales');
    terminales = array_to_set(terminales.value.replace(/\s/g, '').split(''));
	console.log('Terminales:', terminales);
};

