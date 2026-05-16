import SpaScheduleForm from '@/components/forms/spaScheduleForm';
import AdminLayout from '@/components/layouts/AdminLayout';
import { useSpaSchedule } from '@/hooks/Admin/Spa/useSpaSchedule';


export default function SpaSchedule() {
  const {
    days,
    loading,
    handleChange,
    saveSchedule,
  } = useSpaSchedule();

  return (
    <AdminLayout>
      <SpaScheduleForm
        days={days}
        loading={loading}
        handleChange={handleChange}
        saveSchedule={saveSchedule}
      />
    </AdminLayout>
  );
}