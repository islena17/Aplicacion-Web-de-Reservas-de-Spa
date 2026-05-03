import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Login from './pages/Auth/Login';
import DashboardHome from './pages/WebMaster/DashboardHome';
import CreateSpa from './pages/WebMaster/spa/create';
import Index from './pages/WebMaster/spa';
import EditSpa from './pages/WebMaster/spa/edit';
import ShowSpa from './pages/WebMaster/spa/show';
import CreateReservation from './pages/WebMaster/Reservation/CreateReservation';
import EditReservation from './pages/WebMaster/Reservation/editReservation';
import CreateService from './pages/WebMaster/Services/create';
import EditService from './pages/WebMaster/Services/edit';
import CreateEmployee from './pages/WebMaster/Employees/createEmployee';
import EditEmployee from './pages/WebMaster/Employees/editEmployee';
import EditClient from './pages/WebMaster/Clients/edit';
import GlobalReservations from './pages/WebMaster/Reservation/GlobalReservation';
import CreateServiceCategory from './pages/WebMaster/Services/createServiceCategory';
import EditServiceCategory from './pages/WebMaster/Services/editServiceCategory';
import UsersIndex from './pages/WebMaster/Users/UsersIndex';
import CreateUser from './pages/WebMaster/Users/createUser';
import ShowUser from './pages/WebMaster/Users/showUser';
import ShowReservation from './pages/WebMaster/Reservation/showReservation';
import ShowCategory from './pages/WebMaster/Services/showCategory';
import ShowClient from './pages/WebMaster/Clients/showClient';
import EditUser from './pages/WebMaster/Users/editUser';


export default function MainApp() {
  return (
    <BrowserRouter>
      <Routes>
        {/* AUTH */}
        <Route path="/" element={<Login />} />

        {/* DASHBOARD */}
        <Route path="dashboard" element={<DashboardHome />} />

        {/* SPAS */}
        <Route path="dashboard/spas" element={<Index />} />
        <Route path="dashboard/spas/create" element={<CreateSpa />} />
        <Route path="dashboard/spas/:slug" element={<ShowSpa />} />
        <Route path="dashboard/spas/:slug/edit" element={<EditSpa />} />

        {/* RESERVAS DE UN SPA */}
        <Route
          path="dashboard/spas/:slug/reservations/create"
          element={<CreateReservation />}
        />
        <Route
          path="dashboard/spas/:slug/reservations/:reservationId"
          element={<ShowReservation />}
        />
        <Route
          path="dashboard/spas/:slug/reservations/:reservationId/edit"
          element={<EditReservation />}
        />

        {/* RESERVAS GLOBALES */}
        <Route
          path="dashboard/reservations"
          element={<GlobalReservations />}
        />

        {/* SERVICIOS */}
        <Route
          path="dashboard/spas/:slug/services/create"
          element={<CreateService />}
        />
        <Route
          path="dashboard/spas/:slug/services/:serviceSlug/edit"
          element={<EditService />}
        />

        {/* CATEGORÍAS */}
        <Route
          path="dashboard/spas/:slug/categories/create"
          element={<CreateServiceCategory />}
        />
        <Route
          path="dashboard/spas/:slug/categories/:categorySlug"
          element={<ShowCategory />}
        />
        <Route
          path="dashboard/spas/:slug/categories/:categorySlug/edit"
          element={<EditServiceCategory />}
        />

        {/* EMPLEADOS */}
        <Route
          path="dashboard/spas/:slug/employees/create"
          element={<CreateEmployee />}
        />
        <Route
          path="dashboard/spas/:slug/employees/:employeeId/edit"
          element={<EditEmployee />}
        />

        {/* CLIENTES */}
        <Route
          path="dashboard/spas/:slug/clients/:clientId/edit"
          element={<EditClient />}
        />
        <Route
          path="dashboard/spas/:slug/clients/:clientId"
          element={<ShowClient />}
        />

        {/* USUARIOS */}
        <Route path="dashboard/users" element={<UsersIndex />} />
        <Route path="dashboard/users/create" element={<CreateUser />} />
        <Route path="dashboard/users/:id" element={<ShowUser />} />
        <Route path="dashboard/users/:id/edit" element={<EditUser />} />
      </Routes>
    </BrowserRouter>
  );
}