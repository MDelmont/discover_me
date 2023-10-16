// element de l'interface

import ui from "./ui.js";
import * as audios from "./audios.js";
import * as buttons from "./buttons.js";
import * as characters from "./characters.js";
// Interaction button

const navigationButton = (side = "next") => {
  audios.playBgm();
  if (buttons.pressedBtp) return;

  if (side == "next") {
    buttons.pressButton(ui.nextButton, ui.arrowNextButton);
  } else {
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
    console.log(characters.statusAction.isTyping);
    characters.statusAction.isTyping = false;
  } else {
    setTimeout(() => {
      characters.showDialog(side);
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
    console.log(audios.audioSettings.mute);
    audios.audioSettings.mute = true;
    ui.logoSound.src = `./assets/img/ui/mute.png`;
    audios.audios.bgm.pause();
  }
};

ui.nextBox.addEventListener("click", () => navigationButton("next"));

ui.prevBox.addEventListener("click", () => navigationButton("prev"));

//   if (isTyping) {
//     clearInterval(typeWriterInterval);
//     characters.displayFullMessage();
//     buttons.resetUiButton(ui.prevButton, ui.arrowPrevButton);
//     isTyping = false;
//   } else {
//     setTimeout(() => {
//       characters.showDialog((direction = "prev"));
//       buttons.resetUiButton(ui.prevButton, ui.arrowPrevButton);
//     }, 100);
//   }
// });

ui.soundEffect.addEventListener("click", () => muteSong());
