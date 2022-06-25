
"user strict";
import { messageRenderer } from "/js/renderers/messages.js";
import { userValidator } from "/js/validators/users.js";
import { sessionManager } from "/js/utils/session.js ";
import { authAPI } from "/js/api/auth.js ";

 
function main() {
    let form = document.getElementById("login-form");
    form.onsubmit = formhandler;
}

/*
* Función que crea el formData
*/
function formhandler(event) {
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);

    sendLogin(formData);
}

//Función para enviar pa petición de loggin.
function sendLogin(formData) {
    authAPI.login(formData) 
        .then(loginData => {
            let sessionToken = loginData.sessionToken;
            let loggedUser = loginData.user;
            sessionManager.login(sessionToken, loggedUser);
            window.location.href = "index.html";
        })
        .catch(error => messageRenderer.showErrorMessage(error));
}


document.addEventListener("DOMContentLoaded", main);