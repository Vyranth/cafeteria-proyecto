// server.ts
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

import connectDB from './db';
import productRoutes from './productRoutes';
import reservationRoutes from './reservationRoutes';

connectDB();

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Rutas de la API
app.use('/api/products', productRoutes);
app.use('/api/reservations', reservationRoutes);

// Servir archivos estáticos (HTML / JS)
app.use(express.static(path.join(__dirname)));

// Cualquier otra ruta devuelve index.html
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});