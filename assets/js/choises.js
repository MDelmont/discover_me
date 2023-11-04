import ui from "./ui.js";

const creatChoise = (text, id) => {
  // Crée un nouvel élément div avec la classe "choice"
  var divElement = document.createElement("div");
  divElement.className = "choice";
  divElement.id = id;
  const listIdNav = ["1", "2"];

  if (listIdNav.includes(id)) {
    divElement.classList.add("nav");
  }

  // Crée un élément paragraphe (p)
  var pElement = document.createElement("p");
  pElement.textContent = text;

  // Attache le paragraphe à l'élément div
  divElement.appendChild(pElement);

  return divElement;
};

const creatListChoise = (dialog) => {
  const choice = dialog?.choices;
  let listChoise = [];
  for (const key in choice) {
    listChoise.push(creatChoise(choice[key], key));
  }
  return listChoise;
};

const addChoisesToUi = (dialog) => {
  const choices = creatListChoise(dialog);
  ui.choiceBox.innerHTML = null;
  for (const choice of choices) {
    ui.choiceBox.appendChild(choice);
  }
};

export { creatChoise, creatListChoise, addChoisesToUi };
