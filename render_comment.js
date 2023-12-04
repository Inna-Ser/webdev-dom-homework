import {
  answerCommentListener,
  delLastComment,
  editComment
} from "./service_comment.js"

import {
  initEventListener
} from "./service_likes.js"

import {
  postTodo
} from "./api.js"

import {
  addFormButtonElement,
  doFetchPostComment
} from "./main.js"
import {
  pullComment
} from "./listeners.js";

const commentsListElements = document.getElementById("comments");

export function renderCommentsList(commentsListData) {
  const appElement = document.getElementById('app');

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
          <div class="comment-footer">
          <div class="likes">
          <span class="likes-counter">${com.like}</span>
          <button class="${com.isLike ? 'like-button -active-like ' : 'like-button'}" data-index="${index}"></button>
      </div>
            <div class="edit-button">
              <button class="add-form-button -edit" id="edit-form-button">Редактировать</button>
            <div/>
            
          
        </div>
        </div>
        
        
      </li>`
    })
    .join("");

  const appHtml =
    `<div class="mask">
        <div class="loader">Подождите, пожалуйста, комментарии загружаются</div>
      </div>
      <div class="container">
        <ul class="comments" id="comments">
          ${commentsListHTML}
        </ul>
        <div class="mask-comment">
          <div class="loader-comment">Комментарий загружается...</div>
        </div>
        <div class="add-form">
          <input type="text" class="add-form-name" id="add-form-name" placeholder="Введите ваше имя" value="" />
          <textarea type="textarea" class="add-form-text" id="add-form-text" placeholder="Введите ваш коментарий" rows="4"
            aria-valuetext=""></textarea>
          <div class="add-form-row">
            <button class="add-form-button" id="add-form-button">Написать</button>
          </div>
        </div>
        <div class="add-form-row">
          <button class="add-form-button delete" id="del-form-button">Удалить последний комментарий</button>
        </div>
        <div class="login-alert">Чтобы добавить комментарий, 
        <a id="authorization" href="#">авторизуйтесь</a>
        </div>

      </div>`;
  appElement.innerHTML = appHtml;
  initEventListener(commentsListData);
  // answerCommentListener();
  // delLastComment(commentsListData);
  // addTextComment();

  // addNameComment();
  // editComment();
  // addByKey();

  const addFormTextElement = document.getElementById("add-form-text");
  const likesCounterElement = document.querySelectorAll(".likes-counter");
  const addLoaderComment = document.querySelector(".mask-comment");

  pullComment();

};

// pullComment();