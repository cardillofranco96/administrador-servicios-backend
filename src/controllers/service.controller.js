import { ServiceService } from '../services/service.service.js';

const serviceService = new ServiceService();

export const getServices = async (req, res) => {
  try {
    const { category, available, limit = 10, page = 1, sort = 'createdAt' } = req.query;
    const validSort = sort === 'price' ? { price: -1 } : { createdAt: -1 };

    const services = await serviceService.getAll({ category, available }, {
      limit: Number(limit),
      page: Number(page),
      sort: validSort
    });

    res.json(services);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getServiceById = async (req, res) => {
  try {
    const service = await serviceService.getById(req.params.id);
    if (!service) return res.status(404).json({ error: 'Servicio no encontrado' });
    res.json(service);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const createService = async (req, res) => {
  try {
    const service = await serviceService.create(req.body);
    res.status(201).json(service);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateService = async (req, res) => {
  try {
    const service = await serviceService.update(req.params.id, req.body);
    if (!service) return res.status(404).json({ error: 'Servicio no encontrado' });
    res.json(service);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteService = async (req, res) => {
  try {
    const service = await serviceService.delete(req.params.id);
    if (!service) return res.status(404).json({ error: 'Servicio no encontrado' });
    res.json(service);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
