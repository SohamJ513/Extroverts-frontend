import { useState } from 'react';

// Location data
const locationData = {
  'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Thane', 'Bhiwandi'],
  'Delhi': ['New Delhi', 'Dwarka', 'Rohini', 'Saket', 'Karol Bagh'],
  'Karnataka': ['Bengaluru', 'Mysuru', 'Mangaluru', 'Hubballi', 'Belagavi'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem'],
  'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Noida', 'Ghaziabad', 'Varanasi', 'Agra'],
  'West Bengal': ['Kolkata', 'Howrah', 'Durgapur', 'Siliguri', 'Asansol'],
  'Telangana': ['Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar', 'Khammam'],
  'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar'],
  'Rajasthan': ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Ajmer'],
  'Kerala': ['Kochi', 'Thiruvananthapuram', 'Kozhikode', 'Thrissur', 'Kollam'],
  'Punjab': ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Mohali'],
  'Haryana': ['Gurugram', 'Faridabad', 'Panipat', 'Ambala', 'Hisar'],
  'Madhya Pradesh': ['Bhopal', 'Indore', 'Gwalior', 'Jabalpur', 'Ujjain'],
  'Bihar': ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Darbhanga'],
  'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Tirupati']
};

export default function Profile({ onBack, userData, onLogout }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: userData?.name || '',
    username: userData?.username || '',
    email: userData?.email || '',
    age: userData?.age || '',
    pronouns: userData?.pronouns || '',
    state: userData?.state || '',
    city: userData?.city || ''
  });

  // Get available cities based on selected state
  const availableCities = locationData[editData.state] || [];

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      onLogout();
    }
  };

  const handleSave = () => {
    // Update user data
    userData.name = editData.name;
    userData.username = editData.username;
    userData.email = editData.email;
    userData.age = editData.age;
    userData.pronouns = editData.pronouns;
    userData.state = editData.state;
    userData.city = editData.city;
    
    // Save to localStorage
    localStorage.setItem('extroverts_user_data', JSON.stringify(userData));
    
    setIsEditing(false);
    alert('✅ Profile updated successfully!');
  };

  // Edit Mode
  if (isEditing) {
    return (
      <div className="min-h-screen bg-black flex flex-col">
        {/* Header */}
        <div className="px-4 sm:px-6 pt-6 sm:pt-8 pb-3 sm:pb-4 flex items-center justify-between">
          <button
            onClick={() => setIsEditing(false)}
            className="text-gray-400 hover:text-white transition text-sm sm:text-base"
          >
            ← Cancel
          </button>
          <h1 className="text-white text-xl sm:text-2xl font-bold">Edit Profile</h1>
          <button
            onClick={handleSave}
            className="text-purple-400 hover:text-purple-300 transition font-semibold text-sm sm:text-base"
          >
            Save
          </button>
        </div>

        {/* Edit Form */}
        <div className="flex-1 px-4 sm:px-6 py-3 sm:py-4 overflow-y-auto pb-20 sm:pb-4">
          <div className="bg-gray-900/50 rounded-xl p-3 sm:p-4 border border-gray-800 space-y-3 sm:space-y-4">
            {/* Name */}
            <div>
              <label className="block text-gray-400 text-[10px] sm:text-xs font-medium mb-1">Name</label>
              <input
                type="text"
                value={editData.name}
                onChange={(e) => setEditData({...editData, name: e.target.value})}
                className="w-full px-0 py-2 sm:py-2.5 bg-transparent border-b-2 border-gray-700 text-white text-sm sm:text-base focus:outline-none focus:border-purple-500 placeholder-gray-600"
                placeholder="Enter your name"
              />
            </div>

            {/* Username */}
            <div>
              <label className="block text-gray-400 text-[10px] sm:text-xs font-medium mb-1">Username</label>
              <input
                type="text"
                value={editData.username}
                onChange={(e) => setEditData({...editData, username: e.target.value})}
                className="w-full px-0 py-2 sm:py-2.5 bg-transparent border-b-2 border-gray-700 text-white text-sm sm:text-base focus:outline-none focus:border-purple-500 placeholder-gray-600"
                placeholder="Enter username"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-400 text-[10px] sm:text-xs font-medium mb-1">Email</label>
              <input
                type="email"
                value={editData.email}
                onChange={(e) => setEditData({...editData, email: e.target.value})}
                className="w-full px-0 py-2 sm:py-2.5 bg-transparent border-b-2 border-gray-700 text-white text-sm sm:text-base focus:outline-none focus:border-purple-500 placeholder-gray-600"
                placeholder="Enter email"
              />
            </div>

            {/* Age */}
            <div>
              <label className="block text-gray-400 text-[10px] sm:text-xs font-medium mb-1">Age</label>
              <input
                type="number"
                value={editData.age}
                onChange={(e) => setEditData({...editData, age: e.target.value})}
                className="w-full px-0 py-2 sm:py-2.5 bg-transparent border-b-2 border-gray-700 text-white text-sm sm:text-base focus:outline-none focus:border-purple-500 placeholder-gray-600"
                placeholder="Enter age"
                min="18"
              />
            </div>

            {/* Pronouns */}
            <div>
              <label className="block text-gray-400 text-[10px] sm:text-xs font-medium mb-1">Pronouns</label>
              <select
                value={editData.pronouns}
                onChange={(e) => setEditData({...editData, pronouns: e.target.value})}
                className="w-full px-0 py-2 sm:py-2.5 bg-transparent border-b-2 border-gray-700 text-white text-sm sm:text-base focus:outline-none focus:border-purple-500"
              >
                <option value="" className="bg-black">Select pronouns</option>
                <option value="he/him" className="bg-black">he/him</option>
                <option value="she/her" className="bg-black">she/her</option>
                <option value="they/them" className="bg-black">they/them</option>
                <option value="ze/zir" className="bg-black">ze/zir</option>
                <option value="other" className="bg-black">other</option>
              </select>
            </div>

            {/* State - Cross-field logic */}
            <div>
              <label className="block text-gray-400 text-[10px] sm:text-xs font-medium mb-1">State</label>
              <select
                value={editData.state}
                onChange={(e) => {
                  setEditData({...editData, state: e.target.value, city: ''});
                }}
                className="w-full px-0 py-2 sm:py-2.5 bg-transparent border-b-2 border-gray-700 text-white text-sm sm:text-base focus:outline-none focus:border-purple-500"
              >
                <option value="" className="bg-black">Select state</option>
                {Object.keys(locationData).map((state) => (
                  <option key={state} value={state} className="bg-black">{state}</option>
                ))}
              </select>
            </div>

            {/* City - filtered based on state */}
            <div>
              <label className="block text-gray-400 text-[10px] sm:text-xs font-medium mb-1">City</label>
              <select
                value={editData.city}
                onChange={(e) => setEditData({...editData, city: e.target.value})}
                disabled={!editData.state}
                className="w-full px-0 py-2 sm:py-2.5 bg-transparent border-b-2 border-gray-700 text-white text-sm sm:text-base focus:outline-none focus:border-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="" className="bg-black">
                  {editData.state ? 'Select city' : 'Select a state first'}
                </option>
                {availableCities.map((city) => (
                  <option key={city} value={city} className="bg-black">{city}</option>
                ))}
              </select>
              {editData.state && availableCities.length === 0 && (
                <p className="text-gray-500 text-xs mt-1">No cities available for this state</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // View Mode
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
        <h1 className="text-white text-xl sm:text-2xl font-bold">Profile</h1>
        <button
          onClick={() => setIsEditing(true)}
          className="text-purple-400 hover:text-purple-300 transition font-semibold text-sm sm:text-base"
        >
          Edit
        </button>
      </div>

      {/* Profile Card */}
      <div className="mx-4 sm:mx-6 bg-gradient-to-br from-purple-600 to-pink-500 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center">
        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
          <span className="text-3xl sm:text-4xl text-white font-bold">
            {userData?.name?.charAt(0).toUpperCase() || '?'}
          </span>
        </div>
        <h2 className="text-white text-xl sm:text-2xl font-bold">{userData?.name || 'User'}</h2>
        <p className="text-white/70 text-xs sm:text-sm">@{userData?.username || 'username'}</p>
      </div>

      {/* User Details */}
      <div className="flex-1 px-4 sm:px-6 py-4 sm:py-6 overflow-y-auto pb-20 sm:pb-4">
        <div className="bg-gray-900/50 rounded-xl p-3 sm:p-4 border border-gray-800">
          <div className="space-y-3 sm:space-y-4">
            <div className="flex justify-between items-center border-b border-gray-800 pb-2 sm:pb-3">
              <span className="text-gray-400 text-xs sm:text-sm">Email</span>
              <span className="text-white text-xs sm:text-sm truncate max-w-[150px] sm:max-w-none">{userData?.email || 'Not set'}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-800 pb-2 sm:pb-3">
              <span className="text-gray-400 text-xs sm:text-sm">Age</span>
              <span className="text-white text-xs sm:text-sm">{userData?.age || 'Not set'}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-800 pb-2 sm:pb-3">
              <span className="text-gray-400 text-xs sm:text-sm">Pronouns</span>
              <span className="text-white text-xs sm:text-sm">{userData?.pronouns || 'Not set'}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-800 pb-2 sm:pb-3">
              <span className="text-gray-400 text-xs sm:text-sm">Location</span>
              <span className="text-white text-xs sm:text-sm truncate max-w-[120px] sm:max-w-none">
                {userData?.city && userData?.state 
                  ? `${userData.city}, ${userData.state}` 
                  : userData?.state || userData?.city || 'Not set'}
              </span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-800 pb-2 sm:pb-3">
              <span className="text-gray-400 text-xs sm:text-sm">Member Type</span>
              <span className="text-purple-400 text-xs sm:text-sm font-semibold">Silver Club Member</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-xs sm:text-sm">HVTs Progress</span>
              <span className="text-yellow-400 text-xs sm:text-sm font-semibold">20 HVTS TO GOLDEN</span>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full mt-4 sm:mt-6 py-2.5 sm:py-3 bg-red-600 text-white rounded-lg font-semibold text-sm sm:text-base hover:bg-red-700 transition touch-btn"
        >
          Logout
        </button>
      </div>
    </div>
  );
}