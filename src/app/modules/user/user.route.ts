import express from 'express';
import { IsAuthenticate } from '../../middlewares/IsAuthenticate';
import validateRequest from '../../middlewares/validateRequest';
import { UserControllers } from './user.controller';
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

router.get(
  '/welcome/:id',
  IsAuthenticate.auth,
  UserControllers.getUserWelcomeMessage,
);

export const UserRoutes = router;
