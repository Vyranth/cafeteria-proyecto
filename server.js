// server.js

const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const connectDB = require('./db');

// Conectar a MongoDB
connectDB();

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// --- RUTAS DE API ---

const productRoutes = require('./productRoutes');
const reservationRoutes = require('./reservationRoutes');

app.use('/api/products', productRoutes);
app.use('/api/reservations', reservationRoutes);

// --- SERVIR FRONTEND ---

// Como todos los HTML y JS están en la raíz, le indicamos a Express que los sirva
app.use(express.static(path.join(__dirname)));

// Fallback: si piden cualquier ruta y no coincide con /api, retornamos index.html
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

// --- ARRANQUE DEL SERVIDOR ---

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});