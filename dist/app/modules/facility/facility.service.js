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
exports.FacilityServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const facility_model_1 = __importDefault(require("./facility.model"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const createFacilityIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield facility_model_1.default.create(payload);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create user');
    }
    return user;
});
const UpdateFacilityIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const facility = yield facility_model_1.default.findByIdAndUpdate(id, payload, {
        new: true,
    });
    if (!facility) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to Updated facility');
    }
    return facility;
});
const deleteFacilityIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteFacility = yield facility_model_1.default.findByIdAndUpdate(id, { isDeleted: true }, {
        new: true,
    });
    if (!deleteFacility) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to delete Facility deleteFacility');
    }
    return deleteFacility;
});
const getFacilityFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const facility = yield facility_model_1.default.find();
    if (!facility) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to Find Facility ');
    }
    return facility;
});
exports.FacilityServices = {
    createFacilityIntoDB,
    UpdateFacilityIntoDB,
    deleteFacilityIntoDB,
    getFacilityFromDB,
};
