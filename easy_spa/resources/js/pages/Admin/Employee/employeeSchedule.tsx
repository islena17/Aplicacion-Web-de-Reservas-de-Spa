import AdminLayout from '@/components/layouts/AdminLayout';
import { useEmployeeSchedule } from '@/hooks/Admin/Employee/useEmployeeSchedule';
import EmployeeScheduleForm from '@/components/forms/EmployeeScheduleForm';

export default function AdminEmployeeSchedule() {
  return (
    <EmployeeScheduleForm
      Layout={AdminLayout}
      useScheduleHook={useEmployeeSchedule}
    />
  );
}