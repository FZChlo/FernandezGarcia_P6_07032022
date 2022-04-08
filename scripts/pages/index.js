//Récupération des données des photographes
async function getPhotographers() {
    try {
        const response = await fetch("./data/photographers.json");
        const data = await response.json();
        const photographers = await data.photographers;
        return { photographers }; // On retourne les données des photographes sous forme d'un tableau d'objet {}.
    } catch (error) {
        console.error(error);
    }
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    // Récupére les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();