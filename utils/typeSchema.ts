import {z} from 'zod';
import { fa, pl } from 'zod/v4/locales';

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
    id: z.string(),
    
    phone_Number: z.string().optional(),
    email: z.string().email().optional(),
    dateOfBirth: z.string().optional(),
    zoneOfBirth: z.string().optional(),
    woredaOfBirth: z.string().optional(),
    kebeleOfBirth: z.string().optional(),
    Address: z.string().optional(),
    zoneOfResidence: z.string().optional(),
    woredaOfResidence: z.string().optional(),
    kebeleOfResidence: z.string().optional(),
    RegionOfResidence: z.string().optional(),
    TownOfResidence: z.string().optional(),
    MaritalStatus: z.enum(['SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED']).optional(),
    EmergencyContactName: z.string().optional(),
    EmergencyContactPhone: z.string().optional(),
    EmergencyContactRelationship: z.string().optional(),
    EmergencyContactAddress: z.string().optional(),
})

export type StudentFullInfo = z.infer<typeof FullInfo>;

export const FamilyInfo = z.object({
    id: z.string(),
    fatherName: z.string().optional(),
    fatherPhone: z.string().optional(),
    fatherOccupation: z.string().optional(),
    fatherEducationLevel: z.string().optional(),
    fatherAddress: z.string().optional(),
    motherName: z.string().optional(),
    motherPhone: z.string().optional(),
    motherOccupation: z.string().optional(),
    motherEducationLevel: z.string().optional(),
    motherAddress: z.string().optional(),
});
export type FamilyInfoType = z.infer<typeof FamilyInfo>;


