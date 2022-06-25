"use_strict"
 import { BASE_URL, requestOptions } from "./common.js";

 const inappropriateswordsAPI = {
    getAll: function () {
        return new Promise(function(resolve, reject) {
            axios
                .get(`${BASE_URL}/InappropriatesWords`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },
 }

 export { inappropriateswordsAPI } ;