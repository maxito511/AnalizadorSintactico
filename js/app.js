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

const regxs = {
    "lower": /^[a-z0-9 ]+$/,
    "upper": /^[A-Z]+$/,
    "upperLower": /^[A-Za-z0-9 ]+$/
  }

var terminales = [];
var no_terminales = [];

var enviar = document.getElementById('enviar');
enviar.onclick = ()=>{
	// Dando formato a los T y NT
	var terminales = document.getElementById('terminales');
	var no_terminales = document.getElementById('noterminales');

	const produccion = document.getElementById('produccion');
	const gramatica = document.getElementById('gramatica');

	var ValProduccion = produccion.value;
	var ValGramatica = gramatica.value;

	terminales.value = array_to_set(terminales.value.replace(/\s/g, '').split(''));
	no_terminales.value = array_to_set(no_terminales.value.replace(/\s/g, '').split(''));
	
	terminales.disabled = true;
	no_terminales.disabled = true;

	if (ValProduccion.length == 1 && ValGramatica.length > 0){
		analizarTipoDosTres(ValProduccion, ValGramatica);
	}else if (ValProduccion.length > 1 && ValGramatica.length > 0){
		analizarTipoCeroUno(ValProduccion, ValGramatica);
	}else{
		//alert("Ingrese una producción");
	}
	

};

const analizarTipoDosTres = (ValProduccion, ValGramatica)=>{
	if (analizarMayusculaProduccion(ValProduccion)){
		// Puede ser tipo 2 0 3
		analizarTipoTres(ValGramatica);
	}else{
		// Puede ser tipo 0 o 1
		analizarTipoCeroUno(ValProduccion, ValGramatica);
	}
}

const analizarTipoCeroUno = (ValProduccion, ValGramatica)=>{
	analizarTipoUno(ValProduccion,ValGramatica);
}

const analizarMayusculaProduccion = (ValProduccion)=>{
	if (regxs.upper.test(ValProduccion)){
		return true;
	} else {
		return false;
	}
}

// Tipo 1
const analizarTipoUno = (ValProduccion,ValGramatica)=>{
	var arrayProduccion= [];
	var arrayGramatica = [];

	arrayProduccion = Array.from(ValProduccion);
	arrayGramatica = Array.from(ValGramatica);

	var contextoIzquierdo = [];
	var contextoDerecho = [];
	if (hayNoTerminal(arrayProduccion) == false ){
		error();
	}else {

		 if (primeroUltimoTerminal(arrayProduccion) == true){
			 
			contextoIzquierdo = contextLeft(arrayProduccion);
			contextoDerecho = contextRight(arrayProduccion);

		 }else if (primeroEsTerminal(arrayProduccion) == true){
			
			contextoIzquierdo = contextLeft(arrayProduccion);

		 }else if (ultimoEsTerminal(arrayProduccion) == true){
			
			contextoDerecho = contextRight(arrayProduccion);

		 }else{
			error();
		 }


		// if (primeroEsTerminal(arrayProduccion) == true){
		// 	alert("comienza con terminal")
		// };



		// if (ultimoEsTerminal(arrayProduccion) == true){
		// 	alert("Termina con terminal")
		// };
	}

}

const analizarMinuscula = (dato)=>{
	if(regxs.lower.test(dato)== true){
		return true;
	}else { 
		return false
	}
}

const contextLeft =(array)=>{
	var contextoL = [];
	var i = 0;
	while (analizarMinuscula(array[i]) == true ) {
		contextoL.push(array[i]);
		console.log(contextoL);
		i++;
	}
	return contextoL;
}

const contextRight =(array)=>{
	var reverseArray = array.reverse();
	var contextoR =[];
	var i = 0;

	while (analizarMinuscula(reverseArray[i]) == true ) {
		contextoR.push(array[i]);
		i++;
	}
	contextoR.reverse();
	
	return contextoR;
}

const error = ()=>{ return alert("No se reconoce la gramatica!")}

const hayNoTerminal = (array)=>{

	var countMay = 0;	
	for (var i = 0; i < array.length; i+=1) {
		if (regxs.upper.test(array[i])){
			countMay += 1;
		}
	}

	if (countMay >= 1){
		return true;
	}else{
		return false;
	}
}

const primeroEsTerminal = (array)=>{
	if (regxs.lower.test(array[0])){
		return true;
	}else{
		return false;
	}
}

const ultimoEsTerminal = (array)=>{
	var ultimo = array.length-1;
	if (regxs.lower.test(array[ultimo])){
		return true;
	}else{
		return false;
	}
}

const primeroUltimoTerminal = (array)=>{
	if ( (primeroEsTerminal(array) == true) && (ultimoEsTerminal(array) == true) ){
		return true;
	}else{
		return false;
	}
}


// Tipo 2
const analizarTipoDos = (ValGramatica)=>{
	
}

// Tipo 3
const analizarTipoTres = (ValGramatica)=>{
	var arrayGramatica = [];
	var countMay = 0;
	var countMin = 0;
	if (ValGramatica.length <= 2){
		arrayGramatica = Array.from(ValGramatica);
		for (var i = 0; i < arrayGramatica.length; i+=1) {
			if (regxs.upper.test(arrayGramatica[i])){
				countMay += 1;
			} else {
				countMin  += 1;
			}
		}

		if ((countMay > 1) || (countMin > 1)) {
			//analizarTipoDos(ValGramatica);
			alert("SOY TIPO 2");
		}else{
			alert("SOY TIPO 3");
		}

		
	} else{
		//analizarTipoDos(ValGramatica);
		alert("SOY TIPO 2");
	}
}

 