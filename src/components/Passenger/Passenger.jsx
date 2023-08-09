import React, { useEffect, useState } from 'react';
import './passenger.css';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';
import Grid from '@mui/material/Grid';
import FormLabel from '@mui/material/FormLabel';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { formatDate } from '../../constants';
import dayjs from 'dayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const label = { inputProps: { 'aria-label': 'Switch demo' } };
let steps = [
  "Who's travelling?",
  'Select Add-Ons',
  'Select Your Seat',
  'Booking summary',
  'Payment',
];
const gender = [{ label: 'Male' }, { label: 'Female' }];

function Passenger({ state }) {
  const [activeStep, setActiveStep] = useState(0);
  const [bookingData, setBookingData] = useState({});

  const handleNext = () => {
    if (activeStep === 0) {
      setActiveStep((prevActiveStep) => prevActiveStep + 3);
    } else {
      bookTicket();
    }
  };

  const handleFirstName = (val, title) => {
    const passengers = bookingData.passengerDeatils;
    const index = passengers.findIndex((item) => item?.title === title);
    passengers[index].firstName = val;
    setBookingData({ ...bookingData, passengerDeatils: passengers });
  };
  const handleLastName = (val, title) => {
    const passengers = bookingData.passengerDeatils;
    const index = passengers.findIndex((item) => item?.title === title);
    passengers[index].lastName = val;
    setBookingData({ ...bookingData, passengerDeatils: passengers });
  };
  const handleGender = (val, title) => {
    const passengers = bookingData.passengerDeatils;
    const index = passengers.findIndex((item) => item?.title === title);
    passengers[index].gender = val;
    setBookingData({ ...bookingData, passengerDeatils: passengers });
  };
  const handleDOB = (date, title) => {
    const passengers = bookingData.passengerDeatils;
    const index = passengers.findIndex((item) => item?.title === title);
    passengers[index].dob = date.toISOString();
    setBookingData({ ...bookingData, passengerDeatils: passengers });
  };

  const handlePhone = (val) => {
    const contact = { ...bookingData.contactDetails };
    contact['phone'] = val;
    setBookingData({ ...bookingData, contactDetails: contact });
  };

  const handleEmail = (val) => {
    const contact = { ...bookingData.contactDetails };
    contact['email'] = val.target.value;
    setBookingData({ ...bookingData, contactDetails: contact });
  };

  const bookTicket = () => {
    alert('Ticket Confirmed!');
  };

  useEffect(() => {
    const defValues = { firstName: '', lastName: '', gender: '', dob: '' };
    const passengers = [];
    state?.passengerDeatils?.map((item) =>
      new Array(item?.count).fill('').forEach((el, index) => {
        passengers.push({
          ...defValues,
          id: item?.id,
          title: item?.id + ' ' + (index + 1),
        });
      })
    );
    const bookData = { ...state, passengerDeatils: passengers };
    setBookingData(bookData);
  }, []);

  return (
    <Box className="passenger mx-auto my-16 rounded-xl py-4">
      <Box className="flex items-center justify-center">
        <Box className="bg-[#f5f5f5] w-full">
          <Box className="flex justify-between w-full px-6 pb-4 bg-[#fff] align-center ">
            <Box className="flex">
              <h5 className="font-bold">
                {bookingData.tripType === 'oneway' ? 'One Way' : 'Return'}:{' '}
                {bookingData.flightFrom} - {bookingData.flightTo}
              </h5>

              <ul className="flex font-bold passenger_count">
                <li>
                  <FiberManualRecordIcon
                    className="mx-1"
                    sx={{ fontSize: 10 }}
                  />
                  {formatDate(bookingData.detartureDate)}{' '}
                </li>
                <li>
                  <FiberManualRecordIcon
                    className="mx-1"
                    sx={{ fontSize: 10 }}
                  />
                  {
                    bookingData?.passengerDeatils?.filter(
                      (item) => item?.id !== 'Infant'
                    ).length
                  }{' '}
                  Passenger
                </li>
              </ul>
            </Box>
            <Box className="flex justify-end text-[#5c0fd9]">
              Flight Details
            </Box>
          </Box>
          <Box className="bg-[#fff] mt-2 py-6 w-full">
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label} sx={{ svg: { color: '#ff6301 !important' } }}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
          <Box className="px-5 py-5 border-t bg-[#fff]">
            <Typography sx={{ fontWeight: 'bold', fontSize: 20 }}>
              Who's travelling?
            </Typography>
          </Box>
          {activeStep === 0 && (
            <Box>
              {bookingData?.passengerDeatils?.map((item) => (
                <Accordion className="mt-4">
                  <AccordionSummary
                    sx={{ background: '#F5F5F5' }}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header">
                    <Typography sx={{ fontWeight: 'bold', fontSize: 24 }}>
                      {item?.title}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box
                      component="form"
                      sx={{
                        '& > :not(style)': { marginTop: 2, width: '100ch' },
                      }}
                      noValidate
                      autoComplete="off">
                      <Box className="flex gap-10">
                        <TextField
                          id="outlined-basic"
                          label="First Name"
                          variant="outlined"
                          onChange={(e) =>
                            handleFirstName(e.target.value, item?.title)
                          }
                          value={item?.firstName}
                        />
                        <TextField
                          id="outlined-basic"
                          label="Last Name"
                          variant="outlined"
                          onChange={(e) =>
                            handleLastName(e.target.value, item?.title)
                          }
                          value={item?.lastName}
                        />
                        <FormControl fullWidth variant="outlined">
                          <InputLabel id="demo-simple-select-outlined-label">
                            Select Gender
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            label="Gender"
                            onChange={(e) =>
                              handleGender(e.target.value, item?.title)
                            }
                            value={item?.gender}
                            name="gender">
                            <MenuItem>None</MenuItem>
                            <MenuItem key={'Male'} value={'Male'}>
                              Male
                            </MenuItem>
                            <MenuItem key={'female'} value={'female'}>
                              Female
                            </MenuItem>
                          </Select>
                        </FormControl>
                        {item?.id === 'SC' && (
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                              <DatePicker
                                sx={{
                                  'padding-top': 0,
                                  svg: { color: '#ff6301' },
                                }}
                                slotProps={{ textField: { size: 'small' } }}
                                label="Departure Date"
                                format="DD-MMM-YYYY"
                                onChange={(e) => handleDOB(e, item?.title)}
                                value={dayjs(item?.dob)}
                                defaultValue={dayjs(item?.dob)}
                              />
                            </DemoContainer>
                          </LocalizationProvider>
                        )}
                      </Box>
                    </Box>
                  </AccordionDetails>
                  <Box className="flex items-center font-bold justify-between bg-[#F5F5F5] rounded-md mx-4 mb-4 py-4 px-5">
                    <Box>Wheelchair assistance</Box>
                    <Box className="flex justify-center align-center">
                      <Switch {...label} defaultChecked />
                    </Box>
                  </Box>
                </Accordion>
              ))}
              <Box className="px-5 py-5 mt-4 bg-[#fff]">
                <Box className="">
                  <h5 className="font-bold text-xl">Primary contact details</h5>
                  <h6>All booking related communication will be sent here</h6>
                </Box>
                <Box className="flex mt-4">
                  <Box className="">
                    <PhoneInput
                      country={'in'}
                      specialLabel={'Mobile Number'}
                      inputProps={{
                        name: 'Mobile Number',
                        required: true,
                        autoFocus: true,
                      }}
                      onChange={handlePhone}
                    />
                  </Box>
                  <Box
                    component="form"
                    sx={{
                      '& > :not(style)': { width: '50ch' },
                      marginLeft: '30px',
                    }}
                    noValidate
                    autoComplete="off">
                    <TextField
                      id="outlined-basic"
                      label="Email"
                      variant="outlined"
                      onChange={handleEmail}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
          {activeStep === 3 && (
            <>
              {bookingData?.passengerDeatils.map((item) => (
                <Box className="px-5 py-5 mt-2 bg-[#fff] text-[gray] font-bold">
                  <Box className="flex gap-2 flex-col">
                    <Box>
                      {item?.firstName} {item?.lastName}
                    </Box>
                    <Box className="flex justify-between">
                      <Box>{item?.id} Fare</Box>
                      <Box>
                        <CurrencyRupeeIcon sx={{ fontSize: 18 }} />
                        {bookingData.flightDetails?.flight?.price}
                      </Box>
                    </Box>
                    <Box className="flex justify-between">
                      <Box>Seat 1A * Premium window</Box>
                      <Box>
                        <CurrencyRupeeIcon sx={{ fontSize: 18 }} />
                        1000
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ))}
              <Box className="px-5 py-5 mt-2 bg-[#fff] text-[gray] font-bold">
                <Box className="py-2 bg-[#fff]">
                  <Typography sx={{ fontWeight: 'bold', fontSize: 20 }}>
                    Add-ons
                  </Typography>
                </Box>
                <Box className="flex justify-between border-b my-2 border-[whitesmoke]">
                  <Box className="flex gap-2 justify-center">
                    <CancelOutlinedIcon />
                    <Box>
                      1<ClearOutlinedIcon sx={{ fontSize: 16 }} />
                      {'Paneer tika sandwich'}
                    </Box>
                  </Box>
                  <Box>
                    <CurrencyRupeeIcon sx={{ fontSize: 18 }} />
                    {200}
                  </Box>
                </Box>
                <Box className="flex justify-between my-2">
                  <Box className="flex gap-2 justify-center">
                    <CancelOutlinedIcon />
                    <Box>
                      1<ClearOutlinedIcon sx={{ fontSize: 16 }} />
                      Causor Salad
                    </Box>
                  </Box>
                  <Box>
                    <CurrencyRupeeIcon sx={{ fontSize: 18 }} />
                    {200}
                  </Box>
                </Box>
              </Box>
              <Box className="bg-[#fff] my-2 p-5">
                <Typography sx={{ fontWeight: 'bold', fontSize: 20 }}>
                  Primary contact details
                </Typography>
                <Typography sx={{ color: 'gray' }}>
                  All booking related info will be sent here
                </Typography>
                <Box className="flex mt-4" sx={{ flexGrow: 1 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <FormLabel id="demo-radio-buttons-group-label">
                        Mobile Number
                      </FormLabel>
                      <Typography className="pt-2 border-b">
                        {bookingData.contactDetails?.phone}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <FormLabel id="demo-radio-buttons-group-label">
                        Email
                      </FormLabel>
                      <Typography className="pt-2 border-b">
                        {bookingData.contactDetails?.email}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <FormLabel id="demo-radio-buttons-group-label">
                        Alt Email
                      </FormLabel>
                      <Typography className="pt-2 border-b">
                        {bookingData.contactDetails?.email}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </>
          )}

          <Box className="flex justify-end w-full mt-2 px-6 py-4 bg-[#fff] align-center">
            <Button
              variant="contained"
              onClick={handleNext}
              className="btn btn-bg !text-sm !py-2.5 !px-6">
              {activeStep === 0 ? 'Continue' : 'Confirm Booking'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Passenger;
