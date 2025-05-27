// components/students/forms/AcademicBackgroundForm.tsx
'use client';
import { PastSecondarySchoolType, SchoolLeavingExamsType, SecondarySchoolInfoType } from '@/utils/typeSchema';
import { useState } from 'react';

interface AcademicBackgroundFormProps {
  data: {
    secondary: SecondarySchoolInfoType;
    exams: SchoolLeavingExamsType[];
    pastSchools: PastSecondarySchoolType[];
  };
  onUpdate: (data: any) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export default function AcademicBackgroundForm({ data, onUpdate, nextStep, prevStep }: AcademicBackgroundFormProps) {
  const [formData, setFormData] = useState(data);
  

  // Implement form fields for academic background
  // Add validation and submission logic

  return (
    <form>
      {/* Secondary school info */}
      {/* School leaving exams */}
      {/* Past schools */}
      <div className="flex justify-between">
        <button onClick={prevStep}>Back</button>
        <button onClick={nextStep}>Next</button>
      </div>
    </form>
  );
}