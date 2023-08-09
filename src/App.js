import HomePage from './pages/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookingPage from './pages/BookingPage';
import { useEffect } from 'react';
import { store } from './redux/store';
import { getAirportsAsync } from './redux/slices/airportsSlice';

function App() {
    useEffect(() => {
        store.dispatch(getAirportsAsync());
    }, []);

    return (
        <div className='app'>
            <Router>
                <Routes>
                    <Route exact path='/' element={<HomePage />}></Route>
                    <Route exact path='/booking' element={<BookingPage />}></Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
