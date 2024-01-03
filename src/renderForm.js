import { addAnswerComment, addCounterLikes, addTextComment, deletLastComment, editComment, pullComment } from "./listeners"
import { renderLogin } from "./loginPage"
import { commentsListData, user } from "./main"

export const renderForm = () => {
const conteinerFooter = document.querySelector(".footer-conteiner")
conteinerFooter.innerHTML = `
${
    user
        ? `<div class="loader-comment"></div>
        <div class="add-form">
  <input type="text" class="add-form-name" id="add-form-name" placeholder="Введите ваше имя" disabled value="${user?.name}" />
  <textarea type="textarea" class="add-form-text" id="add-form-text" placeholder="Введите ваш коментарий" rows="4"
    aria-valuetext=""></textarea>
  <div class="add-form-row">
    <button class="add-form-button" disabled id="add-form-button">Написать</button>
  </div>
</div>
<div class="add-form-row">
  <button class="add-form-button delete" id="del-form-button">Удалить последний комментарий</button>
</div>`
        : `<div class="login-alert">Чтобы добавить комментарий, 
<a id="authorization" href="#">авторизуйтесь</a>`
}`
const authorizationElement = document.getElementById('authorization')
    // const registrationElemeht = document.getElementById("registration");
    if (authorizationElement) {
        console.log(authorizationElement)
        authorizationElement.addEventListener('click', () => {
            renderLogin()
        })
    } else {
        pullComment()
        addCounterLikes(commentsListData)
        addAnswerComment()
        deletLastComment()
        addTextComment()
        editComment()
    }
}