const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.places__list');

function createCard(cardInfo, deleteCard) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');

    cardImage.src = cardInfo.link;
    cardTitle.textContent = cardInfo.name;

    cardDeleteButton.addEventListener('click', () => deleteCard(cardElement));

    return cardElement;
}

function deleteCard(item) {
    item.remove();
}

initialCards.forEach(item => cardsContainer.append(createCard(item, deleteCard)));