export default class APIHelper {
  /**
   * Retrieves the locally stored token.
   */
  static getToken() {
    return localStorage.getItem('token');
  }

  /**
   * Returns whether the current user is
   * logged in.
   */
  static isLoggedIn() {
    if (localStorage.getItem('token') !== null) {
      return true;
    }
    return false;
  }

  /**
   * Clears localStorage of the user's token.
   */
  static logout() {
    localStorage.clear();
  }

  /**
   * Stores a token in local storage to be used
   * in authorizing requests.
   * @param {String} token Token to be saved.
   */
  static saveToken(token) {
    localStorage.setItem('token', token);
  }

  /**
   * Sends GET request to API and validates response, returning the data in a promise.
   * @param {String} url URL for the API request.
   */
  static GET(url) {
    let headers = {};
    if (APIHelper.isLoggedIn()) {
      headers = { Authorization: `Token ${APIHelper.getToken()}` };
    }
    return fetch(url, {
      method: 'GET',
      headers,
    }).then((res) => {
      if (!APIHelper._checkStatus(res)) {
        return res.json().then(blob => Promise.reject(blob.error));
      }
      return res.json().then(blob => Promise.resolve(blob.data));
    });
  }

  /**
   * Sends POST request to API and validates response, returning the data in a promise.
   * @param {String} url URL for the API request.
   * @param {Object} data Any data you want to pass to the server.
   */
  static POST(url, data) {
    // performs api calls sending the required authentication headers
    let headers = {};
    if (APIHelper.isLoggedIn()) {
      headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Token ${APIHelper.getToken()}`,
      };
    } else {
      headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(data),
    };

    return fetch(url, {
      headers,
      ...options
    })
      .then((res) => {
        if (!APIHelper._checkStatus(res)) {
          return res.json().then(blob => Promise.reject(blob.error));
        }
        return res.json().then(blob => Promise.resolve(blob.data));
      });
  }

  /**
   * Sends PUT request to API and validates response, returning the data in a promise.
   * @param {String} url URL for the API request.
   * @param {Object} data Any data you want to pass to the server.
   */
  static PUT(url, data) {
    // performs api calls sending the required authentication headers
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${APIHelper.getToken()}`,
    };

    const options = {
      method: 'PUT',
      body: JSON.stringify({ data }),
    };

    return fetch(url, {
      headers,
      ...options,
    })
      .then((res) => {
        if (!APIHelper._checkStatus(res)) {
          return res.json().then(blob => Promise.reject(blob.error));
        }
        return res.json().then(blob => Promise.resolve(blob.data));
      });
  }

  /**
   * Checks the status code of a given response, return true or throwing an error.
   * @param {Object} response Any data you want to pass to the server.
   * @returns {Boolean} If the reponse code is good (>=200, <300)
   */
  static _checkStatus(response) {
    // Raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
      return true;
    }
    return false;
  }
}
