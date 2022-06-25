"use_strict"
 import { BASE_URL, requestOptions } from "./common.js";

 const photosAPI = {

    getAll: function () { //Obtiene todas las fotos ordenadas de más recientes a más antiguas
        return new Promise(function(resolve, reject) { 
            axios
                .get(`${BASE_URL}/photos`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },

    getAllIndex: function (userId) {
        return new Promise(function(resolve, reject) {
            axios
                .get(`${BASE_URL}/photos/index/${userId}`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },

    getAllPublics: function () { //Obtiene todas las fotos que son publicas
        return new Promise(function(resolve, reject) {
            axios
                .get(`${BASE_URL}/photos/publics`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },

    getNumPhotosByUserId: function (userId) { //Obtiene el numero de fotos por usuario
        return new Promise(function(resolve, reject) {
            axios
                .get(`${BASE_URL}/photos/numPhotosByUserId/${userId}`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },

    getById: function (photoId) { //Obtiene la foto por la id
        return new Promise(function(resolve, reject) {
            axios
                .get(`${BASE_URL}/photos/${photoId}`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },

    getPublicsPhotosByUserId: function(userId) { //Obtiene las fotos publicas a partir de un usuario
        return new Promise(function(resolve, reject) {
            axios
                .get(`${BASE_URL}/photos/getPublicsPhotosByUserId/${userId}`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },

    getPrivatesPhotosByUserId: function(userId) { //Obtiene las fotos privadas a partir del usuario
        return new Promise(function(resolve, reject) {
            axios
                .get(`${BASE_URL}/photos/getPrivatesPhotosByUserId/${userId}`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },

    create: function(formData) {
        return new Promise (function(resolve,reject) {
            axios
                .post(`${BASE_URL}/photos`,formData ,requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },

    update: function (photoId,formData) {
        return new Promise (function(resolve,reject) {
            axios
                .put(`${BASE_URL}/photos/${photoId}`,formData,
                requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },

    delete: function(photoId) {
        return new Promise (function(resolve,reject) {
            axios
                .delete(`${BASE_URL}/photos/${photoId}`, requestOptions
                )
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    }
};

 export { photosAPI };