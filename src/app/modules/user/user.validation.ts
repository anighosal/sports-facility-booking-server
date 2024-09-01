import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, 'Name is required'),
    email: z.string().email('Invalid email').trim(),
    password: z.string().min(1, 'Password is required'),
    phone: z.string().trim().min(1, 'Phone is required'),
    role: z.enum(['admin', 'user']),
    address: z.string().min(1, 'Address is required'),
  }),
});

const loginUserValidationSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email').trim(),
    password: z.string().min(1, 'Password is required'),
  }),
});

export const userValidations = {
  createUserValidationSchema,
  loginUserValidationSchema,
};
