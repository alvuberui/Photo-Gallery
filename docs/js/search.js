"user strict";

import { parseHTML } from "/js/utils/parseHTML.js" ;
import { usersAPI } from "/js/api/users.js";
import { photoscategoriesAPI } from "./api/photoscategories.js";
import { photosAPI } from "./api/photos.js";
import { categoriesAPI } from "./api/categories.js";
import { photoRenderer } from "/js/renderers/photo.js" ;




let urlParams = new URLSearchParams(window.location.search);
let busqueda = urlParams.get("search");

function main() { //Funcion principal que se ejecuta una vez se cargue la página
    let container = document.querySelector(".container");
    
    let html = `
    <div class="container-all">
        <div class="container-usuarios">
            <div class="row" id="contenedor-texto">
                <div class="col-md">
                    <h3 style="text-align: center;">Resultados de la búsqueda: "${busqueda}"</h3>
                </div>
            </div>
            
            <div class="row">
                <div class="col-md" id="contenedor-boton">
                    <button type="button" id="boton" class="boton-usuarios">Usuarios</button>
                </div>
                <div class="col-md" id="contenedor-boton">
                    <button type="button" id="boton" class="boton-fotos">Fotos</button>
                </div>
            </div>
            
            <div class="row">

                <div class="col-md" id="contenedor-contenido">
                    <h4 style="text-align: center;">Usuarios encontrados:</h4>

                    <div class="row">
                        <div class="col-md" id="div-usuarios">
                                <a href="" class="enlace1"><img src="" alt="Avatar" id="avatar-cuerpo"></a>
                                <a href="" class="enlace2"><h5><p class="usuario"></p></h5></a>
                        </div>
                    </div>
                </div>

                <div class="col-md" id="contenedor-contenido-fotos">
                    <h4 style="text-align: center;">Fotos encontradas: </h4>
                    <div class="row">
                        <div clas="col-md" id="columna-fotos">
                            <div class="card-columns" id="gallery"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

    let card = parseHTML(html);
    loadUsername(card, busqueda);
    loadPhotoProfile(card, busqueda)
    loadUserId(card, busqueda);
    loadPhotos(card, busqueda);
    container.appendChild(card);

    let fotosDefault = container.querySelector("#contenedor-contenido-fotos");
    fotosDefault.style.display = "none";

    let botonFotos = container.querySelector(".boton-fotos");
    botonFotos.onclick = cargaFotos;

    let botonUsuarios = container.querySelector(".boton-usuarios");
    botonUsuarios.onclick = cargaUsuarios;
}

function loadPhotoProfile(card,busqueda) {
    usersAPI.getByUsername(busqueda)
    .then(users => {
        if(users[0].num > 0) {
            let profilePhoto = users[0].profilePhoto;
            let selectorPhotoProfile = card.querySelector("#avatar-cuerpo");

            selectorPhotoProfile.src = profilePhoto;
        }
        else {
            let selectorPhotoProfile = card.querySelector("#avatar-cuerpo");
            selectorPhotoProfile.src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
        }
    });
}

/*
* Se obtiene el usuarioId de la foto para cargar enlaces
*/
function loadUserId(card,busqueda) {
    usersAPI.getByUsername(busqueda)
    .then(users => {
        if(users[0].num > 0) {
            let userId = users[0].userId;
            let selectorenlace = card.querySelector(".enlace1");
            let selectorenlace2 = card.querySelector(".enlace2");

            selectorenlace.href = "profile.html?userId="+userId;
            selectorenlace2.href = "profile.html?userId="+userId;
        }
    });
}

/*
* Se obtiene el username
*/
function loadUsername(card,busqueda) {
    usersAPI.getByUsername(busqueda)
    .then(users => {
        if(users[0].num > 0) {
            let username = users[0].username;

            let selectorUsername = card.querySelector(".usuario");

            selectorUsername.textContent ="@" + username;
        }
        else {
            let p = card.querySelector(".usuario");
            p.textContent = "No existe ningún usuario con ese nombre de usuario";
        }
    });
}

/*
* Se obtienen las fotos
*/
function loadPhotos(card, busqueda) {
    let element = card.querySelector(".card-columns");

    categoriesAPI.getIdByName(busqueda)
    .then(categoriesIds => {
        let categoryId = categoriesIds[0].categoryId;

        photoscategoriesAPI.getByCategoryId(categoryId)
        .then(photosCategories => {

            for(let i=0; i < photosCategories.length; i++) {
                let photoId = photosCategories[i].photoId;

                photosAPI.getById(photoId)
                .then(photos => {
                    let photo = photos[0];

                    let c=photoRenderer.asCardMini(photo);
                    element.appendChild(c);
                });
            }
        });
    });
}

/*
* Se cargan las fotos y se ocultan los usuarios
*/
function cargaFotos(event) {
    let parent = event.target;
    let parent1 = parent.parentNode;
    let parent2 = parent1.parentNode;
    let parent3 = parent2.parentNode;
    let container = parent3.parentNode;
    let nodosEliminar = container.querySelector("#contenedor-contenido");
    let nodosInsertar = container.querySelector("#contenedor-contenido-fotos");
    nodosEliminar.style.display = "none";
    nodosInsertar.style.display = "block"
}

/*
* Se cargan los usuario y se ocultan las fotos
*/
function cargaUsuarios(event) {
    let parent = event.target;
    let parent1 = parent.parentNode;
    let parent2 = parent1.parentNode;
    let parent3 = parent2.parentNode;
    let container = parent3.parentNode;
    let nodosInsertar = container.querySelector("#contenedor-contenido");
    let nodosEliminar = container.querySelector("#contenedor-contenido-fotos");
    nodosEliminar.style.display = "none";
    nodosInsertar.style.display = "block"
}


document.addEventListener("DOMContentLoaded", main);