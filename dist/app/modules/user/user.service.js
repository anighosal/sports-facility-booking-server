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
exports.UserServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = __importDefault(require("./user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const createToken_1 = require("../../utils/createToken");
const config_1 = __importDefault(require("../../config"));
const createUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.create(payload);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create user');
    }
    return user;
});
const loginAsPreUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ email });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'User not found using this email');
    }
    if (!(yield bcrypt_1.default.compare(password, user.password))) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'Invalid password');
    }
    const token = (0, createToken_1.createToken)({ _id: user._id.toString(), role: user.role }, 
    // Ensure _id is a string
    config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    return {
        token,
        data: user,
    };
});
exports.UserServices = {
    createUserIntoDB,
    loginAsPreUser,
};
