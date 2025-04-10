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
    profileName: document.querySelector('.profile__title'),
    profileDesc: document.querySelector('.profile__description'),
    editButton: document.querySelector('.profile__edit-button'),
    addButton: document.querySelector('.profile__add-button')
};

/* ДОБАВЛЕНИЕ КАРТОЧЕК "ПО-УМОЛЧАНИЮ" */
initialCards.forEach(item => elements.cardsContainer.append(createCard(item, deleteCard, likeHandler, imageHandler)));

/* ФУНКЦИОНАЛЬНОСТЬ УВЕЛИЧЕНИЯ ИЗОБРАЖЕНИЯ КАРТОЧКИ */
function imageHandler(cardInfo) {
    const image = elements.imagePopup.querySelector('.popup__image');
    const caption = elements.imagePopup.querySelector('.popup__caption');

    image.src = cardInfo.link;
    image.alt = cardInfo.name;
    caption.textContent = cardInfo.name;
    
    openModal(elements.imagePopup);
}
/* ФУНКЦИОНАЛЬНОСТЬ ПОПА РЕДАКТИРОВАНИЯ ПРОФИЛЯ */
function handleEditProfile() {
    const form = document.forms['edit-profile'];
    const nameInput = form.elements.name;
    const jobInput = form.elements.description;

    const profileName = document.querySelector('.profile__title');
    const profileDesc = document.querySelector('.profile__description');

    nameInput.value = profileName.textContent;
    jobInput.value = profileDesc.textContent;

    /* HANDLER ОТПРАВКИ ФОРМЫ ДЛЯ РЕДАКТИРОВАНИЯ ПРОФИЛЯ  */
    function submitHandler(evt) {
        evt.preventDefault();
        profileName.textContent = nameInput.value;
        profileDesc.textContent = jobInput.value;

        form.removeEventListener('submit', submitHandler);
        closeModal(elements.editPopup);
    }

    form.addEventListener('submit', submitHandler);

    /* HANDLER ЗАКРЫТИЯ ФОРМЫ */
    function handleClose(evt) {
        if(evt.target.classList.contains('popup__close') || 
            evt.target.classList.contains('popup')) closeModal(elements.editPopup);
        else if(evt.key === 'Escape') closeModal(elements.editPopup);
    }
    
    elements.editPopup.removeEventListener('click', handleClose);
    document.removeEventListener('keydown', handleClose);

    elements.editPopup.addEventListener('click', handleClose);
    document.addEventListener('keydown', handleClose);

    openModal(elements.editPopup);
}

/* ФУНКЦИОНАЛЬНОСТЬ ПОПАПА ДОБАВЛЕНИЕ КАРТОЧКИ */
function handleAddCard() {
    const form = document.forms['new-place'];
    
    form.reset();

    const placeNameInput = form.elements['place-name'];
    const sourceLinkInput = form.elements['link'];

    /* HANDLER ОТПРАВКИ ФОРМЫ ДЛЯ ДОБАВЛЕНИЯ КАРТОЧКИ  */
    function submitHandler(evt) {
        evt.preventDefault();
        const cardInfo = {
            name: placeNameInput.value,
            link: sourceLinkInput.value
        };

        elements.cardsContainer.prepend(createCard(cardInfo, deleteCard, likeHandler, imageHandler));

        form.removeEventListener('submit', submitHandler);
        closeModal(elements.addCardPopup);
    }

    form.addEventListener('submit', submitHandler);

    /* HANDLER ЗАКРЫТИЯ ФОРМЫ */
    function handleClose(evt) {
        if(evt.target.classList.contains('popup__close') || 
            evt.target.classList.contains('popup')) closeModal(elements.addCardPopup);
        else if(evt.key === 'Escape') closeModal(elements.addCardPopup);
    }
    
    elements.addCardPopup.removeEventListener('click', handleClose);
    document.removeEventListener('keydown', handleClose);

    elements.addCardPopup.addEventListener('click', handleClose);
    document.addEventListener('keydown', handleClose);

    openModal(elements.addCardPopup);
}

/* СЛУШАТЕЛИ КНОПОК ОТКРЫТИЯ ПОПАПОВ */
elements.editButton.addEventListener('click', handleEditProfile);
elements.addButton.addEventListener('click', handleAddCard);