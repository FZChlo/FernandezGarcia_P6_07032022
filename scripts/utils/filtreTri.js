// Fonctions du filtre de tri

const sortModal = document.getElementById("sort");
const btnSortModal = document.getElementById("sortbtn");
const choix1Modal = document.getElementById("popularité");
const choix2Modal = document.getElementById("date");
const choix3Modal = document.getElementById("titre");

function displaySortModal() {
    sortModal.style.display = "block";
}

function closeSortModal() {
    sortModal.style.display = "none";
}

btnSortModal.addEventListener("click", () => {
    displaySortModal();
});

choix1Modal.addEventListener("click", () => {
    closeSortModal();
});
choix2Modal.addEventListener("click", () => {
    closeSortModal();
});
choix3Modal.addEventListener("click", () => {
    closeSortModal();
});