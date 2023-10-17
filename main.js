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
    addNameComment
} from "./listeners.js";

import {
    renderLogin
} from "./loginPage.js";

export const addFormNameElement = document.getElementById("add-form-name");
export const addFormButtonElement = document.getElementById("add-form-button");
const addLoader = document.querySelector(".mask");


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
            // checkStatus401(response);
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

// doFetchGetCommentList();
renderLogin({doFetchGetCommentList});

addTextComment();

addNameComment();



console.log("It works!");