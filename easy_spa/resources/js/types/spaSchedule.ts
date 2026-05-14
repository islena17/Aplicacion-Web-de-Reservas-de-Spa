import type { Spa } from './Spa';

export type SpaSchedule = {
  id: number;
  spa_id: number;
  day_of_week: number | string;
  start_time?: string | null;
  end_time?: string | null;
  is_working: boolean;

  spa?: Spa;
};