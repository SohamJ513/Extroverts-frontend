import React from "react";

/**
 * LandingPage
 * Recreation of the "An app only for Extroverts" mobile landing screen:
 * blurred multi-color gradient background, "E." wordmark, dark mountain
 * silhouette, headline copy, warning text, and a full-width white CTA button.
 */
export default function LandingPage({ onContinue = () => {} }) {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black flex flex-col">
      {/* Blurred gradient blobs forming the background — extends well past the
          midpoint so there's plenty of room for the colors to dissolve into
          black gradually, instead of being cut short and muted early. */}
      <div className="absolute inset-0 top-0 h-[88%] overflow-hidden blur-[40px]">
        <div className="absolute -top-[15%] left-[5%] w-[80%] h-[50%] rounded-full bg-[#3a2ea8] opacity-85" />
        <div className="absolute -top-[10%] -right-[20%] w-[75%] h-[60%] rounded-full bg-[#26c6da] opacity-90" />
        <div className="absolute top-[5%] -left-[15%] w-[70%] h-[50%] rounded-full bg-[#f5a623] opacity-90" />
        <div className="absolute top-[15%] left-[10%] w-[60%] h-[45%] rounded-full bg-[#e5384d] opacity-90" />
        <div className="absolute top-[30%] right-[5%] w-[55%] h-[40%] rounded-full bg-[#2ee6a8] opacity-80" />
      </div>

      {/* Dark mountain silhouette anchored to the bottom */}
      <svg
        viewBox="0 0 575 500"
        preserveAspectRatio="none"
        className="absolute left-0 right-0 bottom-0 w-full h-[52%]"
      >
        <path
          d="M0,500 L0,330 C60,300 120,260 180,230 C230,205 260,170 287,150 C314,170 345,205 395,230 C455,260 515,300 575,330 L575,500 Z"
          fill="url(#mountainGradient)"
        />
        <defs>
          <linearGradient id="mountainGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#141a2e" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#05060a" />
          </linearGradient>
        </defs>
      </svg>

      {/* Gradual fade to solid black — colors stay vivid through the middle
          of the screen and only fully resolve to black near the bottom,
          instead of being washed out early by an opaque mid-stop. */}
      <div className="absolute left-0 right-0 bottom-0 top-[38%] bg-gradient-to-b from-transparent to-black" />

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 sm:px-8 pb-12 sm:pb-16">
        <div className="flex items-start mb-4 sm:mb-5">
          <span className="font-serif font-bold text-white text-7xl sm:text-8xl md:text-9xl leading-none drop-shadow-[0_0_50px_rgba(255,255,255,0.1)]">
            E
          </span>
          <span className="font-serif font-bold text-white text-3xl sm:text-4xl md:text-5xl leading-none mt-1 sm:mt-1.5">
            .
          </span>
        </div>

        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <p className="text-white/80 text-xs sm:text-sm md:text-base font-bold tracking-[0.2em] sm:tracking-[0.25em] md:tracking-[0.3em] uppercase mb-1 sm:mb-2">
            AN APP ONLY FOR
          </p>
          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-wide drop-shadow-[0_4px_40px_rgba(0,0,0,0.3)]">
            EXTROVERTS
          </h1>
          <p className="text-[#c9c9d1] text-xs sm:text-sm md:text-base max-w-xs sm:max-w-sm md:max-w-md mx-auto mt-3 sm:mt-4 leading-relaxed">
            <span className="text-[#ff6b5e] font-bold">Warning:</span> Entering may
            lead to spontaneous dancing and unsolicited high-fives!
          </p>
        </div>

        <button
          onClick={onContinue}
          className="w-full max-w-sm sm:max-w-md py-4 sm:py-5 bg-white text-black rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg tracking-wide shadow-2xl hover:bg-gray-100 transition-all duration-300 hover:scale-[1.02] active:scale-95 touch-btn"
        >
          CONTINUE
        </button>
      </div>

      {/* Home indicator bar */}
      <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 w-28 sm:w-32 md:w-36 h-1 bg-white/40 rounded-full z-10" />
    </div>
  );
}
