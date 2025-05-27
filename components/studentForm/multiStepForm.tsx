// components/students/forms/MultiStepForm.tsx
'use client';
import { useState } from 'react';

import { useStudentFormStore } from '@/store/studentFormStore';
import PersonalInfoForm from './personalInfoForm';
import FamilyInfoForm from './familyInfo';
import ContactInfoForm from './contactInfoForm';
import AcademicBackgroundForm from './academicBackground';
import EmploymentHistoryForm from './employmentHistory';

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const { personalInfo, contactInfo, academicInfo, familyInfo, employmentHistory } = useStudentFormStore();
    
  const nextStep = () => setStep(prev => Math.min(prev + 1, 5));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = async () => {
    // Implement your submission logic here
    console.log('Final form data:', {
      personal: personalInfo,
      contact: contactInfo,
      academic: academicInfo,
      family: familyInfo,
      employment: employmentHistory});
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="progress-bar mb-8">{/* Add progress indicator */}</div>
      
      {step === 1 && (
        <PersonalInfoForm 
          nextStep={nextStep}
        />
      )}
      
      {step === 2 && (
        <ContactInfoForm 
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      
      {step === 3 && (
        <AcademicBackgroundForm 
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      
      {step === 4 && (
        <FamilyInfoForm 
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      
      {step === 5 && (
        <EmploymentHistoryForm 
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
   
    </div>
  );
}