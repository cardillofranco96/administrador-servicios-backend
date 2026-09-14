import { z } from 'zod';
import { ReservationDAO } from '../dao/reservation.dao.js';

const reservationSchema = z.object({
  service: z.string().min(1, 'Debe indicar un servicio válido'),
  quantity: z.number().int().positive('La cantidad debe ser un número entero mayor a 0'),
  customerName: z.string().trim().min(2, 'El nombre del cliente es obligatorio'),
  date: z.coerce.date(),
  status: z.enum(['pending', 'confirmed', 'cancelled']).default('pending')
});

export class ReservationService {
  constructor() {
    this.dao = new ReservationDAO();
  }

  async getAll(filters = {}, options = {}) {
    return await this.dao.getAll(filters, options);
  }

  async getById(id) {
    return await this.dao.getById(id);
  }

  async create(data) {
    const parsed = reservationSchema.parse(data);
    return await this.dao.create(parsed);
  }

  async update(id, data) {
    const parsed = reservationSchema.partial().parse(data);
    return await this.dao.update(id, parsed);
  }

  async delete(id) {
    return await this.dao.delete(id);
  }
}
