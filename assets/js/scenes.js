import { audios } from "./audios.js";
import * as characters from "./characters.js";
import * as choises from "./choises.js";
const configScene = {
  currentSceneIndex: 1,
  messageIndex: -1,
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
          2: "Fuir !",
          3: "Ma personnalité",
          7: "Mes projets",
          15: "Mes compétences",
        },
      },
    ],
  },
  2: {
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
          1: "Fuir quand même !",
        },
      },
    ],
  },

  3: {
    dialogues: [
      {
        character: "tektiv",
        name: "Matthieu",
        expression: "pumped",
        message: "Avec qui veux tu découvrir ma personnalité ?",
        voice: audios.male,
        backgroud: "office",
        choices: {
          4: "Moi",
          5: "Un proche",
          6: "Un collegue",
          1: "Fuir !",
        },
      },
    ],
  },
  4: {
    dialogues: [
      {
        character: "tektiv",
        name: "Matthieu",
        expression: "pumped",
        message: "C'est simple appel moi ! ${blue}06 28 33 57 49 ${/}",
        voice: audios.male,
        backgroud: "office",
        choices: {
          1: "Fuir !",
          3: "personnalité !",
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
        message: "Désolé pour le moment ils sont tous en vacances !",
        voice: audios.male,
        backgroud: "trainstation",
        choices: {
          3: "personnalité !",
          1: "Fuir !",
        },
      },
    ],
  },
  6: {
    dialogues: [
      {
        character: "tektiv",
        name: "Matthieu",
        expression: "pumped",
        message: "Désolé pour le moment ils sont tous en vacances !",
        voice: audios.male,
        backgroud: "trainstation",
        choices: {
          1: "Fuir !",
          3: "personnalité !",
        },
      },
    ],
  },
  7: {
    dialogues: [
      {
        character: "tektiv",
        name: "Matthieu",
        expression: "pumped",
        message: "Quel projet veux tu voir ?",
        voice: audios.male,
        backgroud: "office",
        choices: {
          8: "Geo-cockpit",
          9: "Dashboard Dofus",
          10: "Bataille naval",
          11: "Dashbord d'activité",
          12: "Boardgame",
          13: "disciver me",
          1: "Fuir !",
        },
      },
    ],
  },

  8: {
    dialogues: [
      {
        character: "tektiv",
        name: "Matthieu",
        expression: "pumped",
        message:
          "Très bon choix ! Geo-cockpit est un projet réalisé en entreprise chez Urbanease !",
        voice: audios.male,
        backgroud: "office",
      },
      {
        character: "tektiv",
        name: "Matthieu",
        expression: "pumped",
        message:
          "Il est un outil web de gestion d'activité , permettant d'accompagner l'équipe géomatique au quotiens !",
        voice: audios.male,
        backgroud: "office",
      },
      {
        character: "tektiv",
        name: "Matthieu",
        expression: "pumped",
        message:
          'Si tu veux en savoir plus <a target="_blank" href="https://tricolor-cloak-87d.notion.site/Geo-cockpit-8ae87764bfb845a8a3aaac76778fcd99?pvs=4">Clique-ici</a> !',
        voice: audios.male,
        backgroud: "office",
        choices: {
          7: "Projet",
          1: "Fuir !",
        },
      },
    ],
  },
  9: {
    dialogues: [
      {
        character: "tektiv",
        name: "Matthieu",
        expression: "pumped",
        message:
          "Et oui un projet data ! Dashboard Dofus est un projet réalisé pour mettre en avant mes compétences dans la datavisualisation !",
        voice: audios.male,
        backgroud: "office",
      },
      {
        character: "tektiv",
        name: "Matthieu",
        expression: "pumped",
        message:
          "Il est un outil web de prise de déscision. Il pourrait permettre pas exemple au developpeur du jeux dofus de savoir que sont les équipements à créer pour un nouveau contenu !",
        voice: audios.male,
        backgroud: "office",
      },
      {
        character: "tektiv",
        name: "Matthieu",
        expression: "pumped",
        message:
          'Si tu veux en savoir plus <a target="_blank" href="https://tricolor-cloak-87d.notion.site/Dashboard-visualisation-d-quipement-8d55c9f836c642c182c943debcc3d0c1?pvs=4">Clique-ici</a> !',
        voice: audios.male,
        backgroud: "office",
        choices: {
          7: "Projet",
          1: "Fuir !",
        },
      },
    ],
  },
  10: {
    dialogues: [
      {
        character: "tektiv",
        name: "Matthieu",
        expression: "pumped",
        message:
          "Un projet assez amusant ! Ce projet m'a permis de travailler sur les bonnes pratiques du développement web!",
        voice: audios.male,
        backgroud: "office",
      },
      {
        character: "tektiv",
        name: "Matthieu",
        expression: "pumped",
        message: "Il est un jeu, ou l'ont créer deux équipes qui s'affronte !",
        voice: audios.male,
        backgroud: "office",
      },
      {
        character: "tektiv",
        name: "Matthieu",
        expression: "pumped",
        message:
          'Si tu veux en savoir plus <a target="_blank" href="https://tricolor-cloak-87d.notion.site/Projet-Bataille-naval-1f5c52c968ae485da5a743c9490b4629?pvs=4">Clique-ici</a> !',
        voice: audios.male,
        backgroud: "office",
        choices: {
          7: "Projet",
          1: "Fuir !",
        },
      },
    ],
  },
  11: {
    dialogues: [
      {
        character: "tektiv",
        name: "Matthieu",
        expression: "pumped",
        message: "Travaux en cours",
        voice: audios.male,
        backgroud: "BridgeOut",
        choices: {
          7: "Projet",
          1: "Fuir !",
        },
      },
    ],
  },
  12: {
    dialogues: [
      {
        character: "tektiv",
        name: "Matthieu",
        expression: "pumped",
        message: "Travaux en cours",
        voice: audios.male,
        backgroud: "BridgeOut",
        choices: {
          7: "Projet",
          1: "Fuir !",
        },
      },
    ],
  },
  13: {
    dialogues: [
      {
        character: "tektiv",
        name: "Matthieu",
        expression: "pumped",
        message: "Travaux en cours",
        voice: audios.male,
        backgroud: "BridgeOut",
        choices: {
          7: "Projet",
          1: "Fuir !",
        },
      },
    ],
  },

  15: {
    dialogues: [
      {
        character: "tektiv",
        name: "Matthieu",
        expression: "pumped",
        message: "Mes compétence arrive bientôt ! ",
        voice: audios.male,
        backgroud: "BridgeOut",
        choices: {
          1: "Fuir !",
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
