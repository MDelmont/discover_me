// Import du fichier JSON en utilisant fetch
fetch("./data/scenarios.json")
  .then((response) => response.json()) // Analyse de la réponse en tant qu'objet JSON
  .then((data) => {
    // Affectez les données JSON à la variable 'scenes'
    scenes = data;

    // Maintenant, vous pouvez utiliser la variable 'scenes'
    console.log(scenes);
  })
  .catch((error) => {
    console.error("Erreur lors de l'importation du JSON : ", error);
  });
