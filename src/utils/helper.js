export const hoursSplitter = (fromTime, toTime) => {
  let startTime = fromTime.split(':')[0];
  let endTime = toTime.split(':')[0];
  let splitedHours = [];

  while (startTime < endTime) {
    splitedHours.push(
      `${parseInt(startTime)} : ${fromTime.split(':')[1]} to ${ parseInt(startTime) + 1} : ${fromTime.split(':')[1]}`,
    );
    ++startTime;
  }

  return splitedHours;
};
