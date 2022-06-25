"use strict";
import { parseHTML } from "/js/utils/parseHTML.js";
import { usersAPI } from "/js/api/users.js";


const commentRenderer = {
    asCard: function(comment) {
        let html = `<div class="row" id="comentario">
            <div class="col-md">
                <img src="" alt="Avatar" class="avatar">
                <a href="profile.html">
                    <p class="username">${comment.text}</p>
                </a>
            </div>
        </div>`;

        let card = parseHTML(html);
        loadUsernameCard(card, comment.userId);
        loadUsernameProfilePhoto(card, comment.userId);
        return card;
    }
};

function loadUsernameCard(card, userId) {
    usersAPI.getById(userId)
    .then(users => {
        let username = users[0].username;
        let p = card = card.querySelector(".username");
        p.textContent = "@" + username + ": " + p.textContent;
    });
}

function loadUsernameProfilePhoto(card, userId) {
    usersAPI.getById(userId)
    .then(users => {
        let profilePhoto = users[0].profilePhoto;
        let p = card = card.querySelector(".avatar");
        p.src = profilePhoto;
    });
}

export { commentRenderer };