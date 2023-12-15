import {
    addRegistration
} from "./listeners.js";

export const renderRegistr = () => {
    const appElement = document.getElementById('app');
    const registrHtml = `
    <div class="form">
        <h3 class="form-title">Форма регестрации</h3>
        <div class="form-row">
            <input type text="" id="login-input" class="input" placeholder="Логин" />
            <input type text="" id="password-input" class="input" placeholder="Пароль" />
        </div>
        <div class="form-footer">
        <button class="add-form-button -registr" id="registration">Зарегестрироваться</button>
        <a href="index.html" class="link" id="login-button">Войти</a>
        </div>
    </div>`
    appElement.innerHTML = registrHtml;
    addRegistration();
}