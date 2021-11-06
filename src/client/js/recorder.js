import regeneratorRuntime from "regenerator-runtime";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { set } from "mongoose";
//ffmpeg는 영상을 변환해서 오디오파일로 만들거나 포맷을 변환해줌.
const actionbutton = document.getElementById("actionbutton");
const video = document.getElementById("preview");

let stream;
let recorder;
let videoFile; //영상이 녹화됐을 때 만들어진 objectURL

const files = {
  input: "recording.webm",
  output: "output.mp4",
  thumb: "thumbnail.jpg",
};

const downloadFile = (fileUrl, fileName) => {
  const a = document.createElement("a");
  a.href = fileUrl;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
};

const handleDownload = async () => {
  actionbutton.removeEventListener("click", handleDownload);
  actionbutton.innerText = "Transcoding....";
  actionbutton.disabled = true;
  const ffmpeg = createFFmpeg({
    log: true,
    corePath: "/assets/ffmpeg-core.js",
  }); //ffmpeg 생성
  await ffmpeg.load(); //ffmpeg 불러오기

  ffmpeg.FS("writeFile", files.input, await fetchFile(videoFile));
  //파일을 FS(파일 시스템)에 저장, 이름은 "recording.webm", videoFile로부터 파일 정보 가져오기
  //한 마디로 ffmpeg 파일 시스템에 녹화한 영상의 정보를 작성하는 것

  await ffmpeg.run("-i", files.input, "-r", "60", files.output);

  await ffmpeg.run(
    "-i",
    files.input,
    "-ss",
    "00:00:01",
    "-frames:v",
    "1",
    files.thumb
  );

  const mp4File = ffmpeg.FS("readFile", files.output);
  const thumbnail = ffmpeg.FS("readFile", files.thumb);

  const mp4Blob = new Blob([mp4File.buffer], { type: "video/mp4" });
  const thumbBlob = new Blob([thumbnail.buffer], { type: "image/jpg" });

  const mp4URL = URL.createObjectURL(mp4Blob);
  const thumbURL = URL.createObjectURL(thumbBlob);

  downloadFile(mp4URL, "MyRecording.mp4");
  downloadFile(thumbURL, "MyThumbnail.jpg");

  ffmpeg.FS("unlink", files.input);
  ffmpeg.FS("unlink", files.output);
  ffmpeg.FS("unlink", files.thumb);

  URL.revokeObjectURL(mp4URL);
  URL.revokeObjectURL(thumbURL);
  URL.revokeObjectURL(videoFile);

  actionbutton.disabled = false;
  actionbutton.innerText = "Record Again";
  actionbutton.addEventListener("click", handleStart);
};

const handleStart = () => {
  actionbutton.innerText = "Recording";
  actionbutton.disabled = true;
  recorder = new MediaRecorder(stream);
  recorder.ondataavailable = (event) => {
    videoFile = URL.createObjectURL(event.data);
    // console.log(event.data); //event에 대한 데이터
    video.srcObject = null;
    video.src = videoFile;
    video.loop = true; //video를 반복 재생
    video.play();
    actionbutton.innerText = "Download";
    actionbutton.disabled = false;
    actionbutton.addEventListener("click", handleDownload);
  };

  recorder.start();
  setTimeout(() => {
    recorder.stop();
  }, 5000);
};

const init = async () => {
  //mediaDevices는 promise 반환
  stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: { width: 1920, height: 1080 },
  });
  video.srcObject = stream;
  video.play();
};

init();

actionbutton.addEventListener("click", handleStart);
