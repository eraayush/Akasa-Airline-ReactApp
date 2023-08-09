import { Box, Button } from '@mui/material';
import DateCarousel from '../components/Flights/DateCarousel';
import FlightDetailsCard from '../components/Flights/FlightDetailsCard';
import { useSelector } from 'react-redux';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useEffect, useState } from 'react';

function FlightsPage({ bookingDetails, setBookingDetails }) {
    let { flights } = useSelector((state) => state.flights);
    const chepest = [...flights].sort((a, b) => parseFloat(a.flight.price) - parseFloat(b.flight.price))[0];
    const [sortBy, setSortBy] = useState('price');
    const [flightData, setFlightData] = useState([...flights]);

    useEffect(() => {
        if (sortBy === 'price') {
            flightData.sort((a, b) => parseFloat(a.flight.price) - parseFloat(b.flight.price));
        } else if (sortBy === 'duration') {
            flightData.sort((a, b) => {
                const date1 = new Date(a.departure.scheduledTime) - new Date(a.arrival.scheduledTime);
                const date2 = new Date(b.departure.scheduledTime) - new Date(b.arrival.scheduledTime);
                return date2 - date1;
            });
        } else if (sortBy === 'depTime') {
            flightData.sort((a, b) => new Date(a.departure.scheduledTime) - new Date(b.departure.scheduledTime));
        }
        setFlightData([...flightData]);
    }, [sortBy, flights]);

    const sortByList = [{ id: 'price', title: 'Price' }, { id: 'duration', title: 'Duration' }, , { id: 'depTime', title: 'Departure time' }];

    return (
        <>
            <Box className='w-[80%] m-auto'>
                <Box className='bg-[whitesmoke] rounded-lg text-sm px-2 mb-2'>
                    <Box className='mx-2 py-3'>
                        <DateCarousel chepest={chepest} bookingDetails={bookingDetails} setBookingDetails={setBookingDetails} />
                    </Box>
                    <Box className='flex justify-between h-12 border-t border-[#ddd]'>
                        <Box className='mx-2 my-2 !text-[#ff6301]'>
                            {sortByList.map((item) => (
                                <Button className={`btn !text-[${sortBy === item.id ? '#ff6301' : 'gray'}]`} onClick={() => setSortBy(item.id)}>
                                    {sortBy === item.id && <ArrowDownwardIcon />}
                                    {item.title}
                                </Button>
                            ))}
                        </Box>
                        <Box className='mx-2'>
                            <Button>Filter</Button>
                        </Box>
                    </Box>
                </Box>
                {flightData.length > 0 ? (
                    flightData.map((item) => <FlightDetailsCard item={item} bookingDetails={bookingDetails} setBookingDetails={setBookingDetails} />)
                ) : (
                    <Box className='w-full h-48 flex justify-center items-center border border-[whitesmocke] text-2xl rounded-lg'>No Flight Found</Box>
                )}
            </Box>
        </>
    );
}

export default FlightsPage;
