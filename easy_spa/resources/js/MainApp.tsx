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
import CreateService from './pages/WebMaster/Services/createService';
import EditService from './pages/WebMaster/Services/editService';
import CreateEmployee from './pages/WebMaster/Employees/createEmployee';
import EditEmployee from './pages/WebMaster/Employees/editEmployee';
import EditClient from './pages/WebMaster/Clients/editClient';
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
import ProtectedRoute from './components/ProtectedRoute';
import AdminHome from './pages/Admin/AdminHome';
import AdminEditSpa from './pages/Admin/Spa/editSpa';
import AdminShowSpa from './pages/Admin/Spa/showSpa';
import AdminShowService from './pages/Admin/Services/showService';
import AdminServicesIndex from './pages/Admin/Services';
import AdminCreateService from './pages/Admin/Services/createService';
import AdminShowCategory from './pages/Admin/Category/showCategory';
import AdminCategoriesIndex from './pages/Admin/Category';
import AdminCreateCategory from './pages/Admin/Category/createCategory';
import AdminEditCategory from './pages/Admin/Category/editCategory';
import AdminCreateEmployee from './pages/Admin/Employee/createEmployee';
import AdminEditEmployee from './pages/Admin/Employee/editEmployee';
import AdminEmployeesIndex from './pages/Admin/Employee';
import AdminShowEmployee from './pages/Admin/Employee/showEmployee';
import EmployeeSchedule from './pages/Admin/Employee/employeeSchedule';
import AdminReservationsIndex from './pages/Admin/Reservation';
import AdminCreateReservation from './pages/Admin/Reservation/createReservation';
import AdminEditReservation from './pages/Admin/Reservation/editReservation';
import Calendar from './pages/Admin/calendar';
import AdminClientsIndex from './pages/Admin/Clients';
import AdminClientEdit from './pages/Admin/Clients/editClient';
import AdminClientShow from './pages/Admin/Clients/showClient';
import { Home } from './pages/Site/home';
import Spas from './pages/Site/spas';


export default function MainApp() {
  return (
    <BrowserRouter>
      <Routes>
        {/* AUTH */}
        <Route path='/' element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute role="WebMaster">
              <Routes>
                <Route path="" element={<DashboardHome />} />

                <Route path="spas" element={<Index />} />
                <Route path="spas/create" element={<CreateSpa />} />
                <Route path="spas/:slug" element={<ShowSpa />} />
                <Route path="spas/:slug/edit" element={<EditSpa />} />

                <Route path="spas/:slug/reservations/create" element={<CreateReservation />} />
                <Route path="spas/:slug/reservations/:reservationId" element={<ShowReservation />} />
                <Route path="spas/:slug/reservations/:reservationId/edit" element={<EditReservation />} />

                <Route path="reservations" element={<GlobalReservations />} />

                <Route path="spas/:slug/services/create" element={<CreateService />} />
                <Route path="spas/:slug/services/:serviceSlug/edit" element={<EditService />} />

                <Route path="spas/:slug/categories/create" element={<CreateServiceCategory />} />
                <Route path="spas/:slug/categories/:categorySlug" element={<ShowCategory />} />
                <Route path="spas/:slug/categories/:categorySlug/edit" element={<EditServiceCategory />} />

                <Route path="spas/:slug/employees/create" element={<CreateEmployee />} />
                <Route path="spas/:slug/employees/:employeeId/edit" element={<EditEmployee />} />

                <Route path="spas/:slug/clients/:clientId/edit" element={<EditClient />} />
                <Route path="spas/:slug/clients/:clientId" element={<ShowClient />} />

                <Route path="users" element={<UsersIndex />} />
                <Route path="users/create" element={<CreateUser />} />
                <Route path="users/:id" element={<ShowUser />} />
                <Route path="users/:id/edit" element={<EditUser />} />
              </Routes>
            </ProtectedRoute>

          }
        />

        <Route
          path="/admin/*"
          element={
            <ProtectedRoute role="Admin">
              <Routes>
                <Route path="" element={<AdminHome />} />
                <Route path="spa" element={<AdminShowSpa />} />
                <Route path="spa/edit" element={<AdminEditSpa />} />

                <Route path="services/:serviceSlug" element={<AdminShowService />} />
                <Route path="services" element={<AdminServicesIndex />} />
                <Route path="services/create" element={<AdminCreateService />} />

                <Route path="categories/:categorySlug" element={<AdminShowCategory />} />
                <Route path="categories" element={<AdminCategoriesIndex />} />
                <Route path="categories/create" element={<AdminCreateCategory />} />
                <Route path="categories/:categorySlug" element={<AdminEditCategory />} />

                <Route path="employees/create" element={<AdminCreateEmployee />} />
                <Route path="employees/:employeeId/edit" element={<AdminEditEmployee />} />
                <Route path="employees" element={<AdminEmployeesIndex />} />
                <Route path="employees/:employeeId" element={<AdminShowEmployee />} />
                <Route path="employees/:employeeId/schedule" element={<EmployeeSchedule />} />

                <Route path='reservations' element={<AdminReservationsIndex />} />
                <Route path='reservations/create' element={<AdminCreateReservation />} />
                <Route path='reservations/:reservationId/edit' element={<AdminEditReservation />} />

                <Route path='calendar' element={<Calendar />} />

                <Route path="clients" element={<AdminClientsIndex />} />
                <Route path='clients/:clientId/edit' element={<AdminClientEdit />} />
                <Route path='clients/:clientId' element={<AdminClientShow />} />
              </Routes>
            </ProtectedRoute>
          } />
        <Route path="spas" element={<Spas />} />
      </Routes>



    </BrowserRouter>
  )
}