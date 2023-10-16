// élements lié à l'audio
const audios = {
  bgm: new Audio("assets/sfx/gumshoe.mp3"),
  next: new Audio("assets/sfx/bip.wav"),
  alert: new Audio("assets/sfx/lightbulb.wav"),
  shake: new Audio("assets/sfx/smack.wav"),
  male: new Audio("assets/sfx/male.wav"),
  female: new Audio("assets/sfx/female.wav"),
};
let audioSettings = {
  mute: false,
};

const playBgm = () => {
  if (audios.bgm.paused && !audioSettings.mute) {
    audios.bgm.loop = true;
    audios.bgm.volume = 0.05;
    audios.bgm.play();
  }
};

const playNext = () => {
  if (!audioSettings.mute) {
    audios.next.currentTime = 0;
    audios.next.volume = 0.4;
    audios.next.play();
  }
};

const playVoice = (currentScene) => {
  if (!audioSettings.mute) {
    currentScene.voice.currentTime = 0;
    currentScene.voice.volume = 0.01;
    currentScene.voice.play();
  }
};

export { audios, audioSettings, playBgm, playNext, playVoice };
