import { useState, useEffect, useRef } from 'react';
import { useWizard } from '../../context/WizardContext';
import ProgressBar from '../common/ProgressBar';

export default function StepOTP() {
  const { userData, updateUserData, goToNextStep, goToPrevStep, showToast } = useWizard();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newOtp.every(digit => digit !== '')) {
      setTimeout(() => {
        handleVerify(newOtp.join(''));
      }, 300);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
    if (e.key === 'Enter') {
      handleVerify(otp.join(''));
    }
  };

  const handleVerify = (otpString) => {
    const code = otpString || otp.join('');
    
    if (code.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      
      if (code === '123456') {
        updateUserData({ otp: otp });
        showToast('✅ OTP verified successfully!', 'success');
        goToNextStep();
      } else {
        setError('Invalid OTP. Please try again.');
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
        showToast('❌ Invalid OTP. Please try again.', 'error');
      }
    }, 1000);
  };

  const handleResend = () => {
    if (canResend) {
      setTimer(60);
      setCanResend(false);
      setOtp(['', '', '', '', '', '']);
      setError('');
      inputRefs.current[0]?.focus();
      showToast('📧 OTP resent successfully!', 'success');
    }
  };

  const handleVerifyClick = () => {
    handleVerify();
  };

  return (
    <div className="min-h-screen bg-black flex flex-col px-4 sm:px-6 py-6 sm:py-8">
      <div className="w-full flex justify-start">
        <span className="text-2xl sm:text-3xl font-serif font-bold text-white">E</span>
      </div>

      <ProgressBar />

      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full -mt-2 sm:-mt-4">
        <div className="text-left">
          <p className="text-gray-400 text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">GETTING READY</p>
          <h2 className="text-white text-lg sm:text-xl font-bold mb-1.5 sm:mb-2">ENTER OTP</h2>
          <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">
            A 6-digit OTP has been sent to <span className="text-white">{userData.email || 'your email'}</span>
          </p>
          <p className="text-purple-400 text-[10px] sm:text-xs mb-4 sm:mb-6">💡 Demo: Use 123456 to verify</p>

          <div className="mb-5 sm:mb-6">
            <div className="flex justify-start gap-2 sm:gap-3 mb-3 sm:mb-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => inputRefs.current[index] = el}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className={`
                    w-9 h-11 sm:w-12 sm:h-14 text-center text-xl sm:text-2xl font-semibold border-b-2 bg-transparent text-white focus:outline-none transition-all duration-300
                    ${error ? 'border-red-500' : 
                      digit ? 'border-purple-500' : 
                      'border-gray-700 focus:border-purple-500'}
                    ${isVerifying ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                  autoFocus={index === 0}
                  disabled={isVerifying}
                />
              ))}
            </div>

            <button
              onClick={handleResend}
              disabled={!canResend || isVerifying}
              className={`
                text-xs sm:text-sm font-medium transition-colors duration-300
                ${canResend && !isVerifying ? 'text-purple-400 hover:text-purple-300' : 'text-gray-500 cursor-not-allowed'}
              `}
            >
              Resend OTP {!canResend && `(${timer}s)`}
            </button>

            {error && (
              <p className="text-red-500 text-xs sm:text-sm mt-1.5 sm:mt-2 animate-fadeIn">{error}</p>
            )}
          </div>

          <button
            onClick={handleVerifyClick}
            disabled={isVerifying || otp.some(d => d === '')}
            className="w-full py-2.5 sm:py-3 bg-purple-600 text-white rounded-lg font-semibold text-sm sm:text-base hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed touch-btn"
          >
            {isVerifying ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                VERIFYING...
              </span>
            ) : (
              'VERIFY'
            )}
          </button>
          
          <button
            onClick={goToPrevStep}
            className="w-full py-2.5 sm:py-3 text-gray-500 font-medium text-xs sm:text-sm hover:text-gray-400 transition mt-2 touch-btn"
            disabled={isVerifying}
          >
            GO BACK
          </button>
        </div>
      </div>
    </div>
  );
}