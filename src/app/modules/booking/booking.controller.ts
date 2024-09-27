/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-namespace */
// import httpStatus from 'http-status';
// import catchAsync from '../../utils/catchAsync';
// import sendResponse from '../../utils/sendResponse';
// import { BookingServices } from './booking.service';

// const createBooking = catchAsync(async (req, res) => {
//   if (!req.user || !req.user._id) {
//     return sendResponse(res, {
//       statusCode: httpStatus.UNAUTHORIZED,
//       success: false,
//       message: 'User not authenticated',
//     });
//   }
//   const userId = req.user._id;
//   const booking = await BookingServices.createNewBookingIntoDB(
//     userId,
//     req.body,
//   );

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Booking created successfully',
//     data: booking,
//   });
// });

// const getAllBookings = catchAsync(async (req, res) => {
//   const result = await BookingServices.getAllBookingsFromDB();

//   if (result.length < 1) {
//     sendResponse(res, {
//       statusCode: 404,
//       success: false,
//       message: 'No Data Found',
//       data: result,
//     });
//   }

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Bookings retrieved successfully',
//     data: result,
//   });
// });

// const getUserBookings = catchAsync(async (req, res) => {
//   if (!req.user || !req.user._id) {
//     return sendResponse(res, {
//       statusCode: httpStatus.UNAUTHORIZED,
//       success: false,
//       message: 'User not authenticated',
//     });
//   }
//   const userId = req.user._id;

//   const result = await BookingServices.getUserBookingsFromDB(userId);

//   if (result.length < 1) {
//     sendResponse(res, {
//       statusCode: 404,
//       success: false,
//       message: 'No Data Found',
//       data: result,
//     });
//   }
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Bookings retrieved successfully',
//     data: result,
//   });
// });
// const cancelBookingByUser = catchAsync(async (req, res) => {
//   const { id } = req.params;

//   const result = await BookingServices.cancelBookingFromBookingDB(id);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Cancel Booking successfully',
//     data: result,
//   });
// });

// const checkAvailability = async (req: Request, res: Response) => {
//   const { date, facility } = req.query;

//   // Validate inputs
//   if (!date || !facility) {
//     return res.status(400).json({ message: 'Date and facility are required.' });
//   }

//   // Ensure date is in YYYY-MM-DD format
//   const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
//   if (!dateRegex.test(date)) {
//     return res
//       .status(400)
//       .json({ message: 'Invalid date format. Use YYYY-MM-DD.' });
//   }

//   try {
//     // Fetch bookings for the given date and facility
//     const bookings = await Booking.find({
//       date,
//       facility,
//       isBooked: 'confirmed', // Check only confirmed bookings
//     });

//     // Determine available time slots
//     const availableSlots = getAvailableSlots(bookings);

//     if (availableSlots.length === 0) {
//       return res.status(404).json({ message: 'No available slots.' });
//     }

//     return res.status(200).json({ availableSlots });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Server error.' });
//   }
// };

// // Utility function to determine available time slots
// const getAvailableSlots = (bookings) => {
//   // Define your business logic for available slots here
//   const allSlots = [
//     '09:00',
//     '10:00',
//     '11:00',
//     '12:00',
//     '13:00',
//     '14:00',
//     '15:00',
//     '16:00',
//   ];

//   // Extract booked slots
//   const bookedSlots = bookings.map((booking) => booking.startTime);

//   // Filter available slots
//   return allSlots.filter((slot) => !bookedSlots.includes(slot));
// };

// //     try {
// //       const { date, facility } = req.query as { date: string; facility: string };

// //       // Ensure both date and facility are provided
// //       if (!date || !facility) {
// //         return res.status(400).json({ message: 'Date and facility are required.' });
// //       }

// //       // Find the facility (You can skip this check if you don't need it)
// //       const facilityExists = await Facility.findById(facility);
// //       if (!facilityExists) {
// //         return res.status(404).json({ message: 'Facility not found.' });
// //       }

// //       // Query the bookings for the given date and facility
// //       const bookings = await Booking.find({ facility, date });

// //       // Assuming bookings have time slots, extract the unavailable ones
// //       const unavailableSlots = bookings.map((booking) => booking.timeSlot); // Example structure

// //       // Define available slots (Assuming you have predefined time slots)
// //       const allSlots = ['09:00', '10:00', '11:00', '12:00', '13:00']; // Example

// //       // Calculate available slots by filtering out the unavailable ones
// //       const availableSlots = allSlots.filter(slot => !unavailableSlots.includes(slot));

// //       if (availableSlots.length === 0) {
// //         return res.json({ message: 'No available slots for the selected date.' });
// //       }

// //       // Return the available slots
// //       return res.json({ availableSlots });

// //     } catch (error) {
// //       return res.status(500).json({ message: 'Internal server error.', error });
// //     }
// //   }),
// export const BookingControllers = {
//   createBooking,
//   getAllBookings,
//   getUserBookings,
//   cancelBookingByUser,
//   checkAvailability,
// };

import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { Booking } from './booking.model';
import { BookingServices } from './booking.service';

class BookingControllers {
  static createBooking = catchAsync(async (req: Request, res: Response) => {
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

  static getAllBookings = catchAsync(async (req: Request, res: Response) => {
    const result = await BookingServices.getAllBookingsFromDB();

    if (result.length < 1) {
      return sendResponse(res, {
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

  static getUserBookings = catchAsync(async (req: Request, res: Response) => {
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
      return sendResponse(res, {
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

  static getUserBookingsById = catchAsync(
    async (req: Request, res: Response) => {
      const { id } = req.params;

      const bookings = await BookingServices.getUserBookingsByIdFromDB(id);

      if (!bookings) {
        return sendResponse(res, {
          statusCode: httpStatus.NOT_FOUND,
          success: false,
          message: 'No bookings found for this user',
          data: bookings,
        });
      }

      return sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Bookings retrieved successfully',
        data: bookings,
      });
    },
  );

  static cancelBookingByUser = catchAsync(
    async (req: Request, res: Response) => {
      const { id } = req.params;

      const result = await BookingServices.cancelBookingFromBookingDB(id);

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Cancel Booking successfully',
        data: result,
      });
    },
  );

  static checkAvailability = catchAsync(async (req: Request, res: Response) => {
    const { date, facility } = req.query;

    // Validate inputs
    if (!date || !facility) {
      return res
        .status(400)
        .json({ message: 'Date and facility are required.' });
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date as string)) {
      return res
        .status(400)
        .json({ message: 'Invalid date format. Use YYYY-MM-DD.' });
    }

    try {
      const bookings = await Booking.find({
        date,
        facility,
        isBooked: 'confirmed',
      });

      const availableSlots = BookingControllers.getAvailableSlots(bookings);

      if (availableSlots.length === 0) {
        return res.status(404).json({ message: 'No available slots.' });
      }

      return res.status(200).json({ availableSlots });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error.' });
    }
  });

  static getAvailableSlots(bookings: any[]) {
    const allSlots = [
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
    ];

    const bookedSlots = bookings.map((booking) => booking.startTime);

    return allSlots.filter((slot) => !bookedSlots.includes(slot));
  }
}

export { BookingControllers };
