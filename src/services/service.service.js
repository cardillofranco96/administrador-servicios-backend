import { z } from 'zod';
import { ServiceDAO } from '../dao/service.dao.js';

const serviceSchema = z.object({
  name: z.string().trim().min(2, 'El nombre es obligatorio'),
  description: z.string().trim().min(5, 'La descripción es obligatoria'),
  duration: z.number().positive('La duración debe ser mayor a 0'),
  price: z.number().nonnegative('El precio no puede ser negativo'),
  category: z.string().trim().min(2, 'La categoría es obligatoria'),
  available: z.boolean()
});

export class ServiceService {
  constructor() {
    this.dao = new ServiceDAO();
  }

  async getAll(filters = {}, options = {}) {
    const query = {};

    if (filters.category) query.category = filters.category;
    if (filters.available !== undefined) query.available = filters.available === 'true';

    return await this.dao.getAll(query, options);
  }

  async getById(id) {
    return await this.dao.getById(id);
  }

  async create(data) {
    const parsed = serviceSchema.parse(data);
    return await this.dao.create(parsed);
  }

  async update(id, data) {
    const parsed = serviceSchema.partial().parse(data);
    return await this.dao.update(id, parsed);
  }

  async delete(id) {
    return await this.dao.delete(id);
  }
}
