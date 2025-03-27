import React, { useState, useEffect } from 'react';
import { LoadScript } from '@react-google-maps/api';
import { travelOptions, selectBudgetOptions, AI_PROMPT } from '../constants/travelOptions';
import { chatSession } from "../service/AIModel";
import { doc, setDoc, collection, addDoc } from 'firebase/firestore';
import { db } from '../service/firebaseConfig';
import { useGoogleLogin } from '@react-oauth/google';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const libraries = ['places'];

function CreateTrip() {
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [destination, setDestination] = useState('');
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [selectedTraveller, setSelectedTraveller] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();


  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      console.log('User Details:', codeResponse);
      localStorage.setItem('user', JSON.stringify(codeResponse));
      await fetchUserProfile(codeResponse.access_token);
      generateTrip();
    },
    onError: (error) => console.log('Login Failed:', error),
  });

  const handleGenerateTrip = () => {
    if (!user) {
      login();
    } else {
      generateTrip();
    }
  };

  const fetchUserProfile = async (accessToken) => {
    try {
      const res = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`);
      const profile = await res.json();
      console.log('User Profile:', profile);
      setUser(profile);
      localStorage.setItem('userProfile', JSON.stringify(profile));
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedProfile = localStorage.getItem('userProfile');
    if (storedUser && storedProfile) {
      setUser(JSON.parse(storedProfile));
      setOpenDialog(true);
    }
  }, []);

  const handleInputChange = (name, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleBudgetSelection = (budget) => {
    setSelectedBudget(budget);
    handleInputChange('budget', budget);
  };

  const handleTravellerSelection = (traveller) => {
    setSelectedTraveller(traveller);
    handleInputChange('traveller', traveller);
  };

  async function saveTripToDb(tripData) {
    const docId = Date.now().toString();
    await setDoc(doc(db, "AiTrip", docId), {
      userSelection: formData,
      TripData: JSON.parse( tripData) 
    });
    setLoading(false);
    navigate('/view-trip/'+docId)
  }
  const saveAiTrip = async (tripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    try {
      await addDoc(collection(db, "Mumbai"), {
        name: "Mumbai",
        state: "Maharashtra",
        country: "India",
        TripData:JSON.parse( tripData),
        userEmai: user?.email
      });
      setLoading(false);
      navigate('/view-trip/'+docId)
      console.log("Trip data saved successfully in Mumbai collection");
    } catch (error) {
      console.error("Error saving trip to Mumbai collection:", error);
    }
  };

  async function generateTrip() {
    if (!user) {
      setOpenDialog(true);
      return;
    }
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{typeTravel}', formData?.traveller)
      .replace('{typeBudget}', formData?.budget)
      .replace('{totalDays}', formData?.noOfDays)

    console.log(FINAL_PROMPT);

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      console.log(result?.response?.text());
      setLoading(false);
      saveTripToDb(result?.response?.text());
    } catch (error) {
      console.error("Error generating trip:", error);
    }
  }

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY} libraries={libraries}>
      <div className="flex flex-col items-center text-center mt-10">
        <h2 className="text-2xl font-bold text-black">Tell Us Your Travel Preferences🏕️</h2>
        <p className="text-lg font-medium text-gray-700 mt-3 max-w-lg">
          Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
        </p>
        <div className='mt-10'>
          <h2 className='text-3xl my-3 font-medium'>What is your destination of choice?</h2>
          <input
            type="text"
            name="location"
            value={formData.location || ""}
            onChange={(e) => handleInputChange('location', e.target.value)}
            placeholder="Enter your destination..."
            className="w-full border border-gray-400 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center text-center mt-10">
        <h2 className="text-3xl my-3 font-medium">How many days are you planning your trip?</h2>
        <input
          placeholder="Ex. 3"
          type="number"
          onChange={(e) => handleInputChange('noOfDays', e.target.value)}
          className="border border-gray-400 p-3 rounded-md text-center"
        />
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-3xl my-3 font-medium">What is your Budget?</h2>
        <div className="w-full max-w-4xl mx-auto flex justify-center gap-4">
          {selectBudgetOptions.map((item) => (
            <div
              key={item.id}
              onClick={() => handleBudgetSelection(item.title)}
              className={`flex items-center gap-4 p-4 mb-4 border cursor-pointer rounded-lg shadow-md transition-all w-1/3 ${selectedBudget === item.title ? 'bg-blue-100 border-blue-500' : 'bg-white border-gray-400'} hover:bg-blue-100 hover:scale-105 hover:border-blue-500`}
            >
              <span className="text-4xl">{item.icon}</span>
              <div>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-3xl my-3 font-medium">Who do you plan on travelling with on your next adventure?</h2>
        <div className="w-full max-w-4xl mx-auto flex justify-center gap-4">
          {travelOptions.map((item) => (
            <div
              key={item.id}
              onClick={() => handleTravellerSelection(item.people)}
              className={`flex items-center gap-4 p-4 mb-4 border cursor-pointer rounded-lg shadow-md transition-all w-1/3 ${selectedTraveller === item.people ? 'bg-blue-100 border-blue-500' : 'bg-white border-gray-400'} hover:bg-blue-100 hover:scale-105 hover:border-blue-500`}
            >
              <span className="text-4xl">{item.icon}</span>
              <div>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full max-w-4xl mx-auto mt-6 flex justify-end">
        <button
          className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg shadow-md hover:bg-blue-700 transition"
          onClick={handleGenerateTrip}
          disabled={loading}
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="animate-spin text-2xl" />
          ) : (
            'Generate Trip'
          )}
        </button>
      </div>
    </LoadScript>
  );
}

export default CreateTrip;