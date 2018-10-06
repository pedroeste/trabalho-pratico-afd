let identificador = /([a-z]|[0-9]|[_])*/g;
let numero = /([0-9])*|([0-9])*'.'[0-9]([0-9])*]/g;

let input = document.querySelector('#afd');
let divAceito = document.querySelector('.aceita');
let naoAceito = document.querySelector('.nao-aceita');

let pComprimento = document.querySelector('.comprimento');
let pTexto = document.querySelector('.texto');
let pUltimoChar = document.querySelector('.ultimo-char');
let pCharIgual = document.querySelector('.char-igual');

let caseValue = 'char';

function lixo(){
    naoAceito.style.display = 'block';
    input.disabled = true;
}

function aceito(){
    divAceito.style.display = 'block';
    input.disabled = true;
}

function checkString(){
    var inputValue = this.value;
    var lastChar = inputValue[inputValue.length-1];
    var secondToLastChar = inputValue[inputValue.length-2];
    
    pTexto.innerHTML = `String do input: ${inputValue}`;
    pComprimento.innerHTML = `Comprimento da string: ${inputValue.length}`;
    
    switch(caseValue){
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
                caseValue = 'attr';

            } else {
                lixo();
            }
            break;

        case 'attr':
            if(/[a-z]/.test(lastChar)){
                caseValue = 'identificador_dois';

            } else if(/[0-9]/.test(lastChar)){
                caseValue = 'num';

            } else {
                lixo();
            }
            break;

        case 'identificador_dois':
            if(lastChar == ';'){
                aceito();

            } else if(/([a-z]|[0-9]|[_])/.test(lastChar)){
                caseValue = 'identificador_dois';

            } else if(lastChar == '+' || lastChar == '-' || lastChar == '*' || lastChar == '/'){
                caseValue = 'operador';

            } else {
                lixo();

            }
            break;

        case 'num':
            if(lastChar == ';'){
                aceito();

            } else if(numero.test(lastChar)){
                caseValue = 'num';

            } else if(lastChar == '+' || lastChar == '-' || lastChar == '*' || lastChar == '/'){
                caseValue = 'operador';

            } else {
                lixo();

            }
            break;

        case 'operador':
            if(/[a-z]/.test(lastChar)){
                caseValue = 'identificador_dois';

            } else if(/[0-9]/.test(lastChar)){
                caseValue = 'num';

            } else {
                lixo();
            }
            break;
    };
    console.log('');
}

input.addEventListener('keyup', checkString);
