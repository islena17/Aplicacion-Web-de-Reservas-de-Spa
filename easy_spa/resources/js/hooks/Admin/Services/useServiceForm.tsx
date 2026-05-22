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
  image: File | null;
  capacity: string;      
  current_image: string;   
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
  image: null,
  capacity: '',
  current_image: '',
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

        // 1. Cargar categorías
        const categoriesRes = await api.get('/api/admin/categories');
        const cats = categoriesRes.data.data ?? categoriesRes.data ?? [];
        setCategories(Array.isArray(cats) ? cats : []);

        // 2. Cargar datos del servicio si es edición
        if (serviceSlug) {
          const serviceRes = await api.get(`/api/admin/services/${serviceSlug}`);
          const s = serviceRes.data.data ?? serviceRes.data;

          if (s) {
            setForm({
              service_category_id: String(s.service_category_id ?? s.category?.id ?? ''),
              name: s.name ?? '',
              slug: s.slug ?? '',
              description: s.description ?? '',
              capacity: s.capacity ?? '',
              image: null, // El input file empieza vacío siempre
              current_image: s.image_url ?? s.image ?? '', // Usamos la URL que venga del storage
              length_minutes: String(s.length_minutes ?? ''),
              price: String(s.price ?? ''),
              requires_employee: Boolean(s.requires_employee),
              is_active: Boolean(s.is_active),
            });
          }
        }
      } catch (error) {
        console.error("Error cargando datos del servicio:", error);
        setErrors({ general: 'No se han podido cargar los datos del servicio.' });
      } finally {
        setLoadingOptions(false);
      }
    };

    fetchOptions();
  }, [serviceSlug]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;

    if (type === 'file') {
      setForm((prev) => ({
        ...prev,
        [name]: target.files?.[0] ?? null,
      }));
      return;
    }

    if (type === 'checkbox') {
      setForm((prev) => ({
        ...prev,
        [name]: target.checked,
      }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Función auxiliar para construir FormData (necesaria para enviar archivos)
  const buildFormData = (method: 'POST' | 'PUT') => {
    const formData = new FormData();

    // Simulación de método para Laravel en caso de ser PUT
    if (method === 'PUT') {
      formData.append('_method', 'PUT');
    }

    formData.append('service_category_id', form.service_category_id);
    formData.append('name', form.name);
    formData.append('length_minutes', form.length_minutes);
    formData.append('capacity', form.capacity);
    formData.append('price', form.price);
    formData.append('requires_employee', form.requires_employee ? '1' : '0');
    formData.append('is_active', form.is_active ? '1' : '0');
    
    if (form.description) formData.append('description', form.description);
    if (form.slug) formData.append('slug', form.slug);
    
    // Solo adjuntamos la imagen si el usuario seleccionó un archivo nuevo
    if (form.image instanceof File) {
      formData.append('image', form.image);
    }

    return formData;
  };

  const createService = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const formData = buildFormData('POST');
      await api.post('/api/admin/services', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      navigate('/admin/services');
    } catch (error: any) {
      handleApiError(error, 'crear');
    } finally {
      setLoading(false);
    }
  };

  const updateService = async (e: FormEvent) => {
    e.preventDefault();
    if (!serviceSlug) return;

    setLoading(true);
    setErrors({});

    try {
      const formData = buildFormData('PUT');
      
      // Enviamos vía POST con _method PUT porque PHP no procesa multipart/form-data en PUT
      await api.post(`/api/admin/services/${serviceSlug}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      navigate('/admin/services');
    } catch (error: any) {
      handleApiError(error, 'actualizar');
    } finally {
      setLoading(false);
    }
  };

  const handleApiError = (error: any, action: string) => {
    console.error(`Error al ${action} servicio:`, error);
    if (error.response?.status === 422) {
      setErrors(error.response.data.errors);
    } else {
      setErrors({ general: `Ha ocurrido un error al ${action} el servicio.` });
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