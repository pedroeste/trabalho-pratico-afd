let input = document.querySelector('#afd');
let aceito = document.querySelector('.aceita');
let naoAceito = document.querySelector('.nao-aceita');

let pComprimento = document.querySelector('.comprimento');
let pTexto = document.querySelector('.texto');
let pUltimoChar = document.querySelector('.ultimo-char');
let pKeycodeChar = document.querySelector('.keycode-char');
let pCharIgual = document.querySelector('.char-igual');

let caseValue;
let attrSymbol = false;

let firstChar = /[a-z]/;

function checkString() {
	var inputValue = this.value;
	var lastChar = inputValue[inputValue.length-1];

	//PRINT NA TELA
	pTexto.innerHTML = `String do input: ${inputValue}`;
	pComprimento.innerHTML = `Comprimento da string: ${inputValue.length}`;	

	
	if(inputValue.length <= 1){
		
		console.log(firstChar.test(inputValue));

		if(firstChar.test(inputValue)){
			caseValue = 'pass';

		} else {
			caseValue = 'lixo';

		}

	} else if(lastChar != '=' && !attrSymbol){
		var identifier = /[0-9a-zA-Z|_|\s]/;

		// PRINT NA TELA
		pUltimoChar.innerHTML = `Último char digitado: ${lastChar}`;
		pKeycodeChar.innerHTML = `KeyCode do char: ${lastChar.charCodeAt(0)}`;
		console.log(identifier.test(lastChar));

		if(!identifier.test(lastChar)){
			caseValue = 'lixo';
		}

		// se o ultimo caracter digitado for um '=' e não tiver nenhum '=' na string:
	} else if(lastChar == '='){
		if(!attrSymbol){
			// PRINT NA TELA
			pCharIgual.innerHTML = `String é um = e não existe = na string'`;
			attrSymbol = true;
		} else {
			pCharIgual.innerHTML = `String é um = e já existe = na string`;
			caseValue = 'lixo';
		}
		
		// Se ja houver pelo menos um '=' no código e o ultimo caracter digitado for diferente de '=':
	} else if(lastChar != '=' && attrSymbol) {
		pCharIgual.innerHTML = `String diferente de = e já existe um =`;
		if(firstChar.test(inputValue)){
			caseValue = 'pass';
			if(lastChar == ';'){
				caseValue = 'aceito';
			}

		} else {
			caseValue = 'lixo';

		}
	}



















	switch(caseValue) {
		case 'pass':
			break;

		case 'aceito':
			aceito.style.display = 'block';
			input.disabled = true;
			break;
		
		case 'lixo':
			naoAceito.style.display = 'block';
			input.disabled = true;
			break;
	}

	console.log('');
}

input.addEventListener('keyup', checkString);
