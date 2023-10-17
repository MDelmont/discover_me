import { audios } from "./audios.js";
import * as characters from "./characters.js";
import * as choises from "./choises.js";
const configScene = {
  currentSceneIndex: 1,
  messageIndex:-1,
};

const scenes = {
  1: {
    dialogues: [
      {
        character: "tektiv",
        name: "Matthieu",
        expression: "confident",
        message: "${?}Bonjour, bienvenu dans mon espace personnel,",
        voice: audios.male,
        backgroud: "office",
      },
      {
        character: "tektiv",
        name: "Matthieu",
        expression: "pumped",
        message:
          "Ici tu peux découvrir plein de choses sur moi. Mes projets, ma personnalité, mes compétences, etc.",
        voice: audios.male,
        backgroud: "office",
      },
      {
        character: "tektiv",
        name: "Matthieu",
        expression: "pumped",
        message: "Que veux tu découvrir ?",
        voice: audios.male,
        backgroud: "office",
        choices: {
          2: "Ma personnalité",
          3: "Mes projets",
          4: "Mes compétences",
          5: "Fuir !",
        },
      },
    ],
  },

  5: {
    dialogues: [
      {
        character: "tektiv",
        name: "Matthieu",
        expression: "pumped",
        message:
          "Tu veux fuir,${?} Non pas possible ! Appel moi plutot ! ${blue}06 28 33 57 49 ${/}",
        voice: audios.male,
        backgroud: "office",
        choices: {
          1: "Home",
        },
      },
    ],
  },
};

const returnCurrentDialogs = () => {
  return scenes[configScene.currentSceneIndex].dialogues;
};
const makeScene = (side = "next") => {
  characters.showDialog(side);

  choises.addChoisesToUi(returnCurrentDialogs()[configScene.messageIndex]);
};
export { scenes, configScene, returnCurrentDialogs, makeScene };
