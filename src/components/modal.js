/* ЗАКРЫТИЕ ПОПАПА ЧЕРЕЗ ESC */
function handleKeyClose(evt) {
    if(evt.key === 'Escape') {
        const currentPopup = document.querySelector('.popup_is-opened');
        closeModal(currentPopup);
    }        
}

/* ЗАКРЫТИЕ ПОПАПА ЧЕРЕЗ КЛИК */
function handleClickClose(evt) {
    if(evt.target.classList.contains('popup__close') ||
    evt.target.classList.contains('popup')) {
        const currentPopup = document.querySelector('.popup_is-opened');
        closeModal(currentPopup);
    }
}

/* ФУНКЦИОНАЛЬНОСТЬ ЗАКРЫТИЯ ПОПАПА */
function closeModal(popup) {
    document.removeEventListener('keydown', handleKeyClose)
    popup.classList.remove('popup_is-opened');
}

/* ФУНКЦИОНАЛЬНОСТЬ ОТКРЫТИЯ ПОПАПОВ И УСТАНОВКИ СЛУШАТЕЛЕЙ ДЛЯ ЗАКРЫТИЯ */
function openModal(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleKeyClose);
    popup.addEventListener('click', handleClickClose);
}

export { closeModal, openModal };