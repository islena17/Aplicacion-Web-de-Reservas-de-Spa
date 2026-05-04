import { ReactNode, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../../../css/admin.css";
import api from "@/lib/axios";

type DashboardLayoutProps = {
  children: ReactNode;
};

type User = {
  email: string;
  role?: {
    name: string;
  };
};

export default function AdminLayout({ children }: DashboardLayoutProps) {
  const [user, setUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    api
      .get("/api/user")
      .then((res) => setUser(res.data))
      .catch(() => console.log("No autenticado"));
  }, []);

  return (
    <div className="dashboard-shell">
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`sidebar-custom ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-brand">
          <div className="brand-icon">S</div>
          <div>
            <h5 className="mb-0 fw-bold">Easy Spa</h5>
            <small>Admin Panel?</small>
          </div>
        </div>

        <nav className="mt-4">
          <p className="sidebar-section">Principal</p>

          <Link to="/dashboard" className="sidebar-link" onClick={() => setSidebarOpen(false)}>
            <i className="bi bi-grid"></i>
            <span>Dashboard</span>
          </Link>

          <Link to="/dashboard/reservations" className="sidebar-link" onClick={() => setSidebarOpen(false)}>
            <i className="bi bi-calendar-check"></i>
            <span>Reservas</span>
          </Link>

          <p className="sidebar-section mt-4">Gestión</p>

          <Link to="/dashboard/spas" className="sidebar-link" onClick={() => setSidebarOpen(false)}>
            <i className="bi bi-shop"></i>
            <span>Spas</span>
          </Link>

          <Link to="/dashboard/users" className="sidebar-link" onClick={() => setSidebarOpen(false)}>
            <i className="bi bi-person-badge"></i>
            <span>Usuarios</span>
          </Link>
        </nav>
      </aside>

      <main className="main-custom">
        <header className="topbar-custom">
          <button
            className="menu-btn d-lg-none"
            onClick={() => setSidebarOpen(true)}
          >
            <i className="bi bi-list"></i>
          </button>

          <div className="topbar-actions">
            <button className="icon-btn">
              <i className="bi bi-bell"></i>
            </button>

            <button className="icon-btn">
              <i className="bi bi-envelope"></i>
            </button>

            <div className="user-box">
              <div className="user-info text-end">
                <div className="fw-semibold">{user?.email || "Usuario"}</div>
                <small>{user?.role?.name || "Sin rol"}</small>
              </div>

              <div className="avatar">
                {user?.email?.charAt(0).toUpperCase() || "U"}
              </div>
            </div>
          </div>
        </header>

        <section className="content-custom">{children}</section>
      </main>
    </div>
  );
}