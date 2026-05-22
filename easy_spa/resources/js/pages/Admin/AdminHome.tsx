import AdminLayout from "@/components/layouts/AdminLayout";
import DashboardHomeLayout from "@/components/layouts/panel/DashboardLayout";
import useReservations from "@/hooks/Admin/Reservation/useReservations";

export default function AdminDashboardHome() {
  const {
    totalReservationP,
    totalReservationC,
    totalReservationCd,
    totalReservationNS,
    lastReservations,
  } = useReservations();

  const fieldStatus = (status: string) => {
    const statuses: Record<string, string> = {
      pending: "Pendiente",
      confirmed: "Confirmada",
      cancelled: "Cancelada",
      completed: "Completada",
      no_show: "No presentado",
    };

    return statuses[status] ?? status;
  };

  const statusClass = (status: string) => {
    const classes: Record<string, string> = {
      pending: "bg-warning text-dark",
      confirmed: "bg-success",
      cancelled: "bg-danger",
      completed: "bg-primary",
      no_show: "bg-secondary",
    };

    return classes[status] ?? "bg-secondary";
  };

  return (
    <AdminLayout>
      <DashboardHomeLayout
        totalReservationP={totalReservationP}
        totalReservationC={totalReservationC}
        totalReservationCd={totalReservationCd}
        totalReservationNS={totalReservationNS}
        lastReservations={lastReservations}
        fieldStatus={fieldStatus}
        statusClass={statusClass}
        showSpaStats={false}
        showSpaColumn={false}
      />
    </AdminLayout>
  );
}