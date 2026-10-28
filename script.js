// Data personalizada: 9 de fevereiro de 2024.
// Em JavaScript, janeiro = 0 e fevereiro = 1.
const DATA_INICIO = new Date(2024, 1, 9, 0, 0);

const $ = (id) => document.getElementById(id);

function atualizarContador() {
  const agora = new Date();
  const inicio = DATA_INICIO;
  if (Number.isNaN(inicio.getTime()) || inicio > agora) {
    $("days").textContent = "—";
    $("hours").textContent = "—";
    $("minutes").textContent = "—";
    $("seconds").textContent = "—";
    return;
  }

  let segundos = Math.floor((agora - inicio) / 1000);
  const dias = Math.floor(segundos / 86400);
  segundos %= 86400;
  const horas = Math.floor(segundos / 3600);
  segundos %= 3600;
  const minutos = Math.floor(segundos / 60);
  segundos %= 60;

  $("days").textContent = dias.toLocaleString("pt-BR");
  $("hours").textContent = String(horas).padStart(2, "0");
  $("minutes").textContent = String(minutos).padStart(2, "0");
  $("seconds").textContent = String(segundos).padStart(2, "0");

  $("since-label").textContent = "Desde " + inicio.toLocaleDateString("pt-BR", {
    day: "numeric", month: "long", year: "numeric"
  }) + " — e contando.";
}
atualizarContador();
setInterval(atualizarContador, 1000);

// Abre e fecha a carta.
$("open-letter").addEventListener("click", () => {
  const carta = $("letter-content");
  const vaiAbrir = carta.hidden;
  carta.hidden = !vaiAbrir;
  $("open-letter").setAttribute("aria-expanded", String(vaiAbrir));
  $("open-letter").innerHTML = vaiAbrir
    ? 'Fechar minha carta <span>↙</span>'
    : 'Abrir minha carta <span>↗</span>';
  if (vaiAbrir) carta.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

// Música local: coloque seu MP3 em musica/nossa-musica.mp3.
const audio = $("our-song");
const musicButton = $("music-toggle");
const musicHint = $("music-hint");

musicButton.addEventListener("click", async () => {
  if (audio.paused) {
    try {
      await audio.play();
      musicButton.innerHTML = 'Ⅱ <span>Pausar nossa música</span>';
      musicHint.textContent = "Tocando a nossa trilha sonora.";
    } catch (error) {
      musicHint.textContent = "Adicione o arquivo musica/nossa-musica.mp3 e tente novamente.";
    }
  } else {
    audio.pause();
    musicButton.innerHTML = '▶ <span>Ouvir nossa música</span>';
    musicHint.textContent = "Música pausada.";
  }
});
audio.addEventListener("ended", () => {
  musicButton.innerHTML = '▶ <span>Ouvir nossa música</span>';
});

// Animações ao entrar na tela; se não houver suporte, o conteúdo continua visível.
const elementos = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("visible");
        observador.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.12 });
  elementos.forEach((elemento) => observador.observe(elemento));
} else {
  elementos.forEach((elemento) => elemento.classList.add("visible"));
}
