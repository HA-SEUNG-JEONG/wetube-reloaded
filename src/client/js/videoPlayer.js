const video = document.querySelector("video");
const playbutton = document.getElementById("play");
const mutebutton = document.getElementById("mute");
const time = document.getElementById("time");
const volumeRange = document.getElementById("volume");

const handlePlayClick = (event) => {
  //if the video is playing, pause it
  if (video.paused) {
    video.play();
  } //else play the video
  else {
    video.pause();
  }
  playbutton.innerText = video.paused ? "Play" : "Pause";
};

const handlePause = () => (playbutton.innerText = "Play");
const handlePlay = () => (playbutton.innerText = "Pause");

const handleMute = (event) => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  mutebutton.innerText = video.muted ? "UnMute" : "Mute";
  volumeRange.value = video.muted ? 0 : 0.5;
};

playbutton.addEventListener("click", handlePlayClick);
mutebutton.addEventListener("click", handleMute);
