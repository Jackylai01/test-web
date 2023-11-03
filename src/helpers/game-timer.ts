export const getGameTimer = (endAt: Date, level: number = 1) => {
  let levelTime;
  const endAtTime = new Date(endAt).getTime();
  const currentTime = new Date().getTime();

  switch (level) {
    case 1:
      levelTime = 600;
      break;
    case 2:
      levelTime = 480;
      break;
    case 3:
      levelTime = 300;
      break;
    default:
      levelTime = 600;
  }

  return Math.round((endAtTime - currentTime + levelTime) / 1000);
};
