
"user strict";
import { messageRenderer } from "/js/renderers/messages.js";
import { userValidator } from "/js/validators/users.js";
import { sessionManager } from "/js/utils/session.js ";
import { authAPI } from "/js/api/auth.js ";
import { usersAPI } from "/js/api/users.js ";
 
function main() {
    let registerForm = document.getElementById("register-form");
    registerForm.onsubmit = handleSubmitRegister;
}

/*
* Se comprueba si tiene errores y se envia
*/
function handleSubmitRegister(event) {
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);
    
    let errors = userValidator.validateRegister(formData);

    if(errors.length > 0) {
        let errorsDiv = document.getElementById("errors");
        errorsDiv.innerHTML = "";

        for(let error of errors) {
            messageRenderer.showErrorMessage(error);
        }
    }
    else {
        formData.delete("password2");
        sendRegister(formData);
    }   
}

function sendRegister(formData) {
    let username = formData.get("username");
    let email = formData.get("email");

    usersAPI.getAll()
        .then(users => {
            let acum = 0;
            for(let user of users) {
                let e = user.email;
                let u = user.username;

                if(u == username || email == e) {
                    acum = acum + 1;
                }
            }

            if(acum > 0) {
                messageRenderer.showErrorMessage("Ya existe un usuario con ese email o usuario");
            }
            else {
                authAPI.register(formData)
                .then(loginData => {
                    let sessionToken = loginData.sessionToken;
                    let loggedUser = loginData.user;
                    sessionManager.login(sessionToken, loggedUser);
                    window.location.href = "index.html";
                })
                .catch(error => messageRenderer.showErrorMessage(error));
            }
        })
        .catch(error => messageRenderer.showErrorMessage(error));
}

document.addEventListener("DOMContentLoaded", main);