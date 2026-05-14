import type { Spa } from './Spa';
import type { Service } from './service';

export type ServiceCategory = {
  id: number;
  spa_id: number;
  name: string;
  slug: string;
  description?: string | null;
  is_active: boolean;
  order: number;

  spa?: Spa;
  services?: Service[];
  services_count?: number;
};