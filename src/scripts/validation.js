function enableValidation(validationConfig) {
    const formsList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    formsList.forEach((form) => {
        setEventListeners(form, validationConfig);
    });
}

function setEventListeners(form, validationConfig) {
    const inputList = Array.from(form.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = form.querySelector(validationConfig.submitButtonSelector);
    toggleButtonState(inputList, buttonElement);

    inputList.forEach((input) => {
        input.addEventListener('input', () => {
            toggleButtonState(inputList, buttonElement);
            checkInputVaildity(form, input, validationConfig);
        })
    });
}

function checkInputVaildity(form, input, validationConfig) {
    if(input.validity.patternMismatch) input.setCustomValidity(input.dataset.errorMessage);
    else input.setCustomValidity('');

    if(!input.validity.valid) showError(form, input, input.validationMessage, validationConfig);
    else hideError(form, input, validationConfig);
}

function showError(form, input, validationMessage, validationConfig) {
    const errorElement = form.querySelector(`.${input.id}-error`);
    input.classList.add(validationConfig.inputErrorClass);
    errorElement.textContent = validationMessage;
}

function hideError(form, input, validationConfig) {
    const errorElement = form.querySelector(`.${input.id}-error`);
    input.classList.remove(validationConfig.inputErrorClass);
    errorElement.textContent = '';
}

function toggleButtonState(inputList, buttonElement) {
    if(hasInvalidInput(inputList)) buttonElement.disabled = true;
    else buttonElement.disabled = false;
}

function hasInvalidInput(inputList) {
    return inputList.some((input) => {
        return !input.validity.valid;
    });
}

/* ФУНКЦИОНАЛЬНОСТЬ СБРОСА ОШИБОК С ПРОШЛОГО ОТКРЫТИЯ */
function clearValidation(form, validationConfig) {
    const inputList = form.querySelectorAll(validationConfig.inputSelector);
    inputList.forEach((input) => {
        hideError(form, input, validationConfig);
    });
    toggleButtonState(Array.from(inputList), form.querySelector(validationConfig.submitButtonSelector));
}

export { enableValidation, clearValidation };