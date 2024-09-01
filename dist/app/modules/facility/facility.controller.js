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
exports.FacilityControllers = exports.createFacility = void 0;
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const facility_service_1 = require("./facility.service");
exports.createFacility = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const facilityData = req.body;
    const result = yield facility_service_1.FacilityServices.createFacilityIntoDB(facilityData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Facility added successfully',
        data: result,
    });
}));
const updateFacility = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const facilityData = req.body;
    const result = yield facility_service_1.FacilityServices.UpdateFacilityIntoDB(id, facilityData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Facility updated successfully',
        data: result,
    });
}));
const deletedFacility = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield facility_service_1.FacilityServices.deleteFacilityIntoDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Facility deleted successfully',
        data: result,
    });
}));
const getFacility = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield facility_service_1.FacilityServices.getFacilityFromDB();
    if (result.length < 1) {
        (0, sendResponse_1.default)(res, {
            statusCode: 404,
            success: false,
            message: 'No Data Found',
            data: result,
        });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Facilities retrieved successfully',
        data: result,
    });
}));
exports.FacilityControllers = {
    createFacility: exports.createFacility,
    updateFacility,
    deletedFacility,
    getFacility,
};
