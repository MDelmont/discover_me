let pressedBtp = false;
let messageIndex = -1;
let isTyping = false;
let typeWriterInterval;
let mute = true;
// element de l'interface
const ui = {
  // Partie messages
  windowName: document.querySelector("#window_name"),
  windowMessage: document.querySelector("#window_message"),

  // Partie Personnage
  character: document.querySelector("#character"),
  characterBox: document.querySelector("#characterbox"),
  bg: document.querySelector("#bg"),

  // Nom et message :
  characterName: document.querySelector("#name"),
  dialog: document.querySelector("#dialog"),

  // Button UI
  nextBox: document.querySelector("#nextbox"),
  nextButton: document.querySelector("#next_button"),
  arrowButton: document.querySelector("#arrow"),

  // partie sound
  soundEffect: document.querySelector("#soundeffect"),
  logoSound: document.querySelector("#logo_sound"),
};

// élements lié à l'audio
const audios = {
  bgm: new Audio("assets/sfx/gumshoe.mp3"),
  next: new Audio("assets/sfx/bip.wav"),
  alert: new Audio("assets/sfx/lightbulb.wav"),
  shake: new Audio("assets/sfx/smack.wav"),
  male: new Audio("assets/sfx/male.wav"),
  female: new Audio("assets/sfx/female.wav"),
};

const scene = [
  {
    character: "tektiv",
    name: "Tektiv",
    expression: "pumped",
    message:
      "${red}Bonjour ${/} pour le moment ${blue}c'est un test${/}  je shcerhc un truc pour avoirs unbee fefe!",
    voice: audios.male,
  },
  {
    character: "maya",
    name: "Maya",
    expression: "mad",
    message: "C'est le second message pour le moment",
    voice: audios.male,
  },
];
// change button
const resetUiButton = () => {
  ui.nextButton.classList.remove("pressBtn");
  ui.arrowButton.classList.remove("d-none");
  ui.nextButton.src = "assets/img/ui/default_button.png";
  pressedBtp = false;
};

const pressNextButton = () => {
  pressedBtp = true;
  ui.nextButton.classList.add("pressBtn");
  ui.arrowButton.classList.add("d-none");
  ui.nextButton.src = "assets/img/ui/pressed_button.png";
  if (!mute) {
    audios.next.currentTime = 0;
    audios.next.volume = 0.4;
    audios.next.play();
  }
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

// effect machine à écrire !
const typeWriter = (currentScene) => {
  let index = 0;
  let printedMessage = "";
  if (typeWriterInterval) {
    clearInterval(typeWriterInterval);
  }
  isTyping = true;
  setCharacter(currentScene.character, currentScene.expression, "talking");

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
      if (index % 2 == 0 && !mute) {
        currentScene.voice.currentTime = 0;
        currentScene.voice.volume = 0.01;
        currentScene.voice.play();
      }
    } else {
      clearInterval(typeWriterInterval);
      setCharacter(currentScene.character, currentScene.expression, "silent");
      isTyping = false;
    }
  }, 30);
};

const showNextDialog = () => {
  if (messageIndex == 1) {
    messageIndex = -1;

    ui.windowMessage.classList.add("d-none");
    ui.windowName.classList.add("d-none");
    ui.characterName.textContent = null;
    ui.dialog.innerHTML = null;
  } else {
    messageIndex++;
    ui.windowMessage.classList.remove("d-none");
    showWindowName();

    ui.characterName.textContent = scene[messageIndex]?.name;

    typeWriter(scene[messageIndex]);
  }
};

// set character sprite
const setCharacter = (character, expression, mode = "silent") => {
  ui.character.src = `./assets/img/sprites/${character}/${mode}/${expression}.gif`;
};

const displayFullMessage = () => {
  const currentScene = scene[messageIndex];
  ui.dialog.innerHTML = currentScene.message;
  setCharacter(currentScene.character, currentScene.expression, "silent");
};

// Interaction button
ui.nextBox.addEventListener("click", () => {
  if (audios.bgm.paused && !mute) {
    audios.bgm.loop = true;
    audios.bgm.volume = 0.05;
    audios.bgm.play();
  }
  if (pressedBtp) return;
  pressNextButton();

  if (isTyping) {
    clearInterval(typeWriterInterval);
    displayFullMessage();
    resetUiButton();
    isTyping = false;
  } else {
    setTimeout(() => {
      showNextDialog();
      resetUiButton();
    }, 100);
  }
});

ui.soundEffect.addEventListener("click", () => {
  if (mute) {
    mute = false;
    ui.logoSound.src = `./assets/img/ui/volume.png`;
    audios.bgm.loop = true;
    audios.bgm.volume = 0.05;
    audios.bgm.play();
  } else {
    mute = true;
    ui.logoSound.src = `./assets/img/ui/mute.png`;
    audios.bgm.pause();
  }
});
