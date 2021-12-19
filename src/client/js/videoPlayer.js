const video = document.querySelector("video");
const playbutton = document.getElementById("play");
const playbuttonicon = playbutton.querySelector("i");
const mutebutton = document.getElementById("mute");
const mutebuttonicon = mutebutton.querySelector("i");
const volumeRange = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totaltime = document.getElementById("totaltime");
const timeline = document.getElementById("timeline");
const fullscreenbutton = document.getElementById("fullScreen");
const fullScreenIcon = fullscreenbutton.querySelector("i");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

video.volume = 0.5;

let controlsTimeout = null;
let controlsMovementTimeout = null;
let volumeValue = 0.5; //전역 변수
video.volume = volumeValue;

const handlePlayClick = () => {
  //if the video is playing, pause it
  if (video.paused) {
    video.play();
  } //else play the video
  else {
    video.pause();
  }
  playbuttonicon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
};

const handleMute = () => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  mutebuttonicon.classList = video.muted
    ? "fas fa-volume-mute"
    : "fas fa-volume-up";
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
  video.volume = value;
};

const formattingTime = (seconds) =>
  new Date(seconds * 1000).toISOString().substr(14, 5);

const handleLoadedMetadata = () => {
  totaltime.innerText = formattingTime(Math.floor(video.duration)); //영상의 총 시간을 알 수 있음
  timeline.max = video.duration;
};

const hadnleTimeUpdate = () => {
  currentTime.innerText = formattingTime(Math.floor(video.currentTime)); // 현재 시간을 실시간으로 반영
  timeline.value = Math.floor(video.currentTime);
};

const handleTimelineChange = (event) => {
  const {
    target: { value },
  } = event;
  video.currentTime = value;
};

const handleFullScreen = (event) => {
  console.log(event);
  const fullscreen = document.fullscreenElement;
  if (fullscreen) {
    document.exitFullscreen();
    fullScreenIcon.classList = "fas fa-expand";
  } else {
    videoContainer.requestFullscreen(); //element에서 불러와야 함
    fullScreenIcon.classList = "fas fa-compress";
  }
};

const hideControls = () => videoControls.classList.remove("showing");

const handleMouseMove = () => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }
  if (controlsMovementTimeout) {
    clearTimeout(controlsMovementTimeout);
    controlsMovementTimeout = null;
  }
  videoControls.classList.add("showing");
  controlsMovementTimeout = setTimeout(hideControls, 3000);
};

const handleMouseLeave = () => {
  controlsTimeout = setTimeout(hideControls, 3000);
};

const handleSpace = (event) => {
  const SPACE_BAR = 32;

  if (event.which === SPACE_BAR) {
    handleButton();
  }
};

const handleButton = () => {
  if (video.paused) {
    playbuttonicon.classList = "fas fa-pause";
    video.play();
  } else {
    playbuttonicon.classList = "fas fa-play";
    video.pause();
  }
};

const handleEnded = () => {
  const { id } = videoContainer.dataset;
  fetch(`/api/videos/${id}/view`, {
    method: "POST",
  });
};

playbutton.addEventListener("click", handlePlayClick);
mutebutton.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeChange);
videoContainer.addEventListener("loadedmetadata", handleLoadedMetadata);
videoContainer.addEventListener("timeupdate", hadnleTimeUpdate);
video.addEventListener("click", handleButton);
video.addEventListener("mousemove", handleMouseMove);
video.addEventListener("mouseleave", handleMouseLeave);

//User가 비디오 시청을 끝냈을 때 생기는 이벤트 추가
video.addEventListener("ended", handleEnded);
timeline.addEventListener("input", handleTimelineChange);
fullscreenbutton.addEventListener("click", handleFullScreen);
document.addEventListener("keydown", handleSpace);

if (video.readyState == 4) {
  handleLoadedMetadata();
}
