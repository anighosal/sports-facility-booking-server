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
exports.BookingControllers = exports.checkAvailability = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-namespace */
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const booking_service_1 = require("./booking.service");
const createBooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user || !req.user._id) {
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.UNAUTHORIZED,
            success: false,
            message: 'User not authenticated',
        });
    }
    const userId = req.user._id;
    const booking = yield booking_service_1.BookingServices.createNewBookingIntoDB(userId, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Booking created successfully',
        data: booking,
    });
}));
const getAllBookings = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_service_1.BookingServices.getAllBookingsFromDB();
    if (result.length < 1) {
        (0, sendResponse_1.default)(res, {
            statusCode: 404,
            success: false,
            message: 'No Data Found',
            data: result,
        });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Bookings retrieved successfully',
        data: result,
    });
}));
const getUserBookings = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user || !req.user._id) {
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.UNAUTHORIZED,
            success: false,
            message: 'User not authenticated',
        });
    }
    const userId = req.user._id;
    const result = yield booking_service_1.BookingServices.getUserBookingsFromDB(userId);
    if (result.length < 1) {
        (0, sendResponse_1.default)(res, {
            statusCode: 404,
            success: false,
            message: 'No Data Found',
            data: result,
        });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Bookings retrieved successfully',
        data: result,
    });
}));
const cancelBookingByUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield booking_service_1.BookingServices.cancelBookingFromBookingDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Cancel Booking successfully',
        data: result,
    });
}));
exports.checkAvailability = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date } = req.query;
    const result = yield booking_service_1.BookingServices.checkAvailabilityBookingsDB({
        date: date,
    });
    if (result.length < 1) {
        (0, sendResponse_1.default)(res, {
            statusCode: 404,
            success: false,
            message: 'No Data Found',
            data: result,
        });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Availability checked successfully',
        data: result,
    });
}));
exports.BookingControllers = {
    createBooking,
    getAllBookings,
    getUserBookings,
    cancelBookingByUser,
    checkAvailability: exports.checkAvailability,
};
