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
            // Valida se o primeiro caractere do identificador é valido
            if(/[a-z]/.test(lastChar)){
                caseValue = 'identificador';

            // Se não for ele cai para o estado lixo
            } else {
                estados.push('LIXO')
                lixo();

            }
            break;
        
        case 'identificador':
            estados.push('q1');
            // Valida se o restante do nome do identificador é valido
            if(/([a-z]|[0-9]|[_])/.test(lastChar)){
                caseValue = 'identificador';

            // Se o ultimo caractere for um = ele entra no estado Q2, simbolo de atribuição
            } else if(lastChar == '='){
                caseValue = 'attr';

            // Se não for um caractere valido para o nome do identificador e nem o simbolo de atribuição ele cai no estado lixo
            } else {
                estados.push('LIXO')
                lixo();
            }
            break;

        case 'attr':
            estados.push('q2');
            // Se o primeiro caractere depois do símbolo de atribuição for um caractere valido para a primeira
            // letra do identificador ele vai para o estado Q3, para validar o restante do nome
            if(/[a-z]/.test(lastChar)){
                caseValue = 'identificador_dois';

            // Se o primeiro caractere depois do símbolo de atribuição for um caractere valido para um número
            // ele vai para o estado Q4, para validar o restante do número
            } else if(/[0-9]/.test(lastChar)){
                caseValue = 'num';

            // Se não for um caractere valido para inicio de identificador e inicio de número ele vai para o estado lixo
            } else {
                estados.push('LIXO')
                lixo();
            }
            break;

        case 'identificador_dois':
            estados.push('q3');
            // Se logo após o primeiro caractere do identificador vier um ';' o automato ativa o estado Q6 e a string é considerada válida
            if(lastChar == ';'){
                estados.push('q6');
                aceito();

            // Valida se o restante do nome do identificador é valido, se mantendo no estado Q3
            } else if(/([a-z]|[0-9]|[_])/.test(lastChar)){
                caseValue = 'identificador_dois';

            // Se logo após o identificador vier um simbolo de operação, o automato vai para o estado Q5, operação
            } else if(lastChar == '+' || lastChar == '-' || lastChar == '*' || lastChar == '/'){
                caseValue = 'operador';

            // Se não for um caractere valido para identificador e de número e nem um simbolo de operação, ele vai para o estado lixo
            } else {
                estados.push('LIXO')
                lixo();

            }
            break;

        case 'num':
            estados.push('q4');
            // Valida o restante do número e se há um separador decimal no número
            if(/[0-9]/.test(lastChar) || lastChar == '.'){
                // Se o último caractere digitado for um '.' e não houver nenhum ponto naquele número ele mantem no estado Q4*
                if(lastChar == '.' && !dotCounter){
                    dotCounter = true;

                // Se o ultimo caractere for um '.' e já houver um ponto no número ele vai para o estado lixo
                } else if(lastChar == '.' && dotCounter) {
                    estados.push('LIXO')
                    lixo();

                }
                // *
                caseValue = 'num';

            // Se houver um simbolo de operação após o numero, algumas coisas são verificadas antes de ir para algum estado
            } else if(lastChar == '+' || lastChar == '-' || lastChar == '*' || lastChar == '/'){
                // Se já houver um ponto no número, a variavel de controle é resetada, para que se houver um possivel numero após o operador
                // esse número possa conter um ponto também.
                if(dotCounter){
                    dotCounter = false;
                }
                // Ele ativa o estado de operador, após o simbolo ser digitado
                caseValue = 'operador';

            // Se logo após o número houver um ';' ele ativa o estado Q6 e a string é considerada válida
            } else if(lastChar == ';'){
                estados.push('q6');
                aceito();

            // Se não for um caractere numero, nem um simbolo de operador ele ativa o estado lixo
            } else {
                estados.push('LIXO')
                lixo();

            }
            break;

        case 'operador':
            estados.push('q5');
            // Se logo após o simbolo de operacao vier um caractere valido para inicio de identificador ele ativa o estado Q3
            if(/[a-z]/.test(lastChar)){
                caseValue = 'identificador_dois';

            // Se logo após o simbolo de operacao vier um caractere valido para numero ele ativa o estado Q4
            } else if(/[0-9]/.test(lastChar)){
                caseValue = 'num';

            // Se não for um caractere de numero ou identificador ele ativa o estado lixo
            } else {
                estados.push('LIXO')
                lixo();
            }
            break;
    };

    // Algoritmo para escrever os estados ativados na tela
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
