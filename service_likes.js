import {
    renderCommentsList
} from "./main.js"

function delay(interval = 300) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, interval);
    });
}
export function initEventListener(likesCounterElement, commentsListData) {
    likesCounterElement.value = 0;
    commentsListData.isLikeLoading = false;

    const likesButtonElement = document.querySelectorAll(".like-button");
    for (const likeButtonElement of likesButtonElement) {
        likeButtonElement.addEventListener("click", (event) => {
            event.stopPropagation();

            const index = likeButtonElement.dataset.index;

            delay(2000).then(() => {
                commentsListData.likes = commentsListData.isLiked ?
                    commentsListData.likes - 1 :
                    commentsListData.likes + 1;
                commentsListData.isLiked = !commentsListData.isLiked;
                commentsListData.isLikeLoading = false;
                renderCommentsList()
            });
            if (commentsListData[index].isLike === false) {
                commentsListData[index].isLike = true;
                commentsListData[index].like++;
            } else {
                commentsListData[index].isLike = false;
                commentsListData[index].like--;
            }
            renderCommentsList()
        })
    }
}