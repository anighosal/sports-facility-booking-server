/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';
import { createToken } from '../../utils/createToken';
import { TUser } from './user.interface';
import User from './user.model';

const createUserIntoDB = async (payload: TUser) => {
  const user = await User.create(payload);

  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
  }
  return user;
};

const loginAsPreUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'User not found using this email',
    );
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid password');
  }

  const token = await createToken(
    { userId: user._id.toString(), role: user.role, name: user.name },

    // Ensure _id is a string
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    token,
    data: user,
  };
};

const getUserWelcomeMessageFromDB = async (id: string) => {
  console.log(id);
  const user = await User.findById(id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  return user;
};

export const UserServices = {
  createUserIntoDB,
  loginAsPreUser,
  getUserWelcomeMessageFromDB,
};
