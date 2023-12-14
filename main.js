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
    todoException500,
    todoException400,
    checkIsInternet
} from "./exceptions.js";

import {
    pullComment
} from "./listeners.js";


export const addFormNameElement = document.getElementById("add-form-name");
export const addFormButtonElement = document.getElementById("add-form-button");
export const addLoaderComment = document.querySelector(".mask-comment");

export let commentsListData = [];

export let user = null;
export function setUser(value) {
    user = value;
}

export const doFetchGetCommentList = () => {
    const appHtml = document.getElementById("app");
    appHtml.innerHTML = "Подождите, пожалуйста, комментарии загружаются";
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
        .then(() => {
            renderCommentsList(commentsListData);
        })
        .catch((error) => {
            todoException500(error);
        })
}

doFetchGetCommentList();

export const doFetchPostComment = () => {
    const addFormHtml = document.querySelector(".add-form")
    const addFormTextElement = document.getElementById("add-form-text");
    addFormHtml.innerHTML = "Комментарий загружается...";
    postTodo(addFormTextElement)
        .then((response) => {
            checkStatus400(response)
            checkStatus500(response)
            checkStatus201(response)
            checkStatus401(response)
        })
        .then(() => {
            doFetchGetCommentList()
            addFormNameElement.value = ""
            likesCounterElement.value = ""
        })
        .catch((error) => {
            todoException400(error)
            todoException500(error)
            checkIsInternet(window)
        })
        .then(() => {
            renderCommentsList(commentsListData);
            pullComment();
        })
}

console.log("It works!");