import { useState } from 'react';
import { useWizard } from '../../context/WizardContext';
import ProgressBar from '../common/ProgressBar';

export default function StepUsername() {
  const { userData, updateUserData, goToNextStep, goToPrevStep } = useWizard();
  const [error, setError] = useState('');

  const handleNext = () => {
    const username = userData.username.trim();
    if (!username) {
      setError('Username is required');
      return;
    }
    if (username.length < 3) {
      setError('Username must be at least 3 characters');
      return;
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      setError('Username can only contain letters, numbers, and underscores');
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
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full -mt-6 sm:-mt-8">
        <div className="text-left">
          <p className="text-gray-400 text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">GETTING READY</p>
          <h2 className="text-white text-lg sm:text-xl font-bold mb-6 sm:mb-8">
            Create a username that fits your vibe!
          </h2>

          <div className="mb-5 sm:mb-6">
            <label className="block text-gray-400 text-[10px] sm:text-xs font-medium mb-1">
              USERNAME
            </label>
            <input
              type="text"
              value={userData.username}
              onChange={(e) => {
                updateUserData({ username: e.target.value });
                setError('');
              }}
              maxLength={20}
              className={`
                w-full px-0 py-2.5 sm:py-3 bg-transparent border-b-2 text-white text-base sm:text-lg focus:outline-none placeholder-gray-600
                ${error ? 'border-red-500' : 'border-gray-700 focus:border-purple-500'}
              `}
              placeholder="Enter username"
              autoFocus
            />
            <p className="text-gray-500 text-[10px] sm:text-xs mt-1.5 sm:mt-2">
              All your Superlatives and Invites will come your way with this name, so make it unforgettable!
            </p>
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