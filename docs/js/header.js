"use strict";
import { sessionManager } from "/js/utils/session.js";

function main () {
    showUser();
}

/*
* Carga el texto y enlaces en el caso de que usuario este
* o no este logeado.
*/
function showUser () {
    let nombreUsuario = document.getElementById ("a");
    let foto = document.querySelector("#perfil");
    let publicar = document.getElementById("boton-header-publicar");
    let profile = document.getElementById("boton-header-profile");
    let buscador = document.querySelector(".buscador");
    
    if(sessionManager.isLogged()) {
        let username = sessionManager.getLoggedUser().username;
        let photo = sessionManager.getLoggedUser().profilePhoto;
        let userId = sessionManager.getLoggedUser().userId;

        profile.href = "profile.html?userId=" + userId;
        publicar.href = "post.html";
        foto.src = photo;
        nombreUsuario.textContent = "@" + username;
        nombreUsuario.href = "profile.html?userId=" + userId;
        buscador.onsubmit = buscadorSearch;
    } 
    else {
        nombreUsuario.textContent = "Invitado";
        foto.src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
        nombreUsuario.href = "login.html";
        publicar.href = "login.html";
        profile.href = "login.html";
        buscador.onsubmit = buscadorLogin;
    }
}

/*
* Manejador para el buscador.
*/
function buscadorSearch(event) {
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);
    let search = formData.get("search");
    window.location.href = "search.html?search=" + search;
}

/*
*  En caso de que no esté logeado e intente buscar se le redirige al login
*/
function buscadorLogin(event) {
    event.preventDefault();
    window.location.href = "login.html";
}

document.addEventListener ("DOMContentLoaded", main);