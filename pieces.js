//Récupération du fichier json. 
const response = await fetch("pieces-autos.json");
//Récupération des données du fichier json. 
const elements = await response.json();
console.log(elements);
