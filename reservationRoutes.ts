// reservationRoutes.ts
import { Router } from 'express';
import {
  getReservations,
  createReservation,
  deleteReservation,
} from './reservationController';

const router = Router();

router.route('/')
  .get(getReservations)
  .post(createReservation);

router.route('/:id')
  .delete(deleteReservation);

export default router;