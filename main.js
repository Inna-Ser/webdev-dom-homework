"use strict";

import {
    renderCommentsList
} from "./render_comment.js"

import {
    getTodos,
    postTodo
} from "./api.js";

import {
    getCurrentDate
} from "./service_date.js";

import {
    checkStatus500,
    checkStatus400,
    checkStatus201,
    checkIsInternet,
    todoException500,
    todoException400,
    todoExceptionNotInternet,
    checkStatus401
} from "./exceptions.js";

import {
    addComment
} from "./listeners.js";

export const addFormButtonElement = document.getElementById("add-form-button");
const addFormTextElement = document.getElementById("add-form-text");
export const addFormNameElement = document.getElementById("add-form-name");
const likesCounterElement = document.querySelectorAll(".likes-counter");
const addLoader = document.querySelector(".mask");
const addLoaderComment = document.querySelector(".mask-comment");

export let commentsListData = [];

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
                    forceError: true,
                }
            })
        })
        .then((response) => {
            checkStatus500(response);
            checkStatus401(response);
        })
        .finally(() => {
            addLoaderComment.style.display = 'none';
            addLoader.style.display = 'none';
            renderCommentsList(commentsListData);
        })
        .catch((error) => {
            todoException500(error);
        })
}

doFetchGetCommentList();

const pullComment = () => {
    addComment();
    addFormButtonElement.addEventListener("click", () => {
        addFormButtonElement.style.backgroundColor = "#bcec30";
        addFormNameElement.style.backgroundColor = "";
        doFetchGetCommentList.disabled = true;

        addLoaderComment.style.display = 'block';

        const doFetchPostComment = () => {
            postTodo(addFormTextElement, addFormNameElement)
                .then((response) => {
                    checkStatus400(response)
                    checkStatus500(response)
                    checkStatus201(response)
                    checkStatus401(response)
                    checkIsInternet(response)
                })
                .then(() => {
                    doFetchGetCommentList()
                    addFormNameElement.value = ""
                    addFormTextElement.value = ""
                    likesCounterElement.value = ""
                })
                .catch((error) => {
                    todoException400(error)
                    todoException500(error)
                    todoExceptionNotInternet(error)
                })
                .finally(() => {
                    addLoaderComment.style.display = 'none';
                })
                .then(() => {
                    renderCommentsList(commentsListData);
                })
        }
        doFetchPostComment();
    })
}

pullComment();
renderCommentsList(commentsListData);

console.log("It works!");