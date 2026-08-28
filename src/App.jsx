import React, { useState } from "react";
import "./index.css";

function App() {
  const [screen, setScreen] = useState("login");
  const [selectedBusiness, setSelectedBusiness] = useState(null);

  const businesses = [
    {
      id: "SITE-001",
      name: "Tienda Ejemplo",
      type: "Tienda online",
      status: "Activa",
    },
    {
      id: "SITE-002",
      name: "Mi Segundo Negocio",
      type: "Servicios",
      status: "Activa",
    },
  ];

  const goToBusiness = (business) => {
    setSelectedBusiness(business);
    setScreen("business");
  };

  const logout = () => {
    setSelectedBusiness(null);
    setScreen("login");
  };

  const backToBusinesses = () => {
    setSelectedBusiness(null);
    setScreen("businesses");
  };

  /* =========================
     INICIO DE SESIÓN
  ========================= */

  if (screen === "login") {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <div className="brand-large">
            <span className="brand-mark">S</span>
            <span>Siteblia</span>
          </div>

          <p className="auth-subtitle">
            Tu negocio, tus herramientas, todo en un solo lugar.
          </p>

          <div className="form-group">
            <label>Correo electrónico</label>
            <input
              type="email"
              placeholder="correo@ejemplo.com"
            />
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              placeholder="••••••••"
            />
          </div>

          <button
            className="primary-button full-width"
            onClick={() => setScreen("businesses")}
          >
            Iniciar sesión
          </button>

          <button className="link-button">
            ¿Olvidaste tu contraseña?
          </button>

          <div className="auth-divider">
            <span>¿Tienes un Siteblia ID?</span>
          </div>

          <button
            className="secondary-button full-width"
            onClick={() => setScreen("register")}
          >
            Crear mi cuenta
          </button>
        </div>
      </div>
    );
  }

  /* =========================
     REGISTRO
  ========================= */

  if (screen === "register") {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <button
            className="back-button"
            onClick={() => setScreen("login")}
          >
            ← Volver
          </button>

          <div className="brand-large">
            <span className="brand-mark">S</span>
            <span>Siteblia</span>
          </div>

          <h1>Crear cuenta</h1>

          <p className="auth-subtitle">
            Ingresa el Siteblia ID que te proporcionó el administrador.
          </p>

          <div className="form-group">
            <label>Siteblia ID</label>
            <input
              type="text"
              placeholder="SITE-XXXXXX"
            />
          </div>

          <div className="form-group">
            <label>Nombre</label>
            <input
              type="text"
              placeholder="Tu nombre"
            />
          </div>

          <div className="form-group">
            <label>Correo electrónico</label>
            <input
              type="email"
              placeholder="correo@ejemplo.com"
            />
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              placeholder="Crea una contraseña"
            />
          </div>

          <button
            className="primary-button full-width"
            onClick={() => setScreen("businesses")}
          >
            Crear cuenta
          </button>
        </div>
      </div>
    );
  }

  /* =========================
     MIS NEGOCIOS
  ========================= */

  if (screen === "businesses") {
    return (
      <div className="app-shell">
        <header className="topbar">
          <div className="brand">
            <span className="brand-mark">S</span>
            <span>Siteblia</span>
          </div>

          <button
            className="logout-button"
            onClick={logout}
          >
            Cerrar sesión
          </button>
        </header>

        <main className="business-selection">
          <div className="selection-header">
            <p className="eyebrow">BIENVENIDO A SITEBLIA</p>

            <h1>Elige tu negocio</h1>

            <p>
              Selecciona el sitio web que deseas administrar.
            </p>
          </div>

          <div className="business-grid">
            {businesses.map((business) => (
              <button
                key={business.id}
                className="business-card"
                onClick={() => goToBusiness(business)}
              >
                <div className="business-icon">🏢</div>

                <div className="business-info">
                  <h2>{business.name}</h2>
                  <p>{business.type}</p>
                  <small>{business.id}</small>
                </div>

                <span className="business-status">
                  {business.status}
                </span>

                <span className="business-arrow">
                  →
                </span>
              </button>
            ))}
          </div>
        </main>
      </div>
    );
  }

  /* =========================
     PANEL DEL NEGOCIO
  ========================= */

  if (screen === "business") {
    return (
      <div className="app-shell">

        <header className="topbar">

          <button
            className="brand brand-button"
            onClick={backToBusinesses}
          >
            <span className="brand-mark">S</span>
            <span>Siteblia</span>
          </button>

          <div className="topbar-business">
            <span>{selectedBusiness?.name}</span>
          </div>

          <button
            className="logout-button"
            onClick={logout}
          >
            Salir
          </button>

        </header>

        <div className="dashboard-layout">

          <aside className="sidebar">

            <div className="sidebar-business">
              <div className="business-avatar">
                {selectedBusiness?.name?.charAt(0)}
              </div>

              <div>
                <strong>
                  {selectedBusiness?.name}
                </strong>

                <small>
                  {selectedBusiness?.id}
                </small>
              </div>
            </div>

            <nav className="sidebar-nav">

              <button className="nav-item active">
                <span>⌂</span>
                Inicio
              </button>

              <button className="nav-item">
                <span>🏢</span>
                Negocio
              </button>

              <button className="nav-item">
                <span>🧾</span>
                Facturación
              </button>

              <button className="nav-item">
                <span>⚙</span>
                Configuración
              </button>

              <button className="nav-item">
                <span>?</span>
                Soporte
              </button>

            </nav>

            <div className="sidebar-bottom">

              <button
                className="switch-business"
                onClick={backToBusinesses}
              >
                ⇄ Cambiar de negocio
              </button>

              <button
                className="exit-business"
                onClick={backToBusinesses}
              >
                Salir del negocio
              </button>

            </div>

          </aside>

          <main className="dashboard-content">

            <div className="dashboard-heading">

              <div>
                <p className="eyebrow">
                  PANEL DE CONTROL
                </p>

                <h1>
                  Hola, bienvenido 👋
                </h1>

                <p>
                  Aquí tienes un resumen de tu negocio.
                </p>
              </div>

              <div className="site-status">
                <span></span>
                Sitio activo
              </div>

            </div>

            {/* ESTADÍSTICAS */}

            <section className="stats-grid">

              <div className="stat-card">
                <span>Visitantes</span>
                <strong>2,458</strong>
                <small>↑ 12.4% este mes</small>
              </div>

              <div className="stat-card">
                <span>Ventas</span>
                <strong>$2,450</strong>
                <small>↑ 8.2% este mes</small>
              </div>

              <div className="stat-card">
                <span>Pedidos</span>
                <strong>64</strong>
                <small>↑ 5.7% este mes</small>
              </div>

              <div className="stat-card">
                <span>Clientes</span>
                <strong>128</strong>
                <small>↑ 10 nuevos</small>
              </div>

            </section>

            {/* TRÁFICO */}

            <section className="dashboard-section">

              <div className="section-title">
                <div>
                  <h2>Tráfico de tu sitio web</h2>
                  <p>
                    Conoce de dónde vienen tus visitantes.
                  </p>
                </div>

                <button className="small-button">
                  Ver estadísticas
                </button>
              </div>

              <div className="traffic-grid">

                <div className="traffic-card">
                  <span>🇺🇸 Estados Unidos</span>
                  <strong>38%</strong>
                </div>

                <div className="traffic-card">
                  <span>🇵🇦 Panamá</span>
                  <strong>31%</strong>
                </div>

                <div className="traffic-card">
                  <span>🇨🇴 Colombia</span>
                  <strong>14%</strong>
                </div>

                <div className="traffic-card">
                  <span>🌎 Otros países</span>
                  <strong>17%</strong>
                </div>

              </div>

            </section>

            {/* ACCIONES */}

            <section className="dashboard-section">

              <div className="section-title">

                <div>
                  <h2>Acciones rápidas</h2>
                  <p>
                    Administra rápidamente tu negocio.
                  </p>
                </div>

              </div>

              <div className="quick-actions">

                <button>
                  <span>🏢</span>
                  Editar negocio
                </button>

                <button>
                  <span>📊</span>
                  Ver estadísticas
                </button>

                <button>
                  <span>⚙</span>
                  Configuración
                </button>

                <button>
                  <span>?</span>
                  Contactar soporte
                </button>

              </div>

            </section>

            {/* ESTADOS */}

            <section className="status-grid">

              <div className="status-card">

                <div>
                  <span>🌐 Dominio</span>
                  <strong>Activo</strong>
                </div>

                <small>
                  tuempresa.com
                </small>

              </div>

              <div className="status-card">

                <div>
                  <span>💳 Mantenimiento</span>
                  <strong>Al día</strong>
                </div>

                <small>
                  Próximo pago: próximamente
                </small>

              </div>

              <div className="status-card">

                <div>
                  <span>💰 Pasarela de pago</span>
                  <strong>No configurada</strong>
                </div>

                <small>
                  Configura una pasarela
                </small>

              </div>

            </section>

          </main>

        </div>

      </div>
    );
  }

  return null;
}

export default App;
