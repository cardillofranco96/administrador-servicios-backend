import express from 'express';
import {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService
} from '../controllers/service.controller.js';
import {
  getReservations,
  getReservationById,
  createReservation,
  updateReservation,
  deleteReservation
} from '../controllers/reservation.controller.js';

const router = express.Router();

router.get('/services', getServices);
router.get('/services/:id', getServiceById);
router.post('/services', createService);
router.put('/services/:id', updateService);
router.delete('/services/:id', deleteService);

router.get('/reservations', getReservations);
router.get('/reservations/:id', getReservationById);
router.post('/reservations', createReservation);
router.put('/reservations/:id', updateReservation);
router.delete('/reservations/:id', deleteReservation);

export default router;
