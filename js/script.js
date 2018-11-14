let identificador = /([a-z]|[0-9]|[_])*/g;
let numero = /([0-9])*|([0-9])*'.'[0-9]([0-9])*]/g;
let dotCounter = false;

let estados = [];
let div = document.querySelector('#estados-automato');

let input = document.querySelector('#afd');
let divAceito = document.querySelector('.aceita');
let naoAceito = document.querySelector('.nao-aceita');

let pComprimento = document.querySelector('.comprimento');
let pTexto = document.querySelector('.texto');

let caseValue = 'char';

function lixo(){
    naoAceito.style.display = 'block';
    input.disabled = true;
}

function aceito(){
    divAceito.style.display = 'block';
    input.disabled = true;
}

function resetString(){
    pTexto.innerHTML = '';
    pComprimento.innerHTML = '';
    input.value = "";
    caseValue = 'char';
    input.disabled = false;
    naoAceito.style.display = 'none';
    divAceito.style.display = 'none';
    estados = [];
    div.innerHTML = "";
}

function checkString(){
    var inputValue = this.value;
    var lastChar = inputValue[inputValue.length-1];
    
    pTexto.innerHTML = `String do input: ${inputValue}`;
    pComprimento.innerHTML = `Comprimento da string: ${inputValue.length}`;
    
    switch(caseValue){
        case 'char':
        estados.push('q0');
            if(/[a-z]/.test(lastChar)){
                caseValue = 'identificador';

            } else {
                lixo();

            }
            break;
        
        case 'identificador':
        estados.push('q1');
            if(/([a-z]|[0-9]|[_])/.test(lastChar)){
                caseValue = 'identificador';

            } else if(lastChar == '='){
                caseValue = 'attr';

            } else {
                lixo();
            }
            break;

        case 'attr':
        estados.push('q2');
            if(/[a-z]/.test(lastChar)){
                caseValue = 'identificador_dois';

            } else if(/[0-9]/.test(lastChar)){
                caseValue = 'num';

            } else {
                lixo();
            }
            break;

        case 'identificador_dois':
        estados.push('q3');
            if(lastChar == ';'){
                estados.push('q6');
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
        estados.push('q4');
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
                estados.push('q6');
                aceito();

            } else {
                lixo();

            }
            break;

        case 'operador':
        estados.push('q5');
            if(/[a-z]/.test(lastChar)){
                caseValue = 'identificador_dois';

            } else if(/[0-9]/.test(lastChar)){
                caseValue = 'num';

            } else {
                lixo();
            }
            break;
    };

    div.innerHTML = '<div class="line">Progresso: ' + estados.reduce((atual, item, indice) => {
        if(indice === 0){
            return `<span class="estado">${item}</span>`;
        }
        if(item == 'q6'){
            var estadoFinal = `<span class="estado-final"><span class="estado">${item}</span></span>`;
        } else {
            var estadoFinal = `<span class="estado">${item}</span>`;
        }
        return `${atual} -> ${estadoFinal}`;
    }, '') + '</div>';
}

input.addEventListener('keyup', checkString);
