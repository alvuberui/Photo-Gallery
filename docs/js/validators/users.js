"user strict";

const userValidator = {
    
    validateRegister: function (formData) {
        let errors = [];
    
        let firstName = formData.get("name");
        let lastName = formData.get("surname");
        let telefono = formData.get("telephone");
        let password = formData.get("password");
        let password2 = formData.get("password2");
        let photoProfile = formData.get("profilePhoto");

        if(photoProfile.search("https:") == -1) {
            console.log(photoProfile.search("https:"));
            errors.push("La url que has instroducido para la foto de perfil no es https");
        }

        if(firstName.length < 3 || lastName.size < 3) {
            errors.push("El nombre y apellido debe de tener al menos 3 caracteres")
        }

        if(password !==  password2) {
            errors.push("Las contraseñas no coinciden");
        }
        if(telefono.length !== 9 ) {
            errors.push("El número de teléfono no es válido");
        }
        return errors;
    }
};

export { userValidator }