import express from 'express';

import validateRequest from '../../middlewares/validateRequest';

import { IsAuthenticate } from '../../middlewares/IsAuthenticate';
import { FacilityControllers } from './facility.controller';
import { facilityValidations } from './facility.validation';

const router = express.Router();

router.post(
  '/',
  IsAuthenticate.auth,
  IsAuthenticate.adminOnly,
  validateRequest(facilityValidations.createFacilityValidationSchema),
  FacilityControllers.createFacility,
);
router.put(
  '/:id',
  IsAuthenticate.auth,
  IsAuthenticate.adminOnly,
  validateRequest(facilityValidations.UpdatedFacilityValidationSchema),
  FacilityControllers.updateFacility,
);
router.delete(
  '/:id',
  IsAuthenticate.auth,
  IsAuthenticate.adminOnly,
  FacilityControllers.deletedFacility,
);

router.get('/:id', FacilityControllers.getFacilityById);
router.get('/', FacilityControllers.getFacility);

export const facilityRoutes = router;
