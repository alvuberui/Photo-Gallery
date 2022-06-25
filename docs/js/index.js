"user strict";

import { photosAPI } from "/js/api/photos.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { galleryRenderer } from "./renderers/gallery.js";
import { sessionManager } from "/js/utils/session.js";


function main() { //Funcion principal que se ejecuta una vez se cargue la página
    let container = document.querySelector(".container");
    let userId = sessionManager.getLoggedId();
    
    photosAPI.getAllIndex(userId)
        .then(photos => {
            let gallery = galleryRenderer.asCardGallery(photos);
            container.appendChild(gallery);
        })
        .catch(error => messageRenderer.showErrorMessage(error));
}

document.addEventListener("DOMContentLoaded", main); //Función que llama al main una vez cargada la página