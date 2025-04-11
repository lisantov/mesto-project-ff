import { handleKeyClose } from "../scripts/index.js";

/* ФУНКЦИОНАЛЬНОСТЬ ЗАКРЫТИЯ ПОПАПА */
function closeModal(popup) {
    document.removeEventListener('keydown', handleKeyClose)
    popup.classList.remove('popup_is-opened');
}

/* ФУНКЦИОНАЛЬНОСТЬ ОТКРЫТИЯ ПОПАПОВ И УСТАНОВКИ СЛУШАТЕЛЕЙ ДЛЯ ЗАКРЫТИЯ */
function openModal(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleKeyClose);
}

export { closeModal, openModal };