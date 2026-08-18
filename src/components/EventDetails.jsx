import { useState } from 'react';

export default function EventDetails({ event, onBack, onJoin, isJoined: initialIsJoined }) {
  const [isJoined, setIsJoined] = useState(initialIsJoined || false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleJoin = () => {
    if (!isJoined) {
      setIsJoined(true);
      onJoin(event);
      setTimeout(() => {
        alert('🎉 You have successfully joined this event!');
      }, 500);
    }
  };

  // Sample event images based on event type
  const getEventImage = () => {
    const images = {
      'PRIVATE PARTY': 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=300&fit=crop',
      'PUBLIC EVENT': 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=300&fit=crop',
      'EXCLUSIVE': 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&h=300&fit=crop',
      'Dinner Event': 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop',
      'Music Jam': 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=300&fit=crop',
      'Beach Party': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop',
      'Networking Night': 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop',
      'Food Tasting': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop',
      'Street Food & Shopping': 'https://images.unsplash.com/photo-1526367790999-0150786686a2?w=400&h=300&fit=crop'
    };
    return images[event?.type] || images[event?.event] || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=300&fit=crop';
  };

  const eventImage = getEventImage();

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
          {/* Event Image */}
          <div className="relative w-full h-40 sm:h-48 md:h-56 rounded-xl overflow-hidden mb-4 bg-gray-800">
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
              </div>
            )}
            <img
              src={eventImage}
              alt={event?.title}
              className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageLoaded(true)}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Event Type Badge on Image */}
            <div className="absolute top-3 left-3">
              <span className="inline-block px-2.5 sm:px-3 py-0.5 sm:py-1 bg-purple-500/80 text-white text-[10px] sm:text-xs font-semibold rounded-full backdrop-blur-sm">
                {event?.type || 'PRIVATE PARTY'}
              </span>
            </div>

            {/* Event Icon & Title on Image */}
            <div className="absolute bottom-3 left-3 flex items-center gap-2">
              <span className="text-2xl sm:text-3xl">{event?.icon || '🎉'}</span>
              <h2 className="text-white text-lg sm:text-xl font-bold drop-shadow-lg">{event?.title}</h2>
            </div>
          </div>

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