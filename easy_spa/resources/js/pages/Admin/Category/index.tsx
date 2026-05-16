import DashboardLayout from '@/components/layouts/AdminLayout';
import CategoriesIndexLayout from '@/components/layouts/panel/categoriesLayout';
import useCategories from '@/hooks/Admin/Category/useCategories';


export default function AdminCategoriesIndex() {
  const {
    categories,
    loading,
    error,
    lastPage,
    setPage,
    page,
  } = useCategories();

  return (
    <DashboardLayout>
      <CategoriesIndexLayout
        categories={categories}
        loading={loading}
        error={error}
        page={page}
        lastPage={lastPage}
        setPage={setPage}
        createPath="/admin/categories/create"
        showBackButton={false}
        getShowPath={(category) => `/admin/categories/${category.slug}`}
        getEditPath={(category) => `/admin/categories/${category.slug}/edit`}
      />
    </DashboardLayout>
  );
}