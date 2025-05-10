import { closeModal } from "./modal";
import { createCard, deleteCard, likeHandler } from "./card";
import { handleImagePopup, currentUserId } from "../scripts";

const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-37',
    headers: {
        authorization: '2a964a3a-30c9-4a52-983e-4a7ed5570f90',
        'content-type': 'application/json'
    }
}

/* ЗАПРОС НА ПОЛУЧЕНИЕ ДАННЫХ ПРОФИЛЯ */
const getProfileInfo = 
    fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
    .then((res) => {
        if(res.ok) return res.json()
        return reject(`Что-то пошло не так: ${res.status}`);
    })
    .catch((err) => {
        console.error(err);
    });

/* ЗАПРОС НА ПОЛУЧЕНИЕ ДАННЫХ КАРТОЧЕК */
const getCardsInfo = 
    fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
    .then((res) => {
        if(res.ok) return res.json()
        return reject(`Что-то пошло не так: ${res.status}`);
    })
    .catch((err) => {
        console.error(err);
    });

/* ЗАПРОС НА ИЗМЕНЕНИЕ ДАННЫХ ПРОФИЛЯ */
const patchProfileInfo = (elements, name, description) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: description
        })
    })
    .then(res => {
        if(res.ok) return res.json();
        else return Promise.reject(`Ошибка при запросе на обновление профиля: ${res.status}`);
    })
    .then((data) => {
        elements.profileName.textContent = data.name;
        elements.profileDesc.textContent = data.about;
    })
    .catch(err => console.error(err))
    .finally(()  => {
        elements.editForm.querySelector('.popup__button').textContent = 'Сохранить';
        closeModal(elements.editPopup);
    });
};

/* ЗАПРОС НА ИЗМЕНЕНИЕ АВАТАРКИ ПРОФИЛЯ */
const patchAvatar = (elements, linkValue) => {
    fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: linkValue
        })
    })
    .then(res => {
        if(res.ok) return res.json();
        else return Promise.reject(`Ошибка при запросе на обновление аватарки: ${res.status}`);
    })
    .then(data => {
        elements.profileImage.style.backgroundImage = `url(${data.avatar})`;
    })
    .catch(err => console.error(err))
    .finally(()  => {
        elements.avatarForm.querySelector('.popup__button').textContent = 'Сохранить';
        closeModal(elements.avatarPopup);
    })
};

/* ЗАПРОС НА ДОБАВЛЕНИЕ КАРТОЧКИ */
const postCard = (elements, name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
    .then(res => {
        if(res.ok) return res.json();
        else return Promise.reject(`Ошибка при запросе на добавление карточки: ${res.status}`);
    })
    .then(data => elements.cardsContainer.prepend(createCard(data, currentUserId, deleteCard, likeHandler, handleImagePopup)))
    .catch(err => console.error(err))
    .finally(()  => {
        elements.addForm.querySelector('.popup__button').textContent = 'Сохранить';
        closeModal(elements.addCardPopup);
    })
};

/* ЗАПРОС НА ЛАЙК */
const putLike = (id, textElement, buttonElement) => {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
        method: 'PUT',
        headers: config.headers
    })
    .then((res) => { 
        if(res.ok) return res.json();
        return Promise.reject(`Что то пошло не так при запросе на постановку лайка: ${res.status}`);
    })
    .then((data) => {
        textElement.textContent = data.likes.length;
        buttonElement.classList.toggle('card__like-button_is-active');
    })
    .catch(err => console.error(err))
};

/* ЗАПРОС НА СНЯТИЯ ЛАЙКА */
const deleteLike = (id, textElement, buttonElement) => {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then((res) => { 
        if(res.ok) return res.json();
        return Promise.reject(`Что то пошло не так при запросе на снятие лайка: ${res.status}`);
    })
    .then((data) => {
        textElement.textContent = data.likes.length;
        buttonElement.classList.toggle('card__like-button_is-active');
    })
    .catch(err => console.error(err))
};

/* ЗАПРОС НА УДАЛЕНИЕ КАРТОЧКИ */
const deleteAPICard = (id, cardElement) => {
    return fetch(`${config.baseUrl}/cards/${id}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then((res) => {
        if(res.ok) {
            cardElement.remove();
        }
        else return Promise.reject(`Что то пошло не так при запросе удаления карточки: ${res.status}`);
    })
    .catch(err => console.error(err));
}

export { getProfileInfo, getCardsInfo, patchProfileInfo, patchAvatar, postCard, putLike, deleteLike, deleteAPICard };