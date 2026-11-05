function abrirEnvelope() {
  const envelope = document.getElementById("Envelope");
  const botao = document.querySelector("button");

  envelope.classList.toggle("aberto");

  if (envelope.classList.contains("aberto")) {
    botao.textContent = "Fechar carta💌";
  } else {
    botao.textContent = "Abrir carta💌";
  }
}

// Também permite clicar diretamente no envelope para abrir/fechar
document.getElementById("Envelope").addEventListener("click", abrirEnvelope);
