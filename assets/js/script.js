// element de l'interface

import ui from "./ui.js";
import * as audios from "./audios.js";
import * as buttons from "./buttons.js";
import * as characters from "./characters.js";
import * as choises from "./choises.js";
import * as scenes from "./scenes.js";
// Interaction button

const navigationButton = (side = "next") => {
  audios.playBgm();
  if (buttons.pressedBtp) return;

  if (side == "next") {
    if (ui.nextButton.classList.contains("desable")) return;
    buttons.pressButton(ui.nextButton, ui.arrowNextButton);
  } else {
    if (ui.prevButton.classList.contains("desable")) return;
    buttons.pressButton(ui.prevButton, ui.arrowPrevButton);
  }

  if (characters.statusAction.isTyping) {
    clearInterval(characters.typeWriterInterval);
    characters.displayFullMessage();
    if (side == "next") {
      buttons.resetUiButton(
        ui.nextButton,
        ui.arrowNextButton,
        buttons.pressedBtp
      );
    } else {
      buttons.resetUiButton(
        ui.prevButton,
        ui.arrowPrevButton,
        buttons.pressedBtp
      );
    }

    characters.statusAction.isTyping = false;
    buttons.desableButton();
  } else {
    setTimeout(() => {
      scenes.makeScene(side);
      if (side == "next") {
        buttons.resetUiButton(
          ui.nextButton,
          ui.arrowNextButton,
          buttons.pressedBtp
        );
      } else {
        buttons.resetUiButton(
          ui.prevButton,
          ui.arrowPrevButton,
          buttons.pressedBtp
        );
      }
    }, 100);
  }
};

const muteSong = () => {
  if (audios.audioSettings.mute) {
    audios.audioSettings.mute = false;
    ui.logoSound.src = `./assets/img/ui/volume.png`;
    audios.audios.bgm.loop = true;
    audios.audios.bgm.volume = 0.05;
    audios.audios.bgm.play();
  } else {
    audios.audioSettings.mute = true;
    ui.logoSound.src = `./assets/img/ui/mute.png`;
    audios.audios.bgm.pause();
  }
};

const selectChoise = (event) => {
  const clickedElement =
    event.target.nodeName === "P" ? event.target.parentNode : event.target;
  const clickedElementchild =
    event.target.nodeName === "P" ? event.target : event.target.children[0];
  if (clickedElement.classList.contains("choice")) {
    if (clickedElementchild.textContent === "Start") {
      ui.character.classList.remove("d-none");
      ui.soundEffect.classList.remove("d-none");
      ui.navig.classList.remove("d-none");
      ui.choiceBox.classList.remove("start");
      ui.bgBottom.src = "./assets/img/bg/SecretRoom.png";
    }
    const id = clickedElement.id;
    scenes.configScene.currentSceneIndex = id;
    scenes.configScene.messageIndex = -1;

    scenes.makeScene();
    buttons.desableButton();
  }
};

ui.nextBox.addEventListener("click", () => navigationButton("next"));

ui.prevBox.addEventListener("click", () => navigationButton("prev"));

ui.soundEffect.addEventListener("click", () => muteSong());

ui.choiceBox.addEventListener("click", () => selectChoise(event));
