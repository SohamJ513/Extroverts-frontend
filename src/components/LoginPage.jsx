import { useState } from 'react';

export default function LoginPage({ onLogin, onSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    // Validate fields
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address');
      return;
    }

    if (password.length < 4) {
      setError('Password must be at least 4 characters');
      return;
    }

    setIsLoading(true);

    // Simulate login API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Check if user exists in localStorage
      const savedData = localStorage.getItem('extroverts_user_data');
      
      if (savedData) {
        const userData = JSON.parse(savedData);
        
        // Check if email matches
        if (userData.email && userData.email.toLowerCase() === email.toLowerCase()) {
          // Check if password matches
          if (userData.password && userData.password === password) {
            // ✅ Login successful
            onLogin(userData);
          } else {
            setError('Incorrect password. Please try again.');
          }
        } else {
          setError('No account found with this email. Please sign up.');
        }
      } else {
        setError('No account found. Please sign up first.');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-between px-4 sm:px-6 py-6 sm:py-10">
      {/* Logo */}
      <div className="w-full flex justify-start">
        <span 
          className="text-2xl sm:text-3xl font-serif font-bold text-white"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          E
        </span>
      </div>

      {/* Login Form */}
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full -mt-8 sm:-mt-12">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-white text-xl sm:text-2xl font-bold">Welcome Back!</h1>
          <p className="text-gray-400 text-xs sm:text-sm mt-1 sm:mt-2">Sign in to continue partying</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-3 sm:space-y-4">
          <div>
            <label className="block text-gray-400 text-[10px] sm:text-xs font-medium mb-1">EMAIL</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-0 py-2.5 sm:py-3 bg-transparent border-b-2 border-gray-700 text-white text-base sm:text-lg focus:outline-none focus:border-purple-500 placeholder-gray-600"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-gray-400 text-[10px] sm:text-xs font-medium mb-1">PASSWORD</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-0 py-2.5 sm:py-3 bg-transparent border-b-2 border-gray-700 text-white text-base sm:text-lg focus:outline-none focus:border-purple-500 placeholder-gray-600"
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <p className="text-red-500 text-xs sm:text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 sm:py-3 bg-purple-600 text-white rounded-lg font-semibold text-sm sm:text-base hover:bg-purple-700 transition disabled:opacity-50 touch-btn"
          >
            {isLoading ? 'LOGGING IN...' : 'LOGIN'}
          </button>
        </form>

        <p className="text-gray-400 text-xs sm:text-sm text-center mt-4 sm:mt-6">
          Don't have an account?{' '}
          <button
            onClick={onSignup}
            className="text-purple-400 hover:text-purple-300 transition font-medium"
          >
            Sign Up
          </button>
        </p>
      </div>

      {/* Home Indicator */}
      <div className="w-28 sm:w-32 h-1 bg-gray-700 rounded-full mx-auto mb-2" />
    </div>
  );
}