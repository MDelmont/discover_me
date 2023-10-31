import { playNext } from "./audios.js";
import ui from "./ui.js";
import * as characters from "./characters.js";
import * as scenes from "./scenes.js";
let pressedBtp = false;

const resetUiButton = (btn, arrow) => {
  btn.classList.remove("pressBtn");
  arrow.classList.remove("d-none");
  btn.src = "assets/img/ui/default_button.png";
  pressedBtp = false;
};

const pressButton = (btn, arrow) => {
  pressedBtp = true;
  btn.classList.add("pressBtn");
  arrow.classList.add("d-none");
  btn.src = "assets/img/ui/pressed_button.png";
  playNext();
};
const addDisableToBtn = (btn) => {
  if (!btn.classList.contains("desable")) {
    btn.classList.add("desable");
  }
};
const removeDesableBtn = (btn) => {
  if (btn.classList.contains("desable")) {
    btn.classList.remove("desable");
  }
};
const desableButton = () => {

  if (
    scenes.returnCurrentDialogs().length == 1 &&
    !characters.statusAction.isTyping
  ) {
    addDisableToBtn(ui.nextBox);
    addDisableToBtn(ui.prevBox);
  } else if (
    scenes.configScene.messageIndex == 0 &&
    !characters.statusAction.isTyping
  ) {
    addDisableToBtn(ui.prevBox);
    removeDesableBtn(ui.nextBox);
  } else if (
    scenes.returnCurrentDialogs().length - 1 ==
      scenes.configScene.messageIndex &&
    !characters.statusAction.isTyping
  ) {
    addDisableToBtn(ui.nextBox);
    removeDesableBtn(ui.prevBox);
  } else {
    removeDesableBtn(ui.nextBox);
    removeDesableBtn(ui.prevBox);
  }
};

export { resetUiButton, pressButton, pressedBtp, desableButton };
