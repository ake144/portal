// AcademicBackgroundForm.tsx
'use client';
import { useStudentFormStore } from '@/store/studentFormStore';
import { TranscriptSchema, PastSecondarySchoolSchema } from '@/utils/typeSchema';
import { a } from 'framer-motion/client';
import { useState } from 'react';
import { z } from 'zod';

export default function AcademicBackgroundForm({ nextStep, prevStep }: { 
  nextStep: () => void; 
  prevStep: () => void 
}) {
  const { academicInfo, setAcademicInfo } = useStudentFormStore();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Validate transcripts
      const validatedTranscripts = TranscriptSchema.parse(academicInfo.transcript);
      
      // Validate past schools
      const validatedPastSchools = PastSecondarySchoolSchema.array().parse(academicInfo.pastSchools);

      setAcademicInfo({
        transcript: academicInfo.transcript,
        pastSchools: academicInfo.pastSchools
      });
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

  const handleFileUpload = async (field: string, files: FileList) => {
    const paths = await uploadFiles(files); // Implement your file upload logic
    setAcademicInfo({
      ...academicInfo,
      transcript: { ...academicInfo.transcript, [field]: paths.join(',') }
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8">
      <h2 className="text-2xl font-semibold text-gray-800">Academic Background</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Transcript Section */}
        <div className="bg-gray-50 p-6 rounded-lg space-y-6">
          <h3 className="text-lg font-semibold text-gray-700">Secondary School Transcripts</h3>
          
          {/* Grade 9-12 File Uploads */}
          {[9, 10, 11, 12].map(grade => (
            <div key={grade} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Grade {grade} Transcript *
              </label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => handleFileUpload(`grade_${grade}_file_path`, e.target.files!)}
                className="w-full p-2.5 border rounded-md"
              />
              {errors[`grade_${grade}_file_path`] && (
                <p className="text-red-500 text-sm mt-1">{errors[`grade_${grade}_file_path`]}</p>
              )}
            </div>
          ))}

          {/* Exam Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">English Grade *</label>
                <input
                type="number"
                value={academicInfo.transcript.english_grade}
                onChange={(e) => setAcademicInfo({
                                  ...academicInfo,
                                  transcript: { ...academicInfo.transcript, english_grade: parseInt(e.target.value) }
                                })}
                          
                className="w-full p-2.5 border rounded-md"
                min="0"
                max="100"
                />
              {errors.english_grade && (
                <p className="text-red-500 text-sm mt-1">{errors.english_grade}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Math Grade *</label>
              <input
                type="number"
                value={academicInfo.transcript.maths_grade}
                onChange={(e) => setAcademicInfo({
                  ...academicInfo,
                  transcript: { ...academicInfo.transcript, maths_grade: parseInt(e.target.value) }
                })}
                className="w-full p-2.5 border rounded-md"
                min="0"
                max="100"
              />
              {errors.maths_grade && (
                <p className="text-red-500 text-sm mt-1">{errors.maths_grade}</p>
              )}
            </div>
          </div>
        </div>

        {/* Post-Secondary Education Section */}
        <div className="bg-gray-50 p-6 rounded-lg space-y-6">
          <h3 className="text-lg font-semibold text-gray-700">Post-Secondary Education</h3>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Additional Transcripts (PDF/DOC)
            </label>
            <input
              type="file"
              multiple
              accept=".pdf,.doc,.docx"
              onChange={async (e) => {
                const files = e.target.files;
                if (files) {
                  const paths = await uploadFiles(files);
                  // If you want to add file_paths to the first pastSchool entry:
                  setAcademicInfo({
                    ...academicInfo,
                    pastSchools: academicInfo.pastSchools.map((school, idx) =>
                      idx === 0 ? { ...school, file_paths: paths.join(',') } : school
                    )
                  });
                }
              }}
              className="w-full p-2.5 border rounded-md"
            />
            {errors.file_paths && (
              <p className="text-red-500 text-sm mt-1">{errors.file_paths}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Uploaded Files:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {academicInfo.pastSchools.map((school, schoolIdx) =>
                school.file_paths
                  ? school.file_paths.split(',').map((path, fileIdx) => (
                      <div key={`${schoolIdx}-${fileIdx}`} className="p-2 bg-white rounded border">
                        {path.split('/').pop()}
                      </div>
                    ))
                  : null
              )}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={prevStep}
            className="px-6 py-2.5 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            ← Back
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Next Step →
          </button>
        </div>
      </form>
    </div>
  );
}

// Example file upload utility function
async function uploadFiles(files: FileList): Promise<string[]> {
  const paths = [];
  // Implement actual file upload logic here
  for (let i = 0; i < files.length; i++) {
    paths.push(`/storage/uploads/${files[i].name}`);
  }
  return paths;
}