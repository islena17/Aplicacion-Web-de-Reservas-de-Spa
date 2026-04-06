import { BrowserRouter, Routes, Route } from 'react-router-dom';

function Login() {
    return <h1>Login</h1>;
}

function Dashboard() {
    return <h1>Dashboard</h1>;
}

export default function MainApp() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    );
}