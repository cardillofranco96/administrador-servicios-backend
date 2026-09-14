import mongoose from 'mongoose';

const bookingServiceSchema = new mongoose.Schema({
  service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  quantity: { type: Number, default: 1 }
}, { _id: false });

const bookingSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  clientEmail: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  status: { type: String, required: true },
  services: { type: [bookingServiceSchema], default: [] }
}, { timestamps: true });

bookingSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id.toString();
  return object;
});

export const BookingModel = mongoose.model('Booking', bookingSchema);
