import { Router } from 'express';
import { adminRoutes } from '../modules/admin/admin.route';
import { BookingRoutes } from '../modules/booking/booking.route';
import { facilityRoutes } from '../modules/facility/facility.route';
import { UserRoutes } from '../modules/user/user.route';

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
    path: '/create-admin',
    route: adminRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
