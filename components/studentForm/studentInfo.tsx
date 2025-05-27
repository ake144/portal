'use client';

import { useStudentFormStore } from "@/store/studentFormStore";
import { useEffect, useState } from "react";

export default function StudentInfo() {
    
    const {StudentFullInfo, setStudentFullInfo} = useStudentFormStore();
    const [error, setError] = useState<string | null>(null);
    

    // Auto-fill from DB (mock example)
    useEffect(() => {
        async function fetchStudentData() {
            const mockData = {
                student_id: 'AUTO-GENERATED-ID',
                firstName: 'John',
                department_id: 'selected_department_id'
            };
            setStudentFullInfo((prev: typeof StudentFullInfo) => ({
                ...prev,
                ...mockData
            }));
        }

        fetchStudentData();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setStudentFullInfo((prev: typeof StudentFullInfo) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        try{

        }
        catch(error) {
            setError('An error occurred while submitting the form. Please try again.');
            console.error('Form submission error:', error);
        }
        


    
    return(


       )
    }



