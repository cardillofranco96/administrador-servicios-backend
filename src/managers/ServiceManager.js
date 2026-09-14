import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataFilePath = path.join(__dirname, '../data/services.json');

export class ServiceManager {
  async readServicesFile() {
    try {
      const content = await fs.readFile(dataFilePath, 'utf-8');
      return JSON.parse(content);
    } catch (error) {
      if (error.code === 'ENOENT') {
        await fs.writeFile(dataFilePath, '[]', 'utf-8');
        return [];
      }

      throw error;
    }
  }

  async writeServicesFile(services) {
    await fs.writeFile(dataFilePath, JSON.stringify(services, null, 2), 'utf-8');
  }

  async getServices() {
    return await this.readServicesFile();
  }

  async getServiceById(id) {
    const services = await this.readServicesFile();
    const service = services.find((item) => item.id === Number(id));

    if (!service) {
      return { error: `Servicio con id ${id} no encontrado.` };
    }

    return service;
  }

  async addService(serviceData) {
    const requiredFields = ['name', 'description', 'duration', 'price', 'category', 'available'];
    const missingField = requiredFields.find((field) => {
      const value = serviceData?.[field];
      return value === undefined || value === null || value === '';
    });

    if (missingField) {
      return {
        error: `Falta el campo obligatorio: ${missingField}. Todos los campos deben estar presentes y no vacíos.`
      };
    }

    const services = await this.readServicesFile();
    const nextId = services.length > 0 ? Math.max(...services.map((service) => service.id)) + 1 : 1;

    const newService = {
      id: nextId,
      name: String(serviceData.name).trim(),
      description: String(serviceData.description).trim(),
      duration: Number(serviceData.duration),
      price: Number(serviceData.price),
      category: String(serviceData.category).trim(),
      available: Boolean(serviceData.available)
    };

    services.push(newService);
    await this.writeServicesFile(services);

    return newService;
  }

  async updateService(id, updatedData) {
    const services = await this.readServicesFile();
    const index = services.findIndex((service) => service.id === Number(id));

    if (index === -1) {
      return { error: `Servicio con id ${id} no encontrado.` };
    }

    const currentService = services[index];
    const allowedFields = ['name', 'description', 'duration', 'price', 'category', 'available'];

    const nextService = { ...currentService };

    for (const [key, value] of Object.entries(updatedData || {})) {
      if (key === 'id') {
        continue;
      }

      if (allowedFields.includes(key)) {
        if (value === undefined || value === null || value === '') {
          continue;
        }

        nextService[key] = key === 'name' || key === 'description' || key === 'category'
          ? String(value).trim()
          : key === 'available'
            ? Boolean(value)
            : Number(value);
      }
    }

    services[index] = nextService;
    await this.writeServicesFile(services);

    return nextService;
  }

  async deleteService(id) {
    const services = await this.readServicesFile();
    const index = services.findIndex((service) => service.id === Number(id));

    if (index === -1) {
      return { error: `Servicio con id ${id} no encontrado.` };
    }

    const [deletedService] = services.splice(index, 1);
    await this.writeServicesFile(services);

    return deletedService;
  }
}
