import type { Employee } from './employee';

export type EmployeeSchedule = {
  id: number;
  employee_id: number;
  date?: string | null;
  day_of_week: number | string;
  start_time?: string | null;
  end_time?: string | null;
  is_working: boolean;

  employee?: Employee;
};