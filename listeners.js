import {
    postTodo
} from "./api.js";
import {
    commentsListData,
    addFormButtonElement,
    addFormNameElement,
    doFetchPostComment,
    doFetchGetCommentList,
    addLoaderComment
} from "./main.js";

import {
    renderCommentsList
} from "./render_comment.js";

const delCommentButton = document.getElementById("del-form-button");
// const addFormTextElement = document.getElementById("add-form-text");

export function addTextComment() {
    const addFormTextElement = document.getElementById("add-form-text");

    addFormTextElement.addEventListener("input", () => {
        if (addFormNameElement.value === "" || addFormTextElement.value === "") {
            addFormButtonElement.disabled = true;
        } else {
            addFormButtonElement.disabled = false;
        }
    })
}

export function addNameComment() {
    const addFormNameElement = document.getElementById("add-form-name");

    addFormNameElement.addEventListener("input", () => {
        if (addFormNameElement.value === "" || addFormTextElement.value === "") {
            addFormButtonElement.disabled = true;
        } else {
            addFormButtonElement.disabled = false;
        }
    })
}

export function pullComment() {
    const addFormButtonElement = document.getElementById("add-form-button");
    const addFormNameElement = document.getElementById("add-form-name");
    const addFormTextElement = document.getElementById("add-form-text")
    addFormButtonElement.addEventListener("click", () => {
        postTodo(addFormTextElement.value, addFormNameElement.value)
        addFormTextElement.style.backgroundColor = "#bcec30";
        addFormNameElement.style.backgroundColor = "";
        // doFetchGetCommentList.disabled = true;

        // addLoaderComment.style.display = 'block';

        doFetchPostComment();
    })
    // renderCommentsList(commentsListData);
}

export function addAnswerComment() {
    const commentsElement = document.querySelectorAll(".comment");
    for (const commentElement of commentsElement) {
        commentElement.addEventListener("click", () => {
            const index = commentElement.dataset.index;
            const addFormTextElement = document.getElementById("add-form-text");
            addFormTextElement.value = `QUOTE_BEGIN ${commentsListData[index].name}: 
    ${commentsListData[index].comment} QUOTE_END`;
            renderCommentsList(commentsListData);
        })
    }
    addFormTextElement.value = ""

}

export function deletLastComment() {
    delCommentButton.addEventListener("click", () => {
        commentsListData.pop();
        renderCommentsList(commentsListData);
    });
}