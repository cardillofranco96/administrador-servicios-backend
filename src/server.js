import './config/env.config.js';
import { config, MONGO_URI } from './config/env.config.js';
import app from './app.js';
import mongoose from 'mongoose';
import http from 'http';
import { Server } from 'socket.io';

const PORT = Number(config.PORT) || 3000;

async function start() {
  if (MONGO_URI) {
    try {
      await mongoose.connect(MONGO_URI);
      console.log('✅ Conectado a MongoDB');
    } catch (err) {
      console.error('❌ Error conectando a MongoDB:', err.message);
      process.exit(1);
    }
  }

  const httpServer = http.createServer(app);
  const io = new Server(httpServer);

  // expose io to controllers via app
  app.set('io', io);

  io.on('connection', (socket) => {
    console.log('Cliente socket conectado', socket.id);
  });

  httpServer.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
  });
}

start();
