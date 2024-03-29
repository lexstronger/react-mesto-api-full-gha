class Api {
  constructor({basePath, headers}) {
    this._basePath = basePath;
    this._headers = headers;
  }

  _getJson(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._getJson)
  }

  getInitialCards() {
    return this._request(
      `${this._basePath}/cards`, {
        headers: this._headers,
      }
    )
  }

  getCurrentUser() {
    return this._request(
      `${this._basePath}/users/me`, {
        headers: this._headers,
      }
    )
  }

  editProfileInfo(data) {
    return this._request(
      `${this._basePath}/users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          about: data.about,
        })
      }
    )
  }

  addNewCard(data) {
    return this._request(
      `${this._basePath}/cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          link: data.link,
        })
      }
    )
  }

  editProfileAvatar(data) {
    return this._request(
      `${this._basePath}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar: data.avatar,
        })
      }
    )
  }

  deleteCard(id) {
    return this._request(
      `${this._basePath}/cards/${id}`, {
        method: "DELETE",
        headers: this._headers,
      }
    )
  }

  putLike(id) {
    return this._request(
      `${this._basePath}/cards/${id}/likes`, {
        method: "PUT",
        headers: this._headers,
      }
    )
  }

  deleteLike(id) {
    return this._request(
      `${this._basePath}/cards/${id}/likes`, {
        method: "DELETE",
        headers: this._headers,
      }
    )
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked === true) {
      return this.putLike(id)
    } else {
      return this.deleteLike(id)
    }
  }

  setToken(token) {
    this._headers.authorization = `Bearer ${token}`;
  }
}

const api = new Api({
  basePath: 'https://api.lexstronger.nomoreparties.co',
  headers: {
    authorization: '',
    'Content-Type': 'application/json'
  }
});

export default api;