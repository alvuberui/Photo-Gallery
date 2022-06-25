"user strict";

import { commentsAPI } from "/js/api/comments.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { inappropriateswordsAPI } from "/js/api/InappropriatesWords.js";

import { photosAPI } from "/js/api/photos.js";
import { usersAPI } from "/js/api/users.js";
import { commentRenderer } from "/js/renderers/comment.js" ;
import { parseHTML } from "/js/utils/parseHTML.js" ;
import { sessionManager } from "/js/utils/session.js";

let urlParams = new URLSearchParams(window.location.search);
let photoId = urlParams.get("photoId");

/*
* Función principal al cargar la página 
*/
function main() { //Funcion principal que se ejecuta una vez se cargue la página
    let container = document.querySelector(".container");

    let html = 
    `<div class="card" style="max-height: 45rem; max-width: 45rem;">
        <div class="card-header">
            <a href="" id="a-foto-perfil"><img src="" id="username-photo" alt="Avatar" class="avatar"></a>
            <a href="" class="usuario">
                <p id="nombre-usuario-header"></p>
            </a>
        </div>

        <div class="card-body">
            <img class="card-img-top" src="">
        </div>
        <div class="card-footer" id="footer">

            <div class="row" >
                <div class="col-md" id="ver-comentarios"></div>
            </div>
            
            <form id="formulario-comentario">
                <div class="row" id="publicar">
                    <div class="col-md2" id="col-avatar-publicar" style="margin-left: auto; margin-right: auto; display: block;">
                        <img src="/docs/images/fotousuario.png" alt="Avatar" class="avatar" id="avatar-comentarios">
                    </div>
                    <div class="col-md3" id="col-input-publicar" style="margin-left: auto; margin-right: auto; display: block;">
                        <input type="text" placeholder="Escriba su comentario" id="texto-comentario"name="text" required>
                    </div>
                    <div class="col-md4" id="col-boton-publicar" style="margin-left: auto; margin-right: auto; display: block;">
                        <button type="submit" class="boton-publicar">Publicar</button>
                    </div>
                </div>
            </form>
        </div>
    </div>`;
        
    let card = parseHTML(html);

    loadUsernameCard(card, photoId);
    loadUsernameProfilePhoto(card, photoId);
    loadPhoto(card, photoId); 
    loadEnlaces(card, photoId);
    loadComments(card, photoId);
    loadUsernameProfilePhotoFooter(card);

    let formulario = card.querySelector("#formulario-comentario")
    formulario.onsubmit = handleFormulario;

    container.appendChild(card);
    return container;
}


/*
* Función manejadora para cuando se intenta enviar el comentario, primero se comprueba
* que el comentario no tenga ninguna palabra inapropiada. Una vez comprobado se envía.
*/
function handleFormulario(event) {
    event.preventDefault();

    let form = event.target;
    let formData = new FormData(form);

    inappropriateswordsAPI.getAll() //Se comprueba que no tenga palabras inapropiadas
    .then(palabras => {
        let text = formData.get('text');
        let errors = [];

        for(let palabra of palabras) {
            let palabraInapropiada = palabra.word;

            if(text.includes(palabraInapropiada)) {
                errors.push("El comentario contiene una palabra inapropiada");
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
            formData.append("userId", sessionManager.getLoggedId());
            formData.append("photoId", photoId);

            commentsAPI.create(formData)
            .then(data => window.location.href = "comments.html?photoId=" + photoId)
            .catch(error => messageRenderer.showErrorMessage(error));
        }
    })
}

/*
* Carga todos los comentarios
*/ 
function loadComments(card, photoId) {
    let element = card.querySelector('#ver-comentarios');
    commentsAPI.getFromPhotoId(photoId)
        .then(comments => {

            for(let comment of comments){
                let c = commentRenderer.asCard(comment);
                element.appendChild(c);
            }
        });
}

/*
* Carga todos los enlaces en los href de la página
*/ 
function loadEnlaces(card, photoId) {
    photosAPI.getById(photoId)
    .then(photos => {
        let userId = photos[0].userId;
        let element1 = card.querySelector("#a-foto-perfil");
        let element2 = card.querySelector(".usuario");
        element1.href = "profile.html?userId=" + userId;
        element2.href = "profile.html?userId=" + userId;
    })
}

/*
* Carga el nombre de usuario que aparece en el header de la card.
*/
function loadUsernameCard(card, photoId) {
    photosAPI.getById(photoId)
    .then(photos => {
        let userId = photos[0].userId;
        usersAPI.getById(userId)
        .then(users => {
            let username = users[0].username;
            let p = card = card.querySelector('#nombre-usuario-header');
            p.textContent = "@" + username;
        })
    });
}

/*
* Carga la foto de perfil de usuario que aparece en la cabecera de la foto.
*/
function loadUsernameProfilePhoto(card, photoId) {
    photosAPI.getById(photoId)
    .then(photos => {
        let userId = photos[0].userId;
        usersAPI.getById(userId)
        .then(users => {
            let url = users[0].profilePhoto;
            let p = card = card.querySelector('.avatar');
            p.src = url;
        })
    });
}

/*
* Carga la foto de perfil del footer
*/
function loadUsernameProfilePhotoFooter(card) {
    let userId = sessionManager.getLoggedId();
    usersAPI.getById(userId)
    .then(users => {
        let url = users[0].profilePhoto;
        let p = card = card.querySelector('#avatar-comentarios');
        p.src = url;
    });
}

/*
* Se carga la foto de la tarjeta
*/
function loadPhoto(card, photoId) {
    photosAPI.getById(photoId)
    .then(photos => {
        let photo = photos[0].url;


        let p = card = card.querySelector('.card-img-top');
 
        p.src = photo;
    });
}

document.addEventListener("DOMContentLoaded", main); //Función que llama al main una vez cargada la página