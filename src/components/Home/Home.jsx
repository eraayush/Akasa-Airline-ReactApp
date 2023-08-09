import './home.css';
import React, { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import dayjs from 'dayjs';
import { Autocomplete, Button, Typography } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useSelector } from 'react-redux';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { store } from '../../redux/store';
import { getFlightsAsync } from '../../redux/slices/flightsSlice';
import { defPassangers } from '../../constants';

function Home({ bookingDetails, setBookingDetails, setOpenFlight }) {
  const { airports } = useSelector((state) => state.airports);
  const [isError, setIsError] = useState(false);

  const [, setFromQuery] = useState('');
  const [, setToQuery] = useState('');

  const [openPassenger, setOpenPassenger] = useState(false);
  const [passengerList, setPassengerList] = useState([...defPassangers]);

  const handleTripTypeChange = (event) => {
    setBookingDetails({ ...bookingDetails, tripType: event.target.value });
  };

  const handleFlightFrom = (event, value) => {
    setBookingDetails({ ...bookingDetails, flightFrom: value?.iataCode });
  };
  const handleFlightTo = (event, value) => {
    setBookingDetails({ ...bookingDetails, flightTo: value?.iataCode });
  };
  const handleDepartureDate = (date) => {
    setBookingDetails({
      ...bookingDetails,
      detartureDate: date.toISOString(),
    });
  };
  const handleReturnDate = (date) => {
    setBookingDetails({ ...bookingDetails, returnDate: date });
  };
  const handlePromoCode = (code) => {
    setBookingDetails({ ...bookingDetails, promoCode: code });
  };

  const swapFromTo = () => {
    setBookingDetails({
      ...bookingDetails,
      flightTo: bookingDetails?.flightFrom,
      flightFrom: bookingDetails?.flightTo,
    });
  };

  const decreasePassenger = (id) => {
    const passengers = passengerList.map((item) => {
      if (item.id === id) {
        item.count--;
      }
      return item;
    });
    setPassengerList([...passengers]);
  };

  const increasePassenger = (id) => {
    const passengers = passengerList.map((item) => {
      if (item.id === id) {
        item.count++;
      }
      return item;
    });
    setPassengerList([...passengers]);
  };

  const searchFlights = async () => {
    setOpenFlight(false);
    if (bookingDetails.flightFrom !== '' && bookingDetails.flightTo !== '') {
      bookingDetails.passengerDeatils = passengerList.map((item) => {
        return { id: item.id, count: item.count };
      });
      await store.dispatch(getFlightsAsync(bookingDetails));
      setOpenFlight(true);
    } else {
      setIsError(true);
    }
  };

  const filterFromOptions = (options, fromQuery) => {
    let newOptions = [];
    if (fromQuery.inputValue !== '') {
      options.forEach((item) => {
        if (
          item?.city_name
            ?.toLowerCase()
            .includes(fromQuery?.inputValue.toLowerCase())
        )
          newOptions.push(item);
      });
      return newOptions;
    } else if (bookingDetails.flightTo !== '') {
      options.forEach((item) => {
        if (
          !item?.iataCode
            ?.toLowerCase()
            .includes(bookingDetails?.flightTo.toLowerCase())
        )
          newOptions.push(item);
      });
      return newOptions;
    }
    return airports;
  };

  const filterToOptions = (options, toQuery) => {
    let newOptions = [];
    if (toQuery.inputValue !== '') {
      options.forEach((item) => {
        if (
          item?.city_name
            ?.toLowerCase()
            .includes(toQuery?.inputValue.toLowerCase())
        )
          newOptions.push(item);
      });
      return newOptions;
    } else if (bookingDetails.flightFrom !== '') {
      options.forEach((item) => {
        if (
          !item?.iataCode
            ?.toLowerCase()
            .includes(bookingDetails?.flightFrom.toLowerCase())
        )
          newOptions.push(item);
      });
      return newOptions;
    }
    return airports;
  };

  return (
    <Box className="home-page">
      <FormControl>
        <Box noValidate component="form" autoComplete="off">
          <RadioGroup
            row
            name="trip-radio"
            className="w-72 ml-1 mb-4 justify-between"
            value={bookingDetails.tripType}
            onChange={handleTripTypeChange}>
            <FormControlLabel
              value="oneway"
              control={<Radio />}
              label="One Way"
              className={`mr-8 ${
                bookingDetails.tripType === 'oneway' ? 'text-[#ff6301]' : ''
              }`}
            />
            <FormControlLabel
              value="round"
              control={<Radio />}
              label="Round Trip"
              className={`mr-8 ${
                bookingDetails.tripType === 'round' ? 'text-[#ff6301]' : ''
              }`}
            />
          </RadioGroup>
          <Box className="flex items-start gap-4 flex-wrap fields">
            <Box className="!pt-2 flex items-start gap-4 auto-complete">
              <Box>
                <Autocomplete
                  id="from-auto"
                  freeSolo
                  autoHighlight
                  sx={{ width: 230 }}
                  options={airports}
                  filterOptions={filterFromOptions}
                  getOptionLabel={(option) => option.city_name}
                  onChange={handleFlightFrom}
                  onInputChange={(event, value) => setFromQuery(value)}
                  renderOption={(props, option) => (
                    <Box
                      component="li"
                      className="flex flex-col m-4 border-b border-[#dddddb] items-start gap-2"
                      {...props}
                      key={option.iataCode}>
                      {`${option.iataCode} ${option.city_name}`}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      label="From"
                      id="from"
                      size="small"
                      {...params}
                      inputProps={{
                        ...params.inputProps,
                      }}
                    />
                  )}
                />
                {isError && bookingDetails.flightFrom === '' && (
                  <p className="text-sm text-[#ca1717] pt-2">
                    This Field is required
                  </p>
                )}
              </Box>
              <ImportExportIcon
                className="rotate-90 my-2"
                sx={{ color: '#5c0fd9' }}
                onClick={swapFromTo}
              />
              <Box>
                <Autocomplete
                  id="to-auto"
                  freeSolo
                  autoHighlight
                  sx={{ width: 230 }}
                  options={airports}
                  filterOptions={filterToOptions}
                  getOptionLabel={(option) => option.city_name}
                  onChange={handleFlightTo}
                  onInputChange={(event, value) => setToQuery(value)}
                  renderOption={(props, option) => (
                    <Box
                      component="li"
                      className="flex flex-col m-4 border-b border-[#dddddb] items-start gap-2"
                      {...props}
                      key={option.iataCode}>
                      {`${option.iataCode} ${option.city_name}`}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      label="To"
                      id="to"
                      size="small"
                      {...params}
                      inputProps={{
                        ...params.inputProps,
                      }}
                    />
                  )}
                />
                {isError && bookingDetails.flightTo === '' && (
                  <p className="text-sm text-[#ca1717] pt-2">
                    This Field is required
                  </p>
                )}
              </Box>
            </Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  sx={{ 'padding-top': 0, svg: { color: '#ff6301' } }}
                  slotProps={{ textField: { size: 'small' } }}
                  label="Departure Date"
                  format="DD-MMM-YYYY"
                  onChange={handleDepartureDate}
                  value={dayjs(bookingDetails.detartureDate)}
                  defaultValue={dayjs(bookingDetails.detartureDate)}
                />
              </DemoContainer>
            </LocalizationProvider>
            {bookingDetails.tripType === 'round' && (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker
                    sx={{ 'padding-top': 0, svg: { color: '#ff6301' } }}
                    slotProps={{ textField: { size: 'small' } }}
                    label="Return Date"
                    format="DD-MMM-YYYY"
                    onChange={handleReturnDate}
                    value={dayjs(bookingDetails.returnDate)}
                    defaultValue={dayjs(bookingDetails.returnDate)}
                  />
                </DemoContainer>
              </LocalizationProvider>
            )}
            <Box className="mt-2">
              <Button
                variant="outlined"
                onClick={() => setOpenPassenger(true)}
                className="h-10 w-[250px]">
                <Box className="flex items-center justify-between w-full">
                  <Box className="flex flex-col justify-start items-start mr-1">
                    <Box className="capitalize text-[black]">Passengers</Box>
                    <Box className="capitalize truncate text-[gray]">
                      {passengerList.map((item) => {
                        return item.count > 0
                          ? `${item.id} ${item.count} `
                          : '';
                      })}
                    </Box>
                  </Box>
                  <KeyboardArrowDownIcon sx={{ color: '#ff6301' }} />
                </Box>
              </Button>
              {openPassenger && (
                <Box className="absolute w-[320px] bg-[#fff] z-50 shadow-lg border border-[#ddd] rounded-lg mt-2">
                  <>
                    {passengerList.map((item) => (
                      <Box className="flex !rounded-none justify-between my-3 mx-4 pb-3 border-b">
                        <Box>
                          <Box className="font-bold text-[gray]">
                            {item.title}
                          </Box>
                          <Box className="text-sm text-[gray] text-sm">
                            {item.description}
                          </Box>
                        </Box>
                        <Box className="flex items-center gap-2">
                          <Box>
                            <RemoveCircleOutlineIcon
                              sx={{ color: '#ff6301' }}
                              onClick={() => decreasePassenger(item.id)}
                            />
                          </Box>
                          <Box>{item.count}</Box>
                          <Box>
                            <AddCircleOutlineIcon
                              sx={{ color: '#ff6301' }}
                              onClick={() => increasePassenger(item.id)}
                            />
                          </Box>
                        </Box>
                      </Box>
                    ))}
                    <Box
                      variant="contained"
                      className="flex justify-end mx-4 mb-3"
                      onClick={() => setOpenPassenger(false)}>
                      <Button
                        variant="contained"
                        onClick={() => {
                          setOpenPassenger(false);
                        }}
                        className="btn btn-bg !text-sm !py-2.5 !px-6">
                        Done
                      </Button>
                    </Box>
                  </>
                </Box>
              )}
            </Box>
            <Box className="!pt-2 flex items-center gap-4">
              <TextField
                label="Promo Code"
                id="promoCode"
                size="small"
                className="input"
                onChange={handlePromoCode}
              />
            </Box>
          </Box>
          <Box className="flex items-center justify-between mt-6">
            <Box className="flex flex-col gap-2 flex-wrap">
              <Box className="flex mb-2 ml-1 gap-3 items-center">
                <Typography> Special fares</Typography>
                <HelpOutlineIcon fontSize="small" />
              </Box>
              <Box className="flex gap-2">
                <Box className="badge">Armed Forces</Box>
                <Box className="badge">Medical Professional</Box>
                <Box className="badge">Student</Box>
                <Box className="badge">Unaccompained Minor</Box>
              </Box>
            </Box>
            <Box className="flex items-start">
              <Button
                variant="contained"
                className="btn btn-bg !py-2 !px-8 !text-md"
                onClick={searchFlights}>
                Search Flights
              </Button>
            </Box>
          </Box>
        </Box>
      </FormControl>
    </Box>
  );
}

export default Home;
