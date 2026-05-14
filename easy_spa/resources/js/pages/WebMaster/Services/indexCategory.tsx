import { useParams } from 'react-router-dom';
import WMLayout from '@/components/layouts/WMLayout';
import { useServiceCategory } from '@/hooks/WebMaster/Services/useCategorys';
import CategoriesIndexLayout from '@/components/layouts/panel/categoriesLayout';


export default function WebmasterCategoriesIndex() {
    const { slug } = useParams();

    const {
        categories,
        loading,
        error,
        page,
        setPage,
        lastPage,
        deleteCategory,
    } = useServiceCategory(slug);

    return (
        <WMLayout>
            <CategoriesIndexLayout
                categories={categories}
                loading={loading}
                error={error}
                page={page}
                setPage={setPage}
                lastPage={lastPage}
                createPath={`/dashboard/spas/${slug}/categories/create`}
                getShowPath={(category) =>
                    `/dashboard/spas/${slug}/categories/${category.slug}`
                }
                getEditPath={(category) =>
                    `/dashboard/spas/${slug}/categories/${category.slug}/edit`
                }
                onDelete={deleteCategory}
            />
        </WMLayout>
    );
}