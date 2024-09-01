import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { facilityRoutes } from '../modules/facility/facility.route';
import { BookingRoutes } from '../modules/booking/booking.route';
import { CheckAvailabilityRoutes } from '../modules/booking/checkAvailability.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: UserRoutes,
  },
  {
    path: '/facility',
    route: facilityRoutes,
  },
  {
    path: '/bookings',
    route: BookingRoutes,
  },
  {
    path: '/check-availability',
    route: CheckAvailabilityRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
