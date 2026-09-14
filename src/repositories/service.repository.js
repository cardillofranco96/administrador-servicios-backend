import { Service } from '../models/Service.js';

export class ServiceRepository {
  async getAll(filters = {}, options = {}) {
    const { limit = 10, page = 1, sort = { createdAt: -1 } } = options;
    const skip = (page - 1) * limit;

    return await Service.find(filters)
      .sort(sort)
      .skip(skip)
      .limit(limit);
  }

  async getById(id) {
    return await Service.findById(id);
  }

  async create(data) {
    return await Service.create(data);
  }

  async update(id, data) {
    return await Service.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  async delete(id) {
    return await Service.findByIdAndDelete(id);
  }
}
