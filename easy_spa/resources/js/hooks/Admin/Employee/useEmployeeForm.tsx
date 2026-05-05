import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/lib/axios';

type EmployeeForm = {
  name: string;
  surname: string;
  gender: string;
  email: string;
  telephone: string;
  is_active: boolean;
};

type EmployeeErrors = Partial<Record<keyof EmployeeForm, string[]>> & {
  general?: string;
};

const initialForm: EmployeeForm = {
  name: '',
  surname: '',
  gender: '',
  email: '',
  telephone: '',
  is_active: true,
};

export function useEmployeeForm(employeeId?: string) {
  const navigate = useNavigate();

  const [form, setForm] = useState<EmployeeForm>(initialForm);
  const [errors, setErrors] = useState<EmployeeErrors>({});
  const [loading, setLoading] = useState(false);
  const [loadingOptions, setLoadingOptions] = useState(false);

  useEffect(() => {
    if (!employeeId) return;

    const fetchEmployee = async () => {
      try {
        setLoadingOptions(true);

        const res = await api.get(`/api/admin/employees/${employeeId}`);
        const employee = res.data.data ?? res.data;

        setForm({
          name: employee.name ?? '',
          surname: employee.surname ?? '',
          gender: employee.gender ?? '',
          email: employee.email ?? '',
          telephone: employee.telephone ?? '',
          is_active: Boolean(employee.is_active),
        });
      } catch (error) {
        console.error(error);
        setErrors({
          general: 'No se ha podido cargar el empleado.',
        });
      } finally {
        setLoadingOptions(false);
      }
    };

    fetchEmployee();
  }, [employeeId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;

      setForm((prev) => ({
        ...prev,
        [name]: checked,
      }));

      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const createEmployee = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setErrors({});

    try {
      await api.post('/api/admin/employees', {
        name: form.name,
        surname: form.surname,
        gender: form.gender || null,
        email: form.email || null,
        telephone: form.telephone || null,
        is_active: form.is_active,
      });

      navigate('/admin/employees');
    } catch (error: any) {
      if (error.response?.status === 422) {
        setErrors(
          error.response.data.errors || {
            general: error.response.data.message,
          }
        );
      } else {
        setErrors({
          general: 'Ha ocurrido un error al crear el empleado.',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const updateEmployee = async (e: FormEvent) => {
    e.preventDefault();

    if (!employeeId) {
      setErrors({
        general: 'No se ha podido identificar el empleado.',
      });
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      await api.put(`/api/admin/employees/${employeeId}`, {
        name: form.name,
        surname: form.surname,
        gender: form.gender || null,
        email: form.email || null,
        telephone: form.telephone || null,
        is_active: form.is_active,
      });

      navigate('/admin/employees');
    } catch (error: any) {
      if (error.response?.status === 422) {
        setErrors(
          error.response.data.errors || {
            general: error.response.data.message,
          }
        );
      } else {
        setErrors({
          general: 'Ha ocurrido un error al actualizar el empleado.',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const fieldError = (field?: string[]) => field?.[0];

  return {
    form,
    errors,
    loading,
    loadingOptions,
    handleChange,
    createEmployee,
    updateEmployee,
    fieldError,
  };
}