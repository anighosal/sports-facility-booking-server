"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const createBookingValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        date: zod_1.z.string(),
        startTime: zod_1.z.string().regex(/^\d{2}:\d{2}$/, {
            message: 'Start time must be in HH:MM format',
        }),
        endTime: zod_1.z.string().regex(/^\d{2}:\d{2}$/, {
            message: 'End time must be in HH:MM format',
        }),
        facility: zod_1.z.string(),
    }),
});
exports.default = createBookingValidationSchema;
