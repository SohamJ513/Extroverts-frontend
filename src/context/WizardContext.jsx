import { createContext, useState, useContext, useEffect } from 'react';

const WizardContext = createContext();

// Helper functions for localStorage
const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

const loadFromLocalStorage = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return null;
  }
};

export function WizardProvider({ children, showToast, onComplete }) {
  // Load saved data from localStorage
  const savedData = loadFromLocalStorage('extroverts_user_data');
  const savedStep = loadFromLocalStorage('extroverts_current_step');

  const [currentStep, setCurrentStep] = useState(savedStep || 0);
  const [userData, setUserData] = useState(savedData || {
    name: '',
    username: '',
    age: '',
    pronouns: '',
    email: '',
    otp: ['', '', '', '', '', ''],
    inviteCode: '',
    password: '', // Added password field
    newsletter: false,
    state: '',
    city: ''
  });

  const totalSteps = 8;

  // Save to localStorage whenever data changes
  useEffect(() => {
    saveToLocalStorage('extroverts_user_data', userData);
  }, [userData]);

  // Save current step whenever it changes
  useEffect(() => {
    saveToLocalStorage('extroverts_current_step', currentStep);
  }, [currentStep]);

  const goToNextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Wizard complete - trigger callback to show dashboard
      if (onComplete) {
        onComplete(userData);
      }
    }
  };

  const goToPrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateUserData = (data) => {
    setUserData(prev => ({ ...prev, ...data }));
  };

  // Clear saved data (logout)
  const clearUserData = () => {
    localStorage.removeItem('extroverts_user_data');
    localStorage.removeItem('extroverts_current_step');
    setUserData({
      name: '',
      username: '',
      age: '',
      pronouns: '',
      email: '',
      otp: ['', '', '', '', '', ''],
      inviteCode: '',
      password: '', // Added password field
      newsletter: false,
      state: '',
      city: ''
    });
    setCurrentStep(0);
    if (showToast) {
      showToast('👋 Logged out successfully', 'info');
    }
  };

  // Reset wizard progress only (keep user data)
  const resetWizard = () => {
    localStorage.removeItem('extroverts_current_step');
    setCurrentStep(0);
  };

  return (
    <WizardContext.Provider value={{
      currentStep,
      userData,
      updateUserData,
      goToNextStep,
      goToPrevStep,
      totalSteps,
      showToast,
      clearUserData,
      resetWizard
    }}>
      {children}
    </WizardContext.Provider>
  );
}

export function useWizard() {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error('useWizard must be used within a WizardProvider');
  }
  return context;
}