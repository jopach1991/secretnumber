//Lista vazia para adicionar elementos
let listaDeNumerosSorteados = [];

let numeroLimite = 1501;

//Variavel reservando espaço para o valor geradoo pela função
let numeroSecreto = gerarNumeroAleatorio();
//Variavel iniciada em 1 para que a contagem não comece em 0
let tentativas = 1;


//Função que troca o texto no HTML
function exibirTextoNaTela(tag, texto){
    //document.querySelector('tag') -> seleciona a tag que deseja alterar
    let campo = document.querySelector(tag);
    //O método '.innerHTML' (dentro do HTML) modifica o conteúdo da tag selecionada
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
};

//Função criada para evitar repetição do código
function mensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do número secreto!');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 1501');
}
//chamada para a função
mensagemInicial()

//Função que verifica o valor digitado com o valor sorteado
function verificarChute() {
        //Com o metodo '.value' seleciona apenas o valor dentro da tag
    let chute = document.querySelector('input').value;
    //Verifica se chute é igual o numero
    if (chute == numeroSecreto){
        //se verdadeiro utiliza a função trocar texto da tag H1 para acertou.
        exibirTextoNaTela('h1', 'Acertou!');
        //utilizando um operador ternário se o número de tentativas for maior que 1 ele usará a palavras tentativas
        let palavraTentativa = tentativas > 1 ? 'tentativas':'tentativa';
        //Utiliza template strings para deixar a mensagem dinâmica
        let mensagemTentativas =`Você acertou o número secreto com ${tentativas} ${palavraTentativa}`;
        //Troca o texto do paragrafo <p> para a mensagem de tentativas
        exibirTextoNaTela('p', mensagemTentativas);
        //o método '.getElementById' seleciona a tag pelo Id que é um elemento único
        //o método '.removeAttribute' remove o atributo da tag
        document.getElementById('reiniciar').removeAttribute('disabled');
        //Se falso
    } else {
        // senão se... Essa parte falsa adiciona uma condicional também para ficar trocando de mensagem a cada tentativa
        if (chute > numeroSecreto){
            exibirTextoNaTela('p', 'O número secreto é menor');
        }else{
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        //Incrementa a tentativa em +1 a cada tentativa
        tentativas++;
        //faz o hiçamento(chama de baixo pra cima) da função (abaixo) para limpar o campo
        limparCampo();
    };
    
};

//Função que gera um numero aleatório e adiciona ele a uma lista (array)
function gerarNumeroAleatorio(){
    //parseInt ->metodo que pega apenas a parte inteira de um numero
    //Math.random -> gera um numero pseudoaleatório ente 0 e 1, por isso é necessário multiplicá-lo
    let numeroEscolhido = parseInt(Math.random()* numeroLimite + 1);
    
    //Para quando a lista estiver completa ela se reinicie
    let quantidadeElementosNaLista = listaDeNumerosSorteados.length;
    if (quantidadeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }

    //verifica se o numero está na lista
    if (listaDeNumerosSorteados.includes(numeroEscolhido)){
        //se estiver ele gera um novo numero utilizando de recursão quando uma função chama ela mesma
        return gerarNumeroAleatorio();
    }else{
        //se não estiver ele adiciona com o método '.push'
        listaDeNumerosSorteados.push(numeroEscolhido);
        //E retorna o numero escolhido
        return numeroEscolhido
    }
};

//Função que limpa o campo
function limparCampo(){
    chute = document.querySelector('input');
    //Inicializa o valor do input com vazio
    chute.value = '';
}

//Função que reinicia o jogo, ela é chamada no botão HTML, volta para as configurações iniciais
function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    mensagemInicial();
    //faz o botao reiniciar ficar desabilidado novamente com o medtodo '.setAttribute'
    document.getElementById('reiniciar').setAttribute('disabled',true);
}
