import {
    renderCommentsList
} from "./render_comment.js"

import {
    addAnswerComment,
    deletLastComment
} from "./listeners.js"

export function answerCommentListener() {
    addAnswerComment()
}

export function delLastComment() {
    deletLastComment()
}

export function editComment() { /*этот метод не работает, пока не могу разобраться*/
    const editCommentsButton = document.querySelectorAll(".edit-button");
    const commentsElement = document.querySelectorAll(".comment");
    for (const editCommentButton of editCommentsButton) {
        editCommentButton.addEventListener("click", (e) => {
            e.stopPropagation();
            const boxTextComment = document.querySelectorAll(".comment-body");
            const index = boxTextComment.dataset.index;
            const addFormTextElement = document.getElementById("add-form-text");
            const addFormNameElement = document.getElementById("add-form-name");

            if (commentsListData[index].isEdit === false) {
                commentsListData[index].isEdit = true;
                boxTextComment[index].innerHTML = `<textarea type="textarea" class="add-form-text" id="add-form-text" rows="4"
      aria-valuetext="">${commentsListData[index].comment}</textarea>`;
            } else {
                commentsListData[index].isEdit = false;
                boxTextComment[index].innerHTML = `<div class="${com.isEdit ? 'comment-body -edit' : 'comment-body'}" data-index="${index}>
          <div class="comment-text">
            ${com[index].comment}
          </div>`
            }
            renderCommentsList(commentsListData);
        })
    }
}

/* const addByKey = () => {
   addForm.addEventListener("keyup", (event) => {
     console.log(event.code);
     if (event.code === "Enter") {
       doFetchPostComment();
     };
     console.log(`sjhfroue`);
   });
 }*/