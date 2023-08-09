import React from 'react';
import Passenger from '../components/Passenger/Passenger';
import { useLocation } from 'react-router-dom';

function BookingPage() {
    const { state } = useLocation();

    return <Passenger state={state} />;
}

export default BookingPage;
