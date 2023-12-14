import {
    addRegistration
} from "./listeners.js";

export const renderRegistr = () => {
    const appElement = document.getElementById('app');
    const registrHtml = `
<h1>Страница регестрации</h1>
    <div class="form">
        <h3 class="form-title">Форма регестрации</h3>
        <div class="form-row">
            <input type text="" id="login-input" class="input" placeholder="Логин" />
            <input type text="" id="password-input" class="input" placeholder="Пароль" />
        </div>
        <br />
        <button class="button" id="registr-button">Зарегестрироваться</button>
        <a href="index.html" id="link-to-comments">Перейти не страницу комментариев</a>
    </div>`
    appElement.innerHTML = registrHtml;
    addRegistration();
}