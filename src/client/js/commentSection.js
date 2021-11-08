const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const button = form.querySelector("button");
const deletebutton = document.querySelectorAll(".deletebutton");

const handleDelete = async (event) => {
  const li = event.srcElement.parentNode;
  const {
    dataset: { id: commentId },
  } = li;
  li.remove();
  const response = await fetch(`/api/comments/${commentId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  const fakeComments = document.createElement("li");
  fakeComments.dataset.id = id;
  fakeComments.className = "video__comment";
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = ` ${text}`;
  const span2 = document.createElement("span");
  span2.innerText = "❌";
  fakeComments.appendChild(icon); //i 태그 안에 있는 icon
  fakeComments.appendChild(span); //span 안에 들어있는 댓글 내용
  fakeComments.appendChild(span2);
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
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  if (response.status === 201) {
    textarea.value = "";
    const { fakeCommentId } = await response.json();
    addComment(text, fakeCommentId);
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}

if (deletebutton) {
  deletebutton.forEach((deletebutton) =>
    deletebutton.addEventListener("click", handleDelete)
  );
}
