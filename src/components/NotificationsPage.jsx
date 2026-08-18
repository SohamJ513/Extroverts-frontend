import { useEffect, useState } from 'react';

export default function NotificationsPage({ onBack, joinedEvents, onEventClick }) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Generate notifications based on joined events
    const newNotifications = [];
    
    joinedEvents.forEach(event => {
      // Calculate days until event
      let daysUntil = 999;
      let eventDate = null;
      
      // Handle different date formats
      if (event.date) {
        const dateParts = event.date.split('/');
        if (dateParts.length === 3) {
          const day = parseInt(dateParts[0]);
          const month = parseInt(dateParts[1]) - 1;
          const year = 2000 + parseInt(dateParts[2]);
          eventDate = new Date(year, month, day);
        }
      } else if (event.startDate) {
        eventDate = new Date(event.startDate);
      }
      
      if (eventDate) {
        const today = new Date();
        daysUntil = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));
      }
      
      // Format location
      let locationText = event.location || 'Location TBD';
      if (typeof event.location === 'object' && event.location.address) {
        locationText = event.location.address;
      } else if (typeof event.location === 'object') {
        locationText = `${event.location.lat || ''}, ${event.location.lon || ''}`;
        if (locationText === ', ') locationText = 'Location TBD';
      }
      
      // Joined notification
      newNotifications.push({
        id: `joined-${event.id}`,
        type: 'success',
        icon: '✅',
        message: `You joined "${event.title || 'Event'}"`,
        time: 'Just now',
        event: event,
        daysUntil: daysUntil,
        eventTitle: event.title || 'Event',
        eventDate: event.date || (eventDate ? eventDate.toLocaleDateString() : 'TBD'),
        eventTime: event.time || 'TBD',
        eventLocation: locationText,
        eventIcon: event.icon || '📅'
      });

      // Reminder notification (if event is within 3 days)
      if (daysUntil > 0 && daysUntil <= 3) {
        newNotifications.push({
          id: `reminder-${event.id}`,
          type: 'reminder',
          icon: '🔔',
          message: `"${event.title || 'Event'}" is in ${daysUntil} day${daysUntil > 1 ? 's' : ''}!`,
          time: `${daysUntil} day${daysUntil > 1 ? 's' : ''} left`,
          event: event,
          daysUntil: daysUntil,
          eventTitle: event.title || 'Event',
          eventDate: event.date || (eventDate ? eventDate.toLocaleDateString() : 'TBD'),
          eventTime: event.time || 'TBD',
          eventLocation: locationText,
          eventIcon: event.icon || '📅'
        });
      }

      // Upcoming notification (if event is more than 3 days away)
      if (daysUntil > 3 && daysUntil < 999) {
        newNotifications.push({
          id: `upcoming-${event.id}`,
          type: 'info',
          icon: '📅',
          message: `"${event.title || 'Event'}" is coming up on ${event.date || (eventDate ? eventDate.toLocaleDateString() : 'TBD')}`,
          time: `${daysUntil} days away`,
          event: event,
          daysUntil: daysUntil,
          eventTitle: event.title || 'Event',
          eventDate: event.date || (eventDate ? eventDate.toLocaleDateString() : 'TBD'),
          eventTime: event.time || 'TBD',
          eventLocation: locationText,
          eventIcon: event.icon || '📅'
        });
      }
    });

    // Sort notifications
    newNotifications.sort((a, b) => {
      const priority = { reminder: 0, info: 1, success: 2 };
      return priority[a.type] - priority[b.type];
    });

    setNotifications(newNotifications);
  }, [joinedEvents]);

  const handleNotificationClick = (notification) => {
    console.log('Notification clicked:', notification);
    console.log('Event data:', notification.event);
    console.log('onEventClick function exists?', !!onEventClick);
    
    if (notification.event && typeof onEventClick === 'function') {
      console.log('Calling onEventClick with event');
      onEventClick(notification.event);
    } else {
      console.log('Cannot navigate - missing event or onEventClick is not a function');
      if (notification.event && typeof onEventClick === 'function') {
        console.log('Attempting fallback navigation');
        onEventClick(notification.event);
      } else {
        console.error('onEventClick is not a function or event is missing');
      }
    }
  };

  const getTimeDisplay = (notification) => {
    if (notification.type === 'success') return notification.time;
    if (notification.daysUntil === 0) return 'Today!';
    if (notification.daysUntil === 1) return 'Tomorrow!';
    if (notification.daysUntil < 999) return notification.time;
    return 'Date TBD';
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Top Bar with Logo and EXIT button */}
      <div className="px-4 sm:px-6 pt-4 sm:pt-5 pb-3 sm:pb-4 flex items-center justify-between border-b border-gray-800">
        <div className="flex items-center gap-2">
          <span 
            className="text-white font-bold text-xl sm:text-2xl"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            E
          </span>
        </div>
        <button
          onClick={onBack}
          className="text-gray-400 hover:text-white transition text-xs sm:text-sm font-medium"
        >
          EXIT
        </button>
      </div>

      {/* Header */}
      <div className="px-4 sm:px-6 pt-3 sm:pt-4 pb-1 sm:pb-2">
        <h1 className="text-white text-lg sm:text-2xl font-bold">NOTIFICATIONS</h1>
      </div>

      {/* Notification List */}
      <div className="flex-1 px-4 sm:px-6 py-3 sm:py-4 overflow-y-auto pb-20 sm:pb-4">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center -mt-8 sm:-mt-12">
            <p className="text-gray-500 text-sm mb-2">No notifications yet</p>
            <p className="text-gray-600 text-xs max-w-xs px-4">
              Updates about your parties, requests, and superlatives will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-2.5 sm:space-y-3">
            {notifications.map((notification) => (
              <div 
                key={notification.id}
                onClick={() => {
                  console.log('Div clicked for notification ID:', notification.id);
                  handleNotificationClick(notification);
                }}
                className={`
                  p-3 sm:p-4 rounded-xl border cursor-pointer hover:opacity-80 transition
                  ${notification.type === 'success' 
                    ? 'bg-green-500/10 border-green-500/30 hover:bg-green-500/20' 
                    : notification.type === 'reminder'
                    ? 'bg-yellow-500/10 border-yellow-500/30 hover:bg-yellow-500/20'
                    : 'bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20'}
                `}
              >
                <div className="flex items-start gap-2.5 sm:gap-3">
                  <span className="text-lg sm:text-xl flex-shrink-0">{notification.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-xs sm:text-sm font-medium break-words">{notification.message}</p>
                    {notification.event && (
                      <div className="mt-0.5 sm:mt-1 space-y-0.5">
                        <p className="text-gray-400 text-[10px] sm:text-xs truncate">
                          📍 {notification.eventLocation?.substring(0, 40)}...
                        </p>
                        <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-gray-500">
                          <span>🕐 {notification.eventTime}</span>
                          <span>📅 {notification.eventDate}</span>
                        </div>
                      </div>
                    )}
                    <p className="text-gray-500 text-[10px] sm:text-xs mt-0.5 sm:mt-1">{getTimeDisplay(notification)}</p>
                  </div>
                  <span className="text-gray-600 text-xs flex-shrink-0">›</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}