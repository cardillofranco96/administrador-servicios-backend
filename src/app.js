import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { engine } from 'express-handlebars';
import mongoose from 'mongoose';

import { config } from './config/env.config.js';
import apiRoutes from './routes/api.routes.js';
import viewsRoutes from './routes/views.routes.js';
import { initSocket } from './socket/socket.js';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

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
  } catch (error) {
    console.warn('⚠️ No se pudo conectar a MongoDB. Iniciando servicio con modo de demostración:', error.message);
  }

  initSocket(io);

  httpServer.listen(config.PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${config.PORT}`);
  });
}

startServer();
