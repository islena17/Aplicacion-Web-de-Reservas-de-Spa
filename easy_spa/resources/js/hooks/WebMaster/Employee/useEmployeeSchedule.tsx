import { useEffect, useState } from 'react';
import api from '@/lib/axios';

export function useEmployeeSchedule(employeeId?: string) {
  const [days, setDays] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!employeeId) return;

    const fetchSchedules = async () => {
      try {
        setLoading(true);

        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();

        const totalDays = new Date(year, month + 1, 0).getDate();

        const generated = [];

        for (let i = 1; i <= totalDays; i++) {
          const date = new Date(year, month, i);

          const yyyy = date.getFullYear();
          const mm = String(date.getMonth() + 1).padStart(2, '0');
          const dd = String(date.getDate()).padStart(2, '0');
          const dateString = `${yyyy}-${mm}-${dd}`;

          generated.push({
            date: dateString,
            day_of_week: date.getDay(),
            start_time: '09:00',
            end_time: '17:00',
            is_working: true,
          });
        }

        const res = await api.get('/api/webmaster/employee-schedules', {
          params: { employee_id: employeeId },
        });

        const saved = res.data.data ?? res.data;

        const merged = generated.map((day) => {
          const savedDay = saved.find((item: any) => item.date === day.date);

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
  }, [employeeId]);

  const handleChange = (index: number, field: string, value: any) => {
    setDays((prevDays) => {
      const newDays = [...prevDays];
      newDays[index] = { ...newDays[index], [field]: value };
      return newDays;
    });
  };

  const saveSchedule = async () => {
    if (!employeeId) return;

    setLoading(true);

    try {
      await api.post('/api/webmaster/employee-schedules/bulk', {
        employee_id: employeeId,
        schedules: days,
      });

      alert('Horario guardado correctamente');
    } catch (error) {
      console.error(error);
      alert('Error al guardar el horario');
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