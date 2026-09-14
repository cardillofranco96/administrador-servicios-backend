import { config } from './config/env.config.js';
import { ServiceManager } from './managers/ServiceManager.js';

const serviceManager = new ServiceManager();

console.log('Configuración cargada:', config);
console.log('\n--- Lectura inicial de servicios ---');
console.log(await serviceManager.getServices());

console.log('\n--- Intento fallido: servicio incompleto ---');
const incompleteService = {
  name: '',
  description: '',
  duration: 30,
  price: 500,
  category: 'Diseño',
  available: true
};

console.log(await serviceManager.addService(incompleteService));

console.log('\n--- Creación exitosa de servicios ---');
const serviceOne = {
  name: 'Desarrollo Web',
  description: 'Landing page y sitio corporativo.',
  duration: 120,
  price: 2500,
  category: 'Web',
  available: true
};

const serviceTwo = {
  name: 'Mantenimiento Técnico',
  description: 'Soporte mensual para infraestructura digital.',
  duration: 60,
  price: 1200,
  category: 'Soporte',
  available: true
};

console.log(await serviceManager.addService(serviceOne));
console.log(await serviceManager.addService(serviceTwo));

console.log('\n--- Consulta de todos los servicios ---');
console.log(await serviceManager.getServices());

console.log('\n--- Consulta de un servicio por ID ---');
const allServices = await serviceManager.getServices();
const serviceId = allServices[0]?.id ?? 1;
console.log(await serviceManager.getServiceById(serviceId));

console.log('\n--- Actualización de servicio ---');
console.log(
  await serviceManager.updateService(serviceId, {
    id: 9999,
    name: 'Desarrollo Web Premium',
    description: 'Landing page con estrategia SEO y optimización.',
    duration: 180,
    price: 3200,
    category: 'Web',
    available: false
  })
);

console.log('\n--- Eliminación de servicio ---');
const servicesBeforeDelete = await serviceManager.getServices();
const serviceToDelete = servicesBeforeDelete[servicesBeforeDelete.length - 1]?.id ?? serviceId;
console.log(await serviceManager.deleteService(serviceToDelete));

console.log('\n--- Consulta final de control ---');
console.log(await serviceManager.getServices());
