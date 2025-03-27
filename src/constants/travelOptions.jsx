export const travelOptions = [
    {
        id: 1,
        title: 'Just Me',
        desc: 'A solo travel in exploration',
        icon: '🧍',
        people: '1'
    },
    {
        id: 2,
        title: 'Couple Getaway',
        desc: 'A romantic journey for two',
        icon: '❤️',
        people: '2'
    },
    {
        id: 3,
        title: 'Family Adventure',
        desc: 'A fun trip with the whole family',
        icon: '👨‍👩‍👧‍👦',
        people: '3+'
    },
    {
        id: 4,
        title: 'Friends Trip',
        desc: 'Exploring new places with friends',
        icon: '👫',
        people: '2+'
    }
];

export const selectBudgetOptions = [
    {
        id: 1,
        title: 'Cheap',
        desc: 'Stay conscious of cost',
        icon: '💸'
    },
    {
        id: 2,
        title: 'Moderate',
        desc: 'Balance between cost and comfort',
        icon: '💰'
    },
    {
        id: 3,
        title: 'Luxury',
        desc: 'Indulge in premium experiences',
        icon: '🤑'
    }
];


export const AI_PROMPT = 'Generate Travel Plan for Location: {location}, for {totalDays} Days for {typeTravel} members with a {typeBudget} budget,Give me a Hotels options list with HotelName, Hotel address along with city or town name, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName along with city or town name, Place Details, Place Image Url, Geo Coordinates,rating, ticket Pricing ,Time to travel and best time to visit along with start time and expected end time each of the location for {totalDays} days with each day plan with best time to visit in JSON format.'

