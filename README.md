# 🎉 Extroverts - Party & Event Discovery App

A modern, full-featured event discovery and party planning web application built with React. Join events, earn HVTs, and connect with extroverts near you!

## ✨ Features

### 🔐 Authentication
- **8-Step Signup Wizard**: Email verification → OTP → Personal details → Location → Password
- **Secure Login**: Email and password authentication
- **Data Persistence**: User data stored in localStorage
- **Logout Functionality**: Clean logout with data retention

### 🎯 Dashboard
- **Club Membership**: Track your club status and HVTs progress
- **Progress Bar**: Visual representation of HVTs to Golden Club
- **Event Cards**: Browse events with detailed information
- **Search & Filter**: Find events by name, type, or location

### 📍 Location Features
- **Location Selection**: Set your state and city during signup
- **Smart Filtering**: Events are filtered based on your location
- **Location Search**: Search for events in any city

### 🔔 Notifications
- **Join Events**: Instantly join events with one click
- **Smart Reminders**: Get notified about upcoming events (1-3 days)
- **Event Details**: Click notifications to view event details

### 👤 Profile
- **View Profile**: See all your user details
- **Edit Profile**: Update your information including location
- **Location Management**: State → City cross-field filtering
- **Logout**: Securely log out of your account

### 📱 Mobile Optimized
- **Fully Responsive**: Works on all devices
- **Touch-Friendly**: Optimized buttons and inputs
- **Adaptive Layout**: Seamless experience from mobile to desktop

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend** | React.js, Tailwind CSS |
| **State Management** | React Context API |
| **Routing** | React Router DOM |
| **Persistence** | localStorage |
| **Build Tool** | Vite |
| **Deployment** | Vercel / Netlify Ready |

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/extroverts-app.git

# Navigate to project
cd extroverts-app

# Install dependencies
npm install

# Start development server
npm start

# In Production
npm run build

# Project Structure
src/
├── components/
│   ├── wizard/          # 8-step signup wizard
│   │   ├── StepEmail.jsx
│   │   ├── StepOTP.jsx
│   │   ├── StepName.jsx
│   │   ├── StepUsername.jsx
│   │   ├── StepAge.jsx
│   │   ├── StepPronouns.jsx
│   │   ├── StepLocation.jsx
│   │   └── StepInvite.jsx
│   ├── common/          # Reusable components
│   │   ├── ProgressBar.jsx
│   │   ├── Toast.jsx
│   │   └── ErrorBoundary.jsx
│   ├── Dashboard.jsx
│   ├── EventCard.jsx
│   ├── EventDetails.jsx
│   ├── Profile.jsx
│   ├── LoginPage.jsx
│   ├── LandingPage.jsx
│   ├── NotificationsPage.jsx
│   ├── TermsAgreement.jsx
│   ├── TermsPage.jsx
│   └── TermsSheet.jsx
├── context/
│   └── WizardContext.jsx
├── hooks/
│   └── useWizard.js
├── utils/
│   └── helpers.js
├── App.jsx
├── main.jsx
└── index.css

🎯 Features Demo
Demo Credentials
OTP Demo: Use 123456 for OTP verification

Password: Minimum 4 characters

Event Data
The app comes with sample events across multiple locations:

Mumbai, Maharashtra

Pune, Maharashtra

Bhiwandi, Maharashtra

Bengaluru, Karnataka

New Delhi, Delhi

📱 Responsive Breakpoints
Device	Width
Mobile	375px - 393px
Tablet	768px
Desktop	1024px+

🚀 Deployment
Deploy to Netlify
Build the project: npm run build
Drag and drop the build folder to Netlify

🤝 Contributing
This project was built as part of a Frontend Engineering Assessment. Contributions are welcome!

📝 License
MIT

🙏 Acknowledgements
Built with ❤️ using React.js

Styled with Tailwind CSS

Inspired by the Extroverts app concept

Made with ❤️ by SohamJ513