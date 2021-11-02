import regeneratorRuntime from "regenerator-runtime";
const startbutton = document.getElementById("startbutton");
const video = document.getElementById("preview");

let stream;

const handleStop = () => {
  startbutton.innerText = "Start Recording";
  startbutton.removeEventListener("click", handleStop);
  startbutton.addEventListener("click", handleStart);
};

const handleStart = () => {
  startbutton.innerText = "Stop Recording";
  startbutton.removeEventListener("click", handleStart);
  startbutton.addEventListener("click", handleStop);

  const recorder = new MediaRecorder(stream);
  recorder.ondataavailable = (event) => {
    console.log("recording done");
    console.log(event);
    console.log(event.data);
  };

  console.log(recorder);
  recorder.start();
  console.log(recorder);
  setTimeout(() => {
    recorder.stop();
  }, 10000);
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
