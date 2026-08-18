import { useWizard } from '../../context/WizardContext';
import ProgressBar from '../common/ProgressBar';

export default function StepPronouns() {
  const { userData, updateUserData, goToNextStep, goToPrevStep } = useWizard();

  const pronounOptions = ['he/him', 'she/her', 'they/them', 'ze/zir', 'other'];

  const handleSelect = (pronoun) => {
    updateUserData({ pronouns: pronoun });
  };

  const handleNext = () => {
    if (!userData.pronouns) {
      alert('Please select your pronouns');
      return;
    }
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
            Which pronouns feel right for you?
          </h2>

          <div className="mb-5 sm:mb-6">
            <label className="block text-gray-400 text-[10px] sm:text-xs font-medium mb-1.5 sm:mb-2">
              PRONOUNS
            </label>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {pronounOptions.map((pronoun) => (
                <button
                  key={pronoun}
                  onClick={() => handleSelect(pronoun)}
                  className={`
                    py-2.5 sm:py-3 px-3 sm:px-4 border-2 rounded-lg text-xs sm:text-sm font-medium transition-all touch-btn
                    ${userData.pronouns === pronoun 
                      ? 'border-purple-500 bg-purple-500/20 text-purple-400' 
                      : 'border-gray-700 hover:border-purple-500 text-gray-400 hover:text-white'}
                  `}
                >
                  {pronoun}
                </button>
              ))}
            </div>
            <p className="text-gray-500 text-[10px] sm:text-xs mt-1.5 sm:mt-2">
              Select the pronouns that feel right for you.
            </p>
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