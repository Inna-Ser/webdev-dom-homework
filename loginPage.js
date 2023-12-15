import {
    inputLogin
} from "./listeners.js";


export const renderLogin = () => {
    // trye - login, false - registr
    let loginMod = true;
    renderMod();

    function renderMod() {
        const appElement = document.getElementById('app');
        const loginHtml =
            `<div class="form">
            <h3 class="form-title">Форма ${loginMod ? "входа": "регистрации"}</h3>
            <div class="form-row">
            ${!loginMod ? '<input type text="" id="name-input" class="input" placeholder="Имя" />': ""}
                <input type text="" id="login-input" class="input" placeholder="Логин" />
                <input type text="" id="password-input" class="input" placeholder="Пароль" />
            </div>
            <div class="form-footer">
            <button class="add-form-button -enter" id="login-button">${loginMod ? "Войти": "Зарегестрироваться"}</button>
            <a href="index.html" class="link" id="registr-button">${!loginMod ? "Войти": "Зарегестрироваться"}</a>
            </div>`

        appElement.innerHTML = loginHtml;
        const authorizationElement = document.getElementById("login-button");
        const registrationElemeht = document.getElementById("registr-button");
        registrationElemeht.addEventListener("click", (event) => {
            event.preventDefault();
            loginMod = !loginMod;
            renderMod();

        })
        authorizationElement.addEventListener("click", () => {
            loginMod = !loginMod;
            renderMod();

        })
        inputLogin();
    }

};