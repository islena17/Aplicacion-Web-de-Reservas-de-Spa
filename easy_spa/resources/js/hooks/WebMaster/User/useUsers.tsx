import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { AxiosError } from 'axios';

import type { User, Spa } from '@/types';

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedRole, setSelectedRole] = useState('');
  const [selectedSpa, setSelectedSpa] = useState('');

  const getUsers = async (): Promise<void> => {
    try {
      setLoading(true);

      // Obtiene todos los usuarios registrados.
      const res = await api.get<{ data?: User[] } | User[]>(
        '/api/webmaster/users'
      );

      // Adapta la respuesta por si viene paginada o como array directo.
      const data = Array.isArray(res.data)
        ? res.data
        : res.data.data ?? [];

      setUsers(data);
      setError(null);
    } catch (err: unknown) {
      const error = err as AxiosError;
      console.error(error);
      setError('Error al cargar usuarios');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const deleteUser = async (id: number): Promise<void> => {
    if (!window.confirm('¿Eliminar usuario?')) return;

    try {
      // Elimina el usuario seleccionado.
      await api.delete(`/api/webmaster/users/${id}`);

      // Actualiza la lista local sin volver a cargar todos los usuarios.
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err: unknown) {
      console.error(err);
      alert('Error al eliminar');
    }
  };

  const roles = Array.from(
    new Map(
      users
        .filter((user) => user.role)
        .map((user) => [user.role!.id, user.role!])
    ).values()
  );

  const spas = Array.from(
    new Map(
      users
        // Extrae los spas asociados a empleados y administradores.
        .flatMap((user) => [
          user.employee?.spa,
          ...(user.owned_spa ?? []),
        ])
        .filter((spa): spa is Spa => !!spa)
        .map((spa) => [spa.id, spa])
    ).values()
  );

  const filteredUsers = users.filter((user) => {
    // Filtra por rol si se ha seleccionado uno.
    const matchesRole = selectedRole
      ? user.role?.id === Number(selectedRole)
      : true;

    const userSpaIds = [
      user.employee?.spa?.id,
      ...(user.owned_spa?.map((spa) => spa.id) ?? []),
    ].filter(Boolean);

    // Filtra por spa si se ha seleccionado uno.
    const matchesSpa = selectedSpa
      ? userSpaIds.includes(Number(selectedSpa))
      : true;

    return matchesRole && matchesSpa;
  });

  return {
    users,
    filteredUsers,
    roles,
    spas,
    selectedRole,
    setSelectedRole,
    selectedSpa,
    setSelectedSpa,
    loading,
    error,
    getUsers,
    deleteUser,
  };
}