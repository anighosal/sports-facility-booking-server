"use strict";
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
