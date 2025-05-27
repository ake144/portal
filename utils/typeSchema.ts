import { count } from 'console';
import { em } from 'framer-motion/client';
import {z} from 'zod';
import { de, fa, pl } from 'zod/v4/locales';

export const StudentSchema = z.object({
    id: z.string(),
    firstName: z.string(),
    middleName: z.string().optional(),
    lastName: z.string(),
    gender: z.enum(['MALE', 'FEMALE']),
    department: z.string(),
});


export type Student = z.infer<typeof StudentSchema>;


export const FullInfo= z.object({
    student_id: z.string(),
    student_temp_id: z.string(),
    firstName: z.string(),
    fatherName: z.string().optional(),
    grandFather_Name: z.string(),
    sex: z.enum(['M', 'F']),
    nationality: z.string(),
    phone_Number: z.string().optional(),
    email: z.string().email().optional(),

    place_of_birth_town: z.string().optional(),
    place_of_birth_zone: z.string().optional(),
    place_of_birth_region: z.string().optional(),
   
    date_of_birth: z.string(),
    address_kebele: z.string().optional(),
    address_woreda: z.string().optional(),
    address_zone: z.string().optional(),
    address_region: z.string().optional(),
    address_town: z.string().optional(),


    phone_home: z.string().optional(),
    phone_mobile: z.string(),
    phone_office: z.string().optional(),

    department_id: z.string(),
    program_id: z.string(),
    admission_type_id: z.string(),

    registration_date: z.string(),
    MaritalStatus: z.enum(['SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED']),
   })

export type StudentFullInfo = z.infer<typeof FullInfo>;

export const parentInfo = z.object({
    id: z.string(),
    student_id: z.string(),
    parent_type: z.enum(['FATHER', 'MOTHER', 'GUARDIAN']),
    full_name: z.string(),
    occupation: z.string().optional(),
    education_level: z.string().optional(),
    address_house_no: z.string().optional(),
    address_kebele: z.string().optional(),
    address_woreda: z.string().optional(),
    address_zone: z.string().optional(),
    address_region: z.string().optional(),
    phone: z.string().optional(),
    po_box: z.string().optional(),
})

export type ParentInfoType = z.infer<typeof parentInfo>;


export const SecondarySchoolInfo = z.object({
    id: z.string(),
    student_id: z.string(),
    school_name: z.string(),
    town: z.string().optional(),
    year_from: z.date(),
    year_to: z.date(),
    last_grade_completed:z.enum(['9', '10', '11', '12']),
})

export type SecondarySchoolInfoType = z.infer<typeof SecondarySchoolInfo>;



export const School_Leaving_Exams = z.object({
    id: z.string(),
    student_id: z.string(),
    subject: z.string(),
    registration_no: z.string().optional(),
    year_ec: z.date(),
     grade_mark: z.number().min(0).max(100),
})


export type SchoolLeavingExamsType = z.infer<typeof School_Leaving_Exams>;



export const past_secondary_school = z.object({
    id: z.string(),
    student_id: z.string(),
    institution_name: z.string(),
    country: z.string(),
    field_of_study: z.string().optional(),
    qualification: z.string().optional(),
    year_from: z.date(),
    year_to: z.date(),
    cumulative_gpa: z.number().min(0).max(4.0).optional(),
    credits_accumulated: z.number().min(0).optional(),
    completed: z.enum(['YES', 'NO']),
})

export type PastSecondarySchoolType = z.infer<typeof past_secondary_school>;



export const EmploymentHistory = z.object({
    id: z.string(),
    student_id: z.string(),
    is_current: z.boolean(),
    type_of_job: z.string().optional(),
    employer: z.string().optional(),
    mailing_address: z.string().optional(),
    telephone:z.string().optional(),
    sevice_years_from: z.date().optional(),
    service_years_to: z.date().optional(),
});
export type EmploymentHistoryType = z.infer<typeof EmploymentHistory>;


