import { Box } from '@mui/material';
import Slider from 'react-slick';
import { getCrausalDate, settings } from '../../utils';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { useEffect, useState } from 'react';
import { store } from '../../redux/store';
import { getFlightsAsync } from '../../redux/slices/flightsSlice';

const DateCarousel = ({ chepest, bookingDetails, setBookingDetails }) => {
  const [crousalData, setCrousalData] = useState([]);

  useEffect(() => {
    const dates = [];
    const numDates = 56;
    const currentDate = new Date();
    for (let i = 0; i < numDates; i++) {
      dates.push(getCrausalDate(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    setCrousalData(dates);
  }, []);

  const searchBydate = (date) => {
    const bookData = { ...bookingDetails, detartureDate: date.toISOString() };
    setBookingDetails(bookData);
    store.dispatch(getFlightsAsync(bookData));
  };

  const filteredDate = getCrausalDate(new Date(bookingDetails.detartureDate));

  return (
    <Box className="flex justify-center items-center">
      <ArrowBackIosIcon sx={{ color: '#ff6301' }} />
      <Box className="w-[90%] py-2 h-20">
        <Slider {...settings}>
          {crousalData.map((item, index) => (
            <Box
              onClick={() => searchBydate(item?.id)}
              className={`!flex flex-col items-center !w-20 m-auto pb-2 ${
                filteredDate.date === item?.date
                  ? 'text-[#ff6301] font-bold border-b-4 border-[#ff6301]'
                  : ''
              }`}
              key={index}>
              <h3>{item?.date}</h3>
              <h3>{item?.day}</h3>
              <h3>
                <CurrencyRupeeIcon sx={{ fontSize: '14px' }} />
                {filteredDate.date === item?.date
                  ? chepest?.flight?.price
                  : item?.price}
              </h3>
            </Box>
          ))}
        </Slider>
      </Box>
      <ArrowForwardIosIcon sx={{ color: '#ff6301' }} />
    </Box>
  );
};

export default DateCarousel;
