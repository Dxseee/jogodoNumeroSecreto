//let titulo =  document.querySelector("h1");
//titulo.innerHTML = "Jogo do Numero Secreto";

//let paragrafo =  document.querySelector("p");
//paragrafo.innerHTML = "Escolhaum numero de 1 a 10";
let listadeNumeroSorteados  = [];
let limiteDeNumeros = 2;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;


mostrarMensagemInicial();

function exibirCampo(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto,"Brazilian Portuguese Female",{rate:1.20});
}
function mostrarMensagemInicial(){
    exibirCampo("h1","Jogo do Numero Secreto");
    exibirCampo("p","Escolhaum numero de 1 a 10");
}


function verificarChute() {
    let chute = document.querySelector("input").value;
    
    if(chute ==  numeroSecreto){
        exibirCampo("h1","Você Acertou!");
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o numero secreto com ${tentativas} ${palavraTentativa}!`;
        exibirCampo("p", mensagemTentativas);
        document.getElementById("reiniciar").removeAttribute("disabled");
    }else{
        if (chute > numeroSecreto){
            exibirCampo("p","O numero secreto é um numero MENOR");
        }
        else{
            exibirCampo("p","O numero secreto é um numero MAIOR");
        }
        tentativas++;
        zerarValor();
    }
}

function zerarValor(){
    chute = document.querySelector("input");
    chute.value = '';
}

function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * limiteDeNumeros + 1);
    let quantidadeDeNumerosSorteados = listadeNumeroSorteados.length;

    if (quantidadeDeNumerosSorteados == limiteDeNumeros){
        listadeNumeroSorteados  = [];
    }
    if(listadeNumeroSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    }else{
        listadeNumeroSorteados.push(numeroEscolhido);
        console.log(listadeNumeroSorteados);
        return numeroEscolhido;
    }

}


function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    zerarValor();
    mostrarMensagemInicial();
    document.getElementById("reiniciar").setAttribute("disabled",true);
    tentativas = 1;
}
