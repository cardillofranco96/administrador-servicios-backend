import { ServiceManager } from '../managers/ServiceManager.js';

const manager = new ServiceManager();

export async function getServices(req, res) {
  try {
    const { category, available, page = 1, limit = 10, sortBy = 'createdAt', order = 'desc' } = req.query;
    const options = {
      filters: { category, available },
      page: Number(page),
      limit: Number(limit),
      sortBy,
      order
    };

    const result = await manager.getServices(options);

    res.status(200).json({ data: result.docs, meta: result.meta });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getServiceById(req, res) {
  try {
    const { sid } = req.params;
    const service = await manager.getServiceById(sid);

    if (service && service.error) {
      return res.status(404).json({ error: service.error });
    }

    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createService(req, res) {
  try {
    const body = { ...req.body };
    if ('id' in body) {
      return res.status(400).json({ error: 'No enviar el id en el body; se genera automáticamente.' });
    }

    const result = await manager.addService(body);

    if (result && result.error) {
      return res.status(400).json({ error: result.error });
    }

    // emit via socket.io if available
    const io = req.app.get('io');
    if (io) io.emit('service:created', result);

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateService(req, res) {
  try {
    const { sid } = req.params;
    const payload = { ...req.body };

    if ('id' in payload) delete payload.id;

    const result = await manager.updateService(sid, payload);

    if (result && result.error) {
      return res.status(404).json({ error: result.error });
    }

    const io = req.app.get('io');
    if (io) io.emit('service:updated', result);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteService(req, res) {
  try {
    const { sid } = req.params;
    const result = await manager.deleteService(sid);

    if (result && result.error) {
      return res.status(404).json({ error: result.error });
    }

    const io = req.app.get('io');
    if (io) io.emit('service:deleted', result);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
