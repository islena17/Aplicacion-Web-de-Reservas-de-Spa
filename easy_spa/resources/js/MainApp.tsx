import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Login from './pages/Auth/Login';
import DashboardHome from './pages/WebMaster/DashboardHome';


export default function MainApp() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<DashboardHome/>} />
            </Routes>
        </BrowserRouter>
    );
}