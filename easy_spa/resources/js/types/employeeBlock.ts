import type { Employee } from './employee';

export type EmployeeBlock = {
  id: number;
  employee_id: number;
  date: string;
  start_time: string;
  end_time: string;
  reason?: string | null;
  is_available: boolean;

  employee?: Employee;
};