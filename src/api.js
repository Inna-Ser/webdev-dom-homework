import {
    checkStatus401
} from './exceptions.js'
import {
    doFetchDeleteComment,
    setUser
} from './main.js'

export let token
export const setToken = (newToken) => {
    token = `Bearer ${newToken}`
}

const todosURL = 'https://wedev-api.sky.pro/api/v2/inna-serebriakova/comments'
const userURL = 'https://wedev-api.sky.pro/api/user/login'
const newUserURL = 'https://wedev-api.sky.pro/api/user'

export function getTodos() {
    return fetch(todosURL, {
        method: 'GET',
        headers: {
            Authorization: token,
        },
    }).then((response) => {
        console.log(response)
        return checkStatus401(response)
    })
}

export function postTodo(addFormTextElement) {
    return fetch(todosURL, {
        method: 'POST',
        headers: {
            Authorization: token,
        },
        body: JSON.stringify({
            text: addFormTextElement.value
                .replaceAll('<', '&lt;')
                .replaceAll('>', '&gt;')
                .replaceAll('&', '&amp;')
                .replaceAll('"', '&quot;')
                .replaceAll(
                    'QUOTE_BEGIN',
                    "<div class='quote' white-space: pre-line>",
                )
                .replaceAll('QUOTE_END', '</div>'),
            // name: addFormNameElement.value
            //     .replaceAll("<", "&lt;")
            //     .replaceAll(">", "&gt;")
            //     .replaceAll("&", "&amp;")
            //     .replaceAll('"', "&quot;"),
            forceError: false,
        }),
    })
}

export function login({
    login,
    password
}) {
    return fetch(userURL, {
            method: 'POST',
            body: JSON.stringify({
                login,
                password,
            }),
        })
        .then((response) => {
            return response.json()
        })
        .then((response) => {
            console.log(response)
            setUser(response.user)
            setToken(response.user.token)
        })
}

export function registration({
    name,
    login,
    password
}) {
    return fetch(newUserURL, {
            method: 'POST',
            body: JSON.stringify({
                name,
                login,
                password,
            }),
        })
        .then((response) => {
            return response.json()
        })
        .then((response) => {
            setUser(response.user)
            setToken(response.user.token)
        })
}

export function deleteComment() {
    return fetch(todosURL, {
        method: 'DELETE',
        headers: {
            Authorization: token,
        },
    }).then(() => {
        doFetchDeleteComment()
    })
}