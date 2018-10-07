let identificador = /([a-z]|[0-9]|[_])*/g;
let numero = /([0-9])*|([0-9])*'.'[0-9]([0-9])*]/g;
let dotCounter = false;

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
            if(/[0-9]/.test(lastChar) || lastChar == '.'){
                if(lastChar == '.' && !dotCounter){
                    dotCounter = true;

                } else if(lastChar == '.' && dotCounter) {
                    lixo();

                }
                
                caseValue = 'num';

            } else if(lastChar == '+' || lastChar == '-' || lastChar == '*' || lastChar == '/'){
                if(dotCounter){
                    dotCounter = false;
                }
                caseValue = 'operador';

            } else if(lastChar == ';'){
                aceito();

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
