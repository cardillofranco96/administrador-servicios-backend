import { ReservationRepository } from '../repositories/reservation.repository.js';

export class ReservationDAO {
  constructor() {
    this.repository = new ReservationRepository();
  }

  async getAll(filters, options) {
    return await this.repository.getAll(filters, options);
  }

  async getById(id) {
    return await this.repository.getById(id);
  }

  async create(data) {
    return await this.repository.create(data);
  }

  async update(id, data) {
    return await this.repository.update(id, data);
  }

  async delete(id) {
    return await this.repository.delete(id);
  }
}
