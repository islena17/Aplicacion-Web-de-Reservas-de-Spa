import AdminLayout from '@/components/layouts/AdminLayout';
import useEmployees from '@/hooks/Admin/Employee/useEmployees';
import EmployeesIndexLayout from '@/components/layouts/panel/employeesIndexLayout';

export default function AdminEmployeesIndex() {
  const {
    employees,
    loading,
    error,
    lastPage,
    setPage,
    page,
  } = useEmployees();

  return (
    <AdminLayout>
      <EmployeesIndexLayout
        employees={employees}
        loading={loading}
        error={error}
        page={page}
        lastPage={lastPage}
        setPage={setPage}
        createPath="/admin/employees/create"
        showBackButton={false}
        getShowPath={(emp) => `/admin/employees/${emp.id}`}
        getEditPath={(emp) => `/admin/employees/${emp.id}/edit`}
      />
    </AdminLayout>
  );
}