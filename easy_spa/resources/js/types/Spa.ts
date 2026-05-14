import type { User } from './user';
import type { ServiceCategory } from './serviceCategory';
import type { Service } from './service';
import type { Employee } from './employee';
import type { SpaSchedule } from './spaSchedule';
import type { Reservation } from './reservation';
import type { Client } from './client';

export type Spa = {
  id: number;
  user_id: number;
  name: string;
  slug: string;
  description?: string | null;
  address?: string | null;
  city?: string | null;
  postal_code?: string | null;
  phone?: string | null;
  email?: string | null;
  opening_time?: string | null;
  closing_time?: string | null;
  logo?: string | null;
  logo_url?: string | null;
  is_active: boolean;

  owner?: User;
  categories?: ServiceCategory[];
  services?: Service[];
  employees?: Employee[];
  spa_schedules?: SpaSchedule[];
  reservations?: Reservation[];
  clients?: Client[];
};