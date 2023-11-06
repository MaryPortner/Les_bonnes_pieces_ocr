// Récupération des pièces depuis le fichier JSON
const reponse = await fetch('pieces-autos.json');
const pieces = await reponse.json();

for (let i = 0; i < pieces.length; i++) {
    // On récupère chaque article en fonction de son index.
    const article = pieces[i];
    // Récupération de l'élément du DOM qui accueillera les fiches
    const sectionFiches = document.querySelector(".fiches");

    // Création d’une balise dédiée à une pièce automobile
    const pieceElement = document.createElement("article");

    // Création des balises 
    const imageElement = document.createElement("img");
    imageElement.src = article.image;
    const nomElement = document.createElement("h2");
    nomElement.innerText = article.nom;
    const prixElement = document.createElement("p");
    prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;
    const categorieElement = document.createElement("p");
    categorieElement.innerText = article.categorie ?? "(aucune catégorie)";
    const descriptionElement = document.createElement("p");
    descriptionElement.innerText = article.description ?? "Pas de description pour le moment.";
    const stockElement = document.createElement("p");
    stockElement.innerText = article.disponibilite ? "En stock" : "Rupture de stock";

    // On rattache la balise article a la section Fiches
    sectionFiches.appendChild(pieceElement);

    // On rattache l’image à pieceElement (la balise article)
    pieceElement.appendChild(imageElement);
    pieceElement.appendChild(nomElement);
    pieceElement.appendChild(prixElement);
    pieceElement.appendChild(categorieElement);

    //Ajout des éléments au DOM pour l'exercice
    pieceElement.appendChild(descriptionElement);
    pieceElement.appendChild(stockElement);

}


const boutonTrier = document.querySelector(".btn-trier");
boutonTrier.addEventListener("click",function () {
    //Ici on crée une copie du tableau pieces pour ne pas modifier l'ordre des données de base.
    const piecesOrdonnees = Array.from(pieces);
    // Ici la methode sort va trier les prix (prix vient de pièces) par ordre croissant
    piecesOrdonnees.sort(function (a, b) {
    return a.prix - b.prix;
});
    console.log(piecesOrdonnees);
});

// Filtrer les pièces dont le prix est supérieur à 35 euros;
const boutonFiltrer = document.querySelector(".btn-filtrer");
boutonFiltrer.addEventListener("click", function(){
    const piecesFiltrees = pieces.filter((pieces) => pieces.prix <= 35);
    console.log(piecesFiltrees);
    return piecesFiltrees;

});

//Filtrer les pièces qui ont une description
const boutonDescription = document.querySelector(".btn-description");
boutonDescription.addEventListener("click", function(){
    const piecesDescription = pieces.filter((pieces) => pieces.description);
    console.log(piecesDescription);
    return piecesDescription;
});

//Filtrer les prix par ordre décroissant
const boutonPrixDecroissant = document.querySelector(".btn-prixDecroissant");
boutonPrixDecroissant.addEventListener("click", function(){
    const piecesPrixDecroissant = Array.from(pieces);
    piecesPrixDecroissant.sort(function (a, b){
        return b.prix - a.prix;
    });
    console.log(piecesPrixDecroissant);
    return piecesPrixDecroissant;
});