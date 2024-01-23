import {
    addRegistration,
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
            ${!loginMod ? '<input type="text" id="name-input" class="input" placeholder="Имя" />': ""}
                <input type="text" id="login-input" class="input" placeholder="Логин" />
                <input type="password" id="password-input" class="input" placeholder="Пароль" autocomplete/>
            </div>
            <div class="form-footer">
            <button class="add-form-button -enter" id="reqest-button">${loginMod ? "Войти": "Зарегестрироваться"}</button>
            <button class="link" id="change-button">${!loginMod ? "Войти": "Зарегестрироваться"}</button>
            </div>`

        appElement.innerHTML = loginHtml;
        const reqestElement = document.getElementById("reqest-button");
        const changeElemeht = document.getElementById("change-button");
        changeElemeht.addEventListener("click", (event) => {
            event.preventDefault();
            loginMod = !loginMod;
            renderMod();
        })
        reqestElement.addEventListener("click", () => {
            if (loginMod === true) {
                inputLogin();
            } else {
                addRegistration();
            }
        })
    }
};