// Product.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category?: string;
  imageUrl?: string;
}

const productSchema: Schema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String },
  imageUrl: { type: String },
}, {
  timestamps: true,
});

export default mongoose.model<IProduct>('Product', productSchema);