const envelope = document.getElementById("envelope");
const botaoAbrir = document.getElementById("botaoAbrir");
const botaoContinuar = document.getElementById("botaoContinuar");

botaoAbrir.addEventListener("click", () => {
  const estaAberto = envelope.classList.toggle("aberto");

  botaoAbrir.textContent = estaAberto
    ? "Fechar carta 💌"
    : "Abrir carta 💌";

  botaoAbrir.setAttribute("aria-expanded", String(estaAberto));
  botaoContinuar.setAttribute("tabindex", estaAberto ? "0" : "-1");
});
