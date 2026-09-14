import express from 'express';
import * as controller from '../controllers/bookings.controller.js';
import { validateBody, bookingSchema } from '../middlewares/validate.js';

const router = express.Router();

router.post('/', validateBody(bookingSchema), controller.createBooking);
router.get('/:bid', controller.getBookingById);
router.post('/:bid/services/:sid', controller.addServiceToBooking);

export default router;
