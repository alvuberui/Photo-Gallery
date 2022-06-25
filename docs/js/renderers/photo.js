"use strict";
import { parseHTML } from "/js/utils/parseHTML.js";
import { usersAPI } from "/js/api/users.js";
import { ratingsAPI } from "/js/api/ratings.js";
import { categoriesAPI } from "/js/api/categories.js";
import { photoscategoriesAPI } from "/js/api/photoscategories.js";
import { sessionManager } from "/js/utils/session.js";

const photoRenderer = {
    asCard: function(photo) {
        let html = `
        <div class="card" style="max-height: 45rem; max-width: 45rem;">
            <div class="card-header">
                <a href="" id="foto-perfil"><img src="" id="username-photo" alt="Avatar" class="avatar"></a>
                <a href="" id="nombre-usuario">
                    <p id="nombre-usuario-header"></p>
                </a>
            </div>

            <div class="card-body">
                <div clas="row" id="row-photo">
                    <div class="col-md" id="col-photo">
                        <img class="card-img-top" src="${photo.url}">
                    </div>
                </div>
            </div>

            <div class="card-footer" id="footer1">
                <div class="row">

                    <div class="col-md" id="fecha">
                        <p id="fecha-hora">${photo.date}</p>
                    </div>
                </div>
            </div>
            <div class="card-footer" id="footer2">
                <div class="row">
                    <a href="" class="btn btn-primary" id="verFoto">Ver detalles </a>
                </div>
            </div>
        </div>`;

    let card = parseHTML(html);
    loadUsernameCard(card, photo.userId);
    loadUsernameProfilePhoto(card, photo.userId);
    loadEnlaces(card, photo);
    return card;
    },

    asCardMini: function(photo) {
        let html = `<div class="card" style="width: 300px; height: 175px">
            <a href="viewphoto.html?photoId=${photo.photoId}"><img class="card-img-top" src="${photo.url}" style="width: 300px; height: 175px"></a>
        </div>`;

        let card = parseHTML(html);
        return card;
    }
};

/*
* Se cargan los enlances en función de que este logeado o no lo este
*/
function loadEnlaces(card, photo) {
    let fotoPerfil = card.querySelector("#foto-perfil");
    let nombreUsuario = card.querySelector("#nombre-usuario");
    let verFoto = card.querySelector("#verFoto");

    if(sessionManager.isLogged()) {
        fotoPerfil.href = "profile.html?userId="+ photo.userId;
        nombreUsuario.href = "profile.html?userId="+ photo.userId;
        verFoto.href = "viewphoto.html?photoId=" + photo.photoId;
    }
    else {
        fotoPerfil.href = "login.html";
        nombreUsuario.href = "login.html";
        verFoto.href = "login.html";
    }
}

/*
* Se carga el username de la card
*/
function loadUsernameCard(card, userId) {
    usersAPI.getById(userId)
    .then(users => {
        let username = users[0].username;
        let p = card = card.querySelector("#nombre-usuario-header");
        p.textContent = "@" + username;
    });
}

/*
* Se carga la foto de perfil de la foto.
*/
function loadUsernameProfilePhoto(card, userId) {
    usersAPI.getById(userId)
    .then(users => {
        let profilePhoto = users[0].profilePhoto;
        let p = card = card.querySelector("#username-photo");
        p.src = profilePhoto;
    });
}


export { photoRenderer };