// Récupération des pièces depuis le fichier JSON
const reponse = await fetch('pieces-autos.json');
const pieces = await reponse.json();


//Dans cette fonction on va créer toute notre fiche avec toutes les méthodes de création de balises
function genererPieces(pieces){
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
}
//premier affichage de la page
genererPieces(pieces);


// Ajout du listener pour trier les pièces par ordre de prix croissant
const boutonTrier = document.querySelector(".btn-trier");
boutonTrier.addEventListener("click",function () {
    //Ici on crée une copie du tableau pieces pour ne pas modifier l'ordre des données de base avec Array.from.
    const piecesOrdonnees = Array.from(pieces);
    // Ici la methode sort va trier les prix (prix vient de de la const pieces) par ordre croissant
    piecesOrdonnees.sort(function (a, b) {
        return a.prix - b.prix;
    });
  // Effacement de l'écran et regénération de la page, ici on efface notre fiche pour la regénérer avec les bons éléments, ici les pièces ordonnées par ordre croissant
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesOrdonnees);
});


 
// Ajout du listener pour filtrer les pièces non abordables
const boutonFiltrer = document.querySelector(".btn-filtrer");
boutonFiltrer.addEventListener("click", function () {
    //On va stocker dans piecesFiltrees tous les articles contenu dans pieces dont le prix est < 35 euros;
    const piecesFiltrees = pieces.filter((article) => article.prix >= 35);
   // Effacement de l'écran et regénération de la page avec les pièces filtrées uniquement
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});

// Ajout du listener pour filtrer les pièces selon le curseur
const inputPrixMax = document.querySelector("#prixMax");
inputPrixMax.addEventListener("click", () => {
    const piecesFiltrees = pieces.filter((article) => article.prix <= inputPrixMax.value);
   // Effacement de l'écran et regénération de la page avec les pièces filtrées uniquement
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});

// Ajout du listener pour filtrer les pièces non ayant une description
const boutonDescription = document.querySelector(".btn-description");
boutonDescription.addEventListener("click", function () {
    //On va stocker dans piecesFiltrees tous les articles contenu dans pieces dont le prix est < 35 euros;
    const piecesFiltrees = pieces.filter((article) => article.description);
   // Effacement de l'écran et regénération de la page avec les pièces filtrées uniquement
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});
// inputPrixMax.addEventListener('input', function(){
//     const piecesFiltrees = pieces.filter(function(pieces){
//         return pieces.prix <= inputPrixMax.value;
//     })
//     document.querySelector(".fiches").innerHTML = "";
//     genererPieces(piecesFiltrees);
// })

//Filtrer les prix par ordre décroissant
const boutonPrixDecroissant = document.querySelector(".btn-prixDecroissant");
boutonPrixDecroissant.addEventListener("click", function(){
    const piecesPrixDecroissant = Array.from(pieces).sort(function (a, b){;
        return b.prix - a.prix;
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesPrixDecroissant);
});


// Afficher les noms des pièces ABORDABLES
//map va créer un nouveau tableau avec les résultats de l'appel d'une fonction fournie sur chaque élément du tableau appelant.
// En fait, à chaque tour de boucle, elle vérifie si la condition est valide ou invalide, si elle est valide, elle remet dans le tableau tous les éléments
// une fois qu'elle tombe sur un objet invalide sur un tour de boucle, alors elle va le supprimer, et au prochain tour de boucle, l'élément supprimé ne fera plus 
// partie du tableau; 
// const noms = pieces.map(piece => piece.nom);
// const prix = pieces.map(piece => piece.prix); // on récupère le prix.
// console.log(prix);
// // ici pieces.length - 1 va retourner l'index du dernier élément du tableau qui est égal à la longueur du tableau - 1 
// // car l'index va de 4 à 0, la longueur du tableau étant de 5, si on veut avoir notre index, on retranche 1, ce qui fait 4, c'est bien notre dernier index.
// for(let i = pieces.length - 1; i >= 0 ; i--){
//     // si le prix de la piece est supérieur à 35 euros, on supprime son nom du tableau en fonction de son index avec splice
//     if (pieces[i].prix > 35){
//         noms.splice(i, 1);
//     }
//     console.log(noms);
// }
// // Maintenant la liste de noms ne contient plus que les éléments dont le prix est inférieur à 35 euros. 

// // on va afficher nos éléments dans la page HTML, tout d'abord on crée notre liste
// const piecesAbordables = document.createElement('ul');
// //on va ajouter chaque nom à la liste
// for (let i = 0 ; i < noms.length ; i ++){
//     const nomElement = document.createElement('li');
//     nomElement.innerText = noms[i];
//     // On ajoute nos enfants au parent
//     piecesAbordables.appendChild(nomElement);
// }
// // On va maintenant ajouter nos éléments listés au bloc parent créé dans le HTML dans la section piècesAbordables
// document.querySelector(".piecesAbordables").appendChild(piecesAbordables);



// Afficher les noms des pièces DISPONIBLES
// const pieceDispo = pieces.map(piece => piece.nom);
// // ici pieces.length - 1 va retourner l'index du dernier élément du tableau qui est égal à la longueur du tableau - 1 
// // car l'index va de 4 à 0, la longueur du tableau étant de 5, si on veut avoir notre index, on retranche 1, ce qui fait 4, c'est bien notre dernier index.
// for(let i = pieces.length - 1; i >= 0 ; i--){
//     // si le prix de la piece est supérieur à 35 euros, on supprime son nom du tableau en fonction de son index avec splice
//     if (pieces[i].disponibilite === "non"){
//         pieceDispo.splice(i, 1);
//     }
//     console.log(pieceDispo);
// }
// // Maintenant on va afficher cette liste dans le HTML, tout d'abord en créant notre liste
// const piecesDisponibles = document.createElement('ul');
//     for (let i = 0 ; i < pieceDispo.length ; i++){
//         const nomPieceDispo = document.createElement('li');
//         nomPieceDispo.innerText = pieceDispo[i];
//         piecesDisponibles.appendChild(nomPieceDispo);
//     }
// on va lier nos éléments à leur parent
// document.querySelector(".produitsDisponibles").appendChild(piecesDisponibles);


// Affichez une description des pièces disponibles à côté de la description des pièces abordables. 
// L’intitulé de la pièce devra aussi contenir son prix. 
// const nomsPieces = pieces.map(piece => piece.nom);
// const prixPieces = pieces.map(piece => piece.prix); 

// for(let i = pieces.length-1 ; i >= 0 ; i--){
//     if (pieces[i].disponibilite === "non"){
//         nomsPieces.splice(i, 1);
//         prixPieces.splice(i, 1);
//     }
// }

// const listPiecesDispo = document.createElement('ul');

// for(let i = 0 ; i < nomsPieces.length ; i++){
//     let nomPieceDispo = document.createElement('li');
//     nomPieceDispo.innerText = ` ${nomsPieces[i]} - ${prixPieces[i]} € `
//     listPiecesDispo.appendChild(nomPieceDispo);
// }
// //Lier l'élément à son parent
// document.querySelector(".produitsDisponibles").appendChild(listPiecesDispo);



