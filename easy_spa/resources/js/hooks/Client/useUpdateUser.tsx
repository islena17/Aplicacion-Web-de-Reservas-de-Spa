import api from "@/lib/axios";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type UserForm = {
    email: string;
    password: string;

    client: {
        name: string;
        surname: string;
        telephone: string;
    };

};

type UserErrors = Partial<Record<keyof UserForm, string[]>> & {
    'client.name'?: string[];
    'client.surname'?: string[];
    'client.telephone'?: string[];
    general?: string;
};

const initialForm: UserForm = {
    email: '',
    password: '',

    client: {
        name: '',
        surname: '',
        telephone: '',
    },

};

export function useUpdateUser() {
    const navigate = useNavigate();
    const [form, setForm] = useState<UserForm>(initialForm);
    const [errors, setErrors] = useState<UserErrors>({});
    const [loading, setLoading] = useState(false);
    const [loadingOptions, setLoadingOptions] = useState(true);

    useEffect(() => {
        const fetchData = async () => {


            try {
                setLoadingOptions(true);

                const [userRes] = await Promise.all([
                    api.get(`/api/client/profile`),
                ]);
                const user = userRes.data.data ?? userRes.data;

                setForm({
                    email: user.user?.email ?? user.email ?? '',
                    password: '',

                    client: {
                        name: user.name ?? '',
                        surname: user.surname ?? '',
                        telephone: user.telephone ?? '',
                    },
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

        if (name.includes('.')) {
            const [group, field] = name.split('.');

            setForm((prev) => ({
                ...prev,
                [group]: {
                    ...prev[group as 'client'],
                    [field]: value,
                },
            }));

            return;
        }

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const updateUser = async (e: FormEvent) => {
        e.preventDefault();



        setLoading(true);
        setErrors({});

        const payload: any = {
            email: form.email,
            name: form.client.name,
            surname: form.client.surname,
            telephone: form.client.telephone,
        };

        if (form.password.trim() !== '') {
            payload.password = form.password;
        }

        try {
            await api.put(`/api/client/profile`, payload);

            navigate(`/client/profile`);
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