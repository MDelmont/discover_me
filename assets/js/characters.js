import ui from "./ui.js";
import * as scenes from "./scenes.js";
import * as buttons from "./buttons.js";
import { playVoice, handleEffectAudio } from "./audios.js";

let typeWriterInterval;
let messageIndex = -1;

let statusAction = {
  isTyping: false,
};

const displayFullMessage = () => {
  const currentScene = scenes.returnCurrentDialog();
  const message = currentScene.message.replaceAll(/\$\{[?!]\}/g, "");
  ui.dialog.innerHTML = message;
  setCharacter(currentScene.character, currentScene.expression);
};

// set character sprite
const setCharacter = (character, expression, isTalking = 0) => {
  const mode = isTalking ? "talking" : "silent";
  ui.character.src = `./assets/img/sprites/${character}/${mode}/${expression}.gif`;
};

const setBg = (bgName) => {
  ui.bg.src = `./assets/img/bg/${bgName}.png`;
};
const showDialog = (direction = "next") => {
  if (
    (scenes.configScene.messageIndex ==
      scenes.returnCurrentDialogs().length - 1 && direction == "next") |
    (scenes.configScene.messageIndex == 0 && direction == "prev") |
    (scenes.configScene.messageIndex == -1 && direction == "prev")
  ) {
    scenes.configScene.messageIndex = -1;

    ui.windowMessage.classList.add("d-none");
    ui.windowName.classList.add("d-none");
    ui.characterName.textContent = null;
    ui.dialog.innerHTML = null;
  } else {
    if (direction == "next") {
      scenes.configScene.messageIndex++;
    } else {
      scenes.configScene.messageIndex--;
    }
    buttons.desableButton();
    ui.windowMessage.classList.remove("d-none");
    showWindowName();
    ui.characterName.textContent = scenes.returnCurrentDialog()?.name;
    typeWriter(scenes.returnCurrentDialog());
  }
};
const nextCharacterAreEffects = (str, index) => {
  return (
    str.substring(index, index + 4) === "${?}" ||
    str.substring(index, index + 4) === "${!}"
  );
};

const getEffect = (str, index) => {
  const substring = str.substring(index, index + 4);
  if (substring === "${?}") return "shake";
  if (substring === "${!}") return "alert";
  return null;
};

const handleEffect = (effect) => {
  handleEffectAudio(effect);
  const element = effect === "alerte" ? ui.characterBox : ui.bg;
  element.classList.add(effect);
  setTimeout(() => {
    element.classList.remove(effect);
  }, 500);
};

// effect machine à écrire !
const typeWriter = (currentScene) => {
  let index = 0;
  let printedMessage = "";
  if (typeWriterInterval) {
    clearInterval(typeWriterInterval);
  }

  statusAction.isTyping = true;
  const isTalking = ui.character.src.includes(
    currentScene.character.toLowerCase()
  );
  setCharacter(currentScene.character, currentScene.expression, isTalking);
  setBg(currentScene.backgroud);

  currentScene.message = currentScene.message
    .replace(/\$\{(red|green|blue)\}/g, '<span class= "$1">')
    .replace(/\$\{\/\}/g, "</span>");
  const message = currentScene.message?.trim();

  typeWriterInterval = setInterval(() => {
    if (index < message.length) {
      if (nextCharacterAreEffects(message, index)) {
        const effect = getEffect(message, index);
        handleEffect(effect);
        index += 4;
      }
      if (message[index] === "<") {
        const closingTagIndex = message.indexOf(">", index);
        if (closingTagIndex != -1) {
          printedMessage += message.substring(index, closingTagIndex + 1);
          index = closingTagIndex + 1;
        } else {
        }
      } else {
        printedMessage += message[index];
        index++;
      }
      ui.dialog.innerHTML = printedMessage;
      if (index % 2 == 0) {
        playVoice(currentScene);
      }
    } else {
      clearInterval(typeWriterInterval);
      setCharacter(currentScene.character, currentScene.expression);
      statusAction.isTyping = false;
      buttons.desableButton();
    }
  }, 30);
};
const showWindowName = () => {
  if (
    ui.windowName.classList.contains("d-none") &&
    scenes.returnCurrentDialog()?.name
  ) {
    ui.windowName.classList.remove("d-none");
  } else if (
    ui.windowName.classList.contains("d-none") == false &&
    scenes.returnCurrentDialog()?.name == null
  ) {
    ui.windowName.classList.add("d-none");
  }
};

export {
  displayFullMessage,
  setCharacter,
  showDialog,
  typeWriter,
  showWindowName,
  statusAction,
  typeWriterInterval,
};
