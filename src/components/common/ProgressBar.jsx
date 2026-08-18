import { useWizard } from '../../context/WizardContext';

const steps = [
  { name: 'Email', icon: '✉️' },
  { name: 'OTP', icon: '🔐' },
  { name: 'Name', icon: '👤' },
  { name: 'Username', icon: '@' },
  { name: 'Age', icon: '🎂' },
  { name: 'Pronouns', icon: '🏷️' },
  { name: 'Location', icon: '📍' },
  { name: 'Invite', icon: '🎁' }
];

export default function ProgressBar() {
  const { currentStep } = useWizard();

  return (
    <div className="w-full max-w-md mx-auto mb-6">
      <div className="relative flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 relative z-10
              ${index < currentStep ? 'bg-green-500 text-white' : 
                index === currentStep ? 'bg-purple-600 text-white shadow-lg ring-2 ring-purple-500/50' : 
                'bg-gray-700 text-gray-400'}
            `}>
              {index < currentStep ? '✓' : step.icon}
            </div>
            <span className={`
              text-[8px] font-medium mt-1 transition-colors duration-300 whitespace-nowrap
              ${index <= currentStep ? 'text-purple-400' : 'text-gray-500'}
            `}>
              {step.name}
            </span>
            {index < steps.length - 1 && (
              <div className={`
                absolute h-0.5 top-4
                ${index < currentStep ? 'bg-green-500' : 'bg-gray-700'}
              `} 
              style={{ 
                left: 'calc(50% + 16px)', 
                right: 'calc(50% + 16px)',
                transform: 'translateY(-50%)'
              }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}