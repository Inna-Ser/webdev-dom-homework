import {
    commentsListData,
    addFormButtonElement,
    addFormNameElement,
} from "./main.js";

import {
    renderCommentsList
} from "./render_comment.js";

const delCommentButton = document.getElementById("del-form-button");
const addFormTextElement = document.getElementById("add-form-text");

export function addTextComment() {
    addFormTextElement.addEventListener("input", () => {
        if (addFormNameElement.value === "" || addFormTextElement.value === "") {
            addFormButtonElement.disabled = true;
        } else {
            addFormButtonElement.disabled = false;
        }
    })
}

export function addNameComment() {
    addFormNameElement.addEventListener("input", () => {
        if (addFormNameElement.value === "" || addFormTextElement.value === "") {
            addFormButtonElement.disabled = true;
        } else {
            addFormButtonElement.disabled = false;
        }
    })
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
}
addFormTextElement.value = ""

export function deletLastComment() {
    delCommentButton.addEventListener("click", () => {
        commentsListData.pop();
        renderCommentsList(commentsListData);
    });
}