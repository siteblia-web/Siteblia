import React, { useState } from "react";
import "./index.css";

const demoBusinesses = [
  {
    id: "SITE-001",
    name: "Tienda Ejemplo",
    type: "Tienda online",
    status: "Activa",
    domain: "tiendaejemplo.com",
  },
  {
    id: "SITE-002",
    name: "Mi Segundo Negocio",
    type: "Servicios",
    status: "Activa",
    domain: "misegundonegocio.com",
  },
];

function App() {
  const [view, setView] = useState("login");
  const [role, setRole] = useState("client");
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [clientSection, setClientSection] = useState("home");
  const [adminSection, setAdminSection] = useState("home");

  const login = (loginRole = "client") => {
    setRole(loginRole);

    if (loginRole === "admin") {
      setView("admin");
    } else {
      setView("businesses");
    }
  };

  const logout = () => {
    setSelectedBusiness(null);
    setView("login");
    setRole("client");
  };

  const selectBusiness = (business) => {
    setSelectedBusiness(business);
    setClientSection("home");
    setView("client");
  };

  if (view === "login") {
    return <Login onLogin={login} onRegister={() => setView("register")} />;
  }

  if (view === "register") {
    return (
      <Register
        onBack={() => setView("login")}
        onComplete={() => setView("businesses")}
      />
    );
  }

  if (view === "businesses") {
    return (
      <BusinessSelector
        businesses={demoBusinesses}
        onSelect={selectBusiness}
        onLogout={logout}
        onAdmin={() => {
          setRole("admin");
          setView("admin");
        }}
      />
    );
  }

  if (view === "client") {
    return (
      <ClientDashboard
        business={selectedBusiness}
        section={clientSection}
        setSection={setClientSection}
        onBusinesses={() => setView("businesses")}
        onLogout={logout}
      />
    );
  }

  if (view === "admin") {
    return (
      <AdminDashboard
        section={adminSection}
        setSection={setAdminSection}
        onLogout={logout}
      />
    );
  }

  return null;
}

/* =========================================================
   LOGIN
========================================================= */

function Login({ onLogin, onRegister }) {
  return (
    <div className="auth-page">
      <section className="auth-left">
        <div className="auth-brand">
          <span className="brand-symbol">S</span>
          Siteblia
        </div>

        <div className="auth-presentation">
          <span className="yellow-label">PLATAFORMA DIGITAL</span>

          <h1>
            Tu negocio.
            <br />
            <strong>Tu presencia.</strong>
          </h1>

          <p>
            Administra tu sitio web, negocio, facturación, pagos,
            estadísticas y herramientas digitales desde un solo lugar.
          </p>
        </div>

        <div className="auth-footer">
          © 2026 Siteblia
        </div>
      </section>

      <
