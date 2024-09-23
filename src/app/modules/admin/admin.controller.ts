import { Request, Response } from 'express';
import { createAdminIntoDB } from './admin.service';

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
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: 'This admin already exists' });
    }

    res.status(400).json({ message: error.message });
  }
};

export const AdminControllers = {
  adminCreateAdminController,
};
