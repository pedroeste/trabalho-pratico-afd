let input = document.querySelector('#afd');
let aceito = document.querySelector('.aceita');
let naoAceito = document.querySelector('.nao-aceita');

let caseValue;

function checkString() {
    var inputValue = this.value;
    var lastChar = inputValue[inputValue.length-1];

    console.log(`String do input: ${inputValue}`);
    console.log(`Comprimento da string: ${inputValue.length}`);

    function checkFirstLetter(){

    }

    
    if(inputValue.length <= 1){
        var firstString = /[a-zA-Z]/;
        
        console.log(firstString.test(inputValue));

        if(firstString.test(inputValue)){
            caseValue = 2;
        } else {
            caseValue = 'lixo';
        }

    } else if(inputValue.length >= 2){
        var identifier = /[0-9a-zA-Z|_|=]/;

        console.log(`Último char digitado: ${lastChar}`);
        console.log(`KeyCode do char: ${lastChar.charCodeAt(0)}`)

        console.log(identifier.test(lastChar));

        if(!identifier.test(lastChar)){
            caseValue = 'lixo';

        } else if(lastChar.charCodeAt(0) == 61) {
            
        }

    }

    switch(caseValue) {
        case 2:
            break;

        case 'aceito':
            aceito.style.display = 'block';
            break;
        
        case 'lixo':
            naoAceito.style.display = 'block';
            input.disabled = true;
            break;
    }

    console.log('');
}

input.addEventListener('keyup', checkString);
