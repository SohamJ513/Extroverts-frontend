import { useState } from 'react';
import { useWizard } from '../../context/WizardContext';
import ProgressBar from '../common/ProgressBar';

export default function StepName() {
  const { userData, updateUserData, goToNextStep, goToPrevStep } = useWizard();
  const [error, setError] = useState('');

  const handleNext = () => {
    const name = userData.name.trim();
    if (!name) {
      setError('Name is required');
      return;
    }
    if (name.length < 2) {
      setError('Name must be at least 2 characters');
      return;
    }
    if (name.length > 30) {
      setError('Name must be less than 30 characters');
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

      {/* Progress Bar */}
      <ProgressBar />

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full -mt-2 sm:-mt-4">
        <div className="text-left">
          <p className="text-gray-400 text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">GETTING READY</p>
          <h2 className="text-white text-lg sm:text-xl font-bold mb-6 sm:mb-8">
            "Name, please, for the party check!"
          </h2>

          <div className="mb-5 sm:mb-6">
            <label className="block text-gray-400 text-[10px] sm:text-xs font-medium mb-1">
              NAME
            </label>
            <input
              type="text"
              value={userData.name}
              onChange={(e) => {
                updateUserData({ name: e.target.value });
                setError('');
              }}
              maxLength={30}
              className={`
                w-full px-0 py-2.5 sm:py-3 bg-transparent border-b-2 text-white text-base sm:text-lg focus:outline-none placeholder-gray-600
                ${error ? 'border-red-500' : 'border-gray-700 focus:border-purple-500'}
              `}
              placeholder="Enter your name"
              autoFocus
            />
            <p className="text-gray-500 text-[10px] sm:text-xs mt-1.5 sm:mt-2">
              This is the name shown on members and requests. Cannot be changed later.
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