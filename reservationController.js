// reservationController.js

const Reservation = require('./Reservation');

// Obtener todas las reservas
const getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ date: 1, time: 1 });
    res.json(reservations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener reservas' });
  }
};

// Crear una nueva reserva
const createReservation = async (req, res) => {
  const { customerName, customerEmail, date, time, peopleCount, notes } = req.body;
  try {
    const reservation = new Reservation({ customerName, customerEmail, date, time, peopleCount, notes });
    const createdReservation = await reservation.save();
    res.status(201).json(createdReservation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la reserva' });
  }
};

// Eliminar una reserva (opcional)
const deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (reservation) {
      await reservation.remove();
      res.json({ message: 'Reserva eliminada' });
    } else {
      res.status(404).json({ message: 'Reserva no encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar la reserva' });
  }
};

module.exports = {
  getReservations,
  createReservation,
  deleteReservation,
};