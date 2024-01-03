import {
  format
} from 'date-fns'
export function renderCommentsList(commentsListData) {
  const appElement = document.getElementById('comments')
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
              'yyyy-MM-dd hh:mm:ss',
          )}</div>
        </div>
        <div class="${
            com.isEdit ? 'comment-body -edit' : 'comment-body'
        }" data-index="${index}">
          ${com.isEdit ? `<textarea type="textarea" class="add-form-text" id="add-form-text" rows="4"
          aria-valuetext="">${com.comment}</textarea>`: `<div class="comment-text">
            ${com.comment}
          </div>`}
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

  appElement.innerHTML = commentsListHTML

  // answerCommentListener();
  // delLastComment(commentsListData);
  // addTextComment();

  // addNameComment();
  // editComment();
  // addByKey();
}

// pullComment();