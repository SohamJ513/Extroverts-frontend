import { useState } from 'react';
import { useWizard } from '../../context/WizardContext';
import ProgressBar from '../common/ProgressBar';

// Location data
const locationData = {
  'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Thane', 'Bhiwandi'],
  'Delhi': ['New Delhi', 'Dwarka', 'Rohini', 'Saket', 'Karol Bagh'],
  'Karnataka': ['Bengaluru', 'Mysuru', 'Mangaluru', 'Hubballi', 'Belagavi'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem'],
  'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Noida', 'Ghaziabad', 'Varanasi', 'Agra'],
  'West Bengal': ['Kolkata', 'Howrah', 'Durgapur', 'Siliguri', 'Asansol'],
  'Telangana': ['Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar', 'Khammam'],
  'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar'],
  'Rajasthan': ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Ajmer'],
  'Kerala': ['Kochi', 'Thiruvananthapuram', 'Kozhikode', 'Thrissur', 'Kollam'],
  'Punjab': ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Mohali'],
  'Haryana': ['Gurugram', 'Faridabad', 'Panipat', 'Ambala', 'Hisar'],
  'Madhya Pradesh': ['Bhopal', 'Indore', 'Gwalior', 'Jabalpur', 'Ujjain'],
  'Bihar': ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Darbhanga'],
  'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Tirupati']
};

export default function StepLocation() {
  const { userData, updateUserData, goToNextStep, goToPrevStep } = useWizard();
  const [error, setError] = useState('');

  const availableCities = locationData[userData.state] || [];

  const handleNext = () => {
    if (!userData.state) {
      setError('Please select your state');
      return;
    }
    if (!userData.city) {
      setError('Please select your city');
      return;
    }
    setError('');
    goToNextStep();
  };

  return (
    <div className="min-h-screen bg-black flex flex-col px-4 sm:px-6 py-6 sm:py-8">
      {/* Logo */}
      <div className="w-full flex justify-start">
        <span className="text-2xl sm:text-3xl font-serif font-bold text-white">E</span>
      </div>

      <ProgressBar />

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full -mt-2 sm:-mt-4">
        <div className="text-left">
          <p className="text-gray-400 text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">GETTING READY</p>
          <h2 className="text-white text-lg sm:text-xl font-bold mb-6 sm:mb-8">
            Where are you located?
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm mb-4 sm:mb-6">
            We'll show you events happening near you!
          </p>

          <div className="mb-5 sm:mb-6 space-y-3 sm:space-y-4">
            {/* State - Cross-field logic */}
            <div>
              <label className="block text-gray-400 text-[10px] sm:text-xs font-medium mb-1">
                STATE
              </label>
              <select
                value={userData.state}
                onChange={(e) => {
                  updateUserData({ state: e.target.value, city: '' });
                  setError('');
                }}
                className="w-full px-0 py-2.5 sm:py-3 bg-transparent border-b-2 border-gray-700 text-white text-base sm:text-lg focus:outline-none focus:border-purple-500"
              >
                <option value="" className="bg-black">Select your state</option>
                {Object.keys(locationData).map((state) => (
                  <option key={state} value={state} className="bg-black">{state}</option>
                ))}
              </select>
            </div>

            {/* City - filtered based on state */}
            <div>
              <label className="block text-gray-400 text-[10px] sm:text-xs font-medium mb-1">
                CITY
              </label>
              <select
                value={userData.city}
                onChange={(e) => {
                  updateUserData({ city: e.target.value });
                  setError('');
                }}
                disabled={!userData.state}
                className="w-full px-0 py-2.5 sm:py-3 bg-transparent border-b-2 border-gray-700 text-white text-base sm:text-lg focus:outline-none focus:border-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="" className="bg-black">
                  {userData.state ? 'Select your city' : 'Select a state first'}
                </option>
                {availableCities.map((city) => (
                  <option key={city} value={city} className="bg-black">{city}</option>
                ))}
              </select>
              {userData.state && availableCities.length === 0 && (
                <p className="text-gray-500 text-[10px] sm:text-xs mt-1">No cities available for this state</p>
              )}
            </div>

            {error && (
              <p className="text-red-500 text-xs sm:text-sm mt-1.5 sm:mt-2">{error}</p>
            )}
          </div>

          <button
            onClick={handleNext}
            className="w-full py-2.5 sm:py-3 bg-purple-600 text-white rounded-lg font-semibold text-sm sm:text-base hover:bg-purple-700 transition touch-btn"
          >
            NEXT
          </button>
          
          <button
            onClick={goToPrevStep}
            className="w-full py-2.5 sm:py-3 text-gray-500 font-medium text-xs sm:text-sm hover:text-gray-400 transition mt-2 touch-btn"
          >
            BACK
          </button>
        </div>
      </div>
    </div>
  );
}