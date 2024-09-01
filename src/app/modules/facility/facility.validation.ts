import { z } from 'zod';

const createFacilityValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    pricePerHour: z.number().positive(),
    location: z.string().min(1),
  }),
});

const UpdatedFacilityValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    pricePerHour: z.number().positive().optional(),
    location: z.string().min(1).optional(),
  }),
});
export const facilityValidations = {
  createFacilityValidationSchema,
  UpdatedFacilityValidationSchema,
};
