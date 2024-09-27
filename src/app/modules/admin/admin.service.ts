import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TUser } from '../user/user.interface';
import User from '../user/user.model';
import { Admin } from './admin.model';

export const createAdminIntoDB = async (payload: TUser) => {
  const existingUser = await User.findOne({ email: payload.email });
  if (existingUser) {
    throw new AppError(
      httpStatus.CONFLICT,
      'User with this email already exists',
    );
  }

  if (payload.role !== 'admin') {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'Admins can only create other admins',
    );
  }

  payload.password = await bcrypt.hash(payload.password, 10);

  const user = await User.create(payload);

  if (!user) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to create admin',
    );
  }

  return user;
};

const getAdminDetailsByIdFromDB = async (id: string) => {
  console.log(id);
  const admin = await Admin.findById(id);

  if (!admin) {
    throw new AppError(httpStatus.NOT_FOUND, 'admin not found');
  }
  return admin;
};

export const AdminServices = {
  createAdminIntoDB,
  getAdminDetailsByIdFromDB,
};
