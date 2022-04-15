function photographerFactory(data, mediaAll) {
    const { name, portrait, city, country, tagline, price, id, likes } = data;
    const picture = `assets/photographers/${portrait}`;
    // INDEX.JS
    // Creation de cards de chaque photographe
    function getUserCardDOM() {

        // Creation de la balise article
        const article = document.createElement("article");

        // Creation de la balise image
        const img = document.createElement("img");
        img.setAttribute("src", picture);
        img.setAttribute("alt", `Vignette du photographe : ${name}`);

        // Creation de la balise H2
        const h2 = document.createElement("h2");
        h2.textContent = name;

        // Creation de la balise p
        const adresse = document.createElement("p");
        adresse.textContent = `${city}, ${country}`;
        adresse.classList.add("adresse");

        const tag = document.createElement("p");
        tag.textContent = tagline;
        tag.classList.add("tagline");

        const priceTag = document.createElement("p");
        priceTag.textContent = `${price}€/jours`;
        priceTag.classList.add("price");

        // Creation du lien vers la page du profil
        const link = document.createElement("a");
        link.setAttribute("href", `photographer.html?id=${id}`);
        article.appendChild(link);
        link.appendChild(img);
        link.appendChild(h2);
        article.appendChild(adresse);
        article.appendChild(tag);
        article.appendChild(priceTag);
        return article;
    }
    //PHOTOGRAPHER.JS
    // Fonction qui retourne le DOM de la page profil
    function getUserDetail() {

        // Creation de la balise article 
        const article = document.createElement("article");
        const divGauche = document.createElement("div");
        const divDroite = document.createElement("div");
        const divCentre = document.createElement("div");

        // Creation de la balise h2
        const h2 = document.createElement("h1");
        h2.textContent = name;

        // Creation de la balise p adresse
        const adresse = document.createElement("h2");
        adresse.textContent = `${city}, ${country}`;
        adresse.classList.add("adresse");

        // Creation de la balise p tagline
        const tag = document.createElement("p");
        tag.textContent = tagline;
        tag.classList.add("tagline");

        // Creation de la balise bouton
        const button = document.createElement("button");
        button.textContent = "Contactez moi";
        button.classList.add("contact_button");
        button.setAttribute("tabindex", "2");
        button.setAttribute("type", "button");
        button.setAttribute("onclick", "displayModal()");

        // Creation de la balise image
        const img = document.createElement("img");
        img.setAttribute("src", picture);
        img.setAttribute("alt", `Vignette de contact : ${name}`);

        // Je crée un lien qui va permettre l'apparition de la page profil

        article.appendChild(divGauche);
        article.appendChild(divCentre);
        article.appendChild(divDroite);
        divGauche.appendChild(h2);
        divGauche.appendChild(adresse);
        divGauche.appendChild(tag);
        divCentre.appendChild(button);
        divDroite.appendChild(img);
        return article
    }

    // Fonction userLikes
    function getUserLikes() {
        let numLikes = new Number();
        mediaAll.forEach((media) => {
            numLikes += media.likes;
        });
        const countLikes = document.createElement("div");
        countLikes.classList.add("countLikes");
        const divGauche = document.createElement("div");
        const divDroite = document.createElement("div");

        const span = document.createElement("span");
        span.textContent = numLikes;

        const i = document.createElement("i");
        i.classList.add("fas");
        i.classList.add("fa-heart");

        const p = document.createElement("p");
        p.textContent = `${price}€ / jour`;

        countLikes.appendChild(divGauche);
        countLikes.appendChild(divDroite);
        divGauche.appendChild(span);
        divGauche.appendChild(i);
        divDroite.appendChild(p);

        return countLikes;
    }

    return {
        name,
        picture,
        city,
        country,
        tagline,
        price,
        id,
        likes,
        getUserCardDOM,
        getUserDetail,
        getUserLikes,
    };
}

// Fonction pour afficher les photos + titres
function mediaFactory(media, photographers) {
    const { title, image, video, likes, date, price, id } = media;
    let { name } = photographers[0];
    name = name.split(" ")[0].replace("-", " ");
    let type = "";
    let source = "";
    if (image) {
        type = "image";
        source = `assets/${name}/${image}`;
    } else {
        type = "video";
        source = `assets/${name}/${video}`;
    }

    // Creation des cards de chaques medias
    function getMediaCardDom() {
        // Balise article 
        const article = document.createElement("article");



        // Balise image/video
        let thumbnail = {};
        type == "image" ?
            (thumbnail = document.createElement("img")) :
            (thumbnail = document.createElement("video"));
        thumbnail.setAttribute("src", source);
        thumbnail.setAttribute("tabindex", "4")
        thumbnail.addEventListener("click", () => {
            showLightbox(title, source, type, id);
        });
        thumbnail.addEventListener("keypress", function(e) {
            if (e.key == "Enter") {
                showLightbox(title, source, type, id);
                lightboxNextPrev(source, id, option);
                lightboxContent(title, source, type, id, lightbox);
                nextLightbox(source, id);
                prevLightbox(source, id);


            }
        });



        type == "image" &&
            thumbnail.setAttribute("alt", `Vignette de media : ${title}`);

        const desc = document.createElement("div");

        // Creation de la balise h2
        const h2 = document.createElement("h2");
        h2.textContent = title;

        const divLikes = document.createElement("div");
        divLikes.classList.add("likes");
        divLikes.setAttribute("alt", `Nombres de likes : ${likes}`);

        // Creation de la balise span & p 
        const spanCoeur = document.createElement("span");
        const likeTag = document.createElement("p");
        likeTag.textContent = likes;
        spanCoeur.className = "coeur";
        const imageLike = document.createElement("i");
        imageLike.classList.add("far");
        imageLike.classList.add("fa-heart");
        imageLike.setAttribute("aria-label", "icone coeur cliquable");
        imageLike.setAttribute("tabindex", "5");




        spanCoeur.appendChild(imageLike);
        article.appendChild(thumbnail);
        article.appendChild(desc);
        desc.appendChild(h2);
        desc.appendChild(divLikes);
        desc.appendChild(spanCoeur);
        divLikes.appendChild(likeTag);
        divLikes.appendChild(spanCoeur);
        divLikes.appendChild(imageLike);
        divLikes.addEventListener("click", () => {
            addLikes(likeTag, imageLike);
        });
        divLikes.addEventListener("keydown", (event) => {
            if (event.defaultPrevented) {
                return; // Ne devrait rien faire si l'événement de la touche était déjà consommé.
            }
            switch (event.key) {
                case "Enter":
                    addLikes(likeTag, imageLike);
                    break;
                default:
                    return;
            }
            event.preventDefault();
        }, true);

        return article;
    }
    return {
        title,
        image,
        video,
        likes,
        date,
        price,
        type,
        source,
        id,
        getMediaCardDom,
    };
}

// Fonction d'incrementation & décrémentation du nombre de likes
function addLikes(likeTag, imageLike) {
    if (imageLike.classList.contains("far")) {
        likeTag.textContent++;
        document.querySelector(".countLikes span").textContent++;
        imageLike.classList.replace("far", "fas");
        return true;
    } {
        likeTag.textContent--;
        document.querySelector(".countLikes span").textContent--;
        imageLike.classList.replace("fas", "far");
        return false;
    }
}