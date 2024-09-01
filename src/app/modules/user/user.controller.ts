import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const createUser = catchAsync(async (req, res) => {
  const userData = req.body;

  const result = await UserServices.createUserIntoDB(userData);

  sendResponse(res, {
    success: true,
    message: 'User registered successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const result = await UserServices.loginAsPreUser(email, password);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    token: result.token,
    data: result.data,
    message: 'User logged in successfully',
  });
});

export const UserControllers = {
  createUser,
  loginUser,
};
