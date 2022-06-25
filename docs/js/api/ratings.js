"use_strict"
 import { BASE_URL, requestOptions } from "./common.js";

 const ratingsAPI = {
    getAll: function () {
        return new Promise(function(resolve, reject) {
            axios
                .get(`${BASE_URL}/ratings`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },

    getById: function (ratingId) {
        return new Promise(function(resolve, reject) {
            axios
                .get(`${BASE_URL}/ratings/${ratingId}`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },

    getNumByUserIdPhotoId: function (ratingId, photoId) { //Obtiene el numero a partir del ratingId y photoId
        return new Promise(function(resolve, reject) {
            axios
                .get(`${BASE_URL}/ratings/numRatingsByPhotoIdUserId/${photoId}/${ratingId}`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },

    getByUserIdPhotoId: function(userId, photoId) { //Obtiene a partir de userId y photoId
        return new Promise(function(resolve, reject) {
            axios
                .get(`${BASE_URL}/ratings/byUserIdPhotoId/${photoId}/${userId}`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },

    getByPhotoId: function (photoId) { //Obtiene por la fotoId
        return new Promise(function(resolve, reject) {
            axios
                .get(`${BASE_URL}/ratings/byPhotoId/${photoId}`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },

    create: function(formData) {
        return new Promise (function(resolve,reject) {
            axios
                .post(`${BASE_URL}/ratings`,formData,requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },

    update: function(formData) {
        return new Promise (function(resolve,reject) {
            axios
                .put(`${BASE_URL}/ratings`,formData,requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },
 };

 export { ratingsAPI };