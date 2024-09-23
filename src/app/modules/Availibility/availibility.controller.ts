const totalSlots = [
  { startTime: '00:00', endTime: '03:00' },
  { startTime: '03:00', endTime: '06:00' },
  { startTime: '06:00', endTime: '09:00' },
  { startTime: '09:00', endTime: '12:00' },
  { startTime: '12:00', endTime: '15:00' },
  { startTime: '15:00', endTime: '18:00' },
  { startTime: '18:00', endTime: '21:00' },
  { startTime: '21:00', endTime: '24:00' },
];

// const getAvailableSlots = (
//   bookings: { startTime: string; endTime: string }[],
//   totalSlots: { startTime: string; endTime: string }[],
// ) => {
//   const availableSlots: { startTime: string; endTime: string }[] = [];

//   totalSlots.forEach((slot) => {
//     let isAvailable = true;

//     bookings.forEach((booking) => {
//       const bookingStart = moment(booking.startTime, 'HH:mm');
//       const bookingEnd = moment(booking.endTime, 'HH:mm');
//       const slotStart = moment(slot.startTime, 'HH:mm');
//       const slotEnd = moment(slot.endTime, 'HH:mm');

//       // Check if there is any overlap between slot and booking
//       if (
//         slotStart.isBetween(bookingStart, bookingEnd, undefined, '[)') ||
//         slotEnd.isBetween(bookingStart, bookingEnd, undefined, '(]') ||
//         (slotStart.isSameOrBefore(bookingStart) &&
//           slotEnd.isSameOrAfter(bookingEnd))
//       ) {
//         isAvailable = false;
//       }
//     });

//     if (isAvailable) {
//       availableSlots.push(slot);
//     }
//   });

//   return availableSlots;
// };

// const checkAvailability = catchAsync(async (req: Request, res: Response) => {
//   const { date } = req.query;

//   const bookings = await BookingServices.checkAvailabilityBookingsDB({
//     date: date as string,
//   });
//   console.log('Result:', bookings);

//   const availableSlots = getAvailableSlots(bookings, totalSlots);

//   if (availableSlots.length < 1) {
//     return sendResponse(res, {
//       statusCode: httpStatus.NOT_FOUND,
//       success: false,
//       message: 'No Data Found',
//       data: [],
//     });
//   }

//   return sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Availability checked successfully',
//     data: availableSlots,
//   });
// });

// export const AvailabilityController = {
//   checkAvailability,
// };
