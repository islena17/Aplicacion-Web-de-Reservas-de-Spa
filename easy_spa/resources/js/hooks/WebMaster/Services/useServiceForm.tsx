import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/lib/axios';

type Option = {
  id: number;
  name: string;
  spa_id?: number;
};

type ServiceForm = {
  service_category_id: string;
  spa_id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  length_minutes: string;
  price: string;
  requires_employee: boolean;
  is_active: boolean;
};

type ServiceErrors = Partial<Record<keyof ServiceForm, string[]>> & {
  general?: string;
};

const initialForm: ServiceForm = {
  service_category_id: '',
  spa_id: '',
  name: '',
  slug: '',
  description: '',
  image: '',
  length_minutes: '',
  price: '',
  requires_employee: true,
  is_active: true,
};

const getList = (response: any) => {
  return response.data.data?.data ?? response.data.data ?? response.data ?? [];
};

export function useServiceForm(spaSlug?: string) {
  const navigate = useNavigate();

  const [spaId, setSpaId] = useState<number | null>(null);
  const [form, setForm] = useState<ServiceForm>(initialForm);
  const [categories, setCategories] = useState<Option[]>([]);
  const [errors, setErrors] = useState<ServiceErrors>({});
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
          api.get('/api/webmaster/serviceCategory
            '),
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
            .filter((category: any) => category.spa_id === currentSpaId)
            .map((category: any) => ({
              id: category.id,
              name: category.name,
              spa_id: category.spa_id,
            }))
        );
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
  }, [spaSlug]);

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

  const createService = async (e: FormEvent) => {
    e.preventDefault();

    if (!spaId) {
      setErrors({
        general: 'No se ha podido identificar el spa.',
      });
      return;
    }

    if (!form.service_category_id) {
      setErrors({
        service_category_id: ['La categoría es obligatoria.'],
      });
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      await api.post('/api/webmaster/services', {
        service_category_id: Number(form.service_category_id),
        spa_id: spaId,
        name: form.name,
        slug: form.slug || null,
        description: form.description || null,
        image: form.image || null,
        length_minutes: Number(form.length_minutes),
        price: Number(form.price),
        requires_employee: form.requires_employee,
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
          general: 'Ha ocurrido un error al crear el servicio.',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const fieldError = (field?: string[]) => field?.[0];

  return {
    form,
    categories,
    errors,
    loading,
    loadingOptions,
    handleChange,
    createService,
    fieldError,
  };
}