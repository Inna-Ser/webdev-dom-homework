import {
    login,
} from "./api.js";
import {
    commentsListData,
    addFormButtonElement,
    doFetchPostComment,
    doFetchGetCommentList,
} from "./main.js";
import {
    renderCommentsList
} from "./render_comment.js";

export function addTextComment() {
    const addFormTextElement = document.getElementById("add-form-text");
    const addFormButtonElement = document.getElementById("add-form-button");
    addFormTextElement.addEventListener("input", () => {
        if (addFormTextElement.value === "") {
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
        addFormTextElement.style.backgroundColor = "#bcec30";
        addFormNameElement.style.backgroundColor = "";
        doFetchPostComment();
    })
}

export function addAnswerComment() {
    const commentsElement = document.querySelectorAll(".comment");
    const addFormTextElement = document.getElementById("add-form-text");
    for (const commentElement of commentsElement) {
        commentElement.addEventListener("click", () => {
            const index = commentElement.dataset.index;
            console.log(addFormTextElement);
            addFormTextElement.value = `QUOTE_BEGIN ${commentsListData[index].name}: 
    ${commentsListData[index].comment} QUOTE_END`;
        })
    }
    addFormTextElement.value = ""
}

export function deletLastComment() {
    const delCommentButton = document.getElementById("del-form-button");
    delCommentButton.addEventListener("click", () => {
        commentsListData.pop();
        renderCommentsList(commentsListData);
    });
}

export function inputLogin() {
    const buttonElement = document.getElementById("login-button");
    const loginInputElement = document.getElementById("login-input");
    const passwordInputElement = document.getElementById("password-input");
    buttonElement.addEventListener("click", () => {
        login({
            login: loginInputElement.value,
            password: passwordInputElement.value,
        }).then(() => {
            doFetchGetCommentList()
        })
    });
}

export function addRegistration() {
    const registrButtonElement = document.getElementById("registr-button");
    const loginRegistrInputElement = document.getElementById("registr__login-input");
    const passwordRegistrInputElement = document.getElementById("registr__password-input");
    registrButtonElement.addEventListener("click", () => {
        login({
            login: loginRegistrInputElement.value,
            password: passwordRegistrInputElement.value,
        }).then(() => {
            doFetchGetCommentList()
        })
    });
}