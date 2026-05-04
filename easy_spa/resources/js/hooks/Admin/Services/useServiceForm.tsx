import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/lib/axios';

type Option = {
  id: number;
  name: string;
};

type ServiceForm = {
  service_category_id: string;
  spa_id?: string;
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
  name: '',
  slug: '',
  description: '',
  image: '',
  length_minutes: '',
  price: '',
  requires_employee: true,
  is_active: true,
};

export function useServiceForm(serviceSlug?: string) {
  const navigate = useNavigate();

  const [form, setForm] = useState<ServiceForm>(initialForm);
  const [categories, setCategories] = useState<Option[]>([]);
  const [errors, setErrors] = useState<ServiceErrors>({});
  const [loading, setLoading] = useState(false);
  const [loadingOptions, setLoadingOptions] = useState(true);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        setLoadingOptions(true);

        const categoriesRes = await api.get('/api/admin/categories');
        setCategories(categoriesRes.data.data ?? categoriesRes.data);

        if (serviceSlug) {
          const serviceRes = await api.get(`/api/admin/services/${serviceSlug}`);
          const service = serviceRes.data.data ?? serviceRes.data;

          setForm({
            service_category_id: String(service.service_category_id ?? service.category?.id ?? ''),
            name: service.name ?? '',
            slug: service.slug ?? '',
            description: service.description ?? '',
            image: service.image ?? '',
            length_minutes: String(service.length_minutes ?? ''),
            price: String(service.price ?? ''),
            requires_employee: Boolean(service.requires_employee),
            is_active: Boolean(service.is_active),
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
  }, [serviceSlug]);

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

    if (!form.service_category_id) {
      setErrors({
        service_category_id: ['La categoría es obligatoria.'],
      });
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      await api.post('/api/admin/services', {
        service_category_id: Number(form.service_category_id),
        name: form.name,
        slug: form.slug || null,
        description: form.description || null,
        image: form.image || null,
        length_minutes: Number(form.length_minutes),
        price: Number(form.price),
        requires_employee: form.requires_employee,
        is_active: form.is_active,
      });

      navigate('/admin/services');
    } catch (error: any) {
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

  const updateService = async (e: FormEvent) => {
    e.preventDefault();

    if (!serviceSlug) {
      setErrors({
        general: 'No se ha podido identificar el servicio.',
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
      await api.put(`/api/admin/services/${serviceSlug}`, {
        service_category_id: Number(form.service_category_id),
        name: form.name,
        slug: form.slug || null,
        description: form.description || null,
        image: form.image || null,
        length_minutes: Number(form.length_minutes),
        price: Number(form.price),
        requires_employee: form.requires_employee,
        is_active: form.is_active,
      });

      navigate('/admin/services');
    } catch (error: any) {
      if (error.response?.status === 422) {
        setErrors(
          error.response.data.errors || {
            general: error.response.data.message,
          }
        );
      } else {
        setErrors({
          general: 'Ha ocurrido un error al actualizar el servicio.',
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
    updateService,
    fieldError,
  };
}