import { ServiceManager } from '../managers/ServiceManager.js';
import { BookingManager } from '../managers/BookingManager.js';

const serviceManager = new ServiceManager();
const bookingManager = new BookingManager();

export async function renderServices(req, res) {
  try {
    const result = await serviceManager.getServices({});
    const services = Array.isArray(result.docs) ? result.docs : result;
    res.render('services', { services });
  } catch (err) {
    res.status(500).send('Error rendering services');
  }
}

export async function renderAvailability(req, res) {
  try {
    const bookings = await bookingManager.getAllBookings();
    res.render('availability', { bookings });
  } catch (err) {
    res.status(500).send('Error rendering availability');
  }
}
