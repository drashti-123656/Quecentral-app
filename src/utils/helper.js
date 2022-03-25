import moment from 'moment';

export const hoursSplitter = (fromTime, toTime) => {
  let startTime = fromTime.split(':')[0];
  let endTime = toTime.split(':')[0];
  let splitedHours = [];

  while (startTime < endTime) {
    splitedHours.push(
      `${parseInt(startTime)} : ${fromTime.split(':')[1]} to ${
        parseInt(startTime) + 1
      } : ${fromTime.split(':')[1]}`,
    );
    ++startTime;
  }

  return splitedHours;
};

export const genderData = [
  {
    id: 'male',
    name: 'male',
  },
  {
    id: 'female',
    name: 'female',
  },
];

export const dateOfWeekDays = () => {
  let x = [
    {
      day: '1',
    },
    {
      day: '2',
    },
  ];
  let mappedData = x.map(item => {
    let day;
    switch (item.day) {
      case '0':
        day = 'Sunday';
        break;
      case '1':
        day = 'Monday';
        break;
      case '2':
        day = 'Tuesday';
        break;
      case '3':
        day = 'Wednesday';
        break;
      case '4':
        day = 'Thursday';
        break;
      case '5':
        day = 'Friday';
        break;
      case '6':
        day = 'Saturday';
    }
    return day;
  });

  let data = {};

  mappedData.forEach(item => {
    let monday = moment().startOf('month').day(item);
    if (monday.date() > 7) monday.add(7, 'd');
    let month = monday.month();
    while (month === monday.month()) {
      data[moment(monday.toString()).format('YYYY-MM-DD')] = {
        selected: true,
        marked: true,
        selectedColor: 'red',
        disabled: false,
      };
      monday.add(7, 'd');
    }
  });

  return data;
};

export const sad = days => {
  let data = ['monday', 'tuesday'];
  let monday = moment().startOf('month').day('Monday');
  if (monday.date() > 7) monday.add(7, 'd');
  let month = monday.month();
  while (month === monday.month()) {
    data[moment(monday.toString()).format('YYYY-MM-DD')] = {
      selected: true,
      marked: true,
      selectedColor: 'red',
      disabled: false,
    };
    monday.add(7, 'd');
  }
  return data;
};
