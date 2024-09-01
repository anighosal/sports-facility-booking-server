"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.facilityRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const facility_validation_1 = require("./facility.validation");
const facility_controller_1 = require("./facility.controller");
const IsAuthenticate_1 = require("../../middlewares/IsAuthenticate");
const router = express_1.default.Router();
router.post('/', IsAuthenticate_1.IsAuthenticate.auth, IsAuthenticate_1.IsAuthenticate.adminOnly, (0, validateRequest_1.default)(facility_validation_1.facilityValidations.createFacilityValidationSchema), facility_controller_1.FacilityControllers.createFacility);
router.put('/:id', IsAuthenticate_1.IsAuthenticate.auth, IsAuthenticate_1.IsAuthenticate.adminOnly, (0, validateRequest_1.default)(facility_validation_1.facilityValidations.UpdatedFacilityValidationSchema), facility_controller_1.FacilityControllers.updateFacility);
router.delete('/:id', IsAuthenticate_1.IsAuthenticate.auth, IsAuthenticate_1.IsAuthenticate.adminOnly, facility_controller_1.FacilityControllers.deletedFacility);
router.get('/', facility_controller_1.FacilityControllers.getFacility);
exports.facilityRoutes = router;
