// --- 1. BOTÃO "NÃO" FUJÃO ---
const btnNao = document.getElementById("btnNao");

function moverBotaoNao() {
  const container = document.querySelector(".botoes-resposta");
  const larguraMax = container.clientWidth - btnNao.offsetWidth;
  const alturaMax = 60; // amplitude do desvio

  const aleatorioX = Math.floor(Math.random() * (larguraMax + 1)) - larguraMax / 2;
  const aleatorioY = Math.floor(Math.random() * (alturaMax * 2 + 1)) - alturaMax;

  btnNao.style.transform = `translate(${aleatorioX}px, ${aleatorioY}px)`;
}

btnNao.addEventListener("mouseenter", moverBotaoNao);
btnNao.addEventListener("touchstart", (e) => {
  e.preventDefault();
  moverBotaoNao();
});

// --- 2. RESPOSTA DO "SIM" E CHUVA DE CORAÇÕES ---
const btnSim = document.getElementById("btnSim");
const respostaFinal = document.getElementById("respostaFinal");

btnSim.addEventListener("click", () => {
  respostaFinal.textContent = "Prometo fazer cada momento valer a pena! 🎶💖";
  btnNao.style.display = "none";
  btnSim.textContent = "Já é o meu caso indefinido! ✨";
  btnSim.style.pointerEvents = "none";

  // Dispara corações na tela
  for (let i = 0; i < 24; i++) {
    criarCoracao();
  }
});

function criarCoracao() {
  const coracao = document.createElement("div");
  coracao.classList.add("coracao-flutuante");
  coracao.textContent = ["💖", "✨", "💌", "💕"][Math.floor(Math.random() * 4)];
  coracao.style.left = Math.random() * 100 + "vw";
  coracao.style.top = Math.random() * 30 + 60 + "vh";
  document.body.appendChild(coracao);

  setTimeout(() => coracao.remove(), 1800);
}

// --- 3. CONTROLES DO PLAYER ---
const btnPlay = document.getElementById("btnPlay");
const btnFavorito = document.getElementById("btnFavorito");
const progresso = document.getElementById("progresso");
const tempoAtual = document.getElementById("tempoAtual");

let tocando = false;
let segundos = 48;
const duracaoTotal = 214; // 3:34
let intervalo;

btnPlay.addEventListener("click", () => {
  tocando = !tocando;
  btnPlay.textContent = tocando ? "⏸" : "▶";

  if (tocando) {
    intervalo = setInterval(() => {
      segundos++;
      if (segundos >= duracaoTotal) segundos = 0;

      const min = Math.floor(segundos / 60);
      const seg = String(segundos % 60).padStart(2, "0");
      tempoAtual.textContent = `${min}:${seg}`;

      const porcentagem = (segundos / duracaoTotal) * 100;
      progresso.style.width = `${porcentagem}%`;
    }, 1000);
  } else {
    clearInterval(intervalo);
  }
});

btnFavorito.addEventListener("click", () => {
  btnFavorito.classList.toggle("ativo");
});
