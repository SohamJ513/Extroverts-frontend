export default function AfterParty({ onCreate, onExit }) {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Status Bar */}
      <div className="w-full flex justify-between items-center text-gray-400 text-xs sm:text-sm px-4 sm:px-6 pt-3">
        <span>5:09</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-6 pb-2">
        <div className="flex items-start leading-none">
          <span
            className="text-white font-bold"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 32 }}
          >
            E
          </span>
          <span
            className="text-white font-bold"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 15, marginTop: 1 }}
          >
            .
          </span>
        </div>
        <h1 className="text-white text-base sm:text-lg font-bold tracking-wide">
          AFTERPARTY
        </h1>
      </div>

      {/* Empty-state content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 -mt-10">
        <p
          className="text-center leading-[0.95] mb-8 select-none"
          style={{
            fontFamily: "'Dancing Script', 'Segoe Script', 'Brush Script MT', cursive",
            fontSize: "clamp(2.2rem, 11vw, 3.4rem)",
            color: "#ff4fa8",
            textShadow:
              "0 0 6px #ff4fa8, 0 0 14px #ff2f96, 0 0 28px #ff0f88, 0 0 46px #d6006e",
          }}
        >
          every
          <br />
          friend
          <br />
          was once a
          <br />
          stranger
        </p>

        <p className="text-gray-300 text-sm sm:text-base text-center leading-relaxed mb-8 max-w-xs">
          Your <span className="text-white font-semibold">completed events</span> and{" "}
          <span className="text-white font-semibold">superlatives</span> appear here
        </p>

        <button
          onClick={onCreate}
          className="w-full max-w-sm py-3.5 sm:py-4 bg-white text-black rounded-xl font-bold text-sm sm:text-base hover:bg-gray-100 transition-all duration-300 transform hover:scale-[1.02] active:scale-95"
        >
          CREATE
        </button>
      </div>

      {/* Exit button */}
      <div className="w-full max-w-sm mx-auto px-6 pb-3">
        <button
          onClick={onExit}
          className="w-full py-3.5 sm:py-4 bg-transparent border border-gray-700 text-white rounded-xl font-bold text-sm sm:text-base hover:bg-white/5 transition"
        >
          EXIT
        </button>
      </div>

      {/* Home Indicator */}
      <div className="w-24 sm:w-32 h-1 bg-gray-700 rounded-full mx-auto mb-2" />
    </div>
  );
}