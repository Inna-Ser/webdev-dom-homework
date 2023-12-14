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
  doFetchPostComment,
  user
} from "./main.js"
import {
  pullComment,
  deletLastComment,
  addAnswerComment,
  addTextComment
} from "./listeners.js";
import {
  renderLogin
} from "./loginPage.js";
import {
  renderRegistr
} from "./registrPage.js";

const commentsListElements = document.getElementById("comments");

export function renderCommentsList(commentsListData) {
  const appElement = document.getElementById('app');

  const commentsListHTML = commentsListData.map((com, index) => {
      return `<li class="comment" id="comment" data-index="${index}">
        <div class="comment-header" >
          <div>${com.name}</div>
          <div class="date" date-index="${index}">${com.date}</div>
        </div>
        <div class="${com.isEdit ? 'comment-body -edit' : 'comment-body'}" data-index="${index}">
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
    `<div class="container">
        <ul class="comments" id="comments">
          ${commentsListHTML}
        </ul>
        ${user ? `<div class="add-form">
          <input type="text" class="add-form-name" id="add-form-name" placeholder="Введите ваше имя" disabled value="${user?.name}" />
          <textarea type="textarea" class="add-form-text" id="add-form-text" placeholder="Введите ваш коментарий" rows="4"
            aria-valuetext=""></textarea>
          <div class="add-form-row">
            <button class="add-form-button" disabled id="add-form-button">Написать</button>
          </div>
        </div>
        <div class="add-form-row">
          <button class="add-form-button delete" id="del-form-button">Удалить последний комментарий</button>
        </div>`: `<div class="login-alert">Чтобы добавить комментарий, 
        <a id="authorization" href="#">авторизуйтесь</a> или <a id="registration" href="#">зарегестрируйтесь</a>
        </div>`
        }
      </div>`;
  appElement.innerHTML = appHtml;
  const authorizationElement = document.getElementById("authorization");
  const registrationElemeht = document.getElementById("registr-button");

  if (authorizationElement) {
    authorizationElement.addEventListener("click", () => {
      renderLogin();
    })

  } else if (registrationElemeht) {
    registrationElemeht.addEventListener("click", () => {
      renderRegistr();
      console.log(renderRegistr);
    })
  } else {
    pullComment();
    initEventListener(commentsListData);
    addAnswerComment();
    deletLastComment();
    addTextComment();
  }

  // answerCommentListener();
  // delLastComment(commentsListData);
  // addTextComment();

  // addNameComment();
  // editComment();
  // addByKey();

  const addFormTextElement = document.getElementById("add-form-text");
  const likesCounterElement = document.querySelectorAll(".likes-counter");
  const addLoaderComment = document.querySelector(".mask-comment");

};

// pullComment();