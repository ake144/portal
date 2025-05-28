'use client';

import { useState, useEffect, useRef } from 'react';
import { Student, StudentSchema } from '@/utils/typeSchema';
import z from 'zod';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"



export function StudentForm() {
  const [students, setStudents] = useState<Student[]>([]);
  const [formData, setFormData] = useState<Student>({
    id: '',
    firstName: '',
    middleName: '',
    lastName: '',
    gender: 'MALE',
    department: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [inputValue, setInputValue] = useState('');
  const [filteredDepartments, setFilteredDepartments] = useState<
    { value: string; label: string }[]
  >([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setFilteredDepartments([]);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const DepartmentList = [
    { value: 'animal_health', label: 'Animal Health' },
    { value: 'animal_production', label: 'Animal Production' },
    { value: 'crop_production', label: 'Crop Production' },
    { value: 'cooperative_accounting', label: 'Cooperative Accounting' },
    { value: 'crop_protection', label: 'Crop Protection' },
    { value: 'natural_resources', label: 'Natural Resources Conservation and Development' },
  ];

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setFormData(prev => ({ ...prev, department: value }));

    const filtered = DepartmentList.filter(option =>
      option.label.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredDepartments(filtered);
  };

  const handleOptionClick = (option: { value: string; label: string }) => {
    setInputValue(option.label);
    setFormData(prev => ({ ...prev, department: option.value }));
    setFilteredDepartments([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validatedData = StudentSchema.parse(formData);
      setStudents(prev => [...prev, validatedData]);
    setFormData(prev=> ({
      ...prev,
      id: '',
      firstName: '',
      middleName: '',
      lastName: '',
      gender: 'MALE',
    }));

      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/tempStudents`, {
      method: 'POST',
      body: JSON.stringify(validatedData), 
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error('Failed to post data');
    }

    // Refetch the full list of students from DB
    const updatedRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/tempStudents`);
    if (!updatedRes.ok) {
      throw new Error('Failed to fetch updated students list');
    }

        const updatedStudents = await updatedRes.json();
         setStudents(updatedStudents); // Update state with latest data

        const selectedDepartment = DepartmentList.find(
       dept => dept.value === validatedData.department
    );
      setInputValue(selectedDepartment?.label || '');
      
      setErrors({});
     

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
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  return (
    <div className='flex w-full h-auto  p-8 gap-8'>
      {/* Student Table */}
      <div className='flex-1 bg-white rounded-lg shadow-md p-6'>
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Registered Students</h2>
        <Table className="border-collapse w-full">
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="p-3 text-sm font-semibold text-gray-600">ID</TableHead>
              <TableHead className="p-3 text-sm font-semibold text-gray-600">First Name</TableHead>
              <TableHead className="p-3 text-sm font-semibold text-gray-600">Middle Name</TableHead>
              <TableHead className="p-3 text-sm font-semibold text-gray-600">Last Name</TableHead>
              <TableHead className="p-3 text-sm font-semibold text-gray-600">Department</TableHead>
              <TableHead className="p-3 text-sm font-semibold text-gray-600">Gender</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student, index) => (
              <TableRow key={index} className="hover:bg-gray-50">
                <TableCell className="p-3 text-sm text-gray-600">{student.id}</TableCell>
                <TableCell className="p-3 text-sm text-gray-600">{student.firstName}</TableCell>
                <TableCell className="p-3 text-sm text-gray-600">{student.middleName}</TableCell>
                <TableCell className="p-3 text-sm text-gray-600">{student.lastName}</TableCell>
                <TableCell className="p-3 text-sm text-gray-600">
                  {DepartmentList.find(d => d.value === student.department)?.label}
                </TableCell>
                <TableCell className="p-3 text-sm text-gray-600">{student.gender}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Registration Form */}
      <div className="w-96 bg-white rounded-lg shadow-md p-6 h-fit">
        <h1 className="text-xl font-semibold text-gray-800 mb-6">Student Registration</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                name="firstName"
                value={formData.firstName}
                required
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
              <input
                name="middleName"

                value={formData.middleName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <div className="flex gap-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="gender"
                    required
                    value="MALE"
                    checked={formData.gender === 'MALE'}
                    onChange={handleChange}
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span className="text-gray-700">Male</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="gender"
                    required
                    value="FEMALE"
                    checked={formData.gender === 'FEMALE'}
                    onChange={handleChange}
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span className="text-gray-700">Female</span>
                </label>
              </div>
            </div>

            <div className="relative" ref={dropdownRef}>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <div className="relative">
              <input
                type="text"
                value={inputValue}
                required
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search department..."
              />
              {filteredDepartments.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto">
                  {filteredDepartments.map((dept) => (
                    <li
                      key={dept.value}
                      onClick={() => handleOptionClick(dept)}
                      className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-gray-700 transition-colors"
                    >
                      {dept.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department}</p>}
          </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Register Student
          </button>
        </form>
      </div>
    </div>
  );
}