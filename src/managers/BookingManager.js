import { BookingModel } from '../models/booking.model.js';
import { ServiceModel } from '../models/service.model.js';

export class BookingManager {
  async createBooking(bookingData) {
    const requiredFields = ['clientName', 'clientEmail', 'date', 'time', 'status'];
    const missingField = requiredFields.find((field) => {
      const value = bookingData?.[field];
      return value === undefined || value === null || value === '';
    });

    if (missingField) {
      return { error: `Falta el campo obligatorio: ${missingField}.` };
    }

    const created = await BookingModel.create({
      clientName: String(bookingData.clientName).trim(),
      clientEmail: String(bookingData.clientEmail).trim(),
      date: String(bookingData.date).trim(),
      time: String(bookingData.time).trim(),
      status: String(bookingData.status).trim(),
      services: Array.isArray(bookingData.services) ? bookingData.services : []
    });

    return created.toJSON();
  }

  async getBookingById(id) {
    try {
      const doc = await BookingModel.findById(id).populate('services.service').lean();
      if (!doc) return { error: `Reserva con id ${id} no encontrada.` };
      return doc;
    } catch (err) {
      return { error: `Reserva con id ${id} no encontrada.` };
    }
  }

  async addServiceToBooking(bid, sid) {
    try {
      const booking = await BookingModel.findById(bid);
      if (!booking) return { error: `Reserva con id ${bid} no encontrada.` };

      const service = await ServiceModel.findById(sid).lean();
      if (!service) return { error: `Servicio con id ${sid} no encontrado.` };

      const existing = booking.services.find((s) => String(s.service) === String(sid));

      if (existing) {
        existing.quantity = Number(existing.quantity || 1) + 1;
      } else {
        booking.services.push({ service: sid, quantity: 1 });
      }

      await booking.save();
      return booking.toJSON();
    } catch (err) {
      return { error: `Error agregando servicio a la reserva: ${err.message}` };
    }
  }

  async getAllBookings() {
    const docs = await BookingModel.find().populate('services.service').lean();
    return docs;
  }
}
