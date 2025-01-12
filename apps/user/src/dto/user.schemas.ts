import { z } from 'zod';

export const CreateUserSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(/(?=.*[A-Z])/, 'Password must contain at least one uppercase letter')
    .regex(/(?=.*[0-9])/, 'Password must contain at least one number'),
  email: z.string().email('Invalid email address'),
  phone: z
    .string()
    .regex(/^\+\d+$/, 'Phone number must start with a + followed by digits')
    .min(7, 'Phone number must be at least 7 characters long')
    .max(15, 'Phone number must not exceed 15 characters'),
});

export const UpdateUserSchema = CreateUserSchema.partial();
