import Home from '../components/Home/Home';
import { initialBookingData } from '../constants';
import FlightsPage from '../pages/FlightsPage';
import { Box } from '@mui/material';
import { useState } from 'react';

function HomePage() {
    const [openFlight, setOpenFlight] = useState(false);
    const [bookingDetails, setBookingDetails] = useState({ ...initialBookingData });
    return (
        <Box>
            <Home bookingDetails={bookingDetails} setBookingDetails={setBookingDetails} setOpenFlight={setOpenFlight} />
            {openFlight && <FlightsPage bookingDetails={bookingDetails} setBookingDetails={setBookingDetails} />}
        </Box>
    );
}

export default HomePage;
