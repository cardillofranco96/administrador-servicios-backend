import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  available: { type: Boolean, required: true }
}, { timestamps: true });

serviceSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id.toString();
  return object;
});

export const ServiceModel = mongoose.model('Service', serviceSchema);
