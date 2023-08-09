import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import FlightsJSON from '../../mocks/flights.json';

const initialState = {
  error: null,
  flights: [],
  isLoadingFlights: false,
};

export const getFlightsAsync = createAsyncThunk(
  'flights/getScheduledFlights',
  async (search) => {
    try {
      const response = { ...FlightsJSON };
      const data = response.data.filter((item) => {
        return (
          item?.departure.iataCode === search.flightFrom &&
          item?.arrival.iataCode === search.flightTo &&
          new Date(item?.departure.scheduledTime) >
            new Date(search.detartureDate).setHours(0, 0, 0, 0) &&
          new Date(item?.departure.scheduledTime).setHours(0, 0, 0, 0) <=
            new Date(search.detartureDate).setHours(24, 0, 0, 0)
        );
      });
      return data;
    } catch (err) {
      return console.log(err);
    }
  }
);

export const flightsSlice = createSlice({
  name: 'flights',
  initialState,
  reducers: {
    getScheduledFlights: (state, action) => {
      return {
        ...state,
        flights: action.payload,
      };
    },
  },
  extraReducers: {
    [getFlightsAsync.pending.type]: (state) => {
      state.isLoadingFlights = true;
    },
    [getFlightsAsync.fulfilled.type]: (state, { payload }) => {
      state.isLoadingFlights = false;
      state.flights = payload;
    },
    [getFlightsAsync.rejected.type]: (state, { payload }) => {
      state.isLoadingFlights = false;
      state.error = payload;
      state.flights = [];
    },
  },
});

export const { getScheduledFlights } = flightsSlice.actions;
export default flightsSlice.reducer;
