import { z } from 'zod'

export const requiredString = (fieldName: string) =>
  z.string().trim().min(1, `${fieldName} is required`)

export const signupSchema = z.object({
  fullName: requiredString('Full Name').max(100, 'Full name must not exceed 100 characters'),

  phoneNumber: requiredString('Phone Number')
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number must not exceed 15 digits')
    .regex(/^[0-9+\-\s()]+$/, 'Invalid phone number format'),

  email: requiredString('Email').email('Invalid email address').toLowerCase().trim(),

  password: requiredString('Password')
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password must not exceed 100 characters'),

  companyName: z
    .string()
    .max(100, 'Company name must not exceed 100 characters')
    .optional()
    .nullable(),

  isAgency: z.boolean(),
})

export const signinSchema = z.object({
  email: requiredString('Email').email('Invalid email address').toLowerCase(),
  password: requiredString('Password')
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password must not exceed 100 characters'),
})

export type SignupInput = z.infer<typeof signupSchema>
export type SigninInput = z.infer<typeof signinSchema>
