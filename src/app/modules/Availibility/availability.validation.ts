import { z } from 'zod';

const checkAvailabilityValidationSchema = z.object({
  date: z.string().refine(
    (value) => {
      const date = new Date(value);
      return !isNaN(date.getTime());
    },
    {
      message: 'Invalid date format. Please provide a valid ISO date.',
    },
  ),
  facility: z.string().nonempty('Facility ID is required'),
});

export default checkAvailabilityValidationSchema;
