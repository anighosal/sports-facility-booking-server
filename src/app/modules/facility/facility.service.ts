import httpStatus from 'http-status';
import Facility from './facility.model';
import AppError from '../../errors/AppError';
import { TFacility } from './facility.interface';

const createFacilityIntoDB = async (payload: TFacility) => {
  const user = await Facility.create(payload);

  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
  }
  return user;
};

const UpdateFacilityIntoDB = async (
  id: string,
  payload: Partial<TFacility>,
) => {
  const facility = await Facility.findByIdAndUpdate(id, payload, {
    new: true,
  });

  if (!facility) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Updated facility');
  }
  return facility;
};

const deleteFacilityIntoDB = async (id: string) => {
  const deleteFacility = await Facility.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    },
  );

  if (!deleteFacility) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Failed to delete Facility deleteFacility',
    );
  }
  return deleteFacility;
};

const getFacilityFromDB = async () => {
  const facility = await Facility.find();

  if (!facility) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Find Facility ');
  }
  return facility;
};
export const FacilityServices = {
  createFacilityIntoDB,
  UpdateFacilityIntoDB,
  deleteFacilityIntoDB,
  getFacilityFromDB,
};
