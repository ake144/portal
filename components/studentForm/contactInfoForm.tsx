import { useStudentFormStore } from "@/store/studentFormStore";
import { z } from 'zod';
import { useState } from 'react';
import { emergencyContact } from '@/utils/typeSchema';

const ContactInfoForm = ({ nextStep, prevStep }: { nextStep: () => void; prevStep: () => void }) => {
  const { contactInfo, setContactInfo } = useStudentFormStore();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Validate using emergencyContact schema
    //   const validatedData = emergencyContact.extend({
    //     student_id: z.string().min(1, "Student ID is required")
    //   }).parse(contactInfo);
      
      setContactInfo(contactInfo);
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
    setContactInfo({ ...contactInfo, [name]: value });
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8">
      <h2 className="text-2xl font-semibold text-gray-800">Emergency Contact Information</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Primary Contact Details */}
        <div className="bg-gray-50 p-6 rounded-lg space-y-6">
          <h3 className="text-lg font-semibold text-gray-700">Primary Contact Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Full Name *</label>
              <input
                name="full_name"
                value={contactInfo.full_name || ''}
                onChange={handleChange}
                className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              {errors.full_name && (
                <p className="text-red-500 text-sm mt-1">{errors.full_name}</p>
              )}
            </div>

            {/* <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Relationship *</label>
              <select
                name="relationship"
                value={contactInfo.relationship || ''}
                onChange={handleChange}
                className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Relationship</option>
                <option value="Parent">Parent</option>
                <option value="Sibling">Sibling</option>
                <option value="Guardian">Guardian</option>
                <option value="Other">Other</option>
              </select>
              {errors.relationship && (
                <p className="text-red-500 text-sm mt-1">{errors.relationship}</p>
              )}
            </div> */}
          </div>
        </div>

        {/* Contact Numbers */}
        <div className="bg-gray-50 p-6 rounded-lg space-y-6">
          <h3 className="text-lg font-semibold text-gray-700">Contact Numbers</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Mobile *</label>
              <input
                type="tel"
                name="phone_mobile"
                value={contactInfo.phone_mobile || ''}
                onChange={handleChange}
                className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              {errors.phone_mobile && (
                <p className="text-red-500 text-sm mt-1">{errors.phone_mobile}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Home Phone</label>
              <input
                type="tel"
                name="phone_home"
                value={contactInfo.phone_home || ''}
                onChange={handleChange}
                className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Office Phone</label>
              <input
                type="tel"
                name="phone_office"
                value={contactInfo.phone_office || ''}
                onChange={handleChange}
                className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="bg-gray-50 p-6 rounded-lg space-y-6">
          <h3 className="text-lg font-semibold text-gray-700">Contact Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Kebele</label>
              <input
                name="address_kebele"
                value={contactInfo.address_kebele || ''}
                onChange={handleChange}
                className="w-full p-2.5 border rounded-md"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Woreda</label>
              <input
                name="address_woreda"
                value={contactInfo.address_woreda || ''}
                onChange={handleChange}
                className="w-full p-2.5 border rounded-md"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Zone</label>
              <input
                name="address_zone"
                value={contactInfo.address_zone || ''}
                onChange={handleChange}
                className="w-full p-2.5 border rounded-md"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Region</label>
              <input
                name="address_region"
                value={contactInfo.address_region || ''}
                onChange={handleChange}
                className="w-full p-2.5 border rounded-md"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Town</label>
              <input
                name="address_town"
                value={contactInfo.address_town || ''}
                onChange={handleChange}
                className="w-full p-2.5 border rounded-md"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={prevStep}
            className="px-6 py-2.5 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            ← Back
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Next Step →
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactInfoForm;