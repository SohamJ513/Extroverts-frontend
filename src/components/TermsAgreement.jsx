export default function TermsAgreement({ onAccept, onTermsClick }) {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-between px-4 sm:px-6 py-4 sm:py-6">
      {/* Status Bar */}
      <div className="w-full flex justify-between items-center text-gray-400 text-xs sm:text-sm mb-2 sm:mb-4">
        <span>7:31</span>
      </div>

      {/* Logo */}
      <div className="w-full flex justify-start">
        <span className="text-4xl sm:text-5xl font-serif font-bold text-white">E</span>
        <span className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">.</span>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center -mt-2 sm:-mt-4 max-w-lg px-2 sm:px-0">
        <div className="text-left w-full">
          <p className="text-white text-sm sm:text-base md:text-lg font-bold leading-relaxed">
            BY USING THIS APP, YOU'RE AGREEING TO KEEP THINGS FUN, SAFE, AND RESPECTFUL... AND ALSO AGREEING TO OUR TERMS AND CONDITIONS. POLITENESS IS A MUST—TREAT OTHERS HOW YOU'D WANT TO BE TREATED. EVERYONE HERE IS LOOKING FOR REASONS TO{' '}
            <span className="text-purple-500">PARTY</span>
            , SO BRING YOUR BEST VIBE AND EXPECT THE SAME FROM OTHERS. LET'S PARTY RESPONSIBLY AND MAKE EVERY EXPERIENCE A GREAT ONE!
          </p>
          
          <p className="text-gray-400 text-xs sm:text-sm mt-4 sm:mt-8">
            To proceed, accept{' '}
            <span 
              onClick={onTermsClick}
              className="text-white font-bold underline cursor-pointer hover:text-purple-400 transition-colors duration-200"
            >
              Terms and Conditions
            </span>
          </p>
        </div>
      </div>

      {/* Accept Button */}
      <div className="w-full max-w-sm pb-4 sm:pb-8">
        <button
          onClick={onAccept}
          className="w-full py-4 sm:py-5 bg-white text-black rounded-xl font-bold text-base sm:text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-[1.02] active:scale-95 touch-btn"
        >
          ACCEPT
        </button>
      </div>

      {/* Home Indicator */}
      <div className="w-24 sm:w-32 h-1 bg-gray-700 rounded-full mx-auto mb-1 sm:mb-2" />
    </div>
  );
}