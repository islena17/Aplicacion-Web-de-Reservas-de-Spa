// src/hooks/WebMaster/Client/useClientForm.ts

import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/lib/axios';

type ClientForm = {
  name: string;
  surname: string;
  email: string;
  telephone: string;
};

type ClientErrors = Partial<Record<keyof ClientForm, string[]>> & {
  general?: string;
};

const initialForm: ClientForm = {
  name: '',
  surname: '',
  email: '',
  telephone: '',
};

export function useClientForm(spaSlug?: string, clientId?: string) {
  const navigate = useNavigate();

  const [form, setForm] = useState<ClientForm>(initialForm);
  const [errors, setErrors] = useState<ClientErrors>({});
  const [loading, setLoading] = useState(false);
  const [loadingOptions, setLoadingOptions] = useState(true);

  useEffect(() => {
    if (!clientId) {
      setLoadingOptions(false);
      return;
    }

    const fetchClient = async () => {
      try {
        setLoadingOptions(true);

        const response = await api.get(`/api/webmaster/spas/${spaSlug}/clients/${clientId}`);
        const client = response.data.data ?? response.data;

        setForm({
          name: client.name ?? '',
          surname: client.surname ?? '',
          email: client.email ?? '',
          telephone: client.telephone ?? '',
        });
      } catch (error) {
        console.error(error);
        setErrors({
          general: 'No se ha podido cargar el cliente.',
        });
      } finally {
        setLoadingOptions(false);
      }
    };

    fetchClient();
  }, [clientId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updateClient = async (e: FormEvent) => {
    e.preventDefault();

    if (!clientId) {
      setErrors({
        general: 'No se ha podido identificar el cliente.',
      });
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      await api.put(`/api/webmaster/clients/${clientId}`, {
        name: form.name,
        surname: form.surname,
        email: form.email || null,
        telephone: form.telephone || null,
      });

      if (spaSlug) {
        navigate(`/dashboard/spas/${spaSlug}?tab=clientes`);
      } else {
        navigate('/dashboard/clients');
      }
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
          general: 'Ha ocurrido un error al actualizar el cliente.',
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
    updateClient,
    fieldError,
  };
}