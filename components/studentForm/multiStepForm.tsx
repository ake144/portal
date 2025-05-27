// components/students/forms/MultiStepForm.tsx
'use client';
import { useState } from 'react';

import { StudentFullInfo, ParentInfoType, SecondarySchoolInfoType, SchoolLeavingExamsType, PastSecondarySchoolType, EmploymentHistoryType } from '../schemas/studentSchemas';
import { useStudentFormStore } from '@/store/studentFormStore';
import PersonalInfoForm from './personalInfoForm';

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
          data={formData.personal}
          onUpdate={(data) => setFormData(prev => ({...prev, personal: data}))}
          nextStep={nextStep}
        />
      )}
      
      {step === 2 && (
        <ContactInfoForm 
          data={formData.contact}
          onUpdate={(data) => setFormData(prev => ({...prev, contact: data}))}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      
      {step === 3 && (
        <AcademicBackgroundForm 
          data={formData.academic}
          onUpdate={(data) => setFormData(prev => ({...prev, academic: data}))}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      
      {step === 4 && (
        <FamilyInfoForm 
          data={formData.family}
          onUpdate={(data) => setFormData(prev => ({...prev, family: data}))}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      
      {step === 5 && (
        <EmploymentHistoryForm 
          data={formData.employment}
          onUpdate={(data) => setFormData(prev => ({...prev, employment: data}))}
          submit={handleSubmit}
          prevStep={prevStep}
        />
      )}
    </div>
  );
}