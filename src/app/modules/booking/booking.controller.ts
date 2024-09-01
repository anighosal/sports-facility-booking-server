/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-namespace */
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BookingServices } from './booking.service';

const createBooking = catchAsync(async (req, res) => {
  if (!req.user || !req.user._id) {
    return sendResponse(res, {
      statusCode: httpStatus.UNAUTHORIZED,
      success: false,
      message: 'User not authenticated',
    });
  }
  const userId = req.user._id;
  const booking = await BookingServices.createNewBookingIntoDB(
    userId,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking created successfully',
    data: booking,
  });
});

const getAllBookings = catchAsync(async (req, res) => {
  const result = await BookingServices.getAllBookingsFromDB();

  if (result.length < 1) {
    sendResponse(res, {
      statusCode: 404,
      success: false,
      message: 'No Data Found',
      data: result,
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bookings retrieved successfully',
    data: result,
  });
});

const getUserBookings = catchAsync(async (req, res) => {
  if (!req.user || !req.user._id) {
    return sendResponse(res, {
      statusCode: httpStatus.UNAUTHORIZED,
      success: false,
      message: 'User not authenticated',
    });
  }
  const userId = req.user._id;

  const result = await BookingServices.getUserBookingsFromDB(userId);

  if (result.length < 1) {
    sendResponse(res, {
      statusCode: 404,
      success: false,
      message: 'No Data Found',
      data: result,
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bookings retrieved successfully',
    data: result,
  });
});
const cancelBookingByUser = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await BookingServices.cancelBookingFromBookingDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cancel Booking successfully',
    data: result,
  });
});

export const checkAvailability = catchAsync(async (req, res) => {
  const { date } = req.query;

  const result = await BookingServices.checkAvailabilityBookingsDB({
    date: date as string,
  });

  if (result.length < 1) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: 'No Data Found',
      data: [],
    });
  }

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Availability checked successfully',
    data: result,
  });
});
export const BookingControllers = {
  createBooking,
  getAllBookings,
  getUserBookings,
  cancelBookingByUser,
  checkAvailability,
};
