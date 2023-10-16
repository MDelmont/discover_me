import ui from "./ui.js";
import scene from "./datas.js";
import { playVoice } from "./audios.js";
let typeWriterInterval;
let messageIndex = -1;

let statusAction = {
  isTyping: false,
};

const displayFullMessage = () => {
  const currentScene = scene[messageIndex];
  ui.dialog.innerHTML = currentScene.message;
  setCharacter(currentScene.character, currentScene.expression);
};

// set character sprite
const setCharacter = (character, expression, isTalking = 0) => {
  const mode = isTalking ? "talking" : "silent";
  ui.character.src = `./assets/img/sprites/${character}/${mode}/${expression}.gif`;
};

const showDialog = (direction = "next") => {
  if (
    (messageIndex == 2 && direction == "next") |
    (messageIndex == 0 && direction == "prev") |
    (messageIndex == -1 && direction == "prev")
  ) {
    messageIndex = -1;

    ui.windowMessage.classList.add("d-none");
    ui.windowName.classList.add("d-none");
    ui.characterName.textContent = null;
    ui.dialog.innerHTML = null;
  } else {
    if (direction == "next") {
      messageIndex++;
    } else {
      messageIndex--;
    }
    ui.windowMessage.classList.remove("d-none");
    showWindowName();
    ui.characterName.textContent = scene[messageIndex]?.name;

    typeWriter(scene[messageIndex]);
  }
};

// effect machine à écrire !
const typeWriter = (currentScene) => {
  let index = 0;
  let printedMessage = "";
  if (typeWriterInterval) {
    clearInterval(typeWriterInterval);
  }
  statusAction.isTyping = true;
  setCharacter(currentScene.character, currentScene.expression, 1);
  currentScene.message = currentScene.message
    .replace(/\$\{(red|green|blue)\}/g, '<span class= "$1">')
    .replace(/\$\{\/\}/g, "</span>");
  const message = currentScene.message?.trim();
  typeWriterInterval = setInterval(() => {
    if (index < message.length) {
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
    }
  }, 30);
};

const showWindowName = () => {
  if (ui.windowName.classList.contains("d-none") && scene[messageIndex]?.name) {
    ui.windowName.classList.remove("d-none");
  } else if (
    ui.windowName.classList.contains("d-none") == false &&
    scene[messageIndex]?.name == null
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
