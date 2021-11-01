import regeneratorRuntime from "regenerator-runtime";
const startbutton = document.getElementById("startbutton");

const handleStart = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
  });
  console.log(stream);
};
startbutton.addEventListener("click", handleStart);
