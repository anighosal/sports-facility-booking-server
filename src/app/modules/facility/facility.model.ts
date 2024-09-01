import mongoose, { Schema } from 'mongoose';
import { TFacility } from './facility.interface';

const facilitySchema: Schema<TFacility> = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  pricePerHour: { type: Number, required: true },
  location: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
});

facilitySchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
const Facility = mongoose.model<TFacility>('Facility', facilitySchema);
export default Facility;
