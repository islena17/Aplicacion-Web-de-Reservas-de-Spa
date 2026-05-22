import api from "@/lib/axios";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type UserForm = {
    email: string;
    password: string;
};

type UserErrors = Partial<Record<keyof UserForm, string[]>> & {
    general?: string;
};

const initialForm: UserForm = {
    email: '',
    password: '',

};

export function useUpdateProfile() {
    const navigate = useNavigate();

    const [form, setForm] = useState<UserForm>(initialForm);
    const [errors, setErrors] = useState<UserErrors>({});
    const [loading, setLoading] = useState(false);
    const [loadingOptions, setLoadingOptions] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoadingOptions(true);

                const userRes = await api.get(`/api/admin/profile`);
                const user = userRes.data.data ?? userRes.data;

                setForm({
                    email: user.email ?? '',
                    password: '',
                });

                setErrors({});
            } catch (error) {
                console.error(error);
                setErrors({
                    general: 'No se han podido cargar los datos del usuario.',
                });
            } finally {
                setLoadingOptions(false);
            }
        };

        fetchData();
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const updateUser = async (e: FormEvent) => {
        e.preventDefault();

        setLoading(true);
        setErrors({});

        const payload: Partial<UserForm> = {
            email: form.email,
        };

        if (form.password.trim() !== '') {
            payload.password = form.password;
        }

        try {
            await api.put(`/api/admin/profile`, payload);

            navigate(`/admin/profile`);
        } catch (error: any) {
            if (error.response?.status === 422) {
                setErrors(
                    error.response.data.errors || {
                        general: error.response.data.message,
                    }
                );
            } else {
                setErrors({
                    general: 'Ha ocurrido un error al actualizar el usuario.',
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
        updateUser,
        fieldError,
    };
}