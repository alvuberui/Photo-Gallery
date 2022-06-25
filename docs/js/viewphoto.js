"user strict";

import { photosAPI } from "/js/api/photos.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { parseHTML } from "/js/utils/parseHTML.js" ;
import { ratingsAPI } from "/js/api/ratings.js";
import { usersAPI } from "/js/api/users.js";
import { categoriesAPI } from "/js/api/categories.js";
import { photoscategoriesAPI } from "/js/api/photoscategories.js";
import { sessionManager } from "/js/utils/session.js";

import { commentsAPI } from "/js/api/comments.js";

let urlParams = new URLSearchParams(window.location.search);
let photoId = urlParams.get("photoId");

function main() { //Funcion principal que se ejecuta una vez se cargue la página
    let container = document.querySelector(".container");
    
    let html = `<div class="row" id="fila-foto">
        <div class="col-md" id="columna-foto">

            <div class="card" style="max-height: 45rem; max-width: 45rem;">
                <div class="card-header">
                    <div class="row">

                        <div class="col-md-8" id="columna-foto">
                            <a href="profile.html"><img src="" alt="Avatar" class="avatar"></a>
                            <a href="profile.html">
                                <p id="nombre-usuario-header"></p>
                            </a>
                        </div>

                        <div class="col-md-4" id="columna-botones">
                            <a href="post.html?photoId=${photoId}" id="modificar"><ion-icon name="settings-outline" id="boton-modificar" style="font-size:50px"></ion-icon></a>
                            <button id="button-delete"><ion-icon name="trash-outline" id="icono-modificar" ></ion-icon></button>
                            <a href="category.html?photoId=${photoId}" id="cat"><ion-icon name="duplicate-outline" id="boton-categoria" style="font-size:50px"></ion-icon></ion-icon></a>
                        </div>
                    </div>
                </div>

                <div class="card-body">
                    <img class="card-img-top" src="">
                </div>

                <div class="card-footer" id="footer1">
                    <div class="row">

                        <div class="col-md-4" id="fecha">
                            <p id="fecha-p"></p>
                        </div>

                        <div class="col-md-4" id="calificacion">
                            <p id="calificacion"></p>
                        </div>

                        <div class="col-md-4" id="estrellas">
                            <form id="formulario">
                                <div class="col-md" id="estrellas"
                                    style="max-width: 236px; margin-left: auto; margin-right: auto;">
                                    <div class="rate">
                                        <input type="radio" id="star5" name="value" value="5" />
                                        <label for="star5" title="text">5 stars</label>
                                        <input type="radio" id="star4" name="value" value="4" />
                                        <label for="star4" title="text">4 stars</label>
                                        <input type="radio" id="star3" name="value" value="3" />
                                        <label for="star3" title="text">3 stars</label>
                                        <input type="radio" id="star2" name="value" value="2" />
                                        <label for="star2" title="text">2 stars</label>
                                        <input type="radio" id="star1" name="value" value="1" />
                                        <label for="star1" title="text">1 star</label>
                                    </div>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>

                <div class="card-footer" id="footer2">
                    <h5 class="card-title" id="titulo"></h5>
                    <h6 class="card-tittle" id="categoria"></h6>
                    <p class="card-text" id="descripcion"></p>
                    <a href="comments.html?photoId=${photoId}" class="btn btn-primary">Ver comentarios</a>
                </div>
            </div>
        </div>
    </div>`;
    let card = parseHTML(html);

    loadUsernameCard(card,photoId);
    loadPhotoProfile(card, photoId);
    loadPhoto(card, photoId);
    loadDate(card, photoId);
    loadRating(card, photoId);
    loadTitle(card, photoId);
    loadCategory(card, photoId);
    loadDescription(card, photoId);
    loadRatingByCurrentUser(card, photoId);
    ocultar(card,photoId);

    let formulario = card.querySelector("#formulario");
    formulario.onchange = handleSubmitPost;


    container.appendChild(card);
    
    let deleteBtn = document.querySelector("#button-delete");
    deleteBtn.onclick = handleDelete;

}


/*
* Al puntuar se envía al servidor. Primero se comprueba si el usuario ya ha hecho
* algun rating en esta foto, en ese caso se actualiza, en el caso de que no se crea
* una nueva puntuación para ese usuario y esa foto.
*/
function handleSubmitPost(event) {
    event.preventDefault();
    let form = event.target;
    let userId = sessionManager.getLoggedId();

    let formData = new FormData();

    ratingsAPI.getNumByUserIdPhotoId(userId, photoId)
        .then(num => {
            let numRatings = num[0].n;
            if(numRatings==0) {
                formData.append("userId", sessionManager.getLoggedId());
                formData.append("photoId", photoId);
                formData.append("value", form.value);

                ratingsAPI.create(formData)
                    .then(data => window.location.href = "viewphoto.html?photoId=" + photoId)
                    .catch(error => messageRenderer.showErrorMessage(error));
            }
            else {
                formData.append("userId", sessionManager.getLoggedId());
                formData.append("photoId", photoId);
                formData.append("value", form.value);

                ratingsAPI.update(formData)
                    .then(data => window.location.href = "viewphoto.html?photoId=" + photoId)
                    .catch(error => messageRenderer.showErrorMessage(error));
            }
        })
      
}

/*
* Si no es el propietario de la foto se coultan los botones de eliminar,
* modificar y crear o eliminar categorias
*/
function ocultar(card, photoId) {
    let botonEliminar = card.querySelector("#button-delete");
    let botonCategorias = card.querySelector("#cat");
    let botonModificar = card.querySelector("#modificar");

    photosAPI.getById(photoId)
    .then(photos => {
        let userId = photos[0].userId;

        if(userId != sessionManager.getLoggedId()) {
            botonEliminar.style.display = "none";
            botonCategorias.style.display = "none";
            botonModificar.style.display = "none";
        }
    })
}

/*
* En el caso de que se quiera eliminar, se comprueba si la foto tiene
* comentarios, en el caso de que tenga no se puede eliminar, si no tiene
* se elimina correctamente y se redirige al index.
*/
function handleDelete(event) {
    commentsAPI.getNumByPhotoId(photoId)
    .then(comments => {
        let num = comments[0].n;
        if(num>0) {
            window.alert("No se puede eliminar una foto que contiene comentarios");
        }
        else {
            let answer = confirm ("¿Desea eliminar la foto?");
            if(answer) {
                photosAPI.delete(photoId)
                    .then(data => window.location.href = "index.html")
                    .catch(error => messageRenderer.showErrorMessage(error));
            }
        }
    })
}

/*
* Se carga el usuario de la card.
*/
function loadUsernameCard(card, photoId) {
    photosAPI.getById(photoId)
    .then(photos => {
        let userId = photos[0].userId;

        usersAPI.getById(userId)
        .then(users => {
            let username = users[0].username;
            let p = card.querySelector("#nombre-usuario-header");
            p.textContent = username;
        })
    });
}

/*
* Se carga la foto de perfil
*/
function loadPhotoProfile(card, photoId) {
    photosAPI.getById(photoId)
    .then(photos => {
        let userId = photos[0].userId;

        usersAPI.getById(userId)
        .then(users => {
            let photoProfile = users[0].profilePhoto;
            let p = card.querySelector(".avatar");
            p.src = photoProfile;
        })
    });
}

/*
* Se carga la foto
*/
function loadPhoto(card, photoId) {
    photosAPI.getById(photoId)
    .then(photos => {
        let url = photos[0].url;
        let p = card.querySelector(".card-img-top");
        p.src = url;
    })
}

/*
* Se carga la fecha
*/
function loadDate(card, photoId) {
    photosAPI.getById(photoId)
    .then(photos => {
        let date = photos[0].date;

        let p = card = card.querySelector("#fecha-p");
        p.textContent = date;
    })
}

/*
* Se obtiene las calificaciones
*/
function loadRating(card, photoId) {
    
    ratingsAPI.getByPhotoId(photoId)
        .then(response => {
         let rating = response[0].rating;
        if(rating == null){
            rating = 0;
        }
        let p = card = card.querySelector("#calificacion");
        p.textContent = 'Nota: ' +  rating;
    });
}

/*
* Se carga el titulo
*/
function loadTitle(card, photoId) {
    photosAPI.getById(photoId)
    .then(photos =>{
        let title = photos[0].title;
        let p = card.querySelector("#titulo");
        p.textContent = title;
    })
}

/*
* Se cargan las categorias
*/
function loadCategory(card, photoId) {

    photoscategoriesAPI.getNumByPhotoId(photoId)
        .then(response1 => {
            let numCategoryId = response1[0].num;
            let p = card = card.querySelector("#categoria");

            if(numCategoryId == 0) {
                p.textContent = "Sin categoría";
            }
            else {
                photoscategoriesAPI.getByPhotoId(photoId)
                .then(response2 => {
                    
                    for(let i = 0; i < response2.length; i++) {
                        let categoryId = response2[i].categoryId;
                        
                        categoriesAPI.getById(categoryId)
                        .then(response3 => {
                            let category = response3[0].name;
                        
                            if(numCategoryId > 1 ) {
                                p.textContent = p.textContent + " " + category;
                            }
                            else {
                                p.textContent = category;
                            }
                        }); 
                    }
                });
            }     
        });
}

/*
* Se carga la descripcion
*/
function loadDescription(card, photoId) {
    photosAPI.getById(photoId)
    .then(photos =>{
        let description = photos[0].description;
        let p = card.querySelector("#descripcion");
        p.textContent = description;
    })
}

/*
* Si ya existe una valoracion de ese usuario para esa foto se carga por defecto
*/
function loadRatingByCurrentUser(card, photoId) {
    let userId = sessionManager.getLoggedId();

    ratingsAPI.getNumByUserIdPhotoId(userId, photoId)
    .then(num => {
        let numRatings = num[0].n;
        if(numRatings!=0) {
            ratingsAPI.getByUserIdPhotoId(userId, photoId)
            .then(rating =>{
                let ratingUser = rating[0].value;
                let radiobtn = document.getElementById("star"+ratingUser);
                radiobtn.checked = true;
            })
        }
    })
}

document.addEventListener("DOMContentLoaded", main); //Función que llama al main una vez cargada la página