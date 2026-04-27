import { ReactNode } from "react";
import "../../../../css/dashboard.css";
import { useEffect, useState } from "react";
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

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    api.get("/api/user")
      .then((res) => setUser(res.data))
      .catch(() => {
        console.log("No autenticado");
      });
  }, []);
  return (
    <div className="dashboard-shell">
      <aside className="sidebar-custom">
        <div className="sidebar-brand">
          <div className="brand-icon">S</div>
          <div>
            <h5 className="mb-0 fw-bold">Easy Spa</h5>
            <small>Admin Panel</small>
          </div>
        </div>

        <nav className="mt-4">
          <p className="sidebar-section">Principal</p>
          <a href="/dashboard" className="sidebar-link active">
            <i className="bi bi-grid"></i>
            <span>Dashboard</span>
          </a>
          <a href="#" className="sidebar-link">
            <i className="bi bi-calendar-check"></i>
            <span>Reservas</span>
          </a>
          <a href="#" className="sidebar-link">
            <i className="bi bi-people"></i>
            <span>Clientes</span>
          </a>
          <a href="#" className="sidebar-link">
            <i className="bi bi-bag"></i>
            <span>Servicios</span>
          </a>

          <p className="sidebar-section mt-4">Gestión</p>
          <a href="/dashboard/spas" className="sidebar-link">
            <i className="bi bi-shop"></i>
            <span>Spas</span>
          </a>
          <a href="#" className="sidebar-link">
            <i className="bi bi-person-badge"></i>
            <span>Empleados</span>
          </a>
          <a href="#" className="sidebar-link">
            <i className="bi bi-bar-chart"></i>
            <span>Informes</span>
          </a>
          <a href="#" className="sidebar-link">
            <i className="bi bi-gear"></i>
            <span>Ajustes</span>
          </a>
        </nav>
      </aside>

      <main className="main-custom">
        <header className="topbar-custom">
          <div className="topbar-search">
            <input
              type="text"
              className="form-control search-input"
              placeholder="Buscar..."
            />
            <button className="btn btn-search">
              <i className="bi bi-search"></i>
            </button>
          </div>

          <div className="topbar-actions">
            <button className="icon-btn">
              <i className="bi bi-bell"></i>
            </button>
            <button className="icon-btn">
              <i className="bi bi-envelope"></i>
            </button>

            <div className="user-box">
              <div className="user-info text-end">
                <div className="fw-semibold">
                  {user?.email || "Usuario"}
                </div>
                <small>
                  {user?.role?.name || "Sin rol"}
                </small>
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