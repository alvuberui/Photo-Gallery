
"use strict"
import { parseHTML } from "/js/utils/parseHTML.js" ;
import { photoRenderer } from "/js/renderers/photo.js" ;

const galleryRenderer ={
    asCardGallery: function (photos){
        let galleryContainer = parseHTML('<div class="row" id="fila-foto"></div>');
        let row = parseHTML('<div class="col-md" id="columna-foto"></div>');
        galleryContainer.appendChild(row);

        for(let photo of photos){
            let card=photoRenderer.asCard(photo);
            row.appendChild(card);
        }
        return galleryContainer;
    }
};


export { galleryRenderer };