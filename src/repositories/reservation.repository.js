import { Reservation } from '../models/Reservation.js';

export class ReservationRepository {
  async getAll(filters = {}, options = {}) {
    const { limit = 10, page = 1, sort = { createdAt: -1 } } = options;
    const skip = (page - 1) * limit;

    return await Reservation.find(filters)
      .populate('service')
      .sort(sort)
      .skip(skip)
      .limit(limit);
  }

  async getById(id) {
    return await Reservation.findById(id).populate('service');
  }

  async create(data) {
    return await Reservation.create(data);
  }

  async update(id, data) {
    return await Reservation.findByIdAndUpdate(id, data, { new: true, runValidators: true }).populate('service');
  }

  async delete(id) {
    return await Reservation.findByIdAndDelete(id);
  }
}
