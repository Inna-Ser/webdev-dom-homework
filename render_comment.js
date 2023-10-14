import {
    answerCommentListener,
    delLastComment,
    editComment
} from "./service_comment.js"

import {
    initEventListener
} from "./service_likes.js"

const commentsListElements = document.getElementById("comments");

export function renderCommentsList(commentsListData) {
    const commentsListHTML = commentsListData.map((com, index) => {
            return `<li class="comment" id="comment" data-index="${index}">
        <div class="comment-header" >
          <div>${com.name}</div>
          <div class="date" date-index="${index}">${com.date}</div>
        </div>
        <div class="${com.isEdit ? 'comment-body -edit' : 'comment-body'}" data-index="${index}>
          <div class="comment-text">
            ${com.comment}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${com.like}</span>
            <button class="${com.isLike ? 'like-button -active-like ' : 'like-button'}" data-index="${index}"></button>
          </div>
        </div>
        <div class="edit-button">
          <button class="add-form-button -edit" id="edit-form-button">Редактировать</button>
          <div/>
      </li>`
        })
        .join("");
    commentsListElements.innerHTML = commentsListHTML;
    initEventListener(commentsListData);
    answerCommentListener();
    delLastComment(commentsListData);
    editComment();
    // addByKey();
};