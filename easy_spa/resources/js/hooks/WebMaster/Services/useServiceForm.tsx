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
  capacity: string;
  image: File | null;      // Archivo real para subir
  current_image: string;   // URL de la imagen actual para la vista
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
  capacity: '',
  image: null,
  current_image: '',
  length_minutes: '',
  price: '',
  requires_employee: true,
  is_active: true,
};

export function useServiceForm(spaSlug?: string, serviceSlug?: string) {
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

        // 1. Obtener datos del SPA para ID y Categorías
        const spaRes = await api.get(`/api/webmaster/spas/${spaSlug}`);
        const spa = spaRes.data.data ?? spaRes.data;
        const currentSpaId = spa.id;

        setSpaId(currentSpaId);

        // 2. Cargar categorías del SPA
        const categoriesData = spa.categories ?? spa.service_categories ?? [];
        setCategories(
          categoriesData.map((category: any) => ({
            id: category.id,
            name: category.name,
            spa_id: category.spa_id,
          }))
        );

        // 3. Si es edición, cargar el servicio
        if (serviceSlug) {
          const serviceRes = await api.get(`/api/webmaster/services/${serviceSlug}`);
          const service = serviceRes.data.data ?? serviceRes.data;

          setForm({
            service_category_id: String(service.service_category_id ?? service.category?.id ?? ''),
            spa_id: String(service.spa_id ?? currentSpaId),
            name: service.name ?? '',
            slug: service.slug ?? '',
            description: service.description ?? '',
            capacity: service.capacity ?? '' ,
            image: null, 
            current_image: service.image_url ?? service.image ?? '', // Mostramos la ruta existente
            length_minutes: String(service.length_minutes ?? ''),
            price: String(service.price ?? ''),
            requires_employee: Boolean(service.requires_employee),
            is_active: Boolean(service.is_active),
          });
        } else {
          // Si es creación, solo seteamos el spa_id
          setForm(prev => ({ ...prev, spa_id: String(currentSpaId) }));
        }
      } catch (error) {
        console.error(error);
        setErrors({ general: 'No se han podido cargar los datos necesarios.' });
      } finally {
        setLoadingOptions(false);
      }
    };

    fetchOptions();
  }, [spaSlug, serviceSlug]);

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

  // Construcción del FormData para soportar envío de archivos
  const buildFormData = (method: 'POST' | 'PUT') => {
    const formData = new FormData();

    if (method === 'PUT') {
      formData.append('_method', 'PUT'); // Trick para Laravel
    }

    formData.append('spa_id', String(spaId));
    formData.append('service_category_id', form.service_category_id);
    formData.append('name', form.name);
    formData.append('length_minutes', form.length_minutes);
    formData.append('price', form.price);
    formData.append('capacity', form.capacity);
    formData.append('requires_employee', form.requires_employee ? '1' : '0');
    formData.append('is_active', form.is_active ? '1' : '0');
    
    if (form.slug) formData.append('slug', form.slug);
    if (form.description) formData.append('description', form.description);
    
    // Solo añadimos el archivo si el usuario seleccionó uno nuevo
    if (form.image instanceof File) {
      formData.append('image', form.image);
    }

    return formData;
  };

  const createService = async (e: FormEvent) => {
    e.preventDefault();
    if (!spaId) return setErrors({ general: 'No se ha podido identificar el spa.' });

    setLoading(true);
    setErrors({});

    try {
      const data = buildFormData('POST');
      await api.post('/api/webmaster/services', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      navigate(`/dashboard/spas/${spaSlug}?tab=servicios`);
    } catch (error: any) {
      handleError(error, 'crear');
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
      const data = buildFormData('PUT');
      // Importante: Usamos POST + _method: PUT para que PHP procese los archivos correctamente
      await api.post(`/api/webmaster/services/${serviceSlug}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      navigate(`/dashboard/spas/${spaSlug}?tab=servicios`);
    } catch (error: any) {
      handleError(error, 'actualizar');
    } finally {
      setLoading(false);
    }
  };

  const handleError = (error: any, action: string) => {
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