// components/students/forms/PersonalInfoForm.tsx
'use client';
import { useStudentFormStore } from '@/store/studentFormStore';
import { StudentFullInfo } from '@/utils/typeSchema';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { FullInfo } from '@/utils/typeSchema';

export default function PersonalInfoForm({ nextStep }: { nextStep: () => void }) {
  const { personalInfo, setPersonalInfo } = useStudentFormStore();
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Auto-fill from DB (mock example)
  useEffect(() => {
    async function fetchStudentData() {
      const mockData: Partial<StudentFullInfo> = {
        student_id: `STD-${Math.floor(1000 + Math.random() * 9000)}`,
        department_id: 'animal_health',
        registration_date: new Date().toISOString().split('T')[0],
        sex: 'M',
        MaritalStatus: 'SINGLE',
        nationality: 'Ethiopian'
      };
      setPersonalInfo({ ...personalInfo, ...mockData });
    }
    fetchStudentData();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      FullInfo.parse(personalInfo);
      nextStep();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          newErrors[err.path[0]] = err.message;
        });
        setErrors(newErrors);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPersonalInfo({ ...personalInfo, [name]: value });
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto p-6 space-y-8">
      {/* Student ID and Registration Date */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Student ID</label>
          <input
            type="text"
            name="student_id"
            value={personalInfo.student_id}
            readOnly
            className="w-full p-2.5 border rounded-md bg-gray-100"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Registration Date</label>
          <input
            type="date"
            name="registration_date"
            value={personalInfo.registration_date}
            readOnly
            className="w-full p-2.5 border rounded-md bg-gray-100"
          />
        </div>
      </div>

      {/* Personal Information Section */}
      <div className="bg-gray-50 p-6 rounded-lg space-y-6">
        <h3 className="text-xl font-semibold text-gray-800">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">First Name *</label>
            <input
              name="firstName"
              value={personalInfo.firstName}
              onChange={handleChange}
              className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Father's Name</label>
            <input
              name="fatherName"
              value={personalInfo.fatherName}
              onChange={handleChange}
              className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Grandfather's Name *</label>
            <input
              name="grandFather_Name"
              value={personalInfo.grandFather_Name}
              onChange={handleChange}
              className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
            {errors.grandFather_Name && (
              <p className="text-red-500 text-sm mt-1">{errors.grandFather_Name}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Sex *</label>
            <select
              name="sex"
              value={personalInfo.sex}
              onChange={handleChange}
              className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Nationality *</label>
            <input
              name="nationality"
              value={personalInfo.nationality}
              onChange={handleChange}
              className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Date of Birth *</label>
            <input
              type="date"
              name="date_of_birth"
              value={personalInfo.date_of_birth}
              onChange={handleChange}
              className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Place of Birth Section */}
      <div className="bg-gray-50 p-6 rounded-lg space-y-6">
        <h3 className="text-xl font-semibold text-gray-800">Place of Birth</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Town</label>
            <input
              name="place_of_birth_town"
              value={personalInfo.place_of_birth_town}
              onChange={handleChange}
              className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Zone</label>
            <input
              name="place_of_birth_zone"
              value={personalInfo.place_of_birth_zone}
              onChange={handleChange}
              className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Region</label>
            <input
              name="place_of_birth_region"
              value={personalInfo.place_of_birth_region}
              onChange={handleChange}
              className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Address Information Section */}
      <div className="bg-gray-50 p-6 rounded-lg space-y-6">
        <h3 className="text-xl font-semibold text-gray-800">Current Address</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Kebele</label>
            <input
              name="address_kebele"
              value={personalInfo.address_kebele}
              onChange={handleChange}
              className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Woreda</label>
            <input
              name="address_woreda"
              value={personalInfo.address_woreda}
              onChange={handleChange}
              className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Zone</label>
            <input
              name="address_zone"
              value={personalInfo.address_zone}
              onChange={handleChange}
              className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Region</label>
            <input
              name="address_region"
              value={personalInfo.address_region}
              onChange={handleChange}
              className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Town</label>
            <input
              name="address_town"
              value={personalInfo.address_town}
              onChange={handleChange}
              className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="bg-gray-50 p-6 rounded-lg space-y-6">
        <h3 className="text-xl font-semibold text-gray-800">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Mobile Phone *</label>
            <input
              type="tel"
              name="phone_mobile"
              value={personalInfo.phone_mobile}
              onChange={handleChange}
              className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
            {errors.phone_mobile && <p className="text-red-500 text-sm mt-1">{errors.phone_mobile}</p>}
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Home Phone</label>
            <input
              type="tel"
              name="phone_home"
              value={personalInfo.phone_home}
              onChange={handleChange}
              className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={personalInfo.email}
              onChange={handleChange}
              className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Academic Information Section */}
      <div className="bg-gray-50 p-6 rounded-lg space-y-6">
        <h3 className="text-xl font-semibold text-gray-800">Academic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Department *</label>
            <select
              name="department_id"
              value={personalInfo.department_id}
              onChange={handleChange}
              className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="animal_health">Animal Health</option>
              <option value="animal_production">Animal Production</option>
              <option value="crop_production">Crop Production</option>
              <option value="cooperative_accounting">Cooperative Accounting</option>
              <option value="crop_protection">Crop Protection</option>
              <option value="natural_resources">Natural Resources Conservation</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Program ID *</label>
            <input
              name="program_id"
              value={personalInfo.program_id}
              onChange={handleChange}
              className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Admission Type *</label>
            <input
              name="admission_type_id"
              value={personalInfo.admission_type_id}
              onChange={handleChange}
              className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Marital Status Section */}
      <div className="bg-gray-50 p-6 rounded-lg space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Marital Status *</label>
          <select
            name="MaritalStatus"
            value={personalInfo.MaritalStatus}
            onChange={handleChange}
            className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="SINGLE">Single</option>
            <option value="MARRIED">Married</option>
            <option value="DIVORCED">Divorced</option>
            <option value="WIDOWED">Widowed</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-6 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Next Step →
        </button>
      </div>
    </form>
  );
}