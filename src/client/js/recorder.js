import regeneratorRuntime from "regenerator-runtime";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
const startbutton = document.getElementById("startbutton");
const video = document.getElementById("preview");

let stream;
let recorder;
let videoFile;

const handleDownload = async () => {
  const ffmpeg = createFFmpeg({
    log: true,
    corePath: "/assets/ffmpeg-core.js",
  });
  await ffmpeg.load();

  ffmpeg.FS("writeFile", "recording.webm", await fetchFile(videoFile));

  await ffmpeg.run("-i", "recording.webm", "-r", "60", "output.mp4");

  await ffmpeg.run(
    "-i",
    "recording.webm",
    "-ss",
    "00:00:01",
    "-frames:v",
    "1",
    "thumbnail.jpg"
  );

  const mp4File = ffmpeg.FS("readFile", "output.mp4");
  const thumbnail = ffmpeg.FS("readFile", "thumbnail.jpg");

  const mp4Blob = new Blob([mp4File.buffer], { type: "video/mp4" });
  const thumbBlob = new Blob([thumbnail.buffer], { type: "image/jpg" });

  const mp4URL = URL.createObjectURL(mp4Blob);
  const thumbURL = URL.createObjectURL(thumbBlob);

  const a = document.createElement("a");
  a.href = mp4URL;
  //download 태그: 사용자로 하여금 URL을 통해 어디로 보내주는 게 아니라 URL을 저장하게 해준다.
  a.download = "My Recording.mp4";
  document.body.appendChild(a);
  a.click();

  const thumbanchor = document.createElement("a");
  thumbanchor.href = thumbURL;
  //download 태그: 사용자로 하여금 URL을 통해 어디로 보내주는 게 아니라 URL을 저장하게 해준다.
  thumbanchor.download = "My Thumbnail.jpg";
  document.body.appendChild(thumbanchor);
  thumbanchor.click();
};

const handleStop = () => {
  startbutton.innerText = "Download Recording";
  startbutton.removeEventListener("click", handleStop);
  startbutton.addEventListener("click", handleDownload);
  recorder.stop();
};

const handleStart = () => {
  startbutton.innerText = "Stop Recording";
  startbutton.removeEventListener("click", handleStart);
  startbutton.addEventListener("click", handleStop);

  recorder = new MediaRecorder(stream);
  recorder.ondataavailable = (event) => {
    videoFile = URL.createObjectURL(event.data);
    // console.log(event.data); //event에 대한 데이터
    video.srcObject = null;
    video.src = videoFile;
    video.loop = true; //video를 반복 재생
    video.play();
  };

  recorder.start();
};

const init = async () => {
  //mediaDevices는 promise 반환
  stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: { width: 100, height: 100 },
  });
  video.srcObject = stream;
  video.play();
};

init();

startbutton.addEventListener("click", handleStart);
