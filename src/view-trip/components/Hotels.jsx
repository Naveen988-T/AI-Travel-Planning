import React from 'react';
import { Link } from 'react-router-dom';

function Hotels({ trip }) {
    const randomImages = [
        'images.jpg',
        'download.jpg',
        'download (1).jpg',
        'images (1).jpg',
        'images (2).jpg'
      ];
    
      const getRandomImage = () => {
        const randomIndex = Math.floor(Math.random() * randomImages.length);
        return `/${randomImages[randomIndex]}`;
      };
    return (
        <div className="self-start mt-6 ml-4">
            {/* Hotel Recommendation Title */}
            <h2 className="text-3xl font-bold mt-4">Hotel Recommendations</h2>

            {/* Hotel List */}
            <div className="mt-4 space-y-4">
                {trip?.TripData?.travelPlan?.hotels?.map((item, index) => (
                   <Link to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.hotelName)}`} target="_blank" rel="noopener noreferrer">

                    <div key={index} className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg shadow-md">
                        {/* Hotel Image */}
                        <img
                            className="w-32 h-32 object-cover rounded-lg hover:scale-110 transition-all"
                            src={item.hotelImageUrl?.startsWith('naveen') ? item.hotelImageUrl : getRandomImage()}
                            alt={item.hotelName || 'Hotel Image'}
                        />



                        {/* Hotel Details */}
                        <div>
                            <h3 className="text-xl font-semibold">{item.hotelName || 'Hotel Name'}</h3>
                            <p className="text-gray-600">{item.description || 'No description available.'}</p>
                            <p className="text-blue-500 font-bold mt-2">{item.price || 'Price not available'}</p>
                            <p className="text-yellow-500 font-medium">Rating: {item.rating || 'N/A'}</p>
                            <p className="text-gray-500">{item.hotelAddress || 'No address provided'}</p>
                        </div>
                    </div></Link>
                ))}
            </div>
        </div>
    );
}

export default Hotels;
