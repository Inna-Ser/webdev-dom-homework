import {
    login,
    registration
} from './api.js'
import {
    commentsListData,
    addFormButtonElement,
    doFetchPostComment,
    doFetchGetCommentList,
    doFetchDeleteComment,
    renderApp,
} from './main.js'
import {
    renderCommentsList
} from './render_comment.js'

export function addTextComment() {
    const addFormTextElement = document.getElementById('add-form-text')
    const addFormButtonElement = document.getElementById('add-form-button')
    addFormTextElement.addEventListener('input', () => {
        if (addFormTextElement.value === '') {
            addFormButtonElement.disabled = true
        } else {
            addFormButtonElement.disabled = false
        }
    })
}

export function addNameComment() {
    const addFormNameElement = document.getElementById('add-form-name')
    addFormNameElement.addEventListener('input', () => {
        if (
            addFormNameElement.value === ''
            // addFormTextElement.value === ''
        ) {
            addFormButtonElement.disabled = true
        } else {
            addFormButtonElement.disabled = false
        }
    })
}

export function pullComment() {
    const addFormButtonElement = document.getElementById('add-form-button')
    const addFormNameElement = document.getElementById('add-form-name')
    const addFormTextElement = document.getElementById('add-form-text')
    addFormButtonElement.addEventListener('click', () => {
        addFormTextElement.style.backgroundColor = '#bcec30'
        addFormNameElement.style.backgroundColor = ''
        doFetchPostComment()
    })
}

export function deletLastComment() {
    const delCommentButton = document.getElementById('del-form-button')
    delCommentButton.addEventListener('click', () => {
        commentsListData.pop()
        renderCommentsList(commentsListData)
    })
}

export function deleteComment() {
    const delCommentButton = document.querySelectorAll('.del-button')
    for (const delComButton of delCommentButton) {
        delComButton.addEventListener('click', (init) => {
            init.stopPropagation()
            const postId = delComButton.closest('.comment').dataset.id
            commentsListData.splice(delComButton, postId)
            doFetchDeleteComment(postId)
            renderCommentsList(commentsListData)

        })
    }
}

export function inputLogin() {
    const loginInputElement = document.getElementById('login-input')
    const passwordInputElement = document.getElementById('password-input')
    login({
        login: loginInputElement.value,
        password: passwordInputElement.value,
    }).then(() => {
        renderApp()
    })
}

export function addRegistration() {
    const nameRegistrInputElement = document.getElementById('name-input')
    const loginRegistrInputElement = document.getElementById('login-input')
    const passwordRegistrInputElement =
        document.getElementById('password-input')
    registration({
        name: nameRegistrInputElement.value,
        login: loginRegistrInputElement.value,
        password: passwordRegistrInputElement.value,
    }).then(() => {
        doFetchGetCommentList()
    })
}

export function addAnswerComment() {
    const commentsElement = document.querySelectorAll('.comment')
    const addFormTextElement = document.getElementById('add-form-text')
    for (const commentElement of commentsElement) {
        commentElement.addEventListener('click', () => {
            const index = commentElement.closest('.comment').dataset.index
            addFormTextElement.value = commentsListData[index].comment
            // if (!commentsListData[index].isEdit) {
            //     commentsListData[index].isEdit = true
            // } else {
            //     commentsListData[index].isEdit = false
            //     commentsListData[index].comment = addFormTextElement.value
            // }
            // renderCommentsList(commentsListData)

        })
    }
    addFormTextElement.value = ''
}

export function editComment() {
    const editCommentsButton = document.querySelectorAll('.edit-button')
    const addFormTextElement = document.getElementById('add-form-text')
    for (const editCommentButton of editCommentsButton) {
        editCommentButton.addEventListener('click', (e) => {
            e.stopPropagation()
            const index = editCommentButton.closest('.comment').dataset.index
            addFormTextElement.innerHTML = commentsListData[index].comment
            if (!commentsListData[index].isEdit) {
                commentsListData[index].isEdit = true
            } else {
                commentsListData[index].isEdit = false
                commentsListData[index].comment = addFormTextElement.value
            }
            renderCommentsList(commentsListData)
        })
    }
}

export function addCounterLikes(commentsListData) {
    const likesCounterElement = document.querySelectorAll('.likes-counter')
    likesCounterElement.value = 0
    commentsListData.isLikeLoading = false

    function delay(interval = 300) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve()
            }, interval)
        })
    }
    const likesButtonElement = document.querySelectorAll('.like-button')
    for (const likeButtonElement of likesButtonElement) {
        likeButtonElement.addEventListener('click', (event) => {
            event.stopPropagation()

            const index = likeButtonElement.closest(".comment").dataset.index

            delay(2000).then(() => {
                commentsListData.likes = commentsListData.isLiked ?
                    commentsListData.likes - 1 :
                    commentsListData.likes + 1
                commentsListData.isLiked = !commentsListData.isLiked
                commentsListData.isLikeLoading = false
                renderCommentsList(commentsListData)
            })
            if (commentsListData[index].isLike === false) {
                commentsListData[index].isLike = true
                commentsListData[index].like++
            } else {
                commentsListData[index].isLike = false
                commentsListData[index].like--
            }
            renderCommentsList(commentsListData)
        })
    }
}

/* const addByKey = () => {
   addForm.addEventListener("keyup", (event) => {
     console.log(event.code);
     if (event.code === "Enter") {
       doFetchPostComment();
     };
     console.log(`sjhfroue`);
   });
 }*/