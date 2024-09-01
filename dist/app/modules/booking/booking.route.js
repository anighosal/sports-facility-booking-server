"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoutes = void 0;
const express_1 = require("express");
const IsAuthenticate_1 = require("../../middlewares/IsAuthenticate");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const booking_validation_1 = __importDefault(require("./booking.validation"));
const booking_controller_1 = require("./booking.controller");
const router = (0, express_1.Router)();
router.post('/', IsAuthenticate_1.IsAuthenticate.auth, IsAuthenticate_1.IsAuthenticate.userOnly, (0, validateRequest_1.default)(booking_validation_1.default), booking_controller_1.BookingControllers.createBooking);
router.get('/', IsAuthenticate_1.IsAuthenticate.auth, IsAuthenticate_1.IsAuthenticate.adminOnly, booking_controller_1.BookingControllers.getAllBookings);
router.get('/user', IsAuthenticate_1.IsAuthenticate.auth, IsAuthenticate_1.IsAuthenticate.userOnly, booking_controller_1.BookingControllers.getUserBookings);
router.get('/user', IsAuthenticate_1.IsAuthenticate.auth, IsAuthenticate_1.IsAuthenticate.userOnly, booking_controller_1.BookingControllers.getUserBookings);
router.delete('/:id', IsAuthenticate_1.IsAuthenticate.auth, IsAuthenticate_1.IsAuthenticate.userOnly, booking_controller_1.BookingControllers.cancelBookingByUser);
router.get('/check-availability', booking_controller_1.BookingControllers.checkAvailability);
exports.BookingRoutes = router;
