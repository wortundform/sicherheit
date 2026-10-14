// ============================================================================
// shared.js – C.F. Maier Sicherheitsunterweisungs-App
// Player-Logik: Skip-Schutz, Tamper-Guard, Tab-Überwachung, Controls
// ============================================================================

// Requires: window.LANG, window.VIDEOS, window.CONTENT, window.FORMS_URLS
// (definiert in config.js und index-XX.html)

(function initializePlayer() {
  // === DOM-Elemente ===
  const video = document.getElementById("video");
  const videoContainer = document.getElementById("videoContainer");
  const playBtn = document.getElementById("playBtn");
  const pauseBtn = document.getElementById("pauseBtn");
  const timerSpan = document.getElementById("timer");
  const progressBar = document.getElementById("progressBar");
  const fullscreenBtn = document.getElementById("fullscreenBtn");
  const fullscreenExitBtn = document.getElementById("fullscreenExitBtn");
  const backBtn = document.getElementById("backBtn");
  const continueBtn = document.getElementById("continueBtn");
  const skipWarning = document.getElementById("skipWarning");
  const clickShield = document.getElementById("clickShield");
    clickShield.style.display = "none";
  const tabWarning = document.getElementById("tabWarning");

  // === Validierung ===
  if (!video || !VIDEOS[window.LANG]) {
    console.error("Video-Element oder Sprache nicht gefunden.");
    return;

    let controlsTimeout;
const controls = document.querySelector('.controls');

function showControls() {
  controls.style.display = "block";
  clearTimeout(controlsTimeout);
  
  if (!video.paused) {
    controlsTimeout = setTimeout(() => {
      controls.style.display = "none";
    }, 3000);
  }
}

function hideControls() {
  if (!video.paused) {
    controls.style.display = "none";
  }
}

video.addEventListener("play", hideControls);
video.addEventListener("pause", showControls);

videoContainer.addEventListener("mousemove", showControls);
videoContainer.addEventListener("mouseleave", () => {
  if (!video.paused) {
    hideControls();
  }
});

videoContainer.addEventListener("touchstart", showControls);
  }

  // === Video-Quelle setzen ===
  video.src = VIDEOS[window.LANG];

  // === State ===
  let maxReached = 0;
  let skipWarningTimeout;
  let tabWarningTimeout;

  // === 1. SKIP-SCHUTZ ===
  video.addEventListener("seeking", () => {
    if (video.currentTime > maxReached + 0.3) {
      video.currentTime = maxReached;
      showSkipWarning();
    }
  });

  function showSkipWarning() {
    clearTimeout(skipWarningTimeout);
    skipWarning.style.display = "block";
    skipWarningTimeout = setTimeout(() => {
      skipWarning.style.display = "none";
    }, 3500);
  }

  // === 2. TAMPER-GUARD (Closure-Pattern) ===
  (function installGuard() {
    let trulyEnded = false;

    // Nur von Video-Ende-Event setzen
    window.__setEnded = function() {
      trulyEnded = true;
    };

    // Abfrage
    window.__isEnded = function() {
      return trulyEnded;
    };

    // Periodic Guard: Alle 800ms Continue-Button gegen Manipulation schützen
    setInterval(() => {
      if (continueBtn.style.display !== "none" && !trulyEnded) {
        continueBtn.style.display = "none";
        continueBtn.onclick = null;
      }
    }, 800);
  })();

  // === 3. VIDEO-FORTSCHRITT TRACKEN ===
  video.addEventListener("timeupdate", () => {
    if (video.currentTime > maxReached) {
      maxReached = video.currentTime;
    }
    updateProgressBar();
    updateTimer();
  });

  // === 4. VIDEO-ENDE ===
  video.addEventListener("ended", () => {
    window.__setEnded();
    continueBtn.style.display = "block";
    continueBtn.disabled = false;
  });

  // === 5. TAB-ÜBERWACHUNG ===
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && !video.paused) {
      video.pause();
      showTabWarning();
    }
    if (!document.hidden) {
      tabWarning.style.display = "none";
      clearTimeout(tabWarningTimeout);
    }
  });

  function showTabWarning() {
    clearTimeout(tabWarningTimeout);
    tabWarning.style.display = "block";
    tabWarningTimeout = setTimeout(() => {
      tabWarning.style.display = "none";
    }, 3500);
  }

  // === 6. CONTROLS ===
  playBtn.addEventListener("click", () => {
    video.play();
    updatePlayPauseButtons();
  });

  pauseBtn.addEventListener("click", () => {
    video.pause();
    updatePlayPauseButtons();
  });

  video.addEventListener("play", updatePlayPauseButtons);
  video.addEventListener("pause", updatePlayPauseButtons);

  function updatePlayPauseButtons() {
    if (video.paused) {
      playBtn.style.display = "inline-block";
      pauseBtn.style.display = "none";
    } else {
      playBtn.style.display = "none";
      pauseBtn.style.display = "inline-block";
    }
  }

  // === 7. PROGRESS-BAR ===
  progressBar.addEventListener("click", (e) => {
    const rect = progressBar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * video.duration;

    // Nur bis maxReached + 0.3s erlauben
    if (newTime > maxReached + 0.3) {
      showSkipWarning();
      video.currentTime = maxReached;
    } else {
      video.currentTime = newTime;
    }
  });

  function updateProgressBar() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.width = percent + "%";
  }

  // === 8. TIMER ===
  function updateTimer() {
    const current = formatTime(video.currentTime);
    const duration = formatTime(video.duration);
    timerSpan.textContent = `${current} / ${duration}`;
  }

  function formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  }

  // === 9. FULLSCREEN ===
  fullscreenBtn.addEventListener("click", () => {
  if (document.fullscreenElement) {
    // Bereits im Fullscreen → Beenden
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  } else {
    // Nicht im Fullscreen → Eintreten
    if (videoContainer.requestFullscreen) {
      videoContainer.requestFullscreen();
    } else if (videoContainer.webkitRequestFullscreen) {
      videoContainer.webkitRequestFullscreen();
    }
  }
});

fullscreenExitBtn.addEventListener("click", () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
});

document.addEventListener("fullscreenchange", () => {
  fullscreenExitBtn.style.display = document.fullscreenElement ? "block" : "none";
});

  // === 10. BACK-BUTTON ===
  backBtn.addEventListener("click", () => {
    window.history.back();
  });

  // === 11. CONTINUE-BUTTON (zu Forms) ===
  continueBtn.addEventListener("click", () => {
    if (!window.__isEnded()) {
      showSkipWarning();
      return;
    }
    const formsUrl = FORMS_URLS[window.LANG];
    if (formsUrl) {
      window.location.href = formsUrl;
    }
  });

  // === 12. KEYBOARD-BLOCKADE ===
  document.addEventListener("keydown", (e) => {
    const blocked = ["ArrowLeft", "ArrowRight", " ", "f", "k", "j", "l", "End", "Home"];
    if (blocked.includes(e.key)) {
      e.preventDefault();
    }
  });

  // === 13. RIGHT-CLICK-BLOCKADE ===
  video.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });

  // === 14. INITIAL STATE ===
  updatePlayPauseButtons();
  updateProgressBar();
  updateTimer();
  continueBtn.style.display = "none";
})();
