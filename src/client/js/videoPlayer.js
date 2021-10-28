const video = document.querySelector("video");
const playbutton = document.getElementById("play");
const mutebutton = document.getElementById("mute");
const time = document.getElementById("time");
const volume = document.getElementById("volume");

const handlePlayClick = (event) => {
  //if the video is playing, pause it
  if (video.paused) {
    video.play();
  }
  //else play the video
  else {
    video.pause();
  }
};

const handlePause = () => (playbutton.innerText = "Play");
const handlePlay = () => (playbutton.innerText = "Pause");

const handleMute = (event) => {};

playbutton.addEventListener("click", handlePlayClick);
mutebutton.addEventListener("click", handleMute);
video.addEventListener("pause", handlePause);
video.addEventListener("play", handlePlay);
