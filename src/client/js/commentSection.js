const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

const addComment = (text) => {
  const videoComments = document.querySelector(".video__comments ul");
  const fakeComments = document.createElement("li");
  fakeComments.className = "video__comment";
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = ` ${text}`;
  fakeComments.appendChild(icon); //i 태그 안에 있는 icon
  fakeComments.appendChild(span); //span 안에 들어있는 댓글 내용
  // console.log("fakecomments:", fakeComments); //li 태그 안에 icon과 span 내 내용이 들어감
  videoComments.prepend(fakeComments); //prepend를 쓰면 최신 댓글이 맨 위로 올라옴
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text === "") {
    return;
  }
  const { status } = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  textarea.value = "";
  if (status === 201) {
    addComment(text);
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}
