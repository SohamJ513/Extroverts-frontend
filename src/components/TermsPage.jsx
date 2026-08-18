export default function TermsPage({ onAccept }) {
  return (
    <div className="min-h-screen bg-black flex flex-col px-4 sm:px-6 py-4 sm:py-6">
      {/* Header with warning */}
      <div className="mb-3 sm:mb-4">
        <div className="bg-yellow-50/10 p-2.5 sm:p-4 rounded-lg text-[10px] sm:text-xs text-yellow-400 border border-yellow-800/30 leading-relaxed">
          ⚠️ BY USING THIS APP, YOU'RE AGREEING TO KEEP THINGS FUN, SAFE, AND RESPECTFUL... AND ALSO AGREEING
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-3 sm:pb-4">
        <h1 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">TERMS AND CONDITIONS</h1>
        
        <p className="text-gray-300 text-xs sm:text-sm mb-4 sm:mb-6">
          Welcome to Extroverts! Please take a moment to read these to ensure a safe and enjoyable experience for everyone:
        </p>
        
        <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-gray-300">
          <div>
            <p className="font-semibold text-white text-xs sm:text-sm">Respect and Kindness:</p>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">Treat everyone with respect and courtesy. Personal boundaries must be respected at all times.</p>
          </div>
          
          <div>
            <p className="font-semibold text-white text-xs sm:text-sm">Personal Contributions:</p>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">Each attendee is responsible for their own expenses (food, drinks, etc.).</p>
          </div>
          
          <div>
            <p className="font-semibold text-white text-xs sm:text-sm">App's Responsibility:</p>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">The app connects people, we do not interfere between personal interactions or relations during the event.</p>
          </div>
          
          <div>
            <p className="font-semibold text-white text-xs sm:text-sm">Zero Tolerance for Harassment:</p>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">Any form of harassment (verbal, physical, or sexual) is not tolerated. Respectful behavior is essential.</p>
          </div>
          
          <div>
            <p className="font-semibold text-white text-xs sm:text-sm">Sexual Conduct:</p>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">All interactions must be consensual and respectful of personal boundaries.</p>
          </div>
          
          <div>
            <p className="font-semibold text-white text-xs sm:text-sm">Safety First:</p>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">Prioritize your safety and well-being. If you feel unsafe, leave or seek assistance.</p>
          </div>
          
          <div>
            <p className="font-semibold text-white text-xs sm:text-sm">Alcohol & Substances:</p>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">Drink responsibly and look out for one another.</p>
          </div>
          
          <div>
            <p className="font-semibold text-white text-xs sm:text-sm">No Unapproved Recordings:</p>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">Respect privacy—no recordings without consent.</p>
          </div>
          
          <div>
            <p className="font-semibold text-white text-xs sm:text-sm">Right to Leave:</p>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">You can leave or disconnect at any time if you feel uncomfortable.</p>
          </div>
        </div>
        
        <p className="text-gray-400 text-xs sm:text-sm mt-4 sm:mt-6 leading-relaxed">
          Thank you for helping us maintain a fun, respectful environment for everyone!
        </p>
      </div>

      {/* Bottom Button */}
      <div className="pt-3 sm:pt-4 pb-2 sm:pb-0">
        <button
          onClick={onAccept}
          className="w-full py-3.5 sm:py-4 bg-white text-black rounded-xl font-bold text-base sm:text-lg hover:bg-gray-100 transition touch-btn"
        >
          I UNDERSTAND
        </button>
      </div>
    </div>
  );
}