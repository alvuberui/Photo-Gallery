"use_strict"
 import { BASE_URL, requestOptions } from "./common.js";

 const photoscategoriesAPI = {
    getAll: function () {
        return new Promise(function(resolve, reject) {
            axios
                .get(`${BASE_URL}/photoscategories`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },

    getByPhotoId: function (photoId) { //Obtiene a partir de la photoId
        return new Promise(function(resolve, reject) {
            axios
                .get(`${BASE_URL}/photoscategories/byPhotoId/${photoId}`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },

    getNumByPhotoId: function (photoId) { //Get num by photoId
        return new Promise(function(resolve, reject) {
            axios
                .get(`${BASE_URL}/photoscategories/numcategoryId/${photoId}`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },

    getByCategoryId: function (categoryId) { //Obtiene a partir de la id de la categoria
        return new Promise(function(resolve, reject) {
            axios
                .get(`${BASE_URL}/photoscategories/getByCategoryId/${categoryId}`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },

    create: function(formData) {
        return new Promise (function(resolve,reject) {
            axios
                .post(`${BASE_URL}/photoscategories`,formData ,requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },

    deleteByPhotoIdCategoryId: function(photoId, categoryId) {
        return new Promise (function(resolve,reject) {
            axios
                .delete(`${BASE_URL}/photoscategories/${photoId}/${categoryId}`, requestOptions
                )
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    }

    
 };

 export { photoscategoriesAPI };