"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingServices = exports.checkAvailabilityBookingsDB = void 0;
const mongoose_1 = require("mongoose");
const booking_model_1 = require("./booking.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const facility_model_1 = __importDefault(require("../facility/facility.model"));
const http_status_1 = __importDefault(require("http-status"));
const createNewBookingIntoDB = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, startTime, endTime, facility } = payload;
    const ExistedFacility = yield facility_model_1.default.findById(facility);
    if (!ExistedFacility || ExistedFacility.isDeleted) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Facility not found');
    }
    const pricePerHour = ExistedFacility.pricePerHour;
    const startDate = new Date(date + 'T' + startTime);
    const endDate = new Date(date + 'T' + endTime);
    const durationInHours = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
    const payableAmount = durationInHours * pricePerHour;
    const conflictingBooking = yield booking_model_1.Booking.findOne({
        facility: new mongoose_1.Types.ObjectId(facility),
        date,
        startTime: { $lt: endTime },
        endTime: { $gt: startTime },
    });
    if (conflictingBooking) {
        throw new Error('The facility is unavailable during the requested time slot.');
    }
    const result = yield booking_model_1.Booking.create({
        facility,
        date,
        startTime,
        endTime,
        user: userId,
        payableAmount,
    });
    return result;
});
const getAllBookingsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const bookings = yield booking_model_1.Booking.find().populate('facility').populate('user');
    if (!bookings) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to Find Bookings ');
    }
    return bookings;
});
const getUserBookingsFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const bookings = yield booking_model_1.Booking.find({ user: userId }).populate('facility');
    if (!bookings) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to Find Bookings ');
    }
    return bookings;
});
const cancelBookingFromBookingDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield booking_model_1.Booking.findByIdAndUpdate(id, { isBooked: 'canceled' }, { new: true }).populate('facility');
    if (!booking) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Booking data not found');
    }
    return booking;
});
const checkAvailabilityBookingsDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { date } = payload;
    const bookingDate = date || new Date().toISOString().split('T')[0];
    const availabilityBooking = yield booking_model_1.Booking.find({ date: bookingDate }, { startTime: 1, endTime: 1, _id: 0 });
    return availabilityBooking;
});
exports.checkAvailabilityBookingsDB = checkAvailabilityBookingsDB;
exports.BookingServices = {
    createNewBookingIntoDB,
    getAllBookingsFromDB,
    getUserBookingsFromDB,
    cancelBookingFromBookingDB,
    checkAvailabilityBookingsDB: exports.checkAvailabilityBookingsDB,
};
