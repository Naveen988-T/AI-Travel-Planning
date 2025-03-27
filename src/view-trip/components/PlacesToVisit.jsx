import React from 'react';

function PlacesToVisit({ trip }) {
  console.log('Trip Data:', trip); // Debug the incoming trip data

  // ✅ Extract itinerary safely
  const itinerary = trip?.TripData?.travelPlan?.itinerary;

  // ✅ Check if trip and travel plan exist
  if (!trip || !trip.TripData || !trip.TripData.travelPlan) {
    return <p className='text-red-500 text-center mt-5'>Fetching itinerary...</p>;
  }

  // ✅ Sort itinerary days properly to ensure Day 1 comes before Day 2
  const sortedDays = itinerary
    ? Object.keys(itinerary).sort((a, b) => {
      const dayA = parseInt(a.match(/\d+/)?.[0] || 0);
      const dayB = parseInt(b.match(/\d+/)?.[0] || 0);
      return dayA - dayB;
    })
    : [];

  // ✅ Random image picker function
  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * 10) + 1; // Ensures range 1-10
    return `/travel-${randomIndex}.jpg`;
  };

  // ✅ Render itinerary
  return (
    <div>
      <h2 className='font-bold text-3xl mt-5 text-left'>Places To Visit</h2>

      {/* Container for days */}
      <div className='mt-4 space-y-6'>
        {sortedDays.map((dayKey, index) => {
          const day = itinerary[dayKey];

          return (
            <div key={index} className='p-4 bg-gray-100 rounded-lg shadow-md'>
              {/* Day Heading */}
              <h3 className='text-2xl font-semibold mb-2 capitalize'>Day {index + 1}</h3>

              {/* Best Time to Visit */}
              <p className='text-gray-600 mb-4'>Best Time to Visit: {day.bestTimeToVisit}</p>

              {/* Places List */}
              {Array.isArray(day.plan) &&
                day.plan.map((place, idx) => (
                  <div key={idx} className='mb-4 p-4 bg-white rounded-lg shadow-sm'>
                    {/* Place Name */}
                    <h4 className='text-xl font-bold mb-1'>{place.placeName}</h4>
                    <p className='text-gray-500'>
                      City/Town: {place?.cityOrTown ?? place?.location?.city ?? 'Unknown'}
                    </p>



                    {/* Random Place Image */}
                    <img
                      src={getRandomImage()}
                      className='w-150 h-150 object-cover rounded-lg'
                      alt='Random Place'
                    />

                    {/* Place Details */}
                    <p className='text-gray-600 mt-2'>{place.placeDetails}</p>
                    <p className='text-blue-500 mt-1'>
                      Time: {place.startTime} - {place.endTime}
                    </p>
                    <p className='text-yellow-500 mt-1'>🌟 Rating: {place.rating}</p>
                    <p className='text-green-500 mt-1'>💰 Ticket Pricing: {place.ticketPricing}</p>
                    <p className='text-gray-700 mt-1'>⏱️ Time to Travel: {place.timeToTravel}</p>

                    {/* Map Link */}
                    {place?.geoCoordinates && (
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          place.geoCoordinates
                        )}`}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-green-500 underline mt-2 inline-block'
                      >
                        View on Map
                      </a>
                    )}
                  </div>
                ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PlacesToVisit;
