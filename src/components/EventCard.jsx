import { memo } from 'react';

function EventCard({ event, onClick, onJoin, isJoined }) {
  return (
    <div 
      className="mb-3 sm:mb-4 cursor-pointer hover:opacity-80 transition bg-gray-900/30 rounded-xl p-3 sm:p-4 border border-gray-800"
      onClick={() => onClick(event)}
    >
      {/* Top row: Icon + Title + JOIN button */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
          <span className="text-xl sm:text-2xl flex-shrink-0">{event.icon}</span>
          <h3 className="text-white text-sm sm:text-lg font-bold truncate">{event.title}</h3>
        </div>
        <button 
          className={`px-3 sm:px-5 py-1 sm:py-1.5 text-[10px] sm:text-xs font-semibold rounded-full transition touch-btn flex-shrink-0 ${
            isJoined 
              ? 'bg-green-600 text-white cursor-default' 
              : 'bg-purple-600 text-white hover:bg-purple-700'
          }`}
          onClick={(e) => {
            e.stopPropagation();
            if (!isJoined) {
              onJoin(event);
            }
          }}
        >
          {isJoined ? '✅ JOINED' : 'JOIN'}
        </button>
      </div>

      <p className="text-purple-400 text-[10px] sm:text-xs font-semibold mt-1">{event.type}</p>
      
      <div className="flex items-center gap-1 sm:gap-2 mt-0.5">
        <span className="text-gray-400 text-[10px] sm:text-sm truncate">{event.host}</span>
        <span className="text-gray-600 text-[10px] sm:text-sm">•</span>
        <span className="text-gray-400 text-[10px] sm:text-sm truncate">{event.event}</span>
      </div>
      
      <div className="flex items-center gap-2 sm:gap-4 mt-1.5 sm:mt-2 text-gray-400 text-[10px] sm:text-sm">
        <span>🕐 {event.time}</span>
        <span>📅 {event.date}</span>
      </div>
      
      <p className="text-gray-500 text-[10px] sm:text-sm mt-1 flex items-start gap-1">
        <span className="flex-shrink-0">📍</span>
        <span className="break-words">{event.location}</span>
      </p>
    </div>
  );
}

export default memo(EventCard);