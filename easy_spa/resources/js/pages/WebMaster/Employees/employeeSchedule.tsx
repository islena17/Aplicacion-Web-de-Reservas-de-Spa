import WMLayout from '@/components/layouts/WMLayout';
import { useEmployeeSchedule } from '@/hooks/WebMaster/Employee/useEmployeeSchedule';
import EmployeeScheduleForm from '@/components/forms/EmployeeScheduleForm';

export default function WebMasterEmployeeSchedule() {
  return (
    <EmployeeScheduleForm
      Layout={WMLayout}
      useScheduleHook={useEmployeeSchedule}
    />
  );
}