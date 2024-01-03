'use strict'

import {
    renderCommentsList
} from './render_comment.js'

import {
    deleteComment,
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
    deletLastComment
} from './listeners.js'

export const addFormNameElement = document.getElementById('add-form-name')
export const addFormButtonElement = document.getElementById('add-form-button')
export const addLoaderComment = document.querySelector('.mask-comment')

export let commentsListData = []

export let user = null
export function setUser(value) {
    user = value
}

export const doFetchGetCommentList = () => {
    const appHtml = document.getElementById('app')
    appHtml.innerHTML = 'Подождите, пожалуйста, комментарии загружаются'
    getTodos()
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

doFetchGetCommentList()

export const doFetchPostComment = () => {
    const addFormButton = document.querySelector('.add-form-button')
    const addFormTextElement = document.getElementById('add-form-text')
    const addFormElement = document.querySelector('.add-form')
    addFormElement.innerHTML = 'Комментарий загружается...'
    addFormElement.disabled = true
    postTodo(addFormTextElement)
        .then((response) => {
            checkStatus400(response)
            checkStatus500(response)
            checkStatus201(response)
            checkStatus401(response)
        })
        .then(() => {
            doFetchGetCommentList()
            addFormButton.disabled = false
            addFormButton.textContent = 'Написать'
        })
        .catch((error) => {
            todoException400(error)
            todoException500(error)
            checkIsInternet(window)
        })
}
doFetchPostComment()

export const doFetchDeleteComment = () => {
    deleteComment(commentsListData.id)
}

doFetchDeleteComment()

console.log('It works!')