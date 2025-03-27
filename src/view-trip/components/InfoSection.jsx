import React from 'react';
import { FaShareAlt } from 'react-icons/fa'; // Import the share icon

function InfoSection({ trip }) {
  return (
    <div className="flex flex-col items-center">
      {/* Trip Image */}
      <img src="/placeholder.jpg" className="w-150 h-150 object-cover rounded-lg" alt="Placeholder Image" />

      {/* Location */}
      <h2 className="text-3xl font-bold mt-2">{trip?.userSelection?.location}</h2>

      {/* Trip Details */}
      <div className="flex gap-5 mt-4">
        <h2 className="p-1 px-3 bg-blue-200 rounded-full text-blue-500 text-xs md:text-md">
          📅 {trip?.userSelection?.noOfDays} day
        </h2>
        <h2 className="p-1 px-3 bg-blue-200 rounded-full text-blue-500 text-xs md:text-md">
          💰 {trip?.userSelection?.budget} Budget
        </h2>
        <h2 className="p-1 px-3 bg-blue-200 rounded-full text-blue-500 text-xs md:text-md">
          🛩️ No. of Traveller: {trip?.userSelection?.traveller}
        </h2>
      </div>

      {/* Share Button */}
      <button
        onClick={() => navigator.share({ title: "Check out this trip!", url: window.location.href })}
        className="mt-4 p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition flex items-center gap-2"
      >
        <FaShareAlt />
        Share
      </button>
    </div>
  );
}

export default InfoSection;
