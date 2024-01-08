'use strict'

import {
    renderCommentsList
} from './render_comment.js'

import {
    deleteToDo,
    getTodos,
    postTodo
} from './api.js'

import {
    checkStatus500,
    checkStatus400,
    checkStatus201,
    todoException500,
    todoException400,
    checkIsInternet,
    checkStatus401,
} from './exceptions.js'
import {
    renderForm
} from './renderForm.js'

export const addFormNameElement = document.getElementById('add-form-name')
export const addFormButtonElement = document.getElementById('add-form-button')
export const addLoaderComment = document.querySelector('.mask-comment')

export let commentsListData = []

export let user = null
export function setUser(value) {
    user = value
}

export const doFetchGetCommentList = () => {
    const appHtml = document.getElementById('comments')
    appHtml.innerHTML = 'Подождите, пожалуйста, комментарии загружаются'
    return getTodos()
        .then((responseData) => {
            commentsListData = responseData.comments.map((comment) => {
                return {
                    id: comment.id,
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
            renderCommentsList(commentsListData)
        })
        .catch((error) => {
            todoException500(error)
        })
}


export const doFetchPostComment = () => {
    const addLoader = document.querySelector('.loader-comment')
    const addFormTextElement = document.getElementById('add-form-text')
    const addFormElement = document.querySelector('.add-form')
    addFormElement.style.display = "none"
    addLoader.textContent = "Комментарий загружается..."
    postTodo(addFormTextElement)
        .then((response) => {
            checkStatus400(response)
            checkStatus500(response)
            checkStatus201(response)
            checkStatus401(response)
        })
        .then(() => {
            doFetchGetCommentList()
            addFormTextElement.value = ""
            addFormTextElement.style.backgroundColor = "white"
        })
        .catch((error) => {
            todoException400(error)
            todoException500(error)
            checkIsInternet(window)
        })
        .finally(() => {
            addFormElement.style.display = "flex"
            addLoader.textContent = ""
        })
}
// doFetchPostComment()

export function doFetchDeleteComment() {
    deleteToDo(commentsListData.id)
}

// doFetchDeleteComment()

export function renderApp() {
    const containerApp = document.getElementById('app')
    containerApp.innerHTML = `<div class="container">
<ul class="comments" id="comments">
        </ul>
        <div class="footer-conteiner"></div>
        </div>`
    doFetchGetCommentList()
        .then(() => {
            renderForm()
        })
}
renderApp()

console.log('It works!')