let caseValue = 'for';
let numCounter = false;
let forCounter = 0;

let input = document.querySelector('#afd2');
let divAceito = document.querySelector('.aceita2');
let naoAceito = document.querySelector('.nao-aceita2');

function abreParentese(){
	input.value = input.value + '(';
	testString(this, input.value)
	caseValue = 'char';
}

function fechaParentese(){
	input.value = input.value + ')';
	caseValue = '';
}

function lixo(){
    naoAceito.style.display = 'block';
    input.disabled = true;
}

function aceito(){
    divAceito.style.display = 'block';
    input.disabled = true;
}

function testString(t, input=null){
	if(input == null){
		var inputValue = this.value;
	} else {
		var inputValue = input;
	}
	
	var lastChar = inputValue[inputValue.length-1];
	
	switch(caseValue){
		case 'for':
			if(lastChar === 'f' && forCounter == 0){
				forCounter = 1;

			} else if(lastChar === 'o' && forCounter == 1){
				forCounter = 2;

			} else if(lastChar === 'r' && forCounter == 2) {
				caseValue = 'parametro1';

			} else {
                lixo();

            }
			break;
		case 'parametro1':
			if(lastChar === '('){
				caseValue = 'char';

			} else {
				lixo();

			}
			break;
		case 'char':
			if(/[a-z]/.test(lastChar)){
				caseValue = 'identificador';

			} else {
				lixo();

			}
			break;
		case 'identificador':
			if(/([a-z]|[0-9]|[_])/.test(lastChar)){
				caseValue = 'identificador';

			} else if(lastChar == '='){
				caseValue = 'num';

			} else {
				lixo();
			}
			break;
		case 'num':
			if(/[0-9]/.test(lastChar)){
				
			}
			break;
	}
}

input.addEventListener('keyup', testString);