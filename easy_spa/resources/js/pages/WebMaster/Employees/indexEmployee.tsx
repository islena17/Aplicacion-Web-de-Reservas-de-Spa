import WMLayout from '@/components/layouts/WMLayout';
import useEmployees from '@/hooks/WebMaster/Employee/useEmployees';
import EmployeesIndexLayout from '@/components/layouts/panel/employeesIndexLayout';
import { useParams } from 'react-router-dom';

export default function WebmasterEmployeesIndex() {
    const { slug } = useParams();

  const {
    employees,
    loading,
    error,
    lastPage,
    setPage,
    page,
  } = useEmployees(slug);

  return (
    <WMLayout>
      <EmployeesIndexLayout
        title="Empleados"
        description="Gestiona los empleados asignados a tus spas."
        employees={employees}
        loading={loading}
        error={error}
        page={page}
        lastPage={lastPage}
        setPage={setPage}
        createPath="/webmaster/employees/create"
        getShowPath={(emp) => `/dashboard/spas/${slug}/employees/${emp.id}`}
        getEditPath={(emp) => `/dashboard/spas/${slug}/employees/${emp.id}/edit`}
      />
    </WMLayout>
  );
}