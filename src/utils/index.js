import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export const getHoursMinutes = (fromDate, toDate) => {
  const date = (new Date(fromDate) - new Date(toDate)) / (1000 * 60);
  const hours = Math.floor(date / 60);
  const mins = date % 60;
  // return `${hours}h ${mins}m`;
  const h = hours < 0 ? 24 + hours : hours;
  const m = mins < 0 ? 60 + mins : mins;
  return `${h}h ${m}m`;
};

export const displayFlightTime = (fdate) => {
  const date = new Date(fdate);
  return `${date.getHours()}:${
    date.getMinutes() === 0 ? '00' : date.getMinutes()
  }`;
};

export const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getCrausalDate = (date) => {
  const outputFormat = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
  });
  const fDate = outputFormat.format(date).split(' ');
  return {
    id: new Date(date),
    day: fDate[0].replace(',', ''),
    date: `${fDate[2]} ${fDate[1]}`,
    price: randomIntFromInterval(3000, 5000),
  };
};

export const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 7,
  slidesToScroll: 6,
  nextArrow: <ArrowBackIosIcon sx={{ color: 'transparent' }} />,
  prevArrow: <ArrowForwardIosIcon sx={{ color: 'transparent' }} />,
  customPaging: function (i) {
    return <div className="dot"></div>;
  },
};
