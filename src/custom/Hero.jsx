

import { Link } from 'react-router-dom'
import React from 'react'

function Hero() {
  return (
    <div className="flex flex-col justify-center mx-100 gap-9 ">
      <h1 className="text-4xl text-black font-bold text-center mt-10">
        <span className="text-red-600">Discover Your New Adventure with AI:</span>
        <span className="text-black"> Personalized Itineraries at Your Fingertips</span>
      </h1>
      <p className='text-xl text-grey-500 text-center'>
        An AI trip planner crafts personalized travel itineraries, streamlining your journey planning.
      </p>
      
      <div className='flex justify-center item-center'>
        <Link to={'/create-trip'}>
          <button className="bg-black text-white font-medium py-2 rounded-lg hover:bg-gray-800 transition w-49 ">
            Get Started, It’s Free
          </button>
      </Link>

    </div>



    </div >
  )
}

export default Hero
