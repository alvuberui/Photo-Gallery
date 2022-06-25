"user strict";
import { messageRenderer } from "/js/renderers/messages.js";
import { photoValidator } from "/js/validators/photos.js";
import { photosAPI } from "/js/api/photos.js";
import { categoriesAPI } from "/js/api/categories.js";
import { photoscategoriesAPI } from "./api/photoscategories.js";

let urlParams = new URLSearchParams(window.location.search);
let photoId = urlParams.get("photoId");

function main() {
    let deleteForm = document.getElementById("delete-form");
    deleteForm.onsubmit = handleSubmitDelete;

    let createForm = document.getElementById("create-form");
    createForm.onsubmit = handleSubmitCreate;
}

/*
* Para añadir una categoría, si ya existe se asocia a la foto, si no existe se crea 
* la categoría y se asocia a la foto.
*/
function handleSubmitCreate(event) {
    event.preventDefault();
    let form = event.target;
    let formDataCategory = new FormData(form);
    let formDataPhotoCategories = new FormData(form);
    let categoryName = formDataCategory.get("name");

    categoriesAPI.getNumByName(categoryName)
        .then(num => {
            let existe = num[0].numero;

            if(existe > 0) {
                categoriesAPI.getIdByName(categoryName) 
                    .then(categories => {
                        let categoryId = categories[0].categoryId;
                        formDataPhotoCategories.append("photoId", photoId);
                        formDataPhotoCategories.append("categoryId", categoryId);
                        formDataPhotoCategories.delete("name");

                        photoscategoriesAPI.create(formDataPhotoCategories)
                            .then(data => window.location.href = "viewphoto.html?photoId=" + photoId)
                            .catch(error => messageRenderer.showErrorMessage(error));
                    });
            }
            else {
                categoriesAPI.create(formDataCategory)
                    .then(data => {

                        categoriesAPI.getIdByName(categoryName) 
                        .then(categories => {
                            let nuevaId = categories[0].categoryId;

                            formDataPhotoCategories.append("photoId", photoId);
                            formDataPhotoCategories.append("categoryId", nuevaId);
                            formDataPhotoCategories.delete("name");

                            photoscategoriesAPI.create(formDataPhotoCategories)
                                .then(data => window.location.href = "viewphoto.html?photoId=" + photoId)
                        
                        });
                    });
            }
        });    
}

/*
* Elimina una categoria de la foto, pero la categoría sigue estando en la base de datos
*/
function handleSubmitDelete(event) {
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);
    let categoryName = formData.get("name");

    categoriesAPI.getIdByName(categoryName) 
        .then(categories => {
            let categoryId = categories[0].categoryId;
            console.log(categoryId);

            photoscategoriesAPI.deleteByPhotoIdCategoryId(photoId, categoryId)
                .then(data => window.location.href = "viewphoto.html?photoId=" + photoId)
                .catch(error => messageRenderer.showErrorMessage(error));
        }); 
}


document.addEventListener("DOMContentLoaded", main);