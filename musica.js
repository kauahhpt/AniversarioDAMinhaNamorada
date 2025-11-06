// musica.js
(function() {
  if (window.globalMusic) return; // evita duplicar

  const audio = document.createElement("audio");
  audio.src = "musica.mp3"; // nome do seu arquivo de áudio
  audio.loop = true;
  audio.volume = 0.75;
  audio.autoplay = true;

  audio.style.position = "fixed";
  audio.style.bottom = "0";
  audio.style.left = "0";
  audio.style.width = "0";
  audio.style.height = "0";
  audio.style.opacity = "0";
  audio.style.pointerEvents = "none";

  document.body.appendChild(audio);
  window.globalMusic = audio;

  window.addEventListener("click", () => {
    if (audio.paused) {
      audio.play().catch(() => {});
    }
  });

  window.addEventListener("beforeunload", () => {
    // impede que o navegador pause automaticamente
    sessionStorage.setItem("musicTime", audio.currentTime);
  });

  const lastTime = sessionStorage.getItem("musicTime");
  if (lastTime) audio.currentTime = parseFloat(lastTime);
})();
