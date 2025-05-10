const getProfileInfo = new Promise(function(resolve, reject) {
    fetch('https://mesto.nomoreparties.co/v1/wff-cohort-37/users/me', {
        headers: {
            authorization: '2a964a3a-30c9-4a52-983e-4a7ed5570f90'
        }
    })
    .then((res) => {
        if(res.ok) return res.json()
        return reject(`Что-то пошло не так: ${res.status}`);
    })
    .then(data => resolve(data))
    .catch((err) => {
        reject(err);
    })
});

const getCardsInfo = new Promise(function(resolve, reject){
    fetch('https://mesto.nomoreparties.co/v1/wff-cohort-37/cards', {
        headers: {
            authorization: '2a964a3a-30c9-4a52-983e-4a7ed5570f90'
        }
    })
    .then((res) => {
        if(res.ok) return res.json()
        return reject(`Что-то пошло не так: ${res.status}`);
    })
    .then(data => resolve(data))
    .catch((err) => {
        reject(err);
    })
});

const patchProfileInfo = (name, description) => {
    return fetch('https://nomoreparties.co/v1/wff-cohort-37/users/me', {
        method: 'PATCH',
        headers: {
            authorization: '2a964a3a-30c9-4a52-983e-4a7ed5570f90',
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            about: description
        })
    })
};

const patchAvatar = (linkValue) => {
    return fetch('https://nomoreparties.co/v1/wff-cohort-37/users/me/avatar', {
        method: 'PATCH',
        headers: {
            authorization: '2a964a3a-30c9-4a52-983e-4a7ed5570f90',
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            avatar: linkValue
        })
    })
};

const postCard = (name, link) => {
    return fetch('https://nomoreparties.co/v1/wff-cohort-37/cards', {
        method: 'POST',
        headers: {
            authorization: '2a964a3a-30c9-4a52-983e-4a7ed5570f90',
            "content-type": 'application/json'
        },
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
};

const putLike = (id) => {
    return fetch(`https://nomoreparties.co/v1/wff-cohort-37/cards/likes/${id}`, {
        method: 'PUT',
        headers: {
            authorization: '2a964a3a-30c9-4a52-983e-4a7ed5570f90'
        }
    })
};

const deleteLike = (id) => {
    return fetch(`https://nomoreparties.co/v1/wff-cohort-37/cards/likes/${id}`, {
        method: 'DELETE',
        headers: {
            authorization: '2a964a3a-30c9-4a52-983e-4a7ed5570f90'
        }
    })
};

export { getProfileInfo, getCardsInfo, patchProfileInfo, patchAvatar, postCard, putLike, deleteLike };