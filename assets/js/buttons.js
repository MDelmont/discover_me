import { playNext } from "./audios.js";

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

export { resetUiButton, pressButton, pressedBtp };
