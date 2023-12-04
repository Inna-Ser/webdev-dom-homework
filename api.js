import {
    checkStatus401
} from "./exceptions.js";

export let token;

export const setToken = (newToken) => {
    token = newToken;
};

const todosURL = "https://wedev-api.sky.pro/api/v2/inna-serebriakova/comments";
const userURL = "https://wedev-api.sky.pro/api/user";


export function getTodos() {
    return fetch(todosURL, {
            method: "GET",
            headers: {
                Authorization: token,
            },
        })
        .then((response) => {
            console.log(response);
            return checkStatus401(response)
        })
        // .then((response) => {
        //     console.log(response);
        //     return response.json()
        // });
}

export function postTodo(addFormTextElement, addFormNameElement) {
    return fetch(todosURL, {
        method: "POST",
        headers: {
            Authorization: token,
        },
        body: JSON.stringify({
            text: addFormTextElement.value
                .replaceAll("<", "&lt;")
                .replaceAll(">", "&gt;")
                .replaceAll("&", "&amp;")
                .replaceAll('"', "&quot;")
                .replaceAll("QUOTE_BEGIN", "<div class='quote' white-space: pre-line>")
                .replaceAll("QUOTE_END", "</div>"),
            name: addFormNameElement.value
                .replaceAll("<", "&lt;")
                .replaceAll(">", "&gt;")
                .replaceAll("&", "&amp;")
                .replaceAll('"', "&quot;"),
            forceError: false
        })
    })
}

export function login(login, password) {
    return fetch(userURL, {
        method: "POST",
        body: JSON.stringify({
            login,
            password
        })
    })
}