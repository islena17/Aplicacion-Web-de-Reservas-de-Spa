import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/lib/axios';

export function useSpaForm(spa: any) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    slug: '',
    description: '',
    address: '',
    city: '',
    postal_code: '',
    phone: '',
    email: '',
    opening_time: '',
    closing_time: '',
    logo: null as File | null,
  });

  const [currentLogo, setCurrentLogo] = useState('');
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (spa) {
      // Carga los datos actuales del spa en el formulario.
      setForm({
        name: spa.name ?? '',
        slug: spa.slug ?? '',
        description: spa.description ?? '',
        address: spa.address ?? '',
        city: spa.city ?? '',
        postal_code: spa.postal_code ?? '',
        phone: spa.phone ?? '',
        email: spa.email ?? '',
        opening_time: spa.opening_time?.slice(0, 5) ?? '',
        closing_time: spa.closing_time?.slice(0, 5) ?? '',
        logo: null,
      });

      // Guarda el logo actual para mostrarlo en la vista.
      setCurrentLogo(spa.logo ?? '');
    }
  }, [spa]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;

    // Gestiona la subida del nuevo logo.
    if (target.type === 'file') {
      setForm({ ...form, [target.name]: target.files?.[0] ?? null });
      return;
    }

    // Actualiza el valor del campo modificado.
    setForm({ ...form, [target.name]: target.value });
  };

  const fieldError = (error: any) => {
    // Devuelve el primer mensaje cuando el error viene como array.
    return Array.isArray(error) ? error[0] : error;
  };

  const updateSpa = async (e: React.FormEvent, slug?: string) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const formData = new FormData();

      // Añade al FormData solo los campos con valor.
      Object.entries(form).forEach(([key, value]) => {
        if (value !== null && value !== '') {
          formData.append(key, value as any);
        }
      });

      // Permite enviar la actualización usando POST con método PUT simulado.
      formData.append('_method', 'PUT');

      const url = slug
        ? `/api/admin/spas/${slug}`
        : `/api/admin/spa`;

      // Envía los datos del spa, incluyendo imagen si se ha seleccionado.
      await api.post('/api/admin/spa-profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Vuelve a la pantalla anterior al actualizar correctamente.
      navigate(-1);
    } catch (error: any) {
      // Guarda los errores de validación devueltos por Laravel.
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({
          general: 'No se pudo actualizar el spa.',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    errors,
    loading,
    currentLogo,
    handleChange,
    updateSpa,
    fieldError,
  };
}