import express from 'express';
import { IsAuthenticate } from '../../middlewares/IsAuthenticate';
import validateRequest from '../../middlewares/validateRequest';
import { AdminControllers } from './admin.controller';
import { adminValidations } from './admin.validation';

const router = express.Router();

router.post(
  '/',
  IsAuthenticate.auth,
  IsAuthenticate.adminOnly,
  validateRequest(adminValidations.createAdminValidationSchema),
  AdminControllers.adminCreateAdminController,
);
router.get(
  '/:id',
  IsAuthenticate.auth,
  IsAuthenticate.adminOnly,
  AdminControllers.getAdminDetailsById,
);

export const adminRoutes = router;
