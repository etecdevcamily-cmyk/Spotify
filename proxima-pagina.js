// --- ELEMENTOS DO ÁUDIO E PLAYER ---
const audio = document.getElementById("audioMusica");
const btnPlay = document.getElementById("btnPlay");
const progresso = document.getElementById("progresso");
const barraProgresso = document.getElementById("barraProgresso");
const tempoAtual = document.getElementById("tempoAtual");
const tempoTotal = document.getElementById("tempoTotal");
const avisoAudio = document.getElementById("avisoAudio");
const btnVoltar10 = document.getElementById("btnVoltar10");
const btnAvancar10 = document.getElementById("btnAvancar10");
const btnFavorito = document.getElementById("btnFavorito");

function formatarTempo(segundos) {
  if (isNaN(segundos)) return "0:00";

  const min = Math.floor(segundos / 60);
  const seg = Math.floor(segundos % 60);

  return `${min}:${seg < 10 ? "0" : ""}${seg}`;
}

// Atualiza a duração total quando o áudio carregar
audio.addEventListener("loadedmetadata", () => {
  tempoTotal.textContent = formatarTempo(audio.duration);
});

// Botão de tocar e pausar
btnPlay.addEventListener("click", () => {
  if (audio.paused) {
    audio.play()
      .then(() => {
        btnPlay.textContent = "⏸";
        avisoAudio.textContent = "";
      })
      .catch(() => {
        avisoAudio.textContent =
          "Não foi possível tocar o áudio. Confira se o arquivo está na pasta correta.";
      });
  } else {
    audio.pause();
    btnPlay.textContent = "▶";
  }
});

// Atualiza a barra de progresso e o tempo atual
audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;

  const porcentagem = (audio.currentTime / audio.duration) * 100;
  progresso.style.width = `${porcentagem}%`;
  tempoAtual.textContent = formatarTempo(audio.currentTime);
});

// Quando a música terminar
audio.addEventListener("ended", () => {
  btnPlay.textContent = "▶";
  progresso.style.width = "0%";
  tempoAtual.textContent = "0:00";
});

// Permite avançar ou voltar clicando na barra
barraProgresso.addEventListener("click", (evento) => {
  if (!audio.duration) return;

  const larguraTotal = barraProgresso.clientWidth;
  const cliqueX = evento.offsetX;

  audio.currentTime = (cliqueX / larguraTotal) * audio.duration;
});

// Botões para voltar ou avançar 10 segundos
btnVoltar10.addEventListener("click", () => {
  audio.currentTime = Math.max(0, audio.currentTime - 10);
});

btnAvancar10.addEventListener("click", () => {
  audio.currentTime = Math.min(audio.duration || 0, audio.currentTime + 10);
});

// Botão de favorito
btnFavorito.addEventListener("click", () => {
  btnFavorito.classList.toggle("ativo");
});

// --- BOTÃO "NÃO" ---
const btnNao = document.getElementById("btnNao");

function moverBotaoNao() {
  const container = document.querySelector(".botoes-resposta");
  const larguraMax = container.clientWidth - btnNao.offsetWidth;
  const alturaMax = 50;

  const aleatorioX =
    Math.floor(Math.random() * (larguraMax + 1)) - larguraMax / 2;
  const aleatorioY =
    Math.floor(Math.random() * (alturaMax * 2 + 1)) - alturaMax;

  btnNao.style.transform = `translate(${aleatorioX}px, ${aleatorioY}px)`;
}

btnNao.addEventListener("mouseenter", moverBotaoNao);

btnNao.addEventListener("touchstart", (evento) => {
  evento.preventDefault();
  moverBotaoNao();
});

// --- BOTÃO "SIM": MOSTRA APENAS CORAÇÕES ---
const btnSim = document.getElementById("btnSim");

btnSim.addEventListener("click", () => {
  btnNao.style.display = "none";

  for (let i = 0; i < 24; i++) {
    criarCoracao();
  }
});

// Cria os corações animados
function criarCoracao() {
  const coracao = document.createElement("div");

  coracao.classList.add("coracao-flutuante");
  coracao.textContent = ["💖", "✨", "💌", "💕"][
    Math.floor(Math.random() * 4)
  ];
  coracao.style.left = Math.random() * 100 + "vw";
  coracao.style.top = Math.random() * 30 + 60 + "vh";

  document.body.appendChild(coracao);

  setTimeout(() => {
    coracao.remove();
  }, 1800);
}
