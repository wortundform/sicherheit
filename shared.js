function initializePlayer() {
  const video = document.getElementById("video");
  const videoContainer = document.getElementById("videoContainer");
  const playBtn = document.getElementById("playBtn");
  const pauseBtn = document.getElementById("pauseBtn");
  const fullscreenBtn = document.getElementById("fullscreenBtn");
  const fullscreenExitBtn = document.getElementById("fullscreenExitBtn");
  const backBtn = document.getElementById("backBtn");
  const continueBtn = document.getElementById("continueBtn");
  const skipWarning = document.getElementById("skipWarning");
  const clickShield = document.getElementById("clickShield");
  clickShield.style.display = "none";
  const tabWarning = document.getElementById("tabWarning");
  const progressBar = document.getElementById("progressBar");
  const timer = document.getElementById("timer");

  if (!video || !VIDEOS[window.LANG]) {
    console.error("Video oder LANG nicht definiert");
    return;
  }

  video.src = VIDEOS[window.LANG];

  let maxReached = 0;
  let skipWarningTimeout;
  let tabWarningTimeout;
  let controlsTimeout;
  const controls = document.querySelector('.controls');

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

  video.addEventListener("timeupdate", () => {
    if (video.currentTime > maxReached) {
      maxReached = video.currentTime;
    }
  });

  video.addEventListener("ended", () => {
    continueBtn.style.display = "block";
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      showTabWarning();
      video.pause();
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

  progressBar.addEventListener("click", (e) => {
    const rect = progressBar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    video.currentTime = percent * video.duration;
  });

  video.addEventListener("timeupdate", () => {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.width = percent + "%";
  });

  video.addEventListener("timeupdate", () => {
    const current = formatTime(video.currentTime);
    const duration = formatTime(video.duration);
    timer.textContent = `${current} / ${duration}`;
  });

  function formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }

  fullscreenBtn.addEventListener("click", () => {
    if (document.fullscreenElement) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    } else {
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

  backBtn.addEventListener("click", () => {
    window.history.back();
  });

  continueBtn.addEventListener("click", () => {
    const formUrl = FORMS_URLS[window.LANG];
    if (formUrl) {
      window.location.href = formUrl;
    }
  });
}

document.addEventListener("DOMContentLoaded", initializePlayer);
