// 1. Lista de palavras com categoria e dica (12 itens - supera o mínimo de 10)
const palavras = [
    { palavra: "javascript", categoria: "Tecnologia", dica: "Linguagem que dá interatividade às páginas web." },
    { palavra: "html", categoria: "Tecnologia", dica: "Linguagem de marcação usada para estruturar sites." },
    { palavra: "css", categoria: "Tecnologia", dica: "Responsável pelas cores, fontes e layout da página." },
    { palavra: "navegador", categoria: "Tecnologia", dica: "Programa usado para acessar a internet (ex: Chrome, Firefox)." },
    { palavra: "algoritmo", categoria: "Computação", dica: "Sequência finita de passos para resolver um problema." },
    { palavra: "teclado", categoria: "Hardware", dica: "Periférico usado para digitar textos e comandos." },
    { palavra: "elefante", categoria: "Animais", dica: "Maior mamífero terrestre, conhecido por sua tromba." },
    { palavra: "pinguim", categoria: "Animais", dica: "Ave que não voa e vive em regiões muito frias." },
    { palavra: "abacaxi", categoria: "Alimentos", dica: "Fruta tropical com casca áspera e coroa." },
    { palavra: "lasanha", categoria: "Alimentos", dica: "Prato italiano feito com camadas de massa e molho." },
    { palavra: "paraiba", categoria: "Geografia", dica: "Estado brasileiro onde fica Campina Grande." },
    { palavra: "oceano", categoria: "Geografia", dica: "Grande massa de água salgada que cobre a maior parte da Terra." }
  ];
  
  // 2. Variáveis de estado do jogo
  let palavraSecreta = "";
  let letrasCorretas = [];
  let letrasUsadas = [];
  let tentativas = 6;
  let jogoAtivo = true;
  
  // Placar acumulado
  let totalPartidas = 0;
  let vitorias = 0;
  let derrotas = 0;
  
  // 3. Referências aos elementos do DOM
  const elementoCategoria = document.getElementById("categoria");
  const elementoDica = document.getElementById("dica");
  const elementoPalavra = document.getElementById("palavra");
  const elementoTentativas = document.getElementById("tentativas");
  const inputLetra = document.getElementById("letra");
  const mensagem = document.getElementById("mensagem");
  const elementoLetrasUsadas = document.getElementById("letras-usadas");
  const botaoTentar = document.getElementById("btn-tentar");
  const botaoReiniciar = document.getElementById("btn-reiniciar");
  
  const elementoPartidas = document.getElementById("total-partidas");
  const elementoVitorias = document.getElementById("vitorias");
  const elementoDerrotas = document.getElementById("derrotas");
  
  // 4. Inicia ou reinicia uma partida
  function iniciarJogo() {
    const indice = Math.floor(Math.random() * palavras.length);
    const itemSorteado = palavras[indice];
  
    palavraSecreta = itemSorteado.palavra;
    elementoCategoria.textContent = itemSorteado.categoria;
    elementoDica.textContent = itemSorteado.dica;
  
    tentativas = 6;
    letrasCorretas = [];
    letrasUsadas = [];
    jogoAtivo = true;
  
    elementoTentativas.textContent = tentativas;
    elementoLetrasUsadas.textContent = "Nenhuma";
    mensagem.textContent = "Boa sorte! Digite uma letra.";
    mensagem.className = "mensagem";
  
    inputLetra.disabled = false;
    botaoTentar.disabled = false;
    inputLetra.value = "";
    inputLetra.focus();
  
    atualizarPalavra();
  }
  
  // 5. Atualiza os traços e letras reveladas na tela
  function atualizarPalavra() {
    let exibicao = "";
  
    for (let i = 0; i < palavraSecreta.length; i++) {
      const letra = palavraSecreta[i];
      if (letrasCorretas.includes(letra)) {
        exibicao += letra.toUpperCase() + " ";
      } else {
        exibicao += "_ ";
      }
    }
  
    elementoPalavra.textContent = exibicao.trim();
  }
  
  // 6. Verifica se todas as letras da palavra foram descobertas
  function venceu() {
    for (let i = 0; i < palavraSecreta.length; i++) {
      const letra = palavraSecreta[i];
      if (!letrasCorretas.includes(letra)) {
        return false;
      }
    }
    return true;
  }
  
  // 7. Encerra a partida e atualiza o placar
  function finalizarPartida(ganhou) {
    jogoAtivo = false;
    inputLetra.disabled = true;
    botaoTentar.disabled = true;
    totalPartidas++;
  
    if (ganhou) {
      vitorias++;
      mensagem.textContent = "Parabéns! Você venceu!";
      mensagem.className = "mensagem acerto";
    } else {
      derrotas++;
      mensagem.textContent = "Você perdeu! A palavra era: " + palavraSecreta.toUpperCase();
      mensagem.className = "mensagem erro";
    }
  
    elementoPartidas.textContent = totalPartidas;
    elementoVitorias.textContent = vitorias;
    elementoDerrotas.textContent = derrotas;
  }
  
  // 8. Processa a tentativa do jogador
  function verificarLetra() {
    if (!jogoAtivo) return;
  
    const letra = inputLetra.value.trim().toLowerCase();
    inputLetra.value = "";
    inputLetra.focus();
  
    // Validação: campo vazio ou caractere que não seja letra
    if (letra === "" || !/^[a-z]$/.test(letra)) {
      mensagem.textContent = "Digite apenas uma letra válida (A-Z).";
      mensagem.className = "mensagem aviso";
      return;
    }
  
    // Validação: letra repetida
    if (letrasUsadas.includes(letra)) {
      mensagem.textContent = `A letra "${letra.toUpperCase()}" já foi utilizada.`;
      mensagem.className = "mensagem aviso";
      return;
    }
  
    letrasUsadas.push(letra);
    elementoLetrasUsadas.textContent = letrasUsadas.join(", ").toUpperCase();
  
    if (palavraSecreta.includes(letra)) {
      letrasCorretas.push(letra);
      mensagem.textContent = `Boa! A letra "${letra.toUpperCase()}" existe na palavra.`;
      mensagem.className = "mensagem acerto";
    } else {
      tentativas--;
      elementoTentativas.textContent = tentativas;
      mensagem.textContent = `Ops! A letra "${letra.toUpperCase()}" não está na palavra.`;
      mensagem.className = "mensagem erro";
    }
  
    atualizarPalavra();
  
    if (venceu()) {
      finalizarPartida(true);
    } else if (tentativas === 0) {
      finalizarPartida(false);
    }
  }
  
  // 9. Eventos
  botaoTentar.addEventListener("click", verificarLetra);
  botaoReiniciar.addEventListener("click", iniciarJogo);
  
  // Permite enviar pressionando Enter dentro do campo de texto
  inputLetra.addEventListener("keydown", function (evento) {
    if (evento.key === "Enter") {
      verificarLetra();
    }
  });
  
  // Inicia a primeira partida ao carregar a página
  iniciarJogo();