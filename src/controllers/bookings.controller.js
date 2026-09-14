import { BookingManager } from '../managers/BookingManager.js';

const manager = new BookingManager();

export async function createBooking(req, res) {
  try {
    const payload = { ...req.body };
    const result = await manager.createBooking(payload);

    if (result && result.error) {
      return res.status(400).json({ error: result.error });
    }

    const io = req.app.get('io');
    if (io) io.emit('booking:created', result);

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getBookingById(req, res) {
  try {
    const { bid } = req.params;
    const booking = await manager.getBookingById(bid);

    if (booking && booking.error) {
      return res.status(404).json({ error: booking.error });
    }

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function addServiceToBooking(req, res) {
  try {
    const { bid, sid } = req.params;
    const result = await manager.addServiceToBooking(bid, sid);

    if (result && result.error) {
      // Determine type of error: booking not found (404) or service not found (404) or other
      return res.status(404).json({ error: result.error });
    }

    const io = req.app.get('io');
    if (io) io.emit('booking:serviceAdded', result);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
