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
    addTextComment,
    addNameComment,
    pullComment
} from "./listeners.js";

import {
    renderLogin
} from "./loginPage.js";

export const addFormNameElement = document.getElementById("add-form-name");
export const addFormButtonElement = document.getElementById("add-form-button");
const addFormTextElement = document.getElementById("add-form-text");

const addLoader = document.querySelector(".mask");
export const addLoaderComment = document.querySelector(".mask-comment");



export let commentsListData = [];

// addLoaderComment.style.display = 'none';
// addLoader.style.display = 'block';

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
    // .finally(() => {
    //     // addLoaderComment.style.display = 'none';
    //     // addLoader.style.display = 'none';
    //     console.log(commentsListData);
    //     renderCommentsList(commentsListData);
    // })
    // .catch((error) => {
    //     todoException500(error);
    // })
}


doFetchGetCommentList();
// renderLogin({
//     doFetchGetCommentList
// });

export const doFetchPostComment = () => {
    postTodo(addFormTextElement, addFormNameElement)
        .then((response) => {
            checkStatus400(response)
            checkStatus500(response)
            checkStatus201(response)
            // checkStatus401(response)

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
            checkIsInternet(window)
        })
        .finally(() => {
            addLoaderComment.style.display = 'none';
        })
        .then(() => {
            renderCommentsList(commentsListData);
        })
}







console.log("It works!");