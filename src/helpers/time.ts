export const timeFormat = function (time: number) {
  if (time < 0) return '00:00';

  const hour = Math.floor(time / 3600);
  const minute = Math.floor((time - hour * 3600) / 60);
  const seconds = time - (hour * 3600 + minute * 60);

  let formatTime = [minute, seconds]
    .map((time) => (time < 10 ? '0' + time : time))
    .join(':');

  return formatTime;
};
