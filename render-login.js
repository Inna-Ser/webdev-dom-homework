  export const renderLogin = () => {
      
      const appElement = document.getElementById('app');
      const loginHtml =
          `<h1>Страница входа</h1>
      <div class="form">
          <h3 class="form-title">Форма входа</h3>
          <div class="form-row">
              <input type="text" id="login-input" class="input" placeholder="Логин" />
              <input type="text" id="password-input" class="input" placeholder="Пароль" />
          </div>
          <br />
          <button class="button" id="login-button">Войти</button>
          <a href="index.html" id="link-to-comments">Перейти не страницу комментариев</a>
      </div>`;
      appElement.innerHTML = loginHtml;
      const buttonElement = document.getElementById("login-button");
      const loginInputElement = document.getElementById("login-input");
      const passwordInputElement = document.getElementById("password-input");
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
  };
  commentsListElements.innerHTML = commentsListHTML;
  initEventListener();
  answerCommentListener();
  delLastComment();
  editComment();
  // addByKey();
};