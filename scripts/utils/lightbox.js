/**
 * Fonction qui crée et intègre le contenu de la lightbox
 * @param {string} title - titre de l'image à afficher
 * @param {string} source - source de l'image
 * @param {string} type - type de l'image
 * @param {string} id - identifiant de l'image
 * @param {object} lightbox - lightbox
 * @param {string} option -  une string "next" ou "prev"
 */

function lightboxContent(title, source, type, id, lightbox) {

    // Creatiion de la div de la lightbox de fermeture
    const close = document.createElement("button");
    close.setAttribute("aria-label", "close");
    close.classList.add("lightbox__close");
    close.addEventListener("click", () => closeLightbox());

    // Creation de la div de la lightbox suivante
    const next = document.createElement("button");
    next.setAttribute("aria-label", "next");
    next.classList.add("lightbox__next");
    next.addEventListener("click", () => nextLightbox(source, id));

    // Creation de la div de la lightbox precedente
    const prev = document.createElement("button");
    prev.setAttribute("aria-label", "prev");
    prev.classList.add("lightbox__prev");
    prev.addEventListener("click", () => prevLightbox(source, id));

    // Ecouteur d'évenement des touches clavier
    document.addEventListener("keydown", keydown, false);

    function keydown(e) {
        if (e.code == "ArrowRight") {
            nextLightbox(source, id);
        } else if (e.code == "ArrowLeft") {
            prevLightbox(source, id);
        } else if (e.code == "Escape") {
            closeLightbox();
        }
        document.removeEventListener("keydown", keydown, false); // Evite la redondance
    }

    // Creation de la div de la lightbox 
    const container = document.createElement("div");
    container.classList.add("lightbox__container");

    // Ajout de l'image ou la video
    const content =
        type == "image" ?
        document.createElement("img") :
        document.createElement("video");
    type == "video" && content.setAttribute("controls", true);

    content.setAttribute("src", source);
    content.classList.add("thumbnail");
    content.setAttribute("alt", "image");

    // Ajout du titre de l'image
    const titleText = document.createElement("h2");
    titleText.textContent = title;

    // Accroche les éléments crées
    lightbox.appendChild(close);
    lightbox.appendChild(next);
    lightbox.appendChild(prev);
    lightbox.appendChild(container);
    container.appendChild(content);
    container.appendChild(titleText);
}

/**
 * Fonction qui retourne la lightbox en objet HTML
 * @param {string} title - titre de l'image à afficher
 * @param {string} source - source de l'image
 * @param {string} type - type de l'image
 * @param {string} id - identifiant de l'image
 * @param {HTML} - lightbox [HTML object]
 */

function lightbox(title, source, type, id) {
    // Créer la div global de la lightbox
    const lightbox = document.createElement("div");
    lightbox.classList.add("lightbox");
    lightbox.setAttribute("alt", "image closeup view");

    // Crée et ajoute le contenu de la lightbox
    lightboxContent(title, source, type, id, lightbox);
    return lightbox;
}

/**
 * Fonction qui affiche la lightbox dans le DOM
 * @param {string} title - titre de l'image à afficher
 * @param {string} source - source de l'image
 * @param {string} type - type de l'image
 * @param {string} id - identifiant de l'image
 */
function showLightbox(title, source, type, id) {
    document.getElementById("main").appendChild(lightbox(title, source, type, id));
}

// BOUTONS
// Fonction qui ferme la lightbox
function closeLightbox() {
    document.querySelector(".lightbox").remove();
}

/**
 * Fonction qui affiche l'image suivante dans la lightbox
 * @param {string} source - source de l'image
 * @param {string} id - identifiant de l'image
 */
function nextLightbox(source, id) {
    lightboxNextPrev(source, id, "next");
}

/**
 * Fonction qui affiche l'image suivante dans la lightbox
 * @param {string} source - source de l'image
 * @param {string} id - identifiant de l'image
 */
function prevLightbox(source, id) {
    lightboxNextPrev(source, id, "prev");
}

/**
 * Fonction qui affiche l'image suivante dans la lightbox
 * @param {string} source - source de l'image
 * @param {string} id - identifiant de l'image
 * @param {string} option - une string "next" ou "prev" 
 */
async function lightboxNextPrev(source, id, option) {

    // Récupére un tableau de tous les medias (objets)
    const { mediaFiltered } = await getPhotographer();

    //Séléctionne l'index du media qui est affiché 
    let mediaIndex = await mediaFiltered.findIndex((media) => media.id == id);

    // Incrémente ou Décrémente mediaIndex
    option == "next" ? mediaIndex++ : mediaIndex--;

    // Verifie que l'on est pas en debut ou fin de tableau
    const max = mediaFiltered.lenght;
    const min = -1;
    if (mediaIndex == min) {
        mediaIndex = max - 1;
    } else if (mediaIndex == max) {
        mediaIndex = 0;
    }

    // Récupére le nouveau media avec tout ses attributs
    const newMedia = mediaFiltered[mediaIndex];

    // Récupere le type du nouveau média
    const newMediaType = newMedia.image ? "image" : "video";

    // Recupere la source du nouveau média 
    const newMediaName = newMediaType == "image" ? newMedia.image : newMedia.video;
    const newMediaSource = "assets/" + source.split("/")[1] + "/" + newMediaName;

    // Récupere le titre du nouveau média 
    const newMediaTitle = newMedia.title;

    // Récupere l'id du nouveau média
    const newMediaId = newMedia.id;

    // Récupere l'élément du DOM lightbox
    const recupLightbox = document.querySelector(".lightbox");

    // ! Vide la lightbox
    document.querySelector(".lightbox").innerHTML = "";

    // Crée et ajoute le nouveau contenu de la lightbox
    lightboxContent(
        newMediaTitle,
        newMediaSource,
        newMediaType,
        newMediaId,
        recupLightbox
    );
}