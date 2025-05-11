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

const handleResponse = (res, errorText) => {
    return new Promise((resolve, reject) => {
        if(res.ok) return resolve(res.json());
        else return reject(`${errorText}: ${res.status}`);
    })
    .catch((err) => {
        console.error(err);
    });
}

/* ЗАПРОС НА ПОЛУЧЕНИЕ ДАННЫХ ПРОФИЛЯ */
const getProfileInfo = 
    fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
    .then(res => handleResponse(res, 'Что-то пошло не так при запросе данных о профиле'));

/* ЗАПРОС НА ПОЛУЧЕНИЕ ДАННЫХ КАРТОЧЕК */
const getCardsInfo = 
    fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
    .then(res => handleResponse(res, 'Что-то пошло не так при запросе данных о карточках'));

/* ЗАПРОС НА ИЗМЕНЕНИЕ ДАННЫХ ПРОФИЛЯ */
const patchProfileInfo = (name, description) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: description
        })
    })
    .then(res => handleResponse(res, 'Что-то пошло не так при изменении данных профиля'));
};

/* ЗАПРОС НА ИЗМЕНЕНИЕ АВАТАРКИ ПРОФИЛЯ */
const patchAvatar = (linkValue) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: linkValue
        })
    })
    .then(res => handleResponse(res, 'Что-то пошло не так при изменении автарки профиля'));
};

/* ЗАПРОС НА ДОБАВЛЕНИЕ КАРТОЧКИ */
const postCard = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
    .then(res => handleResponse(res, 'Что-то пошло не так при добавлении карточки'));
};

/* ЗАПРОС НА ЛАЙК */
const putLike = (id) => {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
        method: 'PUT',
        headers: config.headers
    })
    .then(res => handleResponse(res, 'Что-то пошло не так при установке лайка'));
};

/* ЗАПРОС НА СНЯТИЯ ЛАЙКА */
const deleteLike = (id) => {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(res => handleResponse(res, 'Что-то пошло не так при снятии лайка'));
};

/* ЗАПРОС НА УДАЛЕНИЕ КАРТОЧКИ */
const deleteAPICard = (id) => {
    return fetch(`${config.baseUrl}/cards/${id}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(res => handleResponse(res, 'Что-то пошло не так при удалении карточки'));
}

export { getProfileInfo, getCardsInfo, patchProfileInfo, patchAvatar, postCard, putLike, deleteLike, deleteAPICard };