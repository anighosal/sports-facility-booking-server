import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import User from './user.model';
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

const getUserById = async (req: Request, res: Response) => {
  const id: string = req.params.id; // Ensure id is treated as a string
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const UserControllers = {
  createUser,
  loginUser,
  getUserById,
};
