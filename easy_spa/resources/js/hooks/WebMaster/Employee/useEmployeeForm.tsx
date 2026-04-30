import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/lib/axios';

type Option = {
  id: number;
  name: string;
  spa_id?: number;
};

type EmployeeForm = {
  spa_id: string;
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
  spa_id: '',
  name: '',
  surname: '',
  gender: '',
  email: '',
  telephone: '',
  is_active: true,
};

const getList = (response: any) => {
  return response.data.data?.data ?? response.data.data ?? response.data ?? [];
};

export function useEmployeeForm(spaSlug?: string, employeeId?: string) {
  const navigate = useNavigate();

  const [spaId, setSpaId] = useState<number | null>(null);
  const [form, setForm] = useState<EmployeeForm>(initialForm);
  const [categories, setCategories] = useState<Option[]>([]);
  const [errors, setErrors] = useState<EmployeeErrors>({});
  const [loading, setLoading] = useState(false);
  const [loadingOptions, setLoadingOptions] = useState(true);

  useEffect(() => {
    if (!spaSlug) {
      setLoadingOptions(false);
      return;
    }

    const fetchOptions = async () => {
      try {
        setLoadingOptions(true);

        const [spaRes, categoriesRes] = await Promise.all([
          api.get(`/api/webmaster/spas/${spaSlug}`),
          api.get('/api/webmaster/employees'),
        ]);

        const spa = spaRes.data.data ?? spaRes.data;
        const currentSpaId = spa.id;

        setSpaId(currentSpaId);

        setForm((prev) => ({
          ...prev,
          spa_id: String(currentSpaId),
        }));

        setCategories(
          getList(categoriesRes)
            .filter((category: any) => Number(category.spa_id) === Number(currentSpaId))
            .map((category: any) => ({
              id: category.id,
              name: category.name,
              spa_id: category.spa_id,
            }))
        );

        if (employeeId) {
          const employeeRes = await api.get(`/api/webmaster/employees/${employeeId}`);
          const employee = employeeRes.data.data ?? employeeRes.data;

          setForm({
            spa_id: String(employee.spa_id ?? currentSpaId),
            name: employee.name ?? '',
            surname: employee.surname ?? '',
            gender: employee.gender ?? '',
            email: employee.email ?? '',
            telephone: employee.telephone ?? '',
            is_active: Boolean(employee.is_active),
          });
        }
      } catch (error) {
        console.error(error);
        setErrors({
          general: 'No se han podido cargar los datos necesarios.',
        });
      } finally {
        setLoadingOptions(false);
      }
    };

    fetchOptions();
  },[spaSlug]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
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

  //constantes del formulario
  //crear empleado
  const createEmployee = async (e: FormEvent) => {
    e.preventDefault();

    if (!spaId) {
      setErrors({
        general: 'No se ha podido identificar el spa.',
      });
      return;
    }
    setLoading(true);
    setErrors({});

    try {
      await api.post('/api/webmaster/employees', {
        spa_id: spaId,
        name: form.name,
        surname: form.surname,
        gender: form.gender || null,
        email: form.email || null,
        telephone: form.telephone || null,
        is_active: form.is_active,
      });

      navigate(`/dashboard/spas/${spaSlug}`);
    } catch (error: any) {
      console.log('STATUS:', error.response?.status);
      console.log('ERRORES:', error.response?.data);

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

  //actualizar empleado
  const updateEmployee = async (e: FormEvent) => {
    e.preventDefault();

    if (!spaId) {
      setErrors({
        general: 'No se ha podido identificar el spa.',
      });
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      await api.put(`/api/webmaster/employees/${employeeId}`, {
        spa_id: spaId,
        name: form.name,
        surname: form.surname,
        gender: form.gender || null,
        email: form.email || null,
        telephone: form.telephone || null,
        is_active: form.is_active,
      });

      navigate(`/dashboard/spas/${spaSlug}`);
    } catch (error: any) {
      console.log('STATUS:', error.response?.status);
      console.log('ERRORES:', error.response?.data);

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