import express from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userValidations } from './user.validation';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(userValidations.createUserValidationSchema),
  UserControllers.createUser,
);
router.post(
  '/login',
  validateRequest(userValidations.loginUserValidationSchema),
  UserControllers.loginUser,
);

export const UserRoutes = router;
