
import type { Employee } from './employee';
import type { ServiceCategory } from './serviceCategory';
import type { Reservation } from './reservation';
import { Spa } from './Spa';

export type Service = {
  id: number;
  service_category_id?: number | null;
  spa_id: number;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  image_url?: string | null;
  length_minutes: number;
  price: string | number;
  capacity: number;
  requires_employee: boolean;
  is_active: boolean;
  order?: number | null;

  spa?: Spa;
  employees?: Employee[];
  category?: ServiceCategory | null;
  reservations?: Reservation[];
  reservations_count: number;
};