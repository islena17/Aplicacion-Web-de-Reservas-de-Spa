import type { Role } from './role';
import type { Employee } from './employee';
import type { Client } from './client';
import { Spa } from './Spa';

export type User = {
  id: number;
  role_id: number;
  email: string;
  email_verified_at?: string | null;
  role?: Role;
  owned_spa?: Spa[];
  employee?: Employee | null;
  client?: Client | null;
};