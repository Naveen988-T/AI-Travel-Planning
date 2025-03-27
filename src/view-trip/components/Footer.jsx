import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Left Section - Brand */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold">LOGOIPSUM</h2>
          <p className="text-gray-400 text-sm mt-1">Your AI Travel Planner</p>
        </div>

       
        {/* Right Section - Copyright */}
        <div className="text-center md:text-right mt-4 md:mt-0">
          <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} Logoipsum. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
