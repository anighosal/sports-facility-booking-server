"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-namespace */
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
exports.IsAuthenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../modules/user/user.model"));
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const config_1 = __importDefault(require("../config"));
const sendResponse_1 = __importDefault(require("../utils/sendResponse"));
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const headers = req.header('Authorization');
        // console.log('🚀 ~ auth ~ headers:', headers);
        if (!headers) {
            return next(new AppError_1.default(http_status_1.default.BAD_REQUEST, 'No Headers found'));
        }
        const token = headers.replace('Bearer ', '');
        // console.log('🚀 ~ auth ~ token:', token);
        if (!token) {
            return next(new AppError_1.default(http_status_1.default.BAD_REQUEST, 'No token provided'));
        }
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
        const user = yield user_model_1.default.findById(decoded._id).exec();
        if (!user) {
            return next(new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid token'));
        }
        req.user = user.toObject();
        next();
    }
    catch (error) {
        next(new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'Unauthorized'));
    }
});
const adminOnly = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        (0, sendResponse_1.default)(res, {
            success: false,
            statusCode: 401,
            message: 'You have no access to this route',
        });
    }
    next();
};
const userOnly = (req, res, next) => {
    if (!req.user || req.user.role !== 'user') {
        (0, sendResponse_1.default)(res, {
            success: false,
            statusCode: 401,
            message: 'You have no access to this route',
        });
    }
    next();
};
exports.IsAuthenticate = {
    auth,
    adminOnly,
    userOnly,
};
