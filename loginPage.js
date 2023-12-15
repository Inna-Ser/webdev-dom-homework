import {
    inputLogin
} from "./listeners.js";


export const renderLogin = () => {

    const appElement = document.getElementById('app');
    const loginHtml =
        `<div class="form">
        ${user ? `<h3 class="form-title">Форма входа</h3>
        <div class="form-row">
            <input type text="" id="login-input" class="input" placeholder="Логин" />
            <input type text="" id="password-input" class="input" placeholder="Пароль" />
        </div>
        <div class="form-footer">
        <button class="add-form-button -enter" id="login-button">Войти</button>
        <a href="index.html" class="link" id="registr-button">Зарегестрироваться</a>`
}`
        </div>`
    
    appElement.innerHTML = loginHtml;
    const authorizationElement = document.getElementById("login-button");
    const registrationElemeht = document.getElementById("registr-button");
    if (!user) {
        authorizationElement.addEventListener("click", () => {
            renderRegistr();
        })
        registrationElemeht.addEventListener("click", () => {
            renderlogin();
            console.log(renderRegistr);
        })
    } else {
        pullComment();
        addCounterLikes(commentsListData);
        addAnswerComment();
        deletLastComment();
        addTextComment();
    }
    inputLogin();
};