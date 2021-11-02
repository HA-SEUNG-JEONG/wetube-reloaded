import regeneratorRuntime from "regenerator-runtime";
const startbutton = document.getElementById("startbutton");
const video = document.getElementById("preview");

let stream;
let recorder;

const handleStop = () => {
  startbutton.innerText = "Download Recording";
  startbutton.removeEventListener("click", handleStop);
  startbutton.addEventListener("click", handleStart);
  recorder.stop();
};

const handleStart = () => {
  startbutton.innerText = "Stop Recording";
  startbutton.removeEventListener("click", handleStart);
  startbutton.addEventListener("click", handleStop);

  recorder = new MediaRecorder(stream);
  recorder.ondataavailable = (event) => {
    const videoFile = URL.createObjectURL(event.data);
    // console.log(event.data); //event에 대한 데이터
    video.srcObject = null;
    video.src = videoFile;
    video.loop = true; //video를 반복 재생
    video.play();
  };

  recorder.start();
};

const init = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: { width: 100, height: 100 },
  });
  video.srcObject = stream;
  video.play();
};

init();

startbutton.addEventListener("click", handleStart);
