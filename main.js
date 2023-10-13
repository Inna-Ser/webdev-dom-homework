"use strict";

import {
    getTodos,
    postTodo
} from "./api.js";
import {
    getCurrentDate
} from "./service_date.js";
import {
    answerCommentListener,
    delLastComment,
    editComment
} from "./service_comment.js";
import {
    initEventListener
} from "./service_likes.js";
import {
    checkStatus500,
    todoException500
} from "./exception.js";

const addFormButtonElement = document.getElementById("add-form-button");
const addFormTextElement = document.getElementById("add-form-text");
const addFormNameElement = document.getElementById("add-form-name");
const commentsListElements = document.getElementById("comments");
const likesCounterElement = document.querySelectorAll(".likes-counter");
const addLoader = document.querySelector(".mask");
const addLoaderComment = document.querySelector(".mask-comment");

let commentsListData = [];

addLoaderComment.style.display = 'none';
addLoader.style.display = 'block';

const doFetchGetCommentList = () => {
    getTodos().then((responseData) => {
            commentsListData = responseData.comments.map((comment) => {
                comment.date = getCurrentDate(comment.date);
                return {
                    name: comment.author.name,
                    date: comment.date,
                    comment: comment.text,
                    like: comment.likes,
                    isLike: false,
                    isLikeLoading: false,
                    forceError: false,
                }
            })
        })
        .then(() => {
            checkStatus500(error);
        })
        .finally((response) => {
            addLoaderComment.style.display = 'none';
            addLoader.style.display = 'none';
            renderCommentsList();
        })
        .catch(() => {
            todoException500(error);
        })
}

doFetchGetCommentList();

export function renderCommentsList() {
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
    initEventListener(likesCounterElement, commentsListData);
    answerCommentListener();
    delLastComment(commentsListData);
    editComment();
    // addByKey();
};

const pullComment = () => {
    addFormTextElement.addEventListener("input", () => {
        if (addFormNameElement.value === "" || addFormTextElement.value === "") {
            addFormButtonElement.disabled = true;
        } else {
            addFormButtonElement.disabled = false;
        }
    })
    addFormButtonElement.addEventListener("click", () => {
        addFormButtonElement.style.backgroundColor = "#bcec30";
        addFormNameElement.style.backgroundColor = "";
        doFetchGetCommentList.disabled = true;

        addLoaderComment.style.display = 'block';

        const doFetchPostComment = () => {
            postTodo(addFormTextElement, addFormNameElement)
                .then((response) => {
                    if (response.status === 400) {
                        throw new Error('Неверный запрос')
                    }
                    if (response.status === 500) {
                        throw new Error('Ошибка сервера');
                    }
                    if (response.status === 201) {
                        return response.json();
                    }
                })
                .then((response) => {
                    doFetchGetCommentList()
                    addFormNameElement.value = ""
                    addFormTextElement.value = ""
                    likesCounterElement.value = ""
                })
                .catch((error) => {
                    if (error.message === 'Неверный запрос') {
                        alert('Короткое имя или текст комментария, минимум 3 символа')
                    }
                    if (error.message === 'Неверный запрос') {
                        alert('Короткое имя или текст комментария, минимум 3 символа')
                    } else {
                        alert('Проблема с интернетом, проверьте подключение')
                    }
                })
                .finally(() => {
                    addLoaderComment.style.display = 'none';
                })
                .then(() => {
                    renderCommentsList();
                })
        }
        doFetchPostComment();
    })
}

pullComment();
renderCommentsList();

console.log("It works!");