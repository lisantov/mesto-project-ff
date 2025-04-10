/* ФУНКЦИОНАЛЬНОСТЬ ЗАКРЫТИЯ ПОПАПА */
function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
}

/* ФУНКЦИОНАЛЬНОСТЬ ОТКРЫТИЯ ПОПАПОВ И УСТАНОВКИ СЛУШАТЕЛЕЙ ДЛЯ ЗАКРЫТИЯ */
function openModal(popup) {
    popup.classList.add('popup_is-opened');
}

export { closeModal, openModal };