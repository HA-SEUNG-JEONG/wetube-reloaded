const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const comments = document.querySelectorAll(".video__comment");

const handleDelete = async (event) => {
  event.preventDefault();
  const comment = event.path[2];
  const commentId = comment.dataset.id;
  const response = await fetch(`/api/comment/${commentId}/delete`, {
    method: "DELETE",
  });
  comment.remove();
};

const handleEdit = async (event) => {
  event.preventDefault();
  const comment = event.path[2];
  const commentId = comment.dataset.id;
  const icon = comment.childNodes[0];
  const span = comment.childNodes[1];
  const change = comment.lastChild;
  const text = span.innerText;

  const textarea = document.createElement("input");
  const submitBtn = document.createElement("button");
  const cancelBtn = document.createElement("button");

  textarea.value = text;

  submitBtn.innerText = "Edit";
  cancelBtn.innerText = "Cancel";

  comment.appendChild(textarea);
  comment.appendChild(submitBtn);
  comment.appendChild(cancelBtn);

  const commentInit = () => {
    textarea.remove();
    submitBtn.remove();
    cancelBtn.remove();

    icon.style.removeProperty("display");
    change.style.removeProperty("display");
    span.style.removeProperty("display");
  };

  cancelBtn.onclick = () => {
    commentInit();
    return;
  };

  submitBtn.onclick = async (event) => {
    event.preventDefault();
    span.innerText = textarea.value;
    commentInit();

    await fetch(`/api/comment/${commentId}/edit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: textarea.value,
      }),
    });
  };
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
  const div = document.createElement("div");
  div.className = "comment__change";
  const span2 = document.createElement("span");
  span2.innerText = "삭제";
  span2.className = "comment__delete";
  const span3 = document.createElement("span");
  span3.innerText = "편집";
  span3.className = "comment__edit";
  fakeComments.appendChild(icon); //i 태그 안에 있는 icon
  fakeComments.appendChild(span); //span 안에 들어있는 댓글 내용
  fakeComments.appendChild(div);
  div.appendChild(span2);
  div.appendChild(span3);
  // console.log("fakecomments:", fakeComments); //li 태그 안에 icon과 span 내 내용이 들어감
  videoComments.prepend(fakeComments); //prepend를 쓰면 최신 댓글이 맨 위로 올라옴

  span2.addEventListener("click", handleDelete);
  span3.addEventListener("click", handleEdit);
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

if (comments) {
  for (const commentIndex of comments) {
    const deleteBtn = commentIndex.querySelector("#delete");
    const editBtn = commentIndex.querySelector("#edit");
    deleteBtn.addEventListener("click", handleDelete);
    editBtn.addEventListener("click", handleEdit);
  }
}
