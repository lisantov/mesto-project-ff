import { putLike, deleteLike } from "./api";

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

    cardImage.addEventListener('click', () => imageHandler(cardInfo));
    cardDeleteButton.addEventListener('click', () => deleteHandler(cardElement, cardInfo));
    cardLikeButton.addEventListener('click', (evt) => {      
        likeHandler(evt, cardInfo);
        if(cardLikeButton.classList.contains('card__like-button_is-active')) {
            putLike(cardInfo._id)
            .then((res) => {
                if(res.ok) return res.json();
                return Promise.reject(`Что то пошло не так при запросе на установку лайка: ${res.status}`);
            })
            .then(data => { cardLikeAmount.textContent = data.likes.length; })
            .catch(err => console.error(err));
        }
        else {
            deleteLike(cardInfo._id)
            .then((res) => {
                if(res.ok) return res.json();
                return Promise.reject(`Что то пошло не так при запросе на снятие лайка: ${res.status}`);
            })
            .then(data => { cardLikeAmount.textContent = data.likes.length; })
            .catch(err => console.error(err));
        }
    });
            
    return cardElement;
}

/* ФУНКЦИОНАЛЬНОСТЬ ЛАЙКА НА КАРТОЧКИ */
function likeHandler(evt, cardInfo) {
    evt.target.classList.toggle('card__like-button_is-active');
}

/* ФУНКЦИОНАЛЬНОСТЬ УДАЛЕНИЯ КАРТОЧЕК */
function deleteCard(cardElement, cardInfo) {
    fetch(`https://nomoreparties.co/v1/wff-cohort-37/cards/${cardInfo._id}`, {
        method: 'DELETE',
        headers: {
            authorization: '2a964a3a-30c9-4a52-983e-4a7ed5570f90'
        }
    })
    .then((res) => {
        if(res.ok) return res
        console.log(res);
        return Promise.reject(`Что то пошло не так при запросе удаления карточки: ${res.status}`);
    })
    .catch(err => console.error(err));
    cardElement.remove();
}

export { createCard, likeHandler, deleteCard};