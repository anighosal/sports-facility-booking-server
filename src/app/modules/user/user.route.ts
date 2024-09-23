import express from 'express';
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

// router.get('/user/:id', UserControllers.getUserById);

export const UserRoutes = router;
