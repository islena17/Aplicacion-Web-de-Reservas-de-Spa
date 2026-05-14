import type { Client } from './client';
import type { Spa } from './Spa';
import type { Service } from './service';
import type { Employee } from './employee';

export type ReservationStatus =
  | 'pending'
  | 'confirmed'
  | 'cancelled'
  | 'completed'
  | 'no_show';

export type Reservation = {
  id: number;
  client_id: number;
  spa_id: number;
  service_id: number;
  employee_id?: number | null;
  reservation_date: string;
  start_time: string;
  end_time: string;
  status: ReservationStatus | string;
  final_price?: string | number | null;
  observations?: string | null;
  reminder_sent?: boolean | number;

  client?: Client | null;
  spa?: Spa;
  service?: Service;
  employee?: Employee | null;
};