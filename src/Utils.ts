export const calculateTime = (secs: number) => {
  const minutes = Math.floor(secs / 60);
  const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const seconds = Math.floor(secs % 60);
  const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${returnedMinutes}:${returnedSeconds}`;
};

export const playCorrectSound = () => {
  const audio = new Audio('/assets/audio/correct.mp3');
  audio.play();
};

export const playWrongSound = () => {
  const audio = new Audio('/assets/audio/wrong.mp3');
  audio.play();
};
