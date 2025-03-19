function createCard(cardInfo, deleteCard) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    
    const cardsContainer = document.querySelector('.places__list');

    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');

    cardImage.src = cardInfo.link;
    cardTitle.textContent = cardInfo.name;

    cardDeleteButton.addEventListener('click', () => deleteCard(cardElement));

    return cardsContainer.append(cardElement);
}

function deleteCard(item) {
    item.remove();
}

createCard({name: "Архыз", link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"}, deleteCard);
createCard({name: "Челябинская область", link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"}, deleteCard);
createCard({name: "Иваново", link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"}, deleteCard);
createCard({name: "Камчатка", link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"}, deleteCard);
createCard({name: "Холмогорский район", link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"}, deleteCard);
createCard({name: "Байкал", link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}, deleteCard);
