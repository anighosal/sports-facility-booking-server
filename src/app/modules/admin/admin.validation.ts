import { z } from 'zod';

export const createAdminValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, 'Name should be at least 2 characters long')
      .max(50, 'Name should be at most 50 characters long'),
    email: z.string().email('Invalid email format'),
    password: z
      .string()
      .min(6, 'Password should be at least 6 characters long'),
    phone: z
      .string()
      .min(10, 'Phone number should be at least 10 digits long')
      .max(15, 'Phone number should be at most 15 digits long'),
    address: z
      .string()
      .min(5, 'Address should be at least 5 characters long')
      .max(100, 'Address should be at most 100 characters long'),
    role: z.enum(['admin']),
  }),
});

export const adminValidations = {
  createAdminValidationSchema,
};
