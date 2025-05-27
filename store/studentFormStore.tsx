// stores/student-form-store.ts
import { EmploymentHistoryType, ParentInfoType, PastSecondarySchoolType, SchoolLeavingExamsType, SecondarySchoolInfoType, StudentFullInfo } from '@/utils/typeSchema';
import { create } from 'zustand';

type FormState = {
  personalInfo: StudentFullInfo;
  contactInfo: StudentFullInfo;
  academicInfo: {
    secondary: SecondarySchoolInfoType;
    exams: SchoolLeavingExamsType[];
    pastSchools: PastSecondarySchoolType[];
  };
  familyInfo: ParentInfoType[];
  employmentHistory: EmploymentHistoryType[];
  setPersonalInfo: (data: StudentFullInfo) => void;
  setContactInfo: (data: StudentFullInfo) => void;
  setAcademicInfo: (data: {
        secondary: SecondarySchoolInfoType;
        exams: SchoolLeavingExamsType[];
        pastSchools: PastSecondarySchoolType[];
    }) => void;
    setFamilyInfo: (data: ParentInfoType[]) => void;
    setEmploymentHistory: (data: EmploymentHistoryType[]) => void;
   
};

export const useStudentFormStore = create<FormState>((set) => ({
  personalInfo: {} as StudentFullInfo,
  contactInfo: {} as StudentFullInfo,
  academicInfo: {
    secondary: {} as SecondarySchoolInfoType,
    exams: [],
    pastSchools: []
  },
  familyInfo: [],
  employmentHistory: [],
  setPersonalInfo: (data) => set({ personalInfo: data }),
  setContactInfo: (data) => set({ contactInfo: data }),
  setAcademicInfo: (data) => set({ academicInfo: data }),
  setFamilyInfo: (data) => set({ familyInfo: data }),
  setEmploymentHistory: (data) => set({ employmentHistory: data }),
}));