export function getTodos() {
    return fetch('https://wedev-api.sky.pro/api/v1/inna-serebriakova/comments', {
            method: "GET",
        })
        .then((response) => {
            return response.json()
        })
}

export function postTodo(addFormTextElement, addFormNameElement) {
    return fetch('https://wedev-api.sky.pro/api/v1/inna-serebriakova/comments', {
        method: "POST",
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