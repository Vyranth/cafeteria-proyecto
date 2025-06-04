// Reservation.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IReservation extends Document {
  customerName: string;
  customerEmail: string;
  date: Date;
  time: string;
  peopleCount: number;
  notes?: string;
}

const reservationSchema: Schema = new Schema<IReservation>({
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  peopleCount: { type: Number, required: true },
  notes: { type: String },
}, {
  timestamps: true,
});

export default mongoose.model<IReservation>('Reservation', reservationSchema);