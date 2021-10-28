const video = document.querySelector("video");
const playbutton = document.getElementById("play");
const mutebutton = document.getElementById("mute");
const volumeRange = document.getElementById("volume");
const currenttime = document.getElementById("currenttime");
const totaltime = document.getElementById("totaltime");
const timeline = document.getElementById("timeline");

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

const formattingTime = (seconds) =>
  new Date(seconds * 1000).toISOString().substr(14, 5);

const handleLoadedMetadata = () => {
  totaltime.innerText = formattingTime(Math.floor(video.duration)); //영상의 총 시간을 알 수 있음
  timeline.max = Math.floor(video.duration);
};

const hadnleTimeUpdate = () => {
  currenttime.innerText = formattingTime(Math.floor(video.currentTime)); // 현재 시간을 실시간으로 반영
  timeline.value = Math.floor(video.currentTime);
};

const handleTimelineChange = (event) => {
  const {
    target: { value },
  } = event;
  video.currentTime = value;
};

playbutton.addEventListener("click", handlePlayClick);
mutebutton.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("loadedmetadata", handleLoadedMetadata);
video.addEventListener("timeupdate", hadnleTimeUpdate);
timeline.addEventListener("input", handleTimelineChange);

if (video.readyState == 4) {
  handleLoadedMetadata();
}
