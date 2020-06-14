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

var enviar = document.getElementById('enviar');
enviar.onclick = ()=>{
	// Dando formato a los T y NT
	var terminales = document.getElementById('terminales');
	var no_terminales = document.getElementById('noterminales');

	var produccion = document.getElementById('produccion');
	var gramatica = document.getElementById('gramatica');

	terminales.value = array_to_set(terminales.value.replace(/\s/g, '').split(''));
	no_terminales.value = array_to_set(no_terminales.value.replace(/\s/g, '').split(''));
	
	terminales.disabled = true;
	no_terminales.disabled = true;

};
