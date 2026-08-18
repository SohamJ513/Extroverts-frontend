import { useState } from 'react';

export default function MessagesPage({ onBack }) {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageInput, setMessageInput] = useState('');

  // Sample chat data
  const chats = [
    {
      id: 1,
      name: '@bhanuhu',
      avatar: 'BH',
      color: 'bg-purple-500',
      lastMessage: 'Hey! Are you coming to the party tonight? 🎉',
      time: '2:30 PM',
      unread: 2,
      online: true,
      messages: [
        { id: 1, sender: 'them', text: 'Hey! Are you coming to the party tonight? 🎉', time: '2:28 PM' },
        { id: 2, sender: 'me', text: 'Yes, I\'ll be there! Can I bring someone?', time: '2:29 PM' },
        { id: 3, sender: 'them', text: 'Of course! The more the merrier! 🥳', time: '2:30 PM' },
      ]
    },
    {
      id: 2,
      name: '@jatinraja',
      avatar: 'JR',
      color: 'bg-pink-500',
      lastMessage: 'Music Jam session starts at 9 PM',
      time: 'Yesterday',
      unread: 0,
      online: false,
      messages: [
        { id: 1, sender: 'them', text: 'Music Jam session starts at 9 PM', time: 'Yesterday' },
        { id: 2, sender: 'me', text: 'Perfect! I\'ll bring my guitar 🎸', time: 'Yesterday' },
      ]
    },
    {
      id: 3,
      name: '@sunkissed',
      avatar: 'SK',
      color: 'bg-blue-500',
      lastMessage: 'Beach Bash is going to be epic! 🌊',
      time: '2 days ago',
      unread: 1,
      online: false,
      messages: [
        { id: 1, sender: 'them', text: 'Beach Bash is going to be epic! 🌊', time: '2 days ago' },
      ]
    },
    {
      id: 4,
      name: '@foodie',
      avatar: 'FD',
      color: 'bg-green-500',
      lastMessage: 'Food tasting menu is ready! 🍕',
      time: '3 days ago',
      unread: 0,
      online: false,
      messages: [
        { id: 1, sender: 'them', text: 'Food tasting menu is ready! 🍕', time: '3 days ago' },
        { id: 2, sender: 'me', text: 'Can\'t wait to try it! 😋', time: '3 days ago' },
      ]
    }
  ];

  const handleSendMessage = () => {
    if (messageInput.trim() && selectedChat) {
      const newMessage = {
        id: Date.now(),
        sender: 'me',
        text: messageInput.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      // Update messages
      const updatedChats = chats.map(chat => {
        if (chat.id === selectedChat.id) {
          return {
            ...chat,
            messages: [...chat.messages, newMessage],
            lastMessage: messageInput.trim(),
            time: 'Just now'
          };
        }
        return chat;
      });
      
      // Update the chats array (in a real app, this would be an API call)
      Object.assign(chats, updatedChats);
      setSelectedChat({ ...selectedChat, messages: [...selectedChat.messages, newMessage] });
      setMessageInput('');
    }
  };

  // Render chat list
  if (!selectedChat) {
    return (
      <div className="min-h-screen bg-black flex flex-col">
        {/* Header */}
        <div className="px-4 sm:px-6 pt-6 sm:pt-8 pb-3 sm:pb-4 flex items-center justify-between border-b border-gray-800">
          <button
            onClick={onBack}
            className="text-gray-400 hover:text-white transition text-sm sm:text-base"
          >
            ← Back
          </button>
          <h1 className="text-white text-xl sm:text-2xl font-bold">Messages</h1>
          <div className="w-12 sm:w-16" />
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className="flex items-center gap-3 px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-800 hover:bg-white/5 transition cursor-pointer"
            >
              <div className={`w-10 h-10 sm:w-12 sm:h-12 ${chat.color} rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base flex-shrink-0`}>
                {chat.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-white font-semibold text-sm sm:text-base">{chat.name}</span>
                  <span className="text-gray-500 text-[10px] sm:text-xs">{chat.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-gray-400 text-xs sm:text-sm truncate flex-1">{chat.lastMessage}</p>
                  {chat.unread > 0 && (
                    <span className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0 ml-2">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Render chat view
  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Chat Header */}
      <div className="px-4 sm:px-6 pt-6 sm:pt-8 pb-3 sm:pb-4 flex items-center justify-between border-b border-gray-800">
        <button
          onClick={() => setSelectedChat(null)}
          className="text-gray-400 hover:text-white transition text-sm sm:text-base"
        >
          ← Back
        </button>
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 ${selectedChat.color} rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0`}>
            {selectedChat.avatar}
          </div>
          <div className="text-left">
            <h2 className="text-white font-semibold text-sm sm:text-base">{selectedChat.name}</h2>
            <p className={`text-[10px] sm:text-xs ${selectedChat.online ? 'text-green-400' : 'text-gray-500'}`}>
              {selectedChat.online ? '● Online' : 'Offline'}
            </p>
          </div>
        </div>
        <div className="w-12 sm:w-16" />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-3">
        {selectedChat.messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] sm:max-w-[70%] p-3 rounded-lg ${
                message.sender === 'me'
                  ? 'bg-purple-600 text-white rounded-br-none'
                  : 'bg-gray-800 text-white rounded-bl-none'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <span className={`text-[10px] ${message.sender === 'me' ? 'text-purple-200' : 'text-gray-400'} block text-right mt-1`}>
                {message.time}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="px-4 sm:px-6 py-3 border-t border-gray-800">
        <div className="flex gap-2">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 text-sm"
          />
          <button
            onClick={handleSendMessage}
            disabled={!messageInput.trim()}
            className="px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}