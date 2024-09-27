import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminServices, createAdminIntoDB } from './admin.service';

const adminCreateAdminController = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone, address, role } = req.body;

    if (role !== 'admin') {
      return res.status(403).json({ message: 'You can only create admins' });
    }

    const newAdmin = await createAdminIntoDB({
      name,
      email,
      password,
      phone,
      address,
      role,
    });

    res.status(201).json({
      message: 'Admin created successfully',
      admin: newAdmin,
    });
  } catch (error: any) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: 'This admin already exists' });
    }

    res.status(400).json({ message: error.message });
  }
};

const getAdminDetailsById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const admin = await AdminServices.getAdminDetailsByIdFromDB(id);

  if (!admin) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Admin not found',
      data: admin,
    });
  }

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin retrieved successfully',
    data: admin,
  });
});
export const AdminControllers = {
  adminCreateAdminController,
  getAdminDetailsById,
};
