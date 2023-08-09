import { configureStore, combineReducers } from '@reduxjs/toolkit';
import airportsReducer from './slices/airportsSlice';
import flightsReducer from './slices/flightsSlice';

const rootReducer = combineReducers({
    airports: airportsReducer,
    flights: flightsReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
