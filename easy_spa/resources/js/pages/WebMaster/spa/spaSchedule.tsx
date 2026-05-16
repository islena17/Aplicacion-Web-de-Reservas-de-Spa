import { useParams } from 'react-router-dom';
import WMLayout from '@/components/layouts/WMLayout';
import { useSpaSchedule } from '@/hooks/WebMaster/Spa/useSpaSchedule';
import SpaScheduleForm from '@/components/forms/spaScheduleForm';


export default function WebmasterSpaSchedule() {
  const { slug } = useParams();

  const {
    days,
    loading,
    handleChange,
    saveSchedule,
  } = useSpaSchedule(slug);

  return (
    <WMLayout>
      <SpaScheduleForm
        title="Horario del spa"
        days={days}
        loading={loading}
        handleChange={handleChange}
        saveSchedule={saveSchedule}
      />
    </WMLayout>
  );
}