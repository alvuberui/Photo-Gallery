"user strict";
import { messageRenderer } from "/js/renderers/messages.js";
import { photoValidator } from "/js/validators/photos.js";
import { photosAPI } from "/js/api/photos.js";
import { inappropriateswordsAPI } from "/js/api/InappropriatesWords.js";
import { sessionManager } from "/js/utils/session.js";
import { commentsAPI } from "/js/api/comments.js";

let urlParams = new URLSearchParams(window.location.search);
let photoId = urlParams.get("photoId");
let currentPhoto = null;

function main() {
    if(photoId != null) {
        loadCurrentPhoto();
    }
    let registerForm = document.getElementById("post-form");
    let userId = sessionManager.getLoggedId();

    photosAPI.getNumPhotosByUserId(userId) //Se comprueba que el usuario no tenga más de 50 fotos
            .then(photos => {
                let numPhotos = photos[0].numPhotos;
                if(numPhotos < 50) {
                    registerForm.onsubmit = handleSubmitPost;
                }
                else {
                    registerForm.onsubmit = errorFuncionLimite;
                }
            });
}

/*
* Se comprueba en cliente si tiene 50 fotos ya subidas para enviarle el error.
*/
function errorFuncionLimite(event) {
    event.preventDefault;
    window.alert("Has llegado al límite de fotos");
}

/*
* Si lo que se quiere es actualizar la foto se cargan los datos por defecto
*/
function loadCurrentPhoto() {
    let urlInput = document.getElementById("input-foto");
    let titleInput = document.getElementById("input-titulo");
    let descriptionInput = document.getElementById("input-descripcion");
    let visibilityInput = document.getElementById("input-visibilidad");


    photosAPI.getById(photoId)
        .then(photos => {
            currentPhoto = photos[0];
            urlInput.value = currentPhoto.url;
            titleInput.value = currentPhoto.title;
            descriptionInput.value = currentPhoto.description;
            visibilityInput.value = currentPhoto.visibility;
        })
        .catch(error => messageRenderer.showErrorMessage(error));
    }

/*
* En primer lugar se comprueba si tiene palabras inapropiadas
* En segundo lugar se comprueba si tiene errores
* En tercer lugar se comprueba si se quiere actualizar o publicar
* En cuarto lugar si se quiere actualizar se comprueba si la foto tiene comentarios
* ya que si tiene comentarios no se puede pasar a privada.
*/
function handleSubmitPost(event) {
    event.preventDefault();

    inappropriateswordsAPI.getAll() //Se comprueba que no tenga palabras inapropiadas
    .then(palabras => {
   
        let form = event.target;
        let formData = new FormData(form);
        let errors = photoValidator.validatePost(formData);

        let title = formData.get('title');
        let description = formData.get('description');

        for(let palabra of palabras) {
            let palabraInapropiada = palabra.word;

            if(title.includes(palabraInapropiada)) {
                errors.push("El titulo contiene la palabra inapropiada: " + palabraInapropiada)
            }

            if(description.includes(palabraInapropiada)) {
                errors.push("La descripción contiene la palabra inapropiada: " + palabraInapropiada)
            }
        }


        if(errors.length > 0) {
            let errorsDiv = document.getElementById("errors");
            errorsDiv.innerHTML = "";
    
            for(let error of errors) {
                messageRenderer.showErrorMessage(error);
            }
        }
        else {
            if(currentPhoto === null) {
                formData.append("userId", sessionManager.getLoggedId());
                photosAPI.create(formData)
                    .then(data => window.location.href = "index.html")
                    .catch(error => messageRenderer.showErrorMessage(error));
            }
            else {
                commentsAPI.getNumByPhotoId(photoId) //Una foto con comentarios no se puede pasar a privada
                .then(comments => {
                    let num = comments[0].n;
                    if(num>0 && formData.get('visibility') == 'Private') {
                        messageRenderer.showErrorMessage('Una foto con comentarios no se puede pasar a privada');
                    }
                    else {
                        formData.append("userId", currentPhoto.userId);
                        formData.append("date", currentPhoto.date);
            
                        photosAPI.update(photoId, formData)
                            .then(data => window.location.href = "index.html")
                            .catch(error => messageRenderer.showErrorMessage(error));
                    }
                })
            }
        }   
    })
}

document.addEventListener("DOMContentLoaded", main);