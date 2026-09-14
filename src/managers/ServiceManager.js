import { ServiceModel } from '../models/service.model.js';

export class ServiceManager {
  async getServices() {
    // legacy call without args
    const docs = await ServiceModel.find().lean();
    return { docs, meta: { total: docs.length, page: 1, limit: docs.length, totalPages: 1, hasPrevPage: false, hasNextPage: false } };
  }

  async getServices(options = {}) {
    // options: { filters: {category, available}, page, limit, sortBy, order }
    const { filters = {}, page = 1, limit = 10, sortBy = 'createdAt', order = 'desc' } = options;
    const query = {};
    if (filters.category) query.category = { $regex: new RegExp(`^${filters.category}$`, 'i') };
    if (filters.available !== undefined && filters.available !== null && filters.available !== '') query.available = filters.available === 'true' || filters.available === true;

    const skip = (Number(page) - 1) * Number(limit);
    const sortObj = { [sortBy]: order === 'asc' ? 1 : -1 };

    const [docs, total] = await Promise.all([
      ServiceModel.find(query).sort(sortObj).skip(skip).limit(Number(limit)).lean(),
      ServiceModel.countDocuments(query)
    ]);

    const totalPages = Math.max(1, Math.ceil(total / Number(limit)));

    return {
      docs,
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages,
        hasPrevPage: Number(page) > 1,
        hasNextPage: Number(page) < totalPages
      }
    };
  }

  async getServiceById(id) {
    try {
      const doc = await ServiceModel.findById(id).lean();
      if (!doc) return { error: `Servicio con id ${id} no encontrado.` };
      return { ...doc };
    } catch (err) {
      return { error: `Servicio con id ${id} no encontrado.` };
    }
  }

  async addService(serviceData) {
    const requiredFields = ['name', 'description', 'duration', 'price', 'category', 'available'];
    const missingField = requiredFields.find((field) => {
      const value = serviceData?.[field];
      return value === undefined || value === null || value === '';
    });

    if (missingField) {
      return { error: `Falta el campo obligatorio: ${missingField}. Todos los campos deben estar presentes y no vacíos.` };
    }

    const created = await ServiceModel.create({
      name: String(serviceData.name).trim(),
      description: String(serviceData.description).trim(),
      duration: Number(serviceData.duration),
      price: Number(serviceData.price),
      category: String(serviceData.category).trim(),
      available: Boolean(serviceData.available)
    });

    return created.toJSON();
  }

  async updateService(id, updatedData) {
    try {
      const doc = await ServiceModel.findById(id);
      if (!doc) return { error: `Servicio con id ${id} no encontrado.` };

      const allowedFields = ['name', 'description', 'duration', 'price', 'category', 'available'];

      for (const [key, value] of Object.entries(updatedData || {})) {
        if (key === 'id') continue;
        if (!allowedFields.includes(key)) continue;
        if (value === undefined || value === null || value === '') continue;

        doc[key] = key === 'name' || key === 'description' || key === 'category'
          ? String(value).trim()
          : key === 'available'
            ? Boolean(value)
            : Number(value);
      }

      await doc.save();
      return doc.toJSON();
    } catch (err) {
      return { error: `Servicio con id ${id} no encontrado.` };
    }
  }

  async deleteService(id) {
    try {
      const doc = await ServiceModel.findByIdAndDelete(id).lean();
      if (!doc) return { error: `Servicio con id ${id} no encontrado.` };
      return { ...doc };
    } catch (err) {
      return { error: `Servicio con id ${id} no encontrado.` };
    }
  }
}
