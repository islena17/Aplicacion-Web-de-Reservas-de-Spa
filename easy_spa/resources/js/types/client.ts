import type { User } from './user';
import type { Reservation } from './reservation';

export type Client = {
  id: number;
  user_id?: number | null;
  name: string;
  surname: string;
  telephone?: string | null;
  email?: string | null;

  user?: User | null;
  reservations?: Reservation[];

  reservations_count?: number;
  last_reservation_date?: string | null;
};