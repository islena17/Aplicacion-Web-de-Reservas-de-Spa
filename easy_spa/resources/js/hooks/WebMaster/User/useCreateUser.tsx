import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/lib/axios';

type Option = {
    id: number;
    name: string;
};

type UserForm = {
    role_id: string;
    email: string;
    password: string;

    client: {
        name: string;
        surname: string;
        telephone: string;
    };

    employee: {
        name: string;
        surname: string;
        telephone: string;
        spa_id: string;
    };

    admin: {
        spa_id: string,
    },
};

type UserErrors = Partial<Record<keyof UserForm, string[]>> & {
    'client.name'?: string[];
    'client.surname'?: string[];
    'client.telephone'?: string[];
    'employee.name'?: string[];
    'employee.surname'?: string[];
    'employee.telephone'?: string[];
    'employee.spa_id'?: string[];
    'admin.spa_id'?: string[];
    general?: string;
};

const initialForm: UserForm = {
    role_id: '',
    email: '',
    password: '',

    client: {
        name: '',
        surname: '',
        telephone: '',
    },

    employee: {
        name: '',
        surname: '',
        telephone: '',
        spa_id: '',
    },

    admin: {
        spa_id: '',
    },
};

export function useCreateUser() {
    const navigate = useNavigate();

    const [form, setForm] = useState<UserForm>(initialForm);
    const [roles, setRoles] = useState<Option[]>([]);
    const [spas, setSpas] = useState<Option[]>([]);
    const [errors, setErrors] = useState<UserErrors>({});
    const [loading, setLoading] = useState(false);
    const [loadingOptions, setLoadingOptions] = useState(true);

    const selectedRole = roles.find(
        (role) => role.id === Number(form.role_id)
    );

    const isClient = selectedRole?.name === 'Client';
    const isAdmin = selectedRole?.name === 'Admin';
    const isEmployee = selectedRole?.name === 'Employee';

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                setLoadingOptions(true);

                const rolesRes = await api.get('/api/webmaster/roles');
                const spasRes = await api.get('/api/webmaster/spas');

                const rolesData = Array.isArray(rolesRes.data)
                    ? rolesRes.data
                    : rolesRes.data.data ?? [];
                const spasData = Array.isArray(spasRes.data)
                    ? spasRes.data
                    : spasRes.data.data ?? [];

                setRoles(
                    rolesData.map((role: any) => ({
                        id: role.id,
                        name: role.name,
                    }))
                );

                setSpas(
                    spasData.map((spa: any) => ({
                        id: spa.id,
                        name: spa.name,
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
                    ...prev[group as 'client' | 'employee'],
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

    const createUser = async (e: FormEvent) => {
        e.preventDefault();

        if (!form.role_id) {
            setErrors({
                role_id: ['El rol es obligatorio.'],
            });
            return;
        }

        setLoading(true);
        setErrors({});

        const payload: any = {
            role_id: Number(form.role_id),
            email: form.email,
            password: form.password,
        };

        if (isClient) {
            payload.client = {
                name: form.client.name,
                surname: form.client.surname,
                telephone: form.client.telephone,
            };
        }

        if (isEmployee) {
            payload.employee = {
                name: form.employee.name,
                surname: form.employee.surname,
                telephone: form.employee.telephone,
                spa_id: Number(form.employee.spa_id),
            };
        }

        if (isAdmin) {
            payload.admin = {
                spa_id: Number(form.admin.spa_id),
            };
        }

        try {
            await api.post('/api/webmaster/users', payload);

            navigate('/dashboard/users');
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
                    general: 'Ha ocurrido un error al crear el usuario.',
                });
            }
        } finally {
            setLoading(false);
        }
    };

    const fieldError = (field?: string[]) => field?.[0];

    return {
        form,
        roles,
        spas,
        errors,
        loading,
        loadingOptions,
        isClient,
        isEmployee,
        isAdmin,
        handleChange,
        createUser,
        fieldError,
    };
}