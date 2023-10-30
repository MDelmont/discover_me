import * as characters from "./characters.js";
import * as choises from "./choises.js";
import ui from "./ui.js";
const configScene = {
  currentSceneIndex: 1,
  messageIndex: -1,
};
let scenes; // Déclarez la variable pour stocker le JSON

// Import du fichier JSON en utilisant fetch
fetch("./data/scenarios.json")
  .then((response) => response.json()) // Analyse de la réponse en tant qu'objet JSON
  .then((data) => {
    // Affectez les données JSON à la variable 'scenes'
    scenes = data;
    ui.choiceBox.classList.remove("d-none");
    // Maintenant, vous pouvez utiliser la variable 'scenes'
  })
  .catch((error) => {
    console.error("Erreur lors de l'importation du JSON : ", error);
  });

const returnCurrentDialogs = () => {
  return scenes[configScene.currentSceneIndex].dialogues;
};

const returnCurrentDialog = () => {
  let order = configScene.messageIndex + 1;

  for (let dialog of returnCurrentDialogs()) {
    if (dialog.order == order) {
      return dialog;
    }
  }
};
const makeScene = (side = "next") => {
  characters.showDialog(side);

  choises.addChoisesToUi(returnCurrentDialog());
};
export {
  scenes,
  configScene,
  returnCurrentDialogs,
  makeScene,
  returnCurrentDialog,
};
