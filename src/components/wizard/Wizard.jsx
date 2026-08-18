import { useWizard } from '../../context/WizardContext';
import StepEmail from './StepEmail';
import StepOTP from './StepOTP';
import StepName from './StepName';
import StepUsername from './StepUsername';
import StepAge from './StepAge';
import StepPronouns from './StepPronouns';
import StepLocation from './StepLocation';
import StepInvite from './StepInvite';

export default function Wizard() {
  const { currentStep } = useWizard();

  const stepComponents = [
    StepEmail,      // Step 0: Email verification first
    StepOTP,        // Step 1: OTP verification
    StepName,       // Step 2: Personal details after verification
    StepUsername,   // Step 3: Username
    StepAge,        // Step 4: Age
    StepPronouns,   // Step 5: Pronouns
    StepLocation,   // Step 6: Location
    StepInvite,     // Step 7: Invite code
  ];

  const CurrentStepComponent = stepComponents[currentStep];

  return (
    <div className="w-full min-h-screen bg-black">
      <CurrentStepComponent />
    </div>
  );
}