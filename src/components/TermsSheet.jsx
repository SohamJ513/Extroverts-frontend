import React from "react";

const CLAUSES = [
  {
    label: "Respect and Kindness",
    text: "Treat everyone with respect and courtesy. Personal boundaries must be respected at all times.",
  },
  {
    label: "Personal Contributions",
    text: "Each attendee is responsible for their own expenses (food, drinks, etc.).",
  },
  {
    label: "App's Responsibility",
    text: "The app connects people, we do not interfere between personal interactions or relations during the event.",
  },
  {
    label: "Zero Tolerance for Harassment",
    text: "Any form of harassment (verbal, physical, or sexual) is not tolerated. Respectful behavior is essential.",
  },
  {
    label: "Sexual Conduct",
    text: "All interactions must be consensual and respectful of personal boundaries.",
  },
  {
    label: "Safety First",
    text: "Prioritize your safety and well-being. If you feel unsafe, leave or seek assistance.",
  },
  {
    label: "Alcohol & Substances",
    text: "Drink responsibly and look out for one another.",
  },
  {
    label: "No Unapproved Recordings",
    text: "Respect privacy—no recordings without consent.",
  },
  {
    label: "Right to Leave",
    text: "You can leave or disconnect at any time if you feel uncomfortable.",
  },
];

export default function TermsSheet({ onClose, onUnderstand }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Bottom Sheet */}
      <div className="relative w-full max-w-md bg-[#151515] rounded-t-2xl shadow-2xl max-h-[85vh] flex flex-col animate-slideUp">
        {/* Handle Bar */}
        <div className="flex justify-center pt-2.5 sm:pt-3 pb-1">
          <div className="w-10 sm:w-12 h-1 bg-white/40 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3">
          <h2 className="text-white text-lg sm:text-xl font-extrabold tracking-wide">
            TERMS AND CONDITIONS
          </h2>
          <button
            onClick={onClose}
            className="text-white text-xl sm:text-2xl hover:text-gray-400 transition-colors touch-btn flex items-center justify-center"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-2">
          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
            Welcome to Extroverts! Please take a moment to read these to
            ensure a safe and enjoyable experience for everyone:
          </p>

          {CLAUSES.map((clause, index) => (
            <div key={index} className="mb-2.5 sm:mb-3">
              <p className="text-white font-semibold text-xs sm:text-sm">
                {clause.label}:
              </p>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                {clause.text}
              </p>
            </div>
          ))}

          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mt-2">
            Thank you for helping us maintain a fun, respectful environment
            for everyone!
          </p>
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 py-3 sm:py-4">
          <button
            onClick={onUnderstand}
            className="w-full py-3 sm:py-3.5 bg-white text-black rounded-xl font-bold text-sm sm:text-base hover:bg-gray-100 transition-all duration-300 transform hover:scale-[1.02] active:scale-95 touch-btn"
          >
            I UNDERSTAND
          </button>
          <p className="text-gray-500 text-[10px] sm:text-xs text-center mt-2 sm:mt-3">
            Read complete specification at{' '}
            <span className="text-gray-300">
              hn-e.github.io/hn-e/terms-conditions
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}