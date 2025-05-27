'use client';


import { useStudentFormStore } from '@/store/studentFormStore';
import { ParentInfoType } from '@/utils/typeSchema';
import { useState } from 'react';
import { z } from 'zod';
import { parentInfo } from '@/utils/typeSchema';

export default function FamilyInfoForm({ nextStep, prevStep }: { nextStep: () => void; prevStep: () => void }) {
  const { familyInfo, setFamilyInfo } = useStudentFormStore();
  const [errors, setErrors] = useState<Record<string, string>[]>([]);

  const addParent = () => {
    setFamilyInfo([
      ...familyInfo,
      {
        id: '',
        student_id: '',
        parent_type: 'FATHER',
        full_name: '',
        occupation: '',
        education_level: '',
        address_house_no: '',
        address_kebele: '',
        address_woreda: '',
        address_zone: '',
        address_region: '',
        phone: '',
        po_box: ''
      }
    ]);
  };

  const removeParent = (index: number) => {
    const updated = familyInfo.filter((_, i) => i !== index);
    setFamilyInfo(updated);
  };

  const handleChange = (index: number, field: string, value: string) => {
    const updated = [...familyInfo];
    updated[index] = { ...updated[index], [field]: value };
    setFamilyInfo(updated);
    

    if (errors[index]?.[field]) {
      const newErrors = [...errors];
      delete newErrors[index][field];
      setErrors(newErrors);
    }
  };

  const validateAndProceed = () => {
    try {
      const validated = familyInfo.map(info => parentInfo.parse(info));
      setFamilyInfo(validated);
      nextStep();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string>[] = [];
        error.errors.forEach(err => {
          const index = Number(err.path[0]);
          newErrors[index] = { ...newErrors[index], [err.path[1]]: err.message };
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Family Information</h2>
        <button
          type="button"
          onClick={addParent}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          Add Family Member +
        </button>
      </div>

      {familyInfo.map((parent, index) => (
        <div key={index} className="bg-gray-50 p-6 rounded-lg space-y-6 mb-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-700">Family Member #{index + 1}</h3>
            <button
              type="button"
              onClick={() => removeParent(index)}
              className="text-red-600 hover:text-red-700 text-sm"
            >
              Remove
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Parent Type and Basic Info */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Relationship *</label>
              <select
                value={parent.parent_type}
                onChange={(e) => handleChange(index, 'parent_type', e.target.value)}
                className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value="FATHER">Father</option>
                <option value="MOTHER">Mother</option>
                <option value="GUARDIAN">Guardian</option>
              </select>
              {errors[index]?.parent_type && (
                <p className="text-red-500 text-sm mt-1">{errors[index]?.parent_type}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Full Name *</label>
              <input
                type="text"
                value={parent.full_name}
                onChange={(e) => handleChange(index, 'full_name', e.target.value)}
                className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              {errors[index]?.full_name && (
                <p className="text-red-500 text-sm mt-1">{errors[index]?.full_name}</p>
              )}
            </div>

            {/* Occupation and Education */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Occupation</label>
              <input
                type="text"
                value={parent.occupation}
                onChange={(e) => handleChange(index, 'occupation', e.target.value)}
                className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Education Level</label>
              <input
                type="text"
                value={parent.education_level}
                onChange={(e) => handleChange(index, 'education_level', e.target.value)}
                className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Address Information */}
            <div className="md:col-span-2 border-t pt-4">
              <h4 className="text-md font-semibold text-gray-700 mb-4">Address Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">House Number</label>
                  <input
                    type="text"
                    value={parent.address_house_no}
                    onChange={(e) => handleChange(index, 'address_house_no', e.target.value)}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Kebele</label>
                  <input
                    type="text"
                    value={parent.address_kebele}
                    onChange={(e) => handleChange(index, 'address_kebele', e.target.value)}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Woreda</label>
                  <input
                    type="text"
                    value={parent.address_woreda}
                    onChange={(e) => handleChange(index, 'address_woreda', e.target.value)}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Zone</label>
                  <input
                    type="text"
                    value={parent.address_zone}
                    onChange={(e) => handleChange(index, 'address_zone', e.target.value)}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Region</label>
                  <input
                    type="text"
                    value={parent.address_region}
                    onChange={(e) => handleChange(index, 'address_region', e.target.value)}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="md:col-span-2 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    type="tel"
                    value={parent.phone}
                    onChange={(e) => handleChange(index, 'phone', e.target.value)}
                    className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                  {errors[index]?.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors[index]?.phone}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">P.O. Box</label>
                  <input
                    type="text"
                    value={parent.po_box}
                    onChange={(e) => handleChange(index, 'po_box', e.target.value)}
                    className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={prevStep}
          className="px-6 py-2.5 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={validateAndProceed}
          className="px-6 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Next Step →
        </button>
      </div>
    </div>
  );
}