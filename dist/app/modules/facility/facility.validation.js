"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.facilityValidations = void 0;
const zod_1 = require("zod");
const createFacilityValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1),
        description: zod_1.z.string().min(1),
        pricePerHour: zod_1.z.number().positive(),
        location: zod_1.z.string().min(1),
    }),
});
const UpdatedFacilityValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1).optional(),
        description: zod_1.z.string().min(1).optional(),
        pricePerHour: zod_1.z.number().positive().optional(),
        location: zod_1.z.string().min(1).optional(),
    }),
});
exports.facilityValidations = {
    createFacilityValidationSchema,
    UpdatedFacilityValidationSchema,
};
