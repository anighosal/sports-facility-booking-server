import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FacilityServices } from './facility.service';

export const createFacility = catchAsync(async (req, res) => {
  const facilityData = req.body;

  const result = await FacilityServices.createFacilityIntoDB(facilityData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facility added successfully',
    data: result,
  });
});
const updateFacility = catchAsync(async (req, res) => {
  const { id } = req.params;
  const facilityData = req.body;

  const result = await FacilityServices.UpdateFacilityIntoDB(id, facilityData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facility updated successfully',
    data: result,
  });
});

const deletedFacility = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await FacilityServices.deleteFacilityIntoDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facility deleted successfully',
    data: result,
  });
});
const getFacility = catchAsync(async (req, res) => {
  const result = await FacilityServices.getFacilityFromDB();
  if (!result || result.length === 0) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'No facilities found.',
      data: [],
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facilities retrieved successfully',
    data: result,
  });
});

const getFacilityById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await FacilityServices.getFacilityByIdFromDB(id);

  if (!result) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Facility not found',
      data: null,
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facility retrieved successfully',
    data: result,
  });
});

export const FacilityControllers = {
  createFacility,
  updateFacility,
  deletedFacility,
  getFacility,
  getFacilityById,
};
