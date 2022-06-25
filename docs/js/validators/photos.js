"user strict";


const photoValidator = {
    validatePost: function (formData) {
        let errors = [];

        let url = formData.get("url");
        let description = formData.get("description");
        let title = formData.get("title");

        if(url.length < 8) {
            errors.push('La url no es válida');
        }

        if(title.length > 128 ) {
            errors.push('El título no puede contener más de 128 caracteres');
        }

        if(description.length > 512) {
            errors.push('La descripción no puede conetener más de 512 caracteres');
        }
        console.log(errors);
        return errors;
    },

    validateEditphoto: function (formData) {
        let errors = [];
        let categoryUpdate = formData.get("category-update");
        let categoryInsert = formData.get("category-insert");
        let description = formData.get("description");
        let title = formData.get("title");

        if(title.length > 128 ) {
            errors.push('El título no puede contener más de 128 caracteres');
        }

        if(description.length > 512) {
            errors.push('La descripción no puede conetener más de 512 caracteres');
        }

        if(categoryUpdate.length > 15) {
            errors.push('La categoria es demasiado larga');
        }

        if(categoryInsert.length > 15) {
            errors.push('La categoria es demasiado larga');
        }

        return errors;
    }
};

export { photoValidator }