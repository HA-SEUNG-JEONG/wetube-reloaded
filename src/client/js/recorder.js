import regeneratorRuntime from "regenerator-runtime";
const startbutton = document.getElementById("startbutton");
const video = document.getElementById("preview");

const handleStart = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: { width: 100, height: 100 },
  });
  video.srcObject = stream;
  video.play();
};
startbutton.addEventListener("click", handleStart);
