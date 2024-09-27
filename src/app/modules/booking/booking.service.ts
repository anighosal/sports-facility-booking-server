import httpStatus from 'http-status';
import { Types } from 'mongoose';
import AppError from '../../errors/AppError';
import Facility from '../facility/facility.model';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';

const findBookingsByFacilityAndDate = async (
  date: Date,
): Promise<TBooking[]> => {
  return Booking.find({ date }).populate('facility').populate('user');
};

const createNewBookingIntoDB = async (
  userId: string | Types.ObjectId,
  payload: TBooking,
) => {
  const { date, startTime, endTime, facility } = payload;

  const ExistedFacility = await Facility.findById(facility);

  if (!ExistedFacility || ExistedFacility.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'Facility not found');
  }
  const pricePerHour = ExistedFacility.pricePerHour;
  const startDate = new Date(date + 'T' + startTime);
  const endDate = new Date(date + 'T' + endTime);
  const durationInHours =
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
  const payableAmount = durationInHours * pricePerHour;

  const conflictingBooking = await Booking.findOne({
    facility: new Types.ObjectId(facility),
    date,
    startTime: { $lt: endTime },
    endTime: { $gt: startTime },
  });

  if (conflictingBooking) {
    throw new Error(
      'The facility is unavailable during the requested time slot.',
    );
  }

  const result = await Booking.create({
    facility,
    date,
    startTime,
    endTime,
    user: userId,
    payableAmount,
  });

  return result;
};

const getAllBookingsFromDB = async () => {
  const bookings = await Booking.find().populate('facility').populate('user');

  if (!bookings) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Find Bookings ');
  }
  return bookings;
};

const getUserBookingsFromDB = async (userId: string | Types.ObjectId) => {
  const bookings = await Booking.find({ user: userId }).populate('facility');
  if (!bookings) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Find Bookings ');
  }
  return bookings;
};

const getUserBookingsByIdFromDB = async (id: string) => {
  console.log(id);
  const booking = await Booking.findById(id).populate('facility');

  if (!booking) {
    throw new AppError(httpStatus.NOT_FOUND, 'booking not found');
  }
  return booking;
};

const cancelBookingFromBookingDB = async (id: string) => {
  const booking = await Booking.findByIdAndUpdate(
    id,
    { isBooked: 'canceled' },
    { new: true },
  ).populate('facility');
  if (!booking) {
    throw new AppError(httpStatus.NOT_FOUND, 'Booking data not found');
  }
  return booking;
};

export const checkAvailabilityBookingsDB = async (payload: {
  date?: string;
}) => {
  const { date } = payload;
  const bookingDate = date || new Date().toISOString().split('T')[0];

  const bookings = await Booking.find(
    { date: bookingDate },
    { startTime: 1, endTime: 1, _id: 0 },
  );

  return bookings;
};
export const BookingServices = {
  findBookingsByFacilityAndDate,
  createNewBookingIntoDB,
  getAllBookingsFromDB,
  getUserBookingsFromDB,
  getUserBookingsByIdFromDB,
  cancelBookingFromBookingDB,
  checkAvailabilityBookingsDB,
};
