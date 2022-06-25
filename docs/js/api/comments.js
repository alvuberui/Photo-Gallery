"use_strict"
 import { BASE_URL, requestOptions } from "./common.js";

 const commentsAPI = {
    getAll: function () { //Obtiene todos los comentarios ordenados por fecha
        return new Promise(function(resolve, reject) {
            axios
                .get(`${BASE_URL}/comments`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },

    getNumByPhotoId(photoId) { //Obtiene el numero de comentarios dada la id de una foto
        return new Promise(function(resolve, reject) {
            axios
                .get(`${BASE_URL}/comments/numByPhotoId/${photoId}`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },

    getById: function (commentId) { //Obtiene el comentario a partir de su id
        return new Promise(function(resolve, reject) {
            axios
                .get(`${BASE_URL}/comments/${commentId}`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },

    getFromPhotoId: function(photoId) { //Obtiene todos los comentarios a partir de una photoId
        return new Promise(function(resolve, reject) {
            axios
                .get(`${BASE_URL}/comments/fromPhotoId/${photoId}`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },

    create: function(formData) {
        return new Promise (function(resolve,reject) {
            axios
                .post(`${BASE_URL}/comments`,formData ,requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },
 };

 export { commentsAPI };