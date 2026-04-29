import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Login from './pages/Auth/Login';
import DashboardHome from './pages/WebMaster/DashboardHome';
import CreateSpa from './pages/WebMaster/spa/create';
import Index from './pages/WebMaster/spa';
import EditSpa from './pages/WebMaster/spa/edit';
import ShowSpa from './pages/WebMaster/spa/show';
import CreateReservation from './pages/WebMaster/Reservation/Create';
import EditReservation from './pages/WebMaster/Reservation/edit';
import CreateService from './pages/WebMaster/Services/create';


export default function MainApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<DashboardHome />} />

        <Route path="/dashboard/spas" element={<Index />} />
        <Route path="/dashboard/spas/create" element={<CreateSpa />} />

        <Route path="/dashboard/spas/:slug/edit" element={<EditSpa />} />
        <Route
          path="/dashboard/spas/:slug/reservations/create"
          element={<CreateReservation />}
        />

        <Route path="/dashboard/spas/:slug" element={<ShowSpa />} />
        <Route path="/dashboard/spas/:slug/reservations/:reservationId/edit" element={<EditReservation />} />
        <Route
          path="/dashboard/spas/:slug/services/create"
          element={<CreateService />}
        />
      </Routes>
    </BrowserRouter>
  );
}