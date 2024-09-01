/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-namespace */

import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import config from '../config';
import AppError from '../errors/AppError';
import { TUser } from '../modules/user/user.interface';
import User from '../modules/user/user.model';
import { verifyToken } from '../utils/createToken';
import sendResponse from '../utils/sendResponse';

declare global {
  namespace Express {
    interface Request {
      user?: TUser;
    }
  }
}

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const headers = req.header('Authorization');
    // console.log('🚀 ~ auth ~ headers:', headers);
    if (!headers) {
      return next(new AppError(httpStatus.BAD_REQUEST, 'No Headers found'));
    }
    const token = headers.replace('Bearer ', '');
    // console.log('🚀 ~ auth ~ token:', token);

    if (!token) {
      return next(new AppError(httpStatus.BAD_REQUEST, 'No token provided'));
    }

    const decoded: any = verifyToken(token, config.jwt_access_secret as string);

    // console.log(decoded);
    const user = await User.findById(decoded.userId).exec();

    if (!user) {
      return next(new AppError(httpStatus.BAD_REQUEST, 'Invalid token'));
    }

    req.user = user.toObject() as TUser;
    next();
  } catch (error) {
    console.log(error);
    next(new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized'));
  }
};

const adminOnly = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== 'admin') {
    sendResponse(res, {
      success: false,
      statusCode: 401,
      message: 'You have no access to this route',
    });
  }
  next();
};

const userOnly = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== 'user') {
    sendResponse(res, {
      success: false,
      statusCode: 401,
      message: 'You have no access to this route',
    });
  }
  next();
};

export const IsAuthenticate = {
  auth,
  adminOnly,
  userOnly,
};
