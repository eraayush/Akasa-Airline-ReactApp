import dayjs from 'dayjs';

export const defPassangers = [
    { id: 'Adult', title: 'Adult(s)', description: 'Age above 12', count: 1 },
    { id: 'Child', title: 'Children', description: 'Age 2 to 12', count: 0 },
    { id: 'SC', title: 'Senior Citizen', description: 'Age 60 and above', count: 0 },
    { id: 'Infant', title: 'Infant(s)', description: '7 days to 2 years. No seat', count: 0 },
];

export const sortByList = [{ id: 'price', title: 'Price' }, { id: 'duration', title: 'Duration' }, , { id: 'depTime', title: 'Departure time' }];

export const formatDate = (dateString) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear().toString().substr(-2);

    return `${day} ${month} ${year}`;
};

export const initialBookingData = {
    tripType: 'oneway',
    flightFrom: '',
    flightTo: '',
    detartureDate: dayjs(new Date()).toISOString(),
    returnDate: dayjs(new Date()).toISOString(),
    promoCode: '',
    passengerDeatils: {},
    flightDetails: {},
};
