"use strict"
import { parseHTML } from "/js/utils/parseHTML.js" ;
import { photoRenderer } from "/js/renderers/photo.js" ;
import { usersAPI } from "/js/api/users.js";
import { photosAPI } from "/js/api/photos.js";
import { sessionManager } from "/js/utils/session.js";

let urlParams = new URLSearchParams(window.location.search);
let userId = urlParams.get("userId");

function main() { //Funcion principal que se ejecuta una vez se cargue la página
    let container = document.querySelector(".container");
    
    let html = 
        `
        <div>
            <div class="row" id="info-perfil">
                <div class="col-md-4" id="foto-usuario">
                    <img src="" alt="Avatar" class="avatar">
                </div>

                <div class="col-md-4" id="informacion">
                    <h3><p id="username"></p></h3>
                    <h4><p id="name-surname"></p></h4>
                    <h5><p id="email"></p></h5>
                </div>

                <div class="col-md-4" id="logout">
                    <a href="#" class="btn btn-info btn-lg" id="boton-logout">
                        <span class="glyphicon glyphicon-log-out" style="color: white; id="logout">Cerrar sesión</span> 
                    </a>
                </div>
            </div>
            
            <div class="row" id="fila-barra">
                <div class="col-md" id="col-barra">
                    <a href="#" class="btn btn-secondary" id="button-publicas" >Publicas</a>
                </div>

                <div class="col-md" id="col-barra">
                    <a href="#" class="btn btn-secondary" id="button-privadas">Privadas</a>
                </div>
            </div>

            <div class="row" id="container-publicas">
                <div class="card-columns" id="gallery-publicas"></div>
            </div>

            <div class="row" id="container-privadas">
                <div class="card-columns" id="gallery-privadas"></div>
            </div>
        </div>
        `;

        let card = parseHTML(html);

        loadUsernameCard(card, userId);
        loadUsernameProfilePhoto(card, userId);
        loadNameSurname(card, userId);
        loadEmail(card, userId);
        loadPublicsPhotos(card, userId);
        loadPrivatesPhotos(card, userId);
        ocultar(card, userId);

        let privadas = card.querySelector('#container-privadas');
        privadas.style.display = "none";

        let botonPrivadas = card.querySelector('#button-privadas');
        botonPrivadas.onclick = loadPrivadas;

        let botonPublicas = card.querySelector('#button-publicas');
        botonPublicas.onclick = loadPublicas;

        let botonLogout = card.querySelector("#logout");
        botonLogout.onclick = logoutHandler;

        container.appendChild(card);
}

/*
* Si no es el usuario propietario se le ocultan los botones de privadas y públicas
*/
function ocultar(card, usuarioPropietario) {
    let ocultarPublicas = card.querySelector("#button-publicas");
    let ocultarPrivadas = card.querySelector("#button-privadas");
    let ocultarLogout = card.querySelector("#boton-logout");

    if(usuarioPropietario != sessionManager.getLoggedId()) {
        ocultarPublicas.style.display ="none";
        ocultarPrivadas.style.display ="none";
        ocultarLogout.style.display = "none";
    }
    
}

/*
* Manejador cierre de sesiónW
*/
function logoutHandler(event) {
    sessionManager.logout();
    window.location.href = "index.html";
}

/*
* Se cargan las privadas y se ocultan las publicas
*/
function loadPrivadas(event) {
    let target = event.target;
    let parent1 = target.parentNode;
    let parent2 = parent1.parentNode;
    let parent3 = parent2.parentNode;
    let container = parent3.parentNode;
    let nodoMostrar = container.querySelector("#container-privadas");
    nodoMostrar.style.display = "block";
    let nodoOcultar = container.querySelector("#container-publicas");
  
    nodoOcultar.style.display = "none";
}

/*
* Se cargan las publicas y se ocultan las privadas
*/
function loadPublicas(event) {
    let target = event.target;
    let parent1 = target.parentNode;
    let parent2 = parent1.parentNode;
    let parent3 = parent2.parentNode;
    let container = parent3.parentNode;
    let nodoOcultar = container.querySelector("#container-privadas");
    let nodoMostrar = container.querySelector("#container-publicas");
    nodoMostrar.style.display = "block";  
    nodoOcultar.style.display = "none";
}

/*
* Se obtienen las fotos publicas de la base de datos
*/
function loadPublicsPhotos(card, userId) {
    let element = card.querySelector('#gallery-publicas')
    photosAPI.getPublicsPhotosByUserId(userId)
    .then(photos => {
        for(let i=0; i < photos.length; i++) {
            let photo = photos[i];
            let contenido = photoRenderer.asCardMini(photo);
            element.appendChild(contenido);
        }
    })
}
/*
* Se obtienen las fotos privadas de la base de datos
*/
function loadPrivatesPhotos(card, userId) {
    let element = card.querySelector('#gallery-privadas')
    photosAPI.getPrivatesPhotosByUserId(userId)
    .then(photos => {
        for(let i=0; i < photos.length; i++) {
            let photo = photos[i];
            let contenido = photoRenderer.asCardMini(photo);
            element.appendChild(contenido);
        }
    })
}

/*
* Se obtiene el nombre de usuario
*/
function loadUsernameCard(card, userId) {
    usersAPI.getById(userId)
    .then(users => {
        let username = users[0].username;
        let p = card.querySelector("#username");
        p.textContent = username;
    });
}

/*
* Se obtiene la foto de perfil del usuario
*/
function loadUsernameProfilePhoto(card, userId) {
    usersAPI.getById(userId)
    .then(users => {
        let photoProfile = users[0].profilePhoto;
        let p = card.querySelector(".avatar");
        p.src = photoProfile;
    });
}

/*
* Se obtiene el nombre y apellido
*/
function loadNameSurname(card, userId) {
    usersAPI.getById(userId)
    .then(users => {
        let name = users[0].name;
        let surname = users[0].surname;
        let p = card.querySelector("#name-surname");
        p.textContent = name + " " + surname;
    });
}

/*
* Se obtiene el email
*/
function loadEmail(card, userId) {
    usersAPI.getById(userId)
    .then(user => {
        let email = user[0].email;
        let p = card.querySelector("#email");
        p.textContent = email;
    });
}

document.addEventListener("DOMContentLoaded", main); //Función que llama al main una vez cargada la página