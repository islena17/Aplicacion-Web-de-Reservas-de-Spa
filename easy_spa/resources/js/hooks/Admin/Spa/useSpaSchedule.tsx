import { useEffect, useState } from 'react';
import api from '@/lib/axios';

export function useSpaSchedule() {
  const [days, setDays] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        setLoading(true);

        const generated = [
          { day_of_week: 0, start_time: '09:00', end_time: '17:00', is_working: false },
          { day_of_week: 1, start_time: '09:00', end_time: '17:00', is_working: true },
          { day_of_week: 2, start_time: '09:00', end_time: '17:00', is_working: true },
          { day_of_week: 3, start_time: '09:00', end_time: '17:00', is_working: true },
          { day_of_week: 4, start_time: '09:00', end_time: '17:00', is_working: true },
          { day_of_week: 5, start_time: '09:00', end_time: '17:00', is_working: true },
          { day_of_week: 6, start_time: '09:00', end_time: '17:00', is_working: false },
        ];

        const res = await api.get('/api/admin/spa-schedules');

        const saved = res.data.data ?? res.data;

        const merged = generated.map((day) => {
          const savedDay = saved.find(
            (item: any) => item.day_of_week === day.day_of_week
          );

          return savedDay
            ? {
                ...day,
                start_time: savedDay.start_time?.slice(0, 5),
                end_time: savedDay.end_time?.slice(0, 5),
                is_working: Boolean(savedDay.is_working),
              }
            : day;
        });

        setDays(merged);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, []);

  const handleChange = (index: number, field: string, value: any) => {
    const updated = [...days];
    updated[index][field] = value;
    setDays(updated);
  };

  const saveSchedule = async () => {
    setLoading(true);

    try {
      await api.post('/api/admin/spa-schedules/bulk', {
        schedules: days,
      });

      alert('Horario del spa guardado correctamente');
    } catch (error) {
      console.error(error);
      alert('Error al guardar el horario del spa');
    } finally {
      setLoading(false);
    }
  };

  return {
    days,
    loading,
    handleChange,
    saveSchedule,
  };
}