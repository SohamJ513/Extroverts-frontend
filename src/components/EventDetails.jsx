import { useState } from 'react';

export default function EventDetails({ event, onBack, onJoin, isJoined: initialIsJoined }) {
  const [isJoined, setIsJoined] = useState(initialIsJoined || false);

  const handleJoin = () => {
    if (!isJoined) {
      setIsJoined(true);
      onJoin(event);
      // Show success notification
      setTimeout(() => {
        alert('🎉 You have successfully joined this event!');
      }, 500);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <div className="px-4 sm:px-6 pt-6 sm:pt-8 pb-3 sm:pb-4 flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-gray-400 hover:text-white transition text-sm sm:text-base"
        >
          ← Back
        </button>
        <h1 className="text-white text-xl sm:text-2xl font-bold">Event Details</h1>
        <div className="w-12 sm:w-16" /> {/* Spacer */}
      </div>

      {/* Event Content */}
      <div className="flex-1 px-4 sm:px-6 py-3 sm:py-4 overflow-y-auto pb-20 sm:pb-4">
        <div className="bg-gray-900/50 rounded-xl p-4 sm:p-6 border border-gray-800">
          {/* Event Icon & Title */}
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <span className="text-3xl sm:text-4xl flex-shrink-0">{event?.icon || '🎉'}</span>
            <h2 className="text-white text-xl sm:text-2xl font-bold break-words">{event?.title}</h2>
          </div>

          {/* Event Type Badge */}
          <span className="inline-block px-2.5 sm:px-3 py-0.5 sm:py-1 bg-purple-500/20 text-purple-400 text-[10px] sm:text-xs font-semibold rounded-full mb-3 sm:mb-4">
            {event?.type || 'PRIVATE PARTY'}
          </span>

          {/* Event Details */}
          <div className="space-y-2.5 sm:space-y-3">
            <div className="flex items-center gap-2 sm:gap-3 text-gray-300">
              <span className="text-lg sm:text-xl flex-shrink-0">👤</span>
              <span className="text-sm sm:text-base break-words">Host: {event?.host || 'Unknown'}</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 text-gray-300">
              <span className="text-lg sm:text-xl flex-shrink-0">🎯</span>
              <span className="text-sm sm:text-base break-words">Event: {event?.event || 'Social Event'}</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 text-gray-300">
              <span className="text-lg sm:text-xl flex-shrink-0">🕐</span>
              <span className="text-sm sm:text-base break-words">Time: {event?.time || 'TBD'}</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 text-gray-300">
              <span className="text-lg sm:text-xl flex-shrink-0">📅</span>
              <span className="text-sm sm:text-base break-words">Date: {event?.date || 'TBD'}</span>
            </div>
            <div className="flex items-start gap-2 sm:gap-3 text-gray-300">
              <span className="text-lg sm:text-xl flex-shrink-0">📍</span>
              <span className="text-sm sm:text-base flex-1 break-words">{event?.location || 'Location TBD'}</span>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-800 my-4 sm:my-6" />

          {/* Description */}
          <div>
            <h3 className="text-white font-semibold mb-1.5 sm:mb-2 text-sm sm:text-base">About this event</h3>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              Join us for an amazing {event?.event || 'social'} event hosted by {event?.host || 'a fellow extrovert'}! 
              Get ready to party, meet new people, and create unforgettable memories. 
              Don't forget to bring your best vibes and energy! 🎊
            </p>
          </div>

          {/* Attendees */}
          <div className="mt-3 sm:mt-4">
            <h3 className="text-white font-semibold mb-1.5 sm:mb-2 text-sm sm:text-base">Attendees</h3>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-[10px] sm:text-xs font-bold">
                JD
              </div>
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-pink-500 rounded-full flex items-center justify-center text-white text-[10px] sm:text-xs font-bold">
                AK
              </div>
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-[10px] sm:text-xs font-bold">
                SM
              </div>
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-700 rounded-full flex items-center justify-center text-gray-400 text-[10px] sm:text-xs font-bold">
                +{isJoined ? 4 : 3}
              </div>
            </div>
          </div>

          {/* Join Button */}
          <button
            onClick={handleJoin}
            disabled={isJoined}
            className={`w-full mt-4 sm:mt-6 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition touch-btn ${
              isJoined 
                ? 'bg-green-600 text-white cursor-default' 
                : 'bg-purple-600 text-white hover:bg-purple-700'
            }`}
          >
            {isJoined ? '✅ Joined Successfully' : '🎉 JOIN EVENT'}
          </button>
        </div>
      </div>
    </div>
  );
}