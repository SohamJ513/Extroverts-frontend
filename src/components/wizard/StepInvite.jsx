import { useState } from 'react';
import { useWizard } from '../../context/WizardContext';
import ProgressBar from '../common/ProgressBar';

export default function StepInvite() {
  const { userData, updateUserData, goToNextStep, goToPrevStep, showToast } = useWizard();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const funFacts = [
    "KINDNESS = GOOD HAIR DAY",
    "SIP IN? CHIP IN.",
    "GHOSTING IS FOR HALLOWEEN.",
    "OUTFITS LOUD, INTENTIONS CLEAR.",
    "JOINING? FREE. HOSTING? ALSO FREE.",
    "EARLY IS ICONIC.",
    "YES. SPELLING MISTAKE."
  ];

  // Password validation rules
  const validatePassword = (password) => {
    const errors = [];
    let strength = 0;

    if (password.length < 8) {
      errors.push('At least 8 characters');
    } else {
      strength++;
    }

    if (!/[A-Z]/.test(password)) {
      errors.push('At least one uppercase letter');
    } else {
      strength++;
    }

    if (!/[a-z]/.test(password)) {
      errors.push('At least one lowercase letter');
    } else {
      strength++;
    }

    if (!/[0-9]/.test(password)) {
      errors.push('At least one number');
    } else {
      strength++;
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('At least one special character (!@#$%^&*)');
    } else {
      strength++;
    }

    return { errors, strength };
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    updateUserData({ password: password });
    
    const { errors, strength } = validatePassword(password);
    setPasswordStrength(strength);
    
    if (password && errors.length > 0) {
      setPasswordError(errors.join(', '));
    } else if (password && errors.length === 0) {
      setPasswordError('');
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = () => {
    const password = userData.password || '';
    const { errors } = validatePassword(password);
    
    if (errors.length > 0) {
      setPasswordError('Password must have: ' + errors.join(', '));
      return;
    }
    setPasswordError('');

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      showToast('🎉 Welcome to Extroverts!', 'success');
      setTimeout(() => {
        goToNextStep();
      }, 1500);
    }, 2000);
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 2) return 'bg-red-500';
    if (passwordStrength === 3) return 'bg-yellow-500';
    if (passwordStrength === 4) return 'bg-blue-400';
    return 'bg-green-500';
  };

  const getStrengthText = () => {
    if (passwordStrength <= 2) return 'Weak';
    if (passwordStrength === 3) return 'Fair';
    if (passwordStrength === 4) return 'Good';
    return 'Strong';
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 sm:px-6 py-6 sm:py-8">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
            <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">🎉 Welcome to Extroverts!</h2>
          <p className="text-gray-400 text-xs sm:text-sm mt-1.5 sm:mt-2">You're officially a Silver Club Member</p>
          <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-purple-500/20 rounded-xl border border-purple-500/30">
            <p className="text-xs sm:text-sm font-semibold text-purple-400">⭐ 20 HVTS TO GOLDEN CLUB</p>
          </div>
          <div className="mt-3 sm:mt-4 p-2.5 sm:p-3 bg-blue-500/20 rounded-lg border border-blue-500/30">
            <p className="text-[10px] sm:text-xs text-blue-400">
              📧 A confirmation email has been sent to <span className="text-white">{userData.email}</span>
            </p>
          </div>
          <div className="mt-4 sm:mt-6 flex flex-col gap-2.5 sm:gap-3">
            <button
              onClick={() => goToNextStep()}
              className="w-full py-2.5 sm:py-3 bg-purple-600 text-white rounded-lg font-semibold text-sm sm:text-base hover:bg-purple-700 transition touch-btn"
            >
              🎊 Go to Dashboard
            </button>
            <button
              onClick={() => window.location.reload()}
              className="w-full py-2.5 sm:py-3 bg-gray-800 text-white rounded-lg font-semibold text-sm sm:text-base hover:bg-gray-700 transition touch-btn"
            >
              Start Over
            </button>
          </div>
        </div>
      </div>
    );
  }

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
          <div className="mb-4 sm:mb-6 space-y-0.5 sm:space-y-1">
            {funFacts.map((fact, index) => (
              <p key={index} className="text-gray-300 text-xs sm:text-sm">
                {fact}
              </p>
            ))}
          </div>

          {/* Password Field */}
          <div className="mb-3 sm:mb-4">
            <label className="block text-gray-400 text-[10px] sm:text-xs font-medium mb-1">
              PASSWORD
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={userData.password || ''}
                onChange={handlePasswordChange}
                className={`w-full px-0 py-2.5 sm:py-3 bg-transparent border-b-2 text-white text-base sm:text-lg focus:outline-none placeholder-gray-600 pr-10
                  ${passwordError ? 'border-red-500' : 'border-gray-700 focus:border-purple-500'}`}
                placeholder="Create a strong password"
                minLength={8}
                disabled={isSubmitting}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition text-lg"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>

            {/* Password Strength Bar */}
            {userData.password && userData.password.length > 0 && (
              <div className="mt-2">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${getStrengthColor()}`}
                      style={{ width: `${(passwordStrength / 5) * 100}%` }}
                    />
                  </div>
                  <span className={`text-[10px] sm:text-xs font-medium ${getStrengthColor().replace('bg-', 'text-')}`}>
                    {getStrengthText()}
                  </span>
                </div>
              </div>
            )}

            {/* Password Requirements */}
            <div className="mt-2">
              <p className="text-gray-500 text-[10px] sm:text-xs">Password must have:</p>
              <ul className="text-[10px] sm:text-xs space-y-0.5 mt-0.5">
                <li className={userData.password?.length >= 8 ? 'text-green-400' : 'text-gray-500'}>
                  {userData.password?.length >= 8 ? '✅' : '❌'} At least 8 characters
                </li>
                <li className={/[A-Z]/.test(userData.password || '') ? 'text-green-400' : 'text-gray-500'}>
                  {/[A-Z]/.test(userData.password || '') ? '✅' : '❌'} At least one uppercase letter
                </li>
                <li className={/[a-z]/.test(userData.password || '') ? 'text-green-400' : 'text-gray-500'}>
                  {/[a-z]/.test(userData.password || '') ? '✅' : '❌'} At least one lowercase letter
                </li>
                <li className={/[0-9]/.test(userData.password || '') ? 'text-green-400' : 'text-gray-500'}>
                  {/[0-9]/.test(userData.password || '') ? '✅' : '❌'} At least one number
                </li>
                <li className={/[!@#$%^&*(),.?":{}|<>]/.test(userData.password || '') ? 'text-green-400' : 'text-gray-500'}>
                  {/[!@#$%^&*(),.?":{}|<>]/.test(userData.password || '') ? '✅' : '❌'} At least one special character
                </li>
              </ul>
            </div>

            {passwordError && (
              <p className="text-red-500 text-xs sm:text-sm mt-1.5">{passwordError}</p>
            )}
          </div>

          {/* Invite Code Field */}
          <div className="mb-5 sm:mb-6">
            <label className="block text-gray-400 text-[10px] sm:text-xs font-medium mb-1">
              ENTER INVITE CODE (optional)
            </label>
            <input
              type="text"
              value={userData.inviteCode}
              onChange={(e) => updateUserData({ inviteCode: e.target.value })}
              maxLength={20}
              className="w-full px-0 py-2.5 sm:py-3 bg-transparent border-b-2 border-gray-700 text-white text-base sm:text-lg focus:outline-none focus:border-purple-500 placeholder-gray-600"
              placeholder="Enter invite code"
              disabled={isSubmitting}
            />
            <p className="text-green-400 text-[10px] sm:text-xs mt-1.5 sm:mt-2">
              💎 Enter invite code and get up to +30 HVTs!
            </p>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full py-2.5 sm:py-3 bg-purple-600 text-white rounded-lg font-semibold text-sm sm:text-base hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed touch-btn"
          >
            {isSubmitting ? 'SIGNING UP...' : 'SIGN UP'}
          </button>
          
          <button
            onClick={goToPrevStep}
            className="w-full py-2.5 sm:py-3 text-gray-500 font-medium text-xs sm:text-sm hover:text-gray-400 transition mt-2 touch-btn"
            disabled={isSubmitting}
          >
            BACK
          </button>
        </div>
      </div>
    </div>
  );
}