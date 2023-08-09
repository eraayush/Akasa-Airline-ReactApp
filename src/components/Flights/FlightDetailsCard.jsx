import React from 'react';
import FlightIcon from '@mui/icons-material/Flight';
import { displayFlightTime, getHoursMinutes } from '../../utils';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

function FlightDetailsCard({ item, bookingDetails, setBookingDetails }) {
    const navigate = useNavigate();
    const selectFlight = (item) => {
        const bookData = { ...bookingDetails, flightDetails: item };
        setBookingDetails(bookData);
        navigate('/booking', { state: bookData });
    };
    return (
        item && (
            <Box className='flex w-[90%] m-auto shadow-md border rounded-lg py-2 px-6 bg-gray mb-4 justify-between items-start'>
                <Box className='py-6'>
                    <Box className='text-2xl font-bold'>{displayFlightTime(item.departure.scheduledTime)} </Box>
                    <Box className='text-[gray] font-bold'>
                        {item.departure.iataCode} {item.departure.terminal && `(T${item.departure.terminal})`}
                    </Box>
                    <Box className='text-[gray] text-sm'>{item.flight.iataNumber}</Box>
                </Box>
                <Box className='flex flex-col w-[50%] py-6'>
                    <Box className='text-[gray] text-center text-sm'>{getHoursMinutes(item.arrival.scheduledTime, item.departure.scheduledTime)}</Box>
                    <Box className='flex justify-center items-center'>
                        <Box className='w-[100%] h-[2px] bg-[#ddd0f6]'></Box>
                        <FlightIcon color='#5c0fd9' className='rotate-90 text-[#5c0fd9]' />
                        <Box className='w-[100%] h-[2px] bg-[#ddd0f6]'></Box>
                    </Box>
                    <Box className='text-[gray] text-center font-bold text-sm'>Non-stop</Box>
                </Box>
                <Box className='py-6'>
                    <Box className='text-2xl font-bold'>{displayFlightTime(item.arrival.scheduledTime)}</Box>
                    <Box className='text-[gray] font-bold'>
                        {item.arrival.iataCode} {item.arrival.terminal && `(T${item.arrival.terminal})`}
                    </Box>
                </Box>
                <Box className='flex flex-col justify-between pt-5 h-[116px]'>
                    <Box className='text-2xl font-bold'>
                        <CurrencyRupeeIcon />
                        {item.flight.price}
                    </Box>
                    <Button variant='contained' onClick={() => selectFlight(item)} className='btn btn-bg !text-sm !py-2.5 !px-6'>
                        Select
                    </Button>
                </Box>
            </Box>
        )
    );
}

export default FlightDetailsCard;
