import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { engine } from 'express-handlebars';
import mongoose from 'mongoose';

import { config } from './config/env.config.js';
import apiRoutes from './routes/api.routes.js';
import viewsRoutes from './routes/views.routes.js';
import { initSocket } from './socket/socket.js';
import { Service } from './models/Service.js';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

const seedServices = [
  {
    name: 'Mantenimiento preventivo de PC',
    description: 'Limpieza, optimización de sistema, revisión de hardware y mantenimiento para equipos de escritorio y notebooks.',
    duration: 60,
    price: 3500,
    category: 'Infraestructura',
    available: true
  },
  {
    name: 'Soporte técnico presencial',
    description: 'Asistencia en sitio para instalación de equipos, conexión de redes, diagnósticos y resolución de fallas físicas.',
    duration: 90,
    price: 5200,
    category: 'On-site',
    available: true
  },
  {
    name: 'Soporte técnico remoto',
    description: 'Resolución de problemas operativos, configuración de sistema, software y seguridad desde soporte remoto.',
    duration: 45,
    price: 2800,
    category: 'Remoto',
    available: true
  },
  {
    name: 'Diagnóstico y reparación de redes',
    description: 'Análisis de conectividad, routers, switches, Wi-Fi, fallas de infraestructura y configuración de redes locales.',
    duration: 75,
    price: 4600,
    category: 'Redes',
    available: true
  },
  {
    name: 'Instalación de cámaras y seguridad',
    description: 'Montaje, configuración y conectividad de sistemas de vigilancia para hogares, oficinas y comercios.',
    duration: 120,
    price: 6800,
    category: 'Seguridad',
    available: true
  },
  {
    name: 'Recuperación de datos y respaldo',
    description: 'Copias de seguridad, restauración de información y recuperación ante fallas de discos o sistemas.',
    duration: 90,
    price: 6100,
    category: 'Backup',
    available: true
  }
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

app.use('/api', apiRoutes);
app.use('/', viewsRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

async function startServer() {
  try {
    await mongoose.connect(config.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000
    });
    console.log('✅ Conectado a MongoDB');

    const count = await Service.countDocuments();
    if (count === 0) {
      await Service.insertMany(seedServices);
      console.log('🧩 Servicios iniciales cargados en la base de datos');
    }
  } catch (error) {
    console.warn('⚠️ No se pudo conectar a MongoDB. Iniciando servicio con modo de demostración:', error.message);
  }

  initSocket(io);

  httpServer.listen(config.PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${config.PORT}`);
  });
}

startServer();
