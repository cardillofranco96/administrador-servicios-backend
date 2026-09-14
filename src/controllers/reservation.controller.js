import { ReservationService } from '../services/reservation.service.js';

const reservationService = new ReservationService();

export const getReservations = async (req, res) => {
  try {
    const reservations = await reservationService.getAll({}, { limit: 10, page: 1, sort: { createdAt: -1 } });
    res.json(reservations);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getReservationById = async (req, res) => {
  try {
    const reservation = await reservationService.getById(req.params.id);
    if (!reservation) return res.status(404).json({ error: 'Reserva no encontrada' });
    res.json(reservation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const createReservation = async (req, res) => {
  try {
    const reservation = await reservationService.create(req.body);
    res.status(201).json(reservation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateReservation = async (req, res) => {
  try {
    const reservation = await reservationService.update(req.params.id, req.body);
    if (!reservation) return res.status(404).json({ error: 'Reserva no encontrada' });
    res.json(reservation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteReservation = async (req, res) => {
  try {
    const reservation = await reservationService.delete(req.params.id);
    if (!reservation) return res.status(404).json({ error: 'Reserva no encontrada' });
    res.json(reservation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
