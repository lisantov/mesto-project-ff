import { initialCards } from "./cards.js";
import { createCard, likeHandler, deleteCard } from "../components/card.js";
import { closeModal, openModal } from "../components/modal.js";
import '../pages/index.css';

// DOM элементы
const elements = {
    cardsContainer: document.querySelector('.places__list'),
    editPopup: document.querySelector('.popup_type_edit'),
    addCardPopup: document.querySelector('.popup_type_new-card'),
    imagePopup: document.querySelector('.popup_type_image'),
    editButton: document.querySelector('.profile__edit-button'),
    addButton: document.querySelector('.profile__add-button'),
    profileName: document.querySelector('.profile__title'),
    profileDesc: document.querySelector('.profile__description'),
    editForm: document.forms['edit-profile']
};

/* СЛУШАТЕЛИ КНОПОК ОТКРЫТИЯ ПОПАПОВ */
elements.editButton.addEventListener('click', () => {
    elements.editPopup.addEventListener('click', handleClickClose);
    handleEditProfile();
});
elements.addButton.addEventListener('click', () => {
    elements.addCardPopup.addEventListener('click', handleClickClose);
    handleAddCard();
});
elements.imagePopup.addEventListener('click', handleClickClose);

/* ДОБАВЛЕНИЕ КАРТОЧЕК "ПО-УМОЛЧАНИЮ" */
initialCards.forEach(item => elements.cardsContainer.append(createCard(item, deleteCard, likeHandler, imageHandler)));

/* ФУНКЦИОНАЛЬНОСТЬ ПОПАПА РЕДАКТИРОВАНИЯ ПРОФИЛЯ */
function handleEditProfile() {
    elements.editForm.removeEventListener('submit', handleEditSubmit);
    const { name, description } = elements.editForm.elements;
    name.value = elements.profileName.textContent;
    description.value = elements.profileDesc.textContent;
    elements.editForm.addEventListener('submit', handleEditSubmit);
    openModal(elements.editPopup);
}

/* ФУНКЦИОНАЛЬНОСТЬ ПОПАПА ДОБАВЛЕНИЕ КАРТОЧКИ */
function handleAddCard() {
    const form = document.forms['new-place'];
    form.removeEventListener('submit', handleAddSubmit);    
    form.reset();
    form.addEventListener('submit', handleAddSubmit);
    openModal(elements.addCardPopup);
}

/* ФУНКЦИОНАЛЬНОСТЬ УВЕЛИЧЕНИЯ ИЗОБРАЖЕНИЯ КАРТОЧКИ */
function imageHandler(cardInfo) {
    const image = elements.imagePopup.querySelector('.popup__image');
    const caption = elements.imagePopup.querySelector('.popup__caption');
    image.src = cardInfo.link;
    image.alt = cardInfo.name;
    caption.textContent = cardInfo.name;
    openModal(elements.imagePopup);
}

/* HANDLER ОТПРАВКИ ФОРМЫ ДЛЯ РЕДАКТИРОВАНИЯ ПРОФИЛЯ */
function handleEditSubmit(evt) {
    evt.preventDefault();
    const nameInput = elements.editForm.elements.name;
    const jobInput = elements.editForm.elements.description;
    elements.profileName.textContent = nameInput.value;
    elements.profileDesc.textContent = jobInput.value;
    document.removeEventListener('keydown', handleKeyClose);
    closeModal(elements.editPopup);
}

/* HANDLER ОТПРАВКИ ФОРМЫ ДЛЯ ДОБАВЛЕНИЯ КАРТОЧКИ  */
function handleAddSubmit(evt) {
    evt.preventDefault();
    const form = document.forms['new-place'];
    const placeNameInput = form.elements['place-name'];
    const sourceLinkInput = form.elements['link'];
    const cardInfo = {
        name: placeNameInput.value,
        link: sourceLinkInput.value
    };
    elements.cardsContainer.prepend(createCard(cardInfo, deleteCard, likeHandler, imageHandler));
    closeModal(elements.addCardPopup);
}

/* ЗАКРЫТИЕ ПОПАПА ЧЕРЕЗ ESC */
function handleKeyClose(evt) {
    const currentPopup = document.querySelector('.popup_is-opened');
    if(evt.key === 'Escape') {
        closeModal(currentPopup);
    }        
}

/* ЗАКРЫТИЕ ПОПАПА ЧЕРЕЗ КЛИК */
function handleClickClose(evt) {
    const currentPopup = document.querySelector('.popup_is-opened');
    if(evt.target.classList.contains('popup__close') ||
    evt.target.classList.contains('popup')) closeModal(currentPopup);
}

export { handleKeyClose };