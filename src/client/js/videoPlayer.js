const video = document.querySelector("video");
const playbutton = document.getElementById("play");
const mutebutton = document.getElementById("mute");
const time = document.getElementById("time");
const volumeRange = document.getElementById("volume");

video.volume = 0.5;

let volumeValue = 0.5; //전역 변수
video.volume = volumeValue;
// console.log("video.volume", video.volume);

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
  volumeRange.value = video.muted ? 0 : volumeValue;
};

const handleVolumeChange = (event) => {
  const {
    target: { value },
  } = event;
  if (video.muted) {
    video.muted = false;
    mutebutton.innerText = "Mute";
  }
  volumeValue = value;
  //   console.log("volumeValue", volumeValue);
  video.volume = value;
  //   console.log("video.volume", video.volume);
};

playbutton.addEventListener("click", handlePlayClick);
mutebutton.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeChange);
