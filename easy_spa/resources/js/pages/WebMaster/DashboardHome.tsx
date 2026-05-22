import DashboardLayout from "../../components/layouts/WMLayout";
import DashboardHomeLayout from "@/components/layouts/panel/DashboardLayout";
import { useSpas } from "@/hooks/WebMaster/Spa/useSpas";
import { useGlobalReservation } from "@/hooks/WebMaster/Reservation/useGlobalReservation";

export default function DashboardHome() {
  const { totalSpas, activeSpasCount, spaTop } = useSpas();

  const {
    totalReservationP,
    totalReservationC,
    totalReservationCd,
    totalReservationNS,
    lastReservations,
    fieldStatus,
    statusClass,
  } = useGlobalReservation();

  return (
    <DashboardLayout>
      <DashboardHomeLayout
        totalSpas={totalSpas}
        activeSpasCount={activeSpasCount}
        spaTop={spaTop}
        totalReservationP={totalReservationP}
        totalReservationC={totalReservationC}
        totalReservationCd={totalReservationCd}
        totalReservationNS={totalReservationNS}
        lastReservations={lastReservations}
        fieldStatus={fieldStatus}
        statusClass={statusClass}
        showSpaStats={true}
        showSpaColumn={true}
      />
    </DashboardLayout>
  );
}