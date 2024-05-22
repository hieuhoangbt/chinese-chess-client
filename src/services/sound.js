export const playSound = (type) => {
  let audio;
  switch (type) {
    case 'move':
      audio = new Audio('/sounds/move.mp3');
      break;
    case 'capture':
      audio = new Audio('/sounds/capture.mp3');
      break;
    case 'check':
      audio = new Audio('/sounds/check.mp3');
      break;
    default:
      return;
  }
  audio.play();
};
