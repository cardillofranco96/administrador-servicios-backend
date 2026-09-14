import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('home', {
    title: 'Turnos y Reservas',
    message: 'Bienvenido al sistema de turnos y reservas'
  });
});

router.get('/services', async (req, res) => {
  try {
    const response = await fetch(`http://localhost:${process.env.PORT || 8080}/api/services`);
    const services = await response.json();
    res.render('services', { title: 'Servicios', services });
  } catch (error) {
    res.render('services', { title: 'Servicios', services: [] });
  }
});

export default router;
