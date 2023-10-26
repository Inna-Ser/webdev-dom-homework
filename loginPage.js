import {
    login,
    setToken
} from "./api.js";

import {
    doFetchGetCommentList
} from "./main.js";

const buttonElement = document.getElementById("login-button");
const loginInputElement = document.getElementById("login-input");
const passwordInputElement = document.getElementById("password-input");

export const renderLogin = ({
    doFetchGetCommentList
}) => {

    const appElement = document.getElementById('app');
    const loginHtml =
        `<h1>Страница входа</h1>
    <div class="form">
        <h3 class="form-title">Форма входа</h3>
        <div class="form-row">
            <input type text="" id="login-input" class="input" placeholder="Логин" />
            <input type text="" id="password-input" class="input" placeholder="Пароль" />
        </div>
        <br />
        <button class="button" id="login-button">Войти</button>
        <a href="index.html" id="link-to-comments">Перейти не страницу комментариев</a>
    </div>`;
    appElement.innerHTML = loginHtml;
};

renderLogin({
    doFetchGetCommentList
});

buttonElement.addEventListener("click", () => {
    renderLogin({
        login: loginInputElement.value,
        password: passwordInputElement.value,
    }).then((responseData) => {
        setToken(responseData.user.token);
    }).then(() => {
        doFetchGetCommentList()
    })
});