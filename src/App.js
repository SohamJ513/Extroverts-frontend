import { useState, lazy, Suspense, useEffect } from 'react';
import { WizardProvider } from './context/WizardContext';
import Wizard from './components/wizard/Wizard';
import LandingPage from './components/LandingPage';
import TermsAgreement from './components/TermsAgreement';
import TermsSheet from './components/TermsSheet';
import LoginPage from './components/LoginPage';
import Toast from './components/common/Toast';

// Lazy load Dashboard for better performance
const DashboardLazy = lazy(() => import('./components/Dashboard'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen bg-black flex items-center justify-center">
    <div className="text-center">
      <div className="spinner mx-auto mb-4" />
      <p className="text-gray-400">Loading...</p>
    </div>
  </div>
);

function App() {
  const [currentScreen, setCurrentScreen] = useState('landing');
  const [showTermsSheet, setShowTermsSheet] = useState(false);
  const [userData, setUserData] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'error') => {
    setToast({ message, type });
  };

  const hideToast = () => {
    setToast(null);
  };

  // Check if user already exists on app load
  useEffect(() => {
    const savedData = localStorage.getItem('extroverts_user_data');
    if (savedData) {
      console.log('User data exists in localStorage');
    }
  }, []);

  const handleContinue = () => {
    const savedData = localStorage.getItem('extroverts_user_data');
    if (savedData) {
      setCurrentScreen('login');
    } else {
      setCurrentScreen('terms-agreement');
    }
  };

  const handleLogin = (data) => {
    setUserData(data);
    setCurrentScreen('dashboard');
    setTimeout(() => {
      showToast('🎉 Welcome back!', 'success');
    }, 300);
  };

  const handleSignup = () => {
    setCurrentScreen('terms-agreement');
  };

  const handleAcceptAgreement = () => {
    setCurrentScreen('wizard');
    setTimeout(() => {
      showToast('🎉 Welcome to Extroverts! Let\'s get started.', 'success');
    }, 300);
  };

  const handleTermsClick = () => {
    setShowTermsSheet(true);
  };

  const handleCloseTerms = () => {
    setShowTermsSheet(false);
  };

  const handleAcceptTerms = () => {
    setShowTermsSheet(false);
    setCurrentScreen('wizard');
    setTimeout(() => {
      showToast('🎉 Welcome to Extroverts! Let\'s get started.', 'success');
    }, 300);
  };

  const handleWizardComplete = (data) => {
    setUserData(data);
    setCurrentScreen('dashboard');
    localStorage.removeItem('extroverts_current_step');
    setTimeout(() => {
      showToast('🎉 Welcome to your dashboard!', 'success');
    }, 300);
  };

  const handleLogout = () => {
    // Keep user data in localStorage for login
    // Only clear the current step progress
    localStorage.removeItem('extroverts_current_step');
    setUserData(null);
    setCurrentScreen('landing');
    showToast('👋 Logged out successfully', 'info');
  };

  // Show Landing Page
  if (currentScreen === 'landing') {
    return <LandingPage onContinue={handleContinue} />;
  }

  // Show Login Page
  if (currentScreen === 'login') {
    return <LoginPage onLogin={handleLogin} onSignup={handleSignup} />;
  }

  // Show Terms Agreement (First Screen)
  if (currentScreen === 'terms-agreement') {
    return (
      <>
        <TermsAgreement 
          onAccept={handleAcceptAgreement} 
          onTermsClick={handleTermsClick} 
        />
        {showTermsSheet && (
          <TermsSheet 
            onClose={handleCloseTerms}
            onUnderstand={handleAcceptTerms}
          />
        )}
      </>
    );
  }

  // Show Dashboard
  if (currentScreen === 'dashboard') {
    return (
      <Suspense fallback={<LoadingFallback />}>
        <DashboardLazy userData={userData} onLogout={handleLogout} />
      </Suspense>
    );
  }

  // Show Wizard
  return (
    <WizardProvider showToast={showToast} onComplete={handleWizardComplete}>
      <div className="min-h-screen bg-black">
        <Wizard />
      </div>
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={hideToast} 
        />
      )}
    </WizardProvider>
  );
}

export default App;