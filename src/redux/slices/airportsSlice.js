import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AirportsJSON from '../../mocks/cities.json';

const initialState = {
    error: null,
    airports: [],
    isLoadingAirports: false,
};

export const getAirportsAsync = createAsyncThunk('airports/getIndianAirports', async () => {
    try {
        const response = { ...AirportsJSON };
        return response.data;
    } catch (err) {
        return console.log(err);
    }
});

export const airportsSlice = createSlice({
    name: 'airports',
    initialState,
    reducers: {
        getIndianAirports: (state, action) => {
            return {
                ...state,
                airports: action.payload,
            };
        },
    },
    extraReducers: {
        [getAirportsAsync.pending.type]: (state) => {
            state.isLoadingFlights = true;
        },
        [getAirportsAsync.fulfilled.type]: (state, { payload }) => {
            state.isLoadingFlights = false;
            state.airports = payload;
        },
        [getAirportsAsync.rejected.type]: (state, { payload }) => {
            state.isLoadingFlights = false;
            state.error = payload;
            state.airports = [];
        },
    },
});

export const { getIndianAirports } = airportsSlice.actions;
export default airportsSlice.reducer;
