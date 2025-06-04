// db.ts

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// MongooseOptions para los parámetros de conexión
const mongooseOptions: mongoose.ConnectOptions = {
  // En versiones recientes de Mongoose, useNewUrlParser y useUnifiedTopology ya están activos por defecto,
  // pero si tuvieras que especificarlos explícitamente, se verían así:
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
};

const connectDB = async (): Promise<void> => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('🔴 La variable MONGODB_URI no está definida en .env');
    }
    await mongoose.connect(uri, mongooseOptions);
    console.log('✅ Conectado a MongoDB');
  } catch (error: unknown) {
    // Como `error` puede ser de cualquier tipo, lo casteamos a `Error` para acceder a `.message`
    const err = error as Error;
    console.error('❌ Error al conectar a MongoDB:', err.message);
    process.exit(1);
  }
};

export default connectDB;