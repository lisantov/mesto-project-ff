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
    addButton: document.querySelector('.profile__add-button')
};

/* СЛУШАТЕЛИ КНОПОК ОТКРЫТИЯ ПОПАПОВ */
elements.editButton.addEventListener('click', () => {
    elements.editPopup.addEventListener('click', (evt) => {
        if(evt.target.classList.contains('popup__close') ||
            evt.target.classList.contains('popup')) {
                closeModal(elements.editPopup);
            }
    });
    handleEditProfile();
});
elements.addButton.addEventListener('click', () => {
    elements.addCardPopup.addEventListener('click', (evt) => {
        if(evt.target.classList.contains('popup__close') ||
            evt.target.classList.contains('popup')) {
                closeModal(elements.addCardPopup);
            }
        });
    handleAddCard();
});

/* СЛУШАТЕЛЬ ЗАКРЫТИЯ ПОПАПА С КАРТИНКОЙ */
elements.imagePopup.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('popup__close') ||
    evt.target.classList.contains('popup')) {
        closeModal(elements.imagePopup);
    }
});

/* ДОБАВЛЕНИЕ КАРТОЧЕК "ПО-УМОЛЧАНИЮ" */
initialCards.forEach(item => elements.cardsContainer.append(createCard(item, deleteCard, likeHandler, imageHandler)));

/* ФУНКЦИОНАЛЬНОСТЬ ПОПАПА РЕДАКТИРОВАНИЯ ПРОФИЛЯ */
function handleEditProfile() {
    const form = document.forms['edit-profile'];
    const nameInput = form.elements.name;
    const jobInput = form.elements.description;

    const profileName = document.querySelector('.profile__title');
    const profileDesc = document.querySelector('.profile__description');

    nameInput.value = profileName.textContent;
    jobInput.value = profileDesc.textContent;

    form.removeEventListener('submit', submitHandler);
    form.addEventListener('submit', submitHandler);
    /* HANDLER ОТПРАВКИ ФОРМЫ ДЛЯ РЕДАКТИРОВАНИЯ ПРОФИЛЯ  */
    function submitHandler(evt) {
        evt.preventDefault();
        profileName.textContent = nameInput.value;
        profileDesc.textContent = jobInput.value;
        document.removeEventListener('keydown', handleKeyClose);
        closeModal(elements.editPopup);
    }

    document.removeEventListener('keydown', handleKeyClose);
    document.addEventListener('keydown', handleKeyClose);
    /* ЗАКРЫТИЕ ПОПАПА ЧЕРЕЗ ESC */
    function handleKeyClose(evt) {
        if(evt.key === 'Escape') {
            closeModal(elements.editPopup);
        }        
    }

    openModal(elements.editPopup);
}

/* ФУНКЦИОНАЛЬНОСТЬ ПОПАПА ДОБАВЛЕНИЕ КАРТОЧКИ */
function handleAddCard() {
    const form = document.forms['new-place'];
    
    form.reset();

    form.removeEventListener('submit', submitHandler);
    form.addEventListener('submit', submitHandler);
    /* HANDLER ОТПРАВКИ ФОРМЫ ДЛЯ ДОБАВЛЕНИЯ КАРТОЧКИ  */
    function submitHandler(evt) {
        evt.preventDefault();
        const placeNameInput = form.elements['place-name'];
        const sourceLinkInput = form.elements['link'];
        const cardInfo = {
            name: placeNameInput.value,
            link: sourceLinkInput.value
        };

        elements.cardsContainer.prepend(createCard(cardInfo, deleteCard, likeHandler, imageHandler));
        document.removeEventListener('keydown', handleKeyClose);

        closeModal(elements.addCardPopup);
    }

    document.removeEventListener('keydown', handleKeyClose);
    document.addEventListener('keydown', handleKeyClose);
    /* ЗАКРЫТИЕ ПОПАПА ЧЕРЕЗ ESC */
    function handleKeyClose(evt) {
        if(evt.key === 'Escape') {
            closeModal(elements.addCardPopup);
        }        
    }

    openModal(elements.addCardPopup);
}

/* ФУНКЦИОНАЛЬНОСТЬ УВЕЛИЧЕНИЯ ИЗОБРАЖЕНИЯ КАРТОЧКИ */
function imageHandler(cardInfo) {
    const image = elements.imagePopup.querySelector('.popup__image');
    const caption = elements.imagePopup.querySelector('.popup__caption');

    image.src = cardInfo.link;
    image.alt = cardInfo.name;
    caption.textContent = cardInfo.name;

    document.addEventListener('keydown', handleKeyClose);
    /* ЗАКРЫТИЕ ПОПАПА ЧЕРЕЗ ESC */
    function handleKeyClose(evt) {
        if(evt.key === 'Escape') {
            document.removeEventListener('keydown', handleKeyClose);
            closeModal(elements.imagePopup);
        }        
    }
    
    openModal(elements.imagePopup);
}