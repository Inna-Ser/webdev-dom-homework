import {
  user
} from './main.js'
import {
  pullComment,
  deletLastComment,
  addAnswerComment,
  addTextComment,
  addCounterLikes,
  editComment,
} from './listeners.js'
import {
  renderLogin
} from './loginPage.js'
import {
  format
} from 'date-fns'
export function renderCommentsList(commentsListData) {
  console.log(commentsListData)
  console.log(document.getElementById('app'))
  const appElement = document.getElementById('app')
  // const country = "ru";
  console.log('start')
  const commentsListHTML = commentsListData
    .map((com, index) => {
      console.log(com)
      return `<li class="comment" id="comment" data-index="${index}" data-id="${
                com.id
            }">
        <div class="comment-header" >
          <div>${com.name}</div>
          <div class="date" date-index="${index}">${format(
              new Date(com.date),
              'yyyy-MM-dd hh/mm/ss',
          )}</div>
        </div>
        <div class="${
            com.isEdit ? 'comment-body -edit' : 'comment-body'
        }" data-index="${index}">
          <div class="comment-text">
            ${com.comment}
          </div>
          <div class="comment-footer">
          <div class="likes">
          <span class="likes-counter">${com.like}</span>
          <button class="${
              com.isLike ? 'like-button -active-like ' : 'like-button'
          }" data-index="${index}"></button>
      </div>
            <div class="edit-button">
              <button class="add-form-button -edit" id="edit-form-button">Редактировать</button>
            <div/>
        </div>
        </div>
      </li>`
    })
    .join('')
  console.log(commentsListHTML)

  const appHtml = `<div class="container">
        <ul class="comments" id="comments">
          ${commentsListHTML}
        </ul>
        ${
            user
                ? `<div class="add-form">
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
        <a id="authorization" href="#">авторизуйтесь</a> 
        </div>`
        }
      </div>`
  appElement.innerHTML = appHtml
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

  // answerCommentListener();
  // delLastComment(commentsListData);
  // addTextComment();

  // addNameComment();
  // editComment();
  // addByKey();

}

// pullComment();