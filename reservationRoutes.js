// reservationRoutes.js

const express = require('express');
const router = express.Router();

const {
  getReservations,
  createReservation,
  deleteReservation,
} = require('./reservationController');

// Rutas para /api/reservations
router.route('/')
  .get(getReservations)
  .post(createReservation);

router.route('/:id')
  .delete(deleteReservation);

module.exports = router;