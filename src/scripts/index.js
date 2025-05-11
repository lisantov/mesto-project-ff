import { initialCards } from "./cards.js";
import { createCard, likeHandler, deleteCard } from "../components/card.js";
import { closeModal, openModal } from "../components/modal.js";
import { enableValidation, clearValidation } from './validation.js';
import { getProfileInfo, getCardsInfo, patchProfileInfo, patchAvatar, postCard } from "../components/api.js";
import '../pages/index.css';

// DOM элементы
const elements = {
    cardsContainer: document.querySelector('.places__list'),
    editPopup: document.querySelector('.popup_type_edit'),
    avatarPopup: document.querySelector('.popup_type_avatar'),
    addCardPopup: document.querySelector('.popup_type_new-card'),
    imagePopup: document.querySelector('.popup_type_image'),

    imagePopup_image: document.querySelector('.popup__image'),
    imagePopup_caption: document.querySelector('.popup__caption'),

    editButton: document.querySelector('.profile__edit-button'),
    addButton: document.querySelector('.profile__add-button'),

    profileImage: document.querySelector('.profile__image'),
    profileName: document.querySelector('.profile__title'),
    profileDesc: document.querySelector('.profile__description'),

    editForm: document.forms['edit-profile'],
    editForm_nameInput: document.forms['edit-profile'].elements['name'],
    editForm_jobInput: document.forms['edit-profile'].elements['description'],
    avatarForm: document.forms['change-avatar'],
    avatar_linkInput: document.forms['change-avatar'].elements['link'],
    addForm: document.forms['new-place'],
    addForm_nameInput: document.forms['new-place'].elements['place-name'],
    addForm_linkInput: document.forms['new-place'].elements['link'],
};

const clearConfig = {
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inputErrorClass: 'popup__input_invalid'
}; 
let currentUserId = '';

/* СЛУШАТЕЛИ КНОПОК ОТКРЫТИЯ ПОПАПОВ */
elements.editButton.addEventListener('click', () => { handleEditProfile(); });
elements.profileImage.addEventListener('click', () => { handleAvatar(); });
elements.addButton.addEventListener('click', () => { handleAddCard(); });

/* СЛУШАТЕЛИ ОТПРАВКИ ФОРМ */
elements.editForm.addEventListener('submit', handleEditSubmit);
elements.avatarForm.addEventListener('submit', handleAvatarSubmit);
elements.addForm.addEventListener('submit', handleAddSubmit);

        /* ДОБАВЛЕНИЕ КАРТОЧЕК "ПО-УМОЛЧАНИЮ" */
        //initialCards.forEach(item => elements.cardsContainer.append(createCard(item, deleteCard, likeHandler, handleImagePopup)));

/* ФУНКЦИОНАЛЬНОСТЬ ПОПАПА РЕДАКТИРОВАНИЯ ПРОФИЛЯ */
function handleEditProfile() {
    const { name, description } = elements.editForm.elements;
    name.value = elements.profileName.textContent;
    description.value = elements.profileDesc.textContent;
    clearValidation(elements.editForm, clearConfig);
    openModal(elements.editPopup);
}

/* ФУНКЦИОНАЛЬНОСТЬ ПОПАПА РЕДАКТИРОВАНИЯ АВАТАРКИ */
function handleAvatar() {
    elements.avatarForm.reset();
    clearValidation(elements.editForm, clearConfig);
    openModal(elements.avatarPopup);
}

/* ФУНКЦИОНАЛЬНОСТЬ ПОПАПА ДОБАВЛЕНИЕ КАРТОЧКИ */
function handleAddCard() {
    elements.addForm.reset();
    clearValidation(elements.addForm, clearConfig);
    openModal(elements.addCardPopup);
}

/* ФУНКЦИОНАЛЬНОСТЬ УВЕЛИЧЕНИЯ ИЗОБРАЖЕНИЯ КАРТОЧКИ */
function handleImagePopup(cardInfo) {
    elements.imagePopup_image.src = cardInfo.link;
    elements.imagePopup_image.alt = cardInfo.name;
    elements.imagePopup_caption.textContent = cardInfo.name;
    openModal(elements.imagePopup);
}

/* HANDLER ОТПРАВКИ ФОРМЫ ДЛЯ РЕДАКТИРОВАНИЯ ПРОФИЛЯ */
function handleEditSubmit(evt) {
    evt.preventDefault();
    const name = elements.editForm_nameInput.value;
    const description = elements.editForm_jobInput.value;
    
    elements.editForm.querySelector('.popup__button').textContent = 'Сохранение...';
    patchProfileInfo(name, description)
    .then((data) => {
        elements.profileName.textContent = data.name;
        elements.profileDesc.textContent = data.about;
    })
    .finally(()  => {
        elements.editForm.querySelector('.popup__button').textContent = 'Сохранить';
        closeModal(elements.editPopup);
    });
}

/* HANDLER ОТПРАВКИ ФОРМЫ ДЛЯ СМЕНЫ АВАТАРКИ */
function handleAvatarSubmit(evt) {
    evt.preventDefault();
    const linkValue = elements.avatar_linkInput.value;

    elements.avatarForm.querySelector('.popup__button').textContent = 'Сохранение...';
    patchAvatar(linkValue)
    .then(data => {
        elements.profileImage.style.backgroundImage = `url(${data.avatar})`;
    })
    .finally(()  => {
        elements.avatarForm.querySelector('.popup__button').textContent = 'Сохранить';
        closeModal(elements.avatarPopup);
    });
}

/* HANDLER ОТПРАВКИ ФОРМЫ ДЛЯ ДОБАВЛЕНИЯ КАРТОЧКИ  */
function handleAddSubmit(evt) {
    evt.preventDefault();
    const placeNameInput = elements.addForm_nameInput;
    const sourceLinkInput = elements.addForm_linkInput;
    const cardInfo = {
        name: placeNameInput.value,
        link: sourceLinkInput.value
    };
    
    elements.addForm.querySelector('.popup__button').textContent = 'Сохранение...';
    postCard(cardInfo.name, cardInfo.link)
    .then(data => elements.cardsContainer.prepend(createCard(data, currentUserId, deleteCard, likeHandler, handleImagePopup)))
    .finally(()  => {
        elements.addForm.querySelector('.popup__button').textContent = 'Сохранить';
        closeModal(elements.addCardPopup);
    })
}

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inputErrorClass: 'popup__input_invalid'
});

function getInfo() {
    Promise.all([getProfileInfo, getCardsInfo])
        .then(([profileData, cardsData]) => {
            currentUserId = profileData._id;
            setProfileInfo(profileData);
            setCardsInfo(cardsData);
        })
        .catch((err) => {
            alert(err);
            console.error(err);
        });
}

function setProfileInfo(profileData) {
    elements.profileImage.style.backgroundImage = `url('${profileData.avatar}')`;
    elements.profileName.textContent = profileData.name;
    elements.profileDesc.textContent = profileData.about;
}

function setCardsInfo(cardsData) {
    cardsData.forEach((card) => {
        elements.cardsContainer.prepend(createCard(card, currentUserId, deleteCard, likeHandler, handleImagePopup));
    });
}

getInfo();

export { handleImagePopup, currentUserId };