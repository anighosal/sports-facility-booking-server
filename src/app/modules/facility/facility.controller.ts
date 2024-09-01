import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
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
  if (result.length < 1) {
    sendResponse(res, {
      statusCode: 404,
      success: false,
      message: 'No Data Found',
      data: result,
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facilities retrieved successfully',
    data: result,
  });
});

export const FacilityControllers = {
  createFacility,
  updateFacility,
  deletedFacility,
  getFacility,
};
