import { putLike, deleteLike, deleteAPICard } from "./api";

const cardTemplate = document.querySelector('#card-template').content;

/* ФУНКЦИОНАЛЬНОСТЬ ДОБАВЛЕНИЯ КАРТОЧЕК */
function createCard(cardInfo, currentUserId, deleteHandler, likeHandler, imageHandler) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    const cardLikeAmount = cardElement.querySelector('.card__like-amount');

    cardImage.src = cardInfo.link;
    cardImage.alt = cardInfo.name;
    cardTitle.textContent = cardInfo.name;
    cardLikeAmount.textContent = cardInfo.likes.length;

    if(currentUserId !== cardInfo.owner._id) {
        cardDeleteButton.style.display = 'none';
    }
    else {
        cardDeleteButton.addEventListener('click', () => deleteHandler(cardElement, cardInfo));
    }

    cardImage.addEventListener('click', () => imageHandler(cardInfo));
    cardLikeButton.addEventListener('click', (evt) => { likeHandler(evt, cardInfo, cardLikeAmount); });
            
    return cardElement;
}

/* ФУНКЦИОНАЛЬНОСТЬ ЛАЙКА НА КАРТОЧКИ */
function likeHandler(evt, cardInfo, textElement) {
    const buttonElement = evt.target;
    const likeMethod = buttonElement.classList.contains('card__like-button_is-active') ? deleteLike : putLike;

    likeMethod(cardInfo._id)
    .then((data) => {
        textElement.textContent = data.likes.length;
        buttonElement.classList.toggle('card__like-button_is-active');
    });
}

/* ФУНКЦИОНАЛЬНОСТЬ УДАЛЕНИЯ КАРТОЧЕК */
function deleteCard(cardElement, cardInfo) {
    deleteAPICard(cardInfo._id)
    .then(() => {
        cardElement.remove();
    });
}

export { createCard, likeHandler, deleteCard};