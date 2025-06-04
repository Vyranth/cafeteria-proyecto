// reservationController.ts
import { Request, Response } from 'express';
import Reservation, { IReservation } from './Reservation';

// @desc   Obtener todas las reservas
// @route  GET /api/reservations
// @access Pública (o admin)
export const getReservations = async (req: Request, res: Response): Promise<void> => {
  try {
    const reservations: IReservation[] = await Reservation.find().sort({ date: 1, time: 1 });
    res.json(reservations);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener reservas' });
  }
};

// @desc   Crear una nueva reserva
// @route  POST /api/reservations
// @access Pública
export const createReservation = async (req: Request, res: Response): Promise<void> => {
  const { customerName, customerEmail, date, time, peopleCount, notes } = req.body;
  try {
    const reservation = new Reservation({
      customerName,
      customerEmail,
      date,
      time,
      peopleCount,
      notes,
    });
    const createdReservation = await reservation.save();
    res.status(201).json(createdReservation);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la reserva' });
  }
};

// @desc   Eliminar una reserva (opcional)
// @route  DELETE /api/reservations/:id
// @access Pública (en práctica: admin)
export const deleteReservation = async (req: Request, res: Response): Promise<void> => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (reservation) {
      await reservation.remove();
      res.json({ message: 'Reserva eliminada' });
    } else {
      res.status(404).json({ message: 'Reserva no encontrada' });
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar la reserva' });
  }
};