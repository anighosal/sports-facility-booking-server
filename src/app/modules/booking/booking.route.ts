import { Router } from 'express';

import { IsAuthenticate } from '../../middlewares/IsAuthenticate';
import validateRequest from '../../middlewares/validateRequest';
import { BookingControllers } from './booking.controller';
import createBookingValidationSchema from './booking.validation';

const router = Router();

router.post(
  '/',
  IsAuthenticate.auth,
  IsAuthenticate.userOnly,
  validateRequest(createBookingValidationSchema),
  BookingControllers.createBooking,
);
router.get(
  '/',
  IsAuthenticate.auth,
  IsAuthenticate.adminOnly,
  BookingControllers.getAllBookings,
);
router.get(
  '/user',
  IsAuthenticate.auth,
  IsAuthenticate.userOnly,
  BookingControllers.getUserBookings,
);
router.get(
  '/user/:id',
  IsAuthenticate.auth,
  IsAuthenticate.userOnly,
  BookingControllers.getUserBookingsById,
);

router.delete(
  '/:id',
  IsAuthenticate.auth,
  IsAuthenticate.userOnly,
  BookingControllers.cancelBookingByUser,
);

router.get('/check-availability', BookingControllers.checkAvailability);

export const BookingRoutes = router;
