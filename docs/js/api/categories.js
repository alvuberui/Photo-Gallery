"use_strict"
 import { BASE_URL, requestOptions } from "./common.js";

 const categoriesAPI = {
    getAll: function () { //Obtiene todas las categorias
        return new Promise(function(resolve, reject) {
            axios
                .get(`${BASE_URL}/categories`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },

    getById: function (categoryId) { //Obtiene la categoria a partir de la categoriaId
        return new Promise(function(resolve, reject) {
            axios
                .get(`${BASE_URL}/categories/${categoryId}`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },

    getNumById: function (categoryId) { //Obtiene 1 si existe la categoria, 0 si no
        return new Promise(function(resolve, reject) {
            axios
                .get(`${BASE_URL}/categories/getNumById/${categoryId}`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },

    getNumByName: function (name) { //Obtiene 1 si existe 0 si no existe la categoría
        return new Promise(function(resolve, reject) {
            axios
                .get(`${BASE_URL}/categories/getNumByName/${name}`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },



    getIdByName: function (name) { //Obtiene el id a partir del nombre de la categoría
        return new Promise(function(resolve, reject) {
            axios
                .get(`${BASE_URL}/categories/getByName/${name}`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },

    create: function(formData) { //Crea una nueva categoría
        return new Promise (function(resolve,reject) {
            axios
                .post(`${BASE_URL}/categories`,formData ,requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },
 }

 export { categoriesAPI };