
import type { User } from './user';
import type { Service } from './service';
import type { Reservation } from './reservation';
import type { EmployeeBlock } from './employeeBlock.ts';
import type { EmployeeSchedule } from './employeeSchedule';
import { Spa } from './Spa';

export type Employee = {
  id: number;
  spa_id: number;
  user_id?: number | null;
  name: string;
  surname: string;
  gender?: string | null;
  email?: string | null;
  telephone?: string | null;
  specialty?: string | null;
  timetable_colour?: string | null;
  is_active: boolean;

  spa?: Spa;
  user?: User | null;
  services?: Service[];
  reservations?: Reservation[];
  employee_blocks?: EmployeeBlock[];
  employee_schedules?: EmployeeSchedule[];
};