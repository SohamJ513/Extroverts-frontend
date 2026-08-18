import { useState, useCallback, useMemo } from 'react';
import Profile from './Profile';
import EventDetails from './EventDetails';
import EventCard from './EventCard';
import NotificationsPage from './NotificationsPage';

function TopHeader({ vipCount = 0, onProfileClick, onNotificationClick, notificationCount }) {
  return (
    <div className="flex items-center justify-between px-4 sm:px-6 pt-4 sm:pt-5 pb-2 sm:pb-3">
      {/* Logo */}
      <div className="flex items-start leading-none">
        <span
          className="text-white font-bold"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 24 }}
        >
          E
        </span>
        <span
          className="text-white font-bold"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 11, marginTop: 1 }}
        >
          .
        </span>
      </div>

      {/* Right-side action cluster */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* VIP pill - hidden on mobile */}
        <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-white/35 pl-1 pr-3 py-1">
          <span className="flex items-center gap-1 rounded-full bg-white px-2 py-0.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path
                d="M2 7L12 2L22 7V15L12 20L2 15V7Z"
                fill="black"
              />
            </svg>
            <span className="text-black text-[10px] font-extrabold tracking-tight">
              VIP
            </span>
          </span>
          <span className="text-white text-sm font-semibold">{vipCount}</span>
        </div>

        {/* Notification button with badge */}
        <button
          onClick={onNotificationClick}
          className="text-white/90 hover:text-white transition relative p-1"
          aria-label="Notifications"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M18 16V11C18 7.68629 15.3137 5 12 5C8.68629 5 6 7.68629 6 11V16L4 18V19H20V18L18 16Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 21C10.3506 21.6128 11.1275 22 12 22C12.8725 22 13.6494 21.6128 14 21"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {notificationCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center">
              {notificationCount}
            </span>
          )}
        </button>

        {/* Profile button */}
        <button
          onClick={onProfileClick}
          className="text-white/90 hover:text-white transition p-1"
          aria-label="Profile"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Chat bubbles - hidden on mobile */}
        <button className="hidden sm:block text-white/90 hover:text-white transition" aria-label="Messages">
          <svg width="22" height="20" viewBox="0 0 30 24" fill="none">
            <path
              d="M18 2C22.4183 2 26 5.13401 26 9C26 10.5525 25.4308 11.9847 24.4649 13.1479C24.7739 14.2529 25.4004 15.2371 25.9887 15.9903C26.1598 16.2094 26.0132 16.5312 25.7365 16.5464C24.4102 16.6191 22.9973 16.2911 21.8951 15.6801C20.7325 16.1998 19.4059 16.5 18 16.5C13.5817 16.5 10 13.366 10 9.5C10 5.634 13.5817 2 18 2Z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            <path
              d="M10.2 9.05C6.53 9.4 3.7 12.02 3.7 15.2C3.7 16.62 4.26 17.92 5.19 18.94C4.93 19.83 4.42 20.63 3.94 21.24C3.8 21.42 3.92 21.68 4.15 21.69C5.19 21.74 6.29 21.48 7.16 20.99C8.09 21.38 9.12 21.6 10.2 21.6"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="14.7" cy="9.3" r="1" fill="currentColor" />
            <circle cx="18" cy="9.3" r="1" fill="currentColor" />
            <circle cx="21.3" cy="9.3" r="1" fill="currentColor" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function Dashboard({ userData, onLogout }) {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('ALL');
  const [showNotifications, setShowNotifications] = useState(false);
  const [joinedEvents, setJoinedEvents] = useState([]);

  // Club progress data
  const currentHVTs = 80;
  const maxHVTs = 100;
  const progressPercentage = (currentHVTs / maxHVTs) * 100;
  const hvtToGolden = maxHVTs - currentHVTs;

  const allEvents = [
    {
      id: 1,
      title: 'Parttyyyy',
      type: 'PRIVATE PARTY',
      icon: '🎉',
      host: '@bhanuhu',
      event: 'Dinner Event',
      time: '2:11 PM',
      date: '02/09/26',
      state: 'Maharashtra',
      city: 'Bhiwandi',
      location: 'Bhiwandi Health Care Hospital, Attarwala Compound, Near Apsara T...',
    },
    {
      id: 2,
      title: 'Party jam',
      type: 'PRIVATE PARTY',
      icon: '🎵',
      host: '@jatinraja',
      event: 'Music Jam',
      time: '9:24 PM',
      date: '03/09/26',
      state: 'Maharashtra',
      city: 'Mumbai',
      location: 'Burger Heavens - Best Cafe In Bhiwandi, Shop No 2, Besides BNN Coll...',
    },
    {
      id: 3,
      title: 'Beach Bash',
      type: 'PUBLIC EVENT',
      icon: '🏖️',
      host: '@sunkissed',
      event: 'Beach Party',
      time: '4:00 PM',
      date: '05/09/26',
      state: 'Karnataka',
      city: 'Bengaluru',
      location: 'M G Road, Bengaluru, Karnataka',
    },
    {
      id: 4,
      title: 'Tech Meetup',
      type: 'EXCLUSIVE',
      icon: '💻',
      host: '@techgeek',
      event: 'Networking Night',
      time: '7:00 PM',
      date: '08/09/26',
      state: 'Delhi',
      city: 'New Delhi',
      location: 'Connaught Place, New Delhi',
    },
    {
      id: 5,
      title: 'Food Festival',
      type: 'PUBLIC EVENT',
      icon: '🍕',
      host: '@foodie',
      event: 'Food Tasting',
      time: '12:00 PM',
      date: '10/09/26',
      state: 'Maharashtra',
      city: 'Pune',
      location: 'FC Road, Pune, Maharashtra',
    },
    {
      id: 6,
      title: 'Night Market',
      type: 'PUBLIC EVENT',
      icon: '🌙',
      host: '@nightowl',
      event: 'Street Food & Shopping',
      time: '8:00 PM',
      date: '12/09/26',
      state: 'Maharashtra',
      city: 'Thane',
      location: 'Viviana Mall, Thane, Maharashtra',
    }
  ];

  const handleJoinEvent = (event) => {
    if (!joinedEvents.find(e => e.id === event.id)) {
      setJoinedEvents([...joinedEvents, event]);
    }
  };

  const isLocationSearch = (term) => {
    const locationKeywords = ['mumbai', 'pune', 'bhiwandi', 'thane', 'nagpur', 'delhi', 'new delhi', 
                              'bengaluru', 'bangalore', 'chennai', 'hyderabad', 'kolkata', 'ahmedabad',
                              'jaipur', 'lucknow', 'kanpur', 'nagpur', 'indore', 'bhopal', 'patna',
                              'vadodara', 'rajkot', 'kochi', 'kozhikode', 'amritsar', 'gurugram',
                              'noida', 'ghaziabad', 'faridabad', 'chandigarh', 'goa', 'surat'];
    return locationKeywords.some(keyword => 
      term.toLowerCase().includes(keyword) || keyword.includes(term.toLowerCase())
    );
  };

  const getFilteredEvents = useMemo(() => {
    const userState = userData?.state || '';
    const userCity = userData?.city || '';
    const search = searchTerm.trim().toLowerCase();

    if (search && isLocationSearch(search)) {
      return allEvents.filter(event => {
        const matchesLocation = event.city.toLowerCase().includes(search) || 
                                 event.state.toLowerCase().includes(search);
        const matchesFilter = filterType === 'ALL' || event.type === filterType;
        return matchesLocation && matchesFilter;
      });
    }

    if (userState) {
      return allEvents.filter(event => {
        const matchesState = event.state === userState;
        if (userCity) {
          return matchesState && event.city === userCity;
        }
        return matchesState;
      }).filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(search) ||
                               event.event.toLowerCase().includes(search) ||
                               event.city.toLowerCase().includes(search);
        const matchesFilter = filterType === 'ALL' || event.type === filterType;
        return matchesSearch && matchesFilter;
      });
    }

    return allEvents.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(search) ||
                             event.event.toLowerCase().includes(search) ||
                             event.city.toLowerCase().includes(search);
      const matchesFilter = filterType === 'ALL' || event.type === filterType;
      return matchesSearch && matchesFilter;
    });
  }, [userData?.state, userData?.city, searchTerm, filterType]);

  const handleEventClick = useCallback((event) => {
    setSelectedEvent(event);
    setCurrentView('event-details');
  }, []);

  const handleProfileClick = useCallback(() => {
    setCurrentView('profile');
  }, []);

  const handleBack = useCallback(() => {
    setCurrentView('dashboard');
  }, []);

  const handleNotificationClick = () => {
    setShowNotifications(true);
  };

  const handleNotificationEventClick = useCallback((event) => {
    setShowNotifications(false);
    setSelectedEvent(event);
    setCurrentView('event-details');
  }, []);

  // Show Notifications Page
  if (showNotifications) {
    return <NotificationsPage 
      onBack={() => setShowNotifications(false)} 
      joinedEvents={joinedEvents}
      onEventClick={handleNotificationEventClick}
    />;
  }

  // Show Profile Page
  if (currentView === 'profile') {
    return <Profile onBack={handleBack} userData={userData} onLogout={onLogout} />;
  }

  // Show Event Details Page
  if (currentView === 'event-details' && selectedEvent) {
    return <EventDetails 
      event={selectedEvent} 
      onBack={handleBack} 
      onJoin={handleJoinEvent}
      isJoined={joinedEvents.some(e => e.id === selectedEvent.id)}
    />;
  }

  // Show Dashboard
  const hasLocation = userData?.state || userData?.city;
  const isSearchingLocation = searchTerm.trim() && isLocationSearch(searchTerm.trim());

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Top Header */}
      <TopHeader 
        vipCount={0} 
        onProfileClick={handleProfileClick}
        onNotificationClick={handleNotificationClick}
        notificationCount={joinedEvents.length}
      />

      {/* YOUR CLUB Header */}
      <div className="px-4 sm:px-6 pt-3 sm:pt-4 pb-2 sm:pb-4">
        <h1 className="text-white text-xl sm:text-2xl font-bold">YOUR CLUB</h1>
      </div>

      {/* Silver Club Member Card with Progress Bar */}
      <div className="mx-4 sm:mx-6 bg-gradient-to-br from-purple-600 to-pink-500 rounded-xl sm:rounded-2xl p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-white text-base sm:text-xl font-bold">Silver Club Member</h2>
            <p className="text-white/80 text-xs sm:text-sm mt-0.5 sm:mt-1">{hvtToGolden} HVTS TO GOLDEN CLUB</p>
          </div>
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-xl sm:text-2xl text-white">👑</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-3 sm:mt-4">
          <div className="flex justify-between text-white/70 text-[10px] sm:text-xs mb-0.5 sm:mb-1">
            <span>{currentHVTs} HVTs</span>
            <span>{maxHVTs} HVTs</span>
          </div>
          <div className="w-full h-2 sm:h-3 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-yellow-400 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="flex justify-between text-white/40 text-[10px] sm:text-xs mt-0.5 sm:mt-1">
            <span>Silver</span>
            <span>⭐ Golden</span>
          </div>
        </div>
      </div>

      {/* Location Status Banner */}
      {!hasLocation && !isSearchingLocation && (
        <div className="mx-4 sm:mx-6 mt-3 sm:mt-4 p-2.5 sm:p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-yellow-400 text-base sm:text-lg">📍</span>
              <div>
                <p className="text-yellow-400 text-xs sm:text-sm font-medium">Set your location</p>
                <p className="text-yellow-400/60 text-[10px] sm:text-xs hidden sm:block">Go to Profile → Edit to see events near you</p>
              </div>
            </div>
            <button
              onClick={handleProfileClick}
              className="px-3 sm:px-4 py-1 sm:py-1.5 bg-yellow-500/20 text-yellow-400 text-[10px] sm:text-xs font-semibold rounded-full hover:bg-yellow-500/30 transition touch-btn"
            >
              Set Location
            </button>
          </div>
        </div>
      )}

      {/* Location Display */}
      {(hasLocation || isSearchingLocation) && (
        <div className="px-4 sm:px-6 pt-2 sm:pt-3 pb-1">
          <p className="text-gray-400 text-[10px] sm:text-xs truncate">
            📍 Showing events 
            {isSearchingLocation 
              ? ` in "${searchTerm.trim()}"` 
              : ` near ${userData?.city && userData?.state ? `${userData.city}, ${userData.state}` : userData?.state || userData?.city}`}
          </p>
        </div>
      )}

      {/* Search & Filter */}
      <div className="px-4 sm:px-6 pt-2 sm:pt-3 pb-2">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="🔍 Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-3 sm:px-4 py-1.5 sm:py-2 text-sm bg-gray-900/50 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
          />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-2 sm:px-4 py-1.5 sm:py-2 text-sm bg-gray-900/50 border border-gray-800 rounded-lg text-white focus:outline-none focus:border-purple-500 max-w-[100px] sm:max-w-none"
          >
            <option value="ALL">All</option>
            <option value="PRIVATE PARTY">Private</option>
            <option value="PUBLIC EVENT">Public</option>
            <option value="EXCLUSIVE">Exclusive</option>
          </select>
        </div>
      </div>

      {/* Events Section */}
      <div className="flex-1 px-4 sm:px-6 py-3 sm:py-4 overflow-y-auto pb-20 sm:pb-4">
        {getFilteredEvents.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            <p className="text-3xl sm:text-4xl mb-2">🔍</p>
            <p className="text-sm">No events found</p>
            <p className="text-xs text-gray-500">
              {isSearchingLocation 
                ? `No events found in "${searchTerm.trim()}"` 
                : hasLocation 
                  ? 'Try adjusting your search' 
                  : 'Set your location to see events near you'}
            </p>
          </div>
        ) : (
          getFilteredEvents.map((event) => (
            <EventCard 
              key={event.id} 
              event={event} 
              onClick={handleEventClick}
              onJoin={handleJoinEvent}
              isJoined={joinedEvents.some(e => e.id === event.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}