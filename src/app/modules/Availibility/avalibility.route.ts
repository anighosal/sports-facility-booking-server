import express from 'express';
import { AvailabilityController } from './availibility.controller';

const router = express.Router();

router.get('/check-availability', AvailabilityController.checkAvailability);

export const AvailabilityRoutes = router;
