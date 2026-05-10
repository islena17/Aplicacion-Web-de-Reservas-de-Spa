import AdminLayout from "@/components/layouts/AdminLayout";
import ReservationCalendar from "@/components/ReservationCalendar";
import useCalendar from "@/hooks/Admin/useCalendar";

export default function Calendar() {
    const { events, loading, error } = useCalendar();

    if (loading) return <AdminLayout><p>Cargando calendario...</p></AdminLayout>;
    if (error) return <AdminLayout><p className="text-danger">{error}</p></AdminLayout>;
    return (
        <AdminLayout>
            <ReservationCalendar events={events} />
        </AdminLayout>
    );
}