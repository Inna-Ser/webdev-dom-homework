
export let password = prompt("Ввести пароль");

const host = "https://wedev-api.sky.pro/api/v2/inna-serebriakova/comments";

export function getTodos() {
    return fetch(host, {
            method: "GET",
            headers: {
                Authorization: password,
            },
        })
        .then((response) => {
            return response.json()
        })
}


export function postTodo(addFormTextElement, addFormNameElement) {
    return fetch(host, {
        method: "POST", 
        headers: {
            Authorization: password,
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
            forceError: true
        })

    })
}