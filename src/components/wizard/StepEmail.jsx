import { useState } from 'react';
import { useWizard } from '../../context/WizardContext';
import ProgressBar from '../common/ProgressBar';

export default function StepEmail() {
  const { userData, updateUserData, goToNextStep, goToPrevStep } = useWizard();
  const [error, setError] = useState('');

  const handleNext = () => {
    const email = userData.email.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (!email) {
      setError('Email is required');
      return;
    }
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
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
            Enter your email
          </h2>

          <div className="mb-5 sm:mb-6">
            <input
              type="email"
              value={userData.email}
              onChange={(e) => {
                updateUserData({ email: e.target.value });
                setError('');
              }}
              className={`
                w-full px-0 py-2.5 sm:py-3 bg-transparent border-b-2 text-white text-base sm:text-lg focus:outline-none placeholder-gray-600
                ${error ? 'border-red-500' : 'border-gray-700 focus:border-purple-500'}
              `}
              placeholder="Enter your email"
              autoFocus
            />
            {error && (
              <p className="text-red-500 text-xs sm:text-sm mt-1.5 sm:mt-2">{error}</p>
            )}
          </div>

          <div className="flex items-center gap-2 mb-5 sm:mb-6">
            <input
              type="checkbox"
              id="newsletter"
              checked={userData.newsletter}
              onChange={(e) => updateUserData({ newsletter: e.target.checked })}
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-600 bg-transparent border-gray-700 rounded focus:ring-purple-500"
            />
            <label htmlFor="newsletter" className="text-gray-400 text-xs sm:text-sm">
              I'd like to subscribe to your newsletter
            </label>
          </div>

          <button
            onClick={handleNext}
            className="w-full py-2.5 sm:py-3 bg-purple-600 text-white rounded-lg font-semibold text-sm sm:text-base hover:bg-purple-700 transition touch-btn"
          >
            PROCEED
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