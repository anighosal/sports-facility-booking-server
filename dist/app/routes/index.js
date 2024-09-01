"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const facility_route_1 = require("../modules/facility/facility.route");
const booking_route_1 = require("../modules/booking/booking.route");
const checkAvailability_routes_1 = require("../modules/booking/checkAvailability.routes");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/auth',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/facility',
        route: facility_route_1.facilityRoutes,
    },
    {
        path: '/bookings',
        route: booking_route_1.BookingRoutes,
    },
    {
        path: '/check-availability',
        route: checkAvailability_routes_1.CheckAvailabilityRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
