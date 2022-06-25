"use_strict"

import { BASE_URL, requestOptions} from './common.js';

const usersAPI = {

    getAll: function () {
        return new Promise(function(resolve, reject) {
            axios
                .get(`${BASE_URL}/users`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },

    getById: function (userId) {
        return new Promise(function(resolve, reject) {
            axios
                .get(`${BASE_URL}/users/${userId}`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },

    getByUsername: function(username) { //BIEN
        return new Promise(function(resolve, reject) {
            axios
                .get(`${BASE_URL}/users/getByUsername/${username}`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    }

}

export { usersAPI };