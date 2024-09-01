"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidations = void 0;
const zod_1 = require("zod");
const createUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().trim().min(1, 'Name is required'),
        email: zod_1.z.string().email('Invalid email').trim(),
        password: zod_1.z.string().min(1, 'Password is required'),
        phone: zod_1.z.string().trim().min(1, 'Phone is required'),
        role: zod_1.z.enum(['admin', 'user']),
        address: zod_1.z.string().min(1, 'Address is required'),
    }),
});
const loginUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email('Invalid email').trim(),
        password: zod_1.z.string().min(1, 'Password is required'),
    }),
});
exports.userValidations = {
    createUserValidationSchema,
    loginUserValidationSchema,
};
