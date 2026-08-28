import React, { useState } from "react";

function App() {
  const [activeSection, setActiveSection] = useState("Inicio");

  const menuItems = [
    { name: "Inicio", icon: "⌂" },
    { name: "Negocios", icon: "▣" },
    { name: "Facturas", icon: "▤" },
    { name: "Clientes", icon: "♙" },
    { name: "Productos", icon: "□" },
    { name: "Dominios", icon: "◎" },
    { name: "Sitios web", icon: "◈" },
    { name: "Configuración", icon: "⚙" },
  ];

  const handleNavigation = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="siteblia-app">

      {/* SIDEBAR */}

      <aside className="sidebar">

        <div className="brand">
          <div className="brand-mark">S</div>
          <div className="brand-name">Siteblia</div>
        </div>

        <div className="workspace">
          <span className="workspace-label">
            ESPACIO DE TRABAJO
          </span>

          <div className="business-selector">
            <div className="business-avatar">
              M
            </div>

            <div className="business-info">
              <strong>Mi negocio</strong>
              <span>Administrador</span>
            </div>

            <span className="selector-arrow">
              ▾
            </span>
          </div>
        </div>

        <nav className="sidebar-navigation">

          <span className="navigation-title">
            PRINCIPAL
          </span>

          {menuItems.slice(0, 5).map((item) => (
            <button
              key={item.name}
              className={
                activeSection === item.name
                  ? "navigation-item active"
                  : "navigation-item"
              }
              onClick={() => handleNavigation(item.name)}
            >
              <span className="navigation-icon">
                {item.icon}
              </span>

              <span>
                {item.name}
              </span>
            </button>
          ))}

          <span className="navigation-title secondary-title">
            PRESENCIA DIGITAL
          </span>

          {menuItems.slice(5, 7).map((item) => (
            <button
              key={item.name}
              className={
                activeSection === item.name
                  ? "navigation-item active"
                  : "navigation-item"
              }
              onClick={() => handleNavigation(item.name)}
            >
              <span className="navigation-icon">
                {item.icon}
              </span>

              <span>
                {item.name}
              </span>
            </button>
          ))}

          <span className="navigation-title secondary-title">
            SISTEMA
          </span>

          <button
            className={
              activeSection === "Configuración"
                ? "navigation-item active"
                : "navigation-item"
            }
            onClick={() => handleNavigation("Configuración")}
          >
            <span className="navigation-icon">
              ⚙
            </span>

            <span>
              Configuración
            </span>
          </button>

        </nav>

        <div className="sidebar-bottom">

          <div className="plan-card">

            <span className="plan-label">
              PLAN ACTUAL
            </span>

            <strong>
              Siteblia
            </strong>

            <p>
              Tu negocio está listo para crecer.
            </p>

            <button>
              Administrar plan
            </button>

          </div>

          <div className="user-profile">

            <div className="user-avatar">
              U
            </div>

            <div className="user-details">
              <strong>
                Usuario
              </strong>

              <span>
                Administrador
              </span>
            </div>

            <button className="profile-menu">
              •••
            </button>

          </div>

        </div>

      </aside>

      {/* MAIN CONTENT */}

      <div className="main-area">

        <header className="topbar">

          <div className="breadcrumb">

            <span>
              Siteblia
            </span>

            <span>
              /
            </span>

            <strong>
              {activeSection}
            </strong>

          </div>

          <div className="topbar-actions">

            <button className="notification-button">
              ♢
              <span className="notification-dot"></span>
            </button>

            <button className="help-button">
              ?
            </button>

          </div>

        </header>

        <main className="content">

          {activeSection === "Inicio" && (
            <Dashboard />
          )}

          {activeSection === "Negocios" && (
            <PlaceholderPage
              title="Negocios"
              description="Administra la información de tus negocios."
              icon="▣"
            />
          )}

          {activeSection === "Facturas" && (
            <PlaceholderPage
              title="Facturas"
              description="Crea, administra y consulta las facturas de tu negocio."
              icon="▤"
            />
          )}

          {activeSection === "Clientes" && (
            <PlaceholderPage
              title="Clientes"
              description="Administra la información y el historial de tus clientes."
              icon="♙"
            />
          )}

          {activeSection === "Productos" && (
            <PlaceholderPage
              title="Productos"
              description="Administra tus productos, precios e inventario."
              icon="□"
            />
          )}

          {activeSection === "Dominios" && (
            <PlaceholderPage
              title="Dominios"
              description="Conecta y administra los dominios de tus sitios."
              icon="◎"
            />
          )}

          {activeSection === "Sitios web" && (
            <PlaceholderPage
              title="Sitios web"
              description="Crea y administra los sitios web de tus negocios."
              icon="◈"
            />
          )}

          {activeSection === "Configuración" && (
            <PlaceholderPage
              title="Configuración"
              description="Configura tu cuenta y las preferencias de Siteblia."
              icon="⚙"
            />
          )}

        </main>

      </div>

    </div>
  );
}


/* DASHBOARD */

function Dashboard() {
  return (
    <div className="dashboard">

      <div className="page-heading">

        <div>
          <span className="page-eyebrow">
            PANEL DE CONTROL
          </span>

          <h1>
            Bienvenido a Siteblia
          </h1>

          <p>
            Aquí podrás administrar tu negocio desde un solo lugar.
          </p>
        </div>

        <button className="primary-action">
          + Crear factura
        </button>

      </div>


      {/* STATS */}

      <section className="stats-grid">

        <StatCard
          title="Ventas"
          value="$0.00"
          description="Este mes"
          icon="↗"
        />

        <StatCard
          title="Facturas"
          value="0"
          description="Este mes"
          icon="▤"
        />

        <StatCard
          title="Clientes"
          value="0"
          description="Registrados"
          icon="♙"
        />

        <StatCard
          title="Productos"
          value="0"
          description="Registrados"
          icon="□"
        />

      </section>


      {/* MAIN DASHBOARD GRID */}

      <section className="dashboard-grid">

        <div className="dashboard-panel large-panel">

          <div className="panel-header">

            <div>
              <h2>
                Actividad de ventas
              </h2>

              <p>
                Resumen de tus ventas recientes.
              </p>
            </div>

            <button>
              Ver todo
            </button>

          </div>

          <div className="empty-state">

            <div className="empty-icon">
              ↗
            </div>

            <h3>
              Aún no hay ventas
            </h3>

            <p>
              Cuando registres tus primeras ventas,
              aparecerán aquí.
            </p>

          </div>

        </div>


        <div className="dashboard-panel">

          <div className="panel-header">

            <div>
              <h2>
                Acciones rápidas
              </h2>

              <p>
                Accede rápidamente a las funciones principales.
              </p>
            </div>

          </div>

          <div className="quick-actions">

            <button>
              <span>▤</span>
              <div>
                <strong>
                  Crear factura
                </strong>

                <small>
                  Generar una nueva factura
                </small>
              </div>
            </button>

            <button>
              <span>♙</span>
              <div>
                <strong>
                  Nuevo cliente
                </strong>

                <small>
                  Agregar un cliente
                </small>
              </div>
            </button>

            <button>
              <span>□</span>
              <div>
                <strong>
                  Nuevo producto
                </strong>

                <small>
                  Agregar un producto
                </small>
              </div>
            </button>

            <button>
              <span>◈</span>
              <div>
                <strong>
                  Crear sitio web
                </strong>

                <small>
                  Crear la página de tu negocio
                </small>
              </div>
            </button>

          </div>

        </div>

      </section>


      {/* GETTING STARTED */}

      <section className="getting-started">

        <div className="getting-started-content">

          <span className="page-eyebrow">
            PRIMEROS PASOS
          </span>

          <h2>
            Configura tu negocio
          </h2>

          <p>
            Completa estos pasos para comenzar a utilizar
            todas las herramientas de Siteblia.
          </p>

        </div>

        <div className="setup-progress">

          <div className="progress-header">

            <span>
              Configuración
            </span>

            <strong>
              0%
            </strong>

          </div>

          <div className="progress-bar">

            <div className="progress-value"></div>

          </div>

        </div>

        <div className="setup-items">

          <SetupItem
            number="1"
            title="Configura tu negocio"
            description="Agrega la información de tu negocio."
          />

          <SetupItem
            number="2"
            title="Agrega tus productos"
            description="Crea tu catálogo de productos."
          />

          <SetupItem
            number="3"
            title="Agrega tus clientes"
            description="Registra tus primeros clientes."
          />

          <SetupItem
            number="4"
            title="Crea tu sitio web"
            description="Publica tu negocio en Internet."
          />

        </div>

      </section>

    </div>
  );
}


/* STAT CARD */

function StatCard({
  title,
  value,
  description,
  icon,
}) {
  return (
    <div className="stat-card">

      <div className="stat-card-top">

        <div className="stat-icon">
          {icon}
        </div>

        <span>
          {description}
        </span>

      </div>

      <div className="stat-value">
        {value}
      </div>

      <div className="stat-title">
        {title}
      </div>

    </div>
  );
}


/* SETUP ITEM */

function SetupItem({
  number,
  title,
  description,
}) {
  return (
    <div className="setup-item">

      <div className="setup-number">
        {number}
      </div>

      <div className="setup-text">

        <strong>
          {title}
        </strong>

        <span>
          {description}
        </span>

      </div>

      <button>
        Configurar →
      </button>

    </div>
  );
}


/* PLACEHOLDER */

function PlaceholderPage({
  title,
  description,
  icon,
}) {
  return (
    <div className="placeholder-page">

      <div className="placeholder-icon">
        {icon}
      </div>

      <span className="page-eyebrow">
        SITEBLIA
      </span>

      <h1>
        {title}
      </h1>

      <p>
        {description}
      </p>

      <div className="coming-soon">
        Módulo preparado para integrar con Supabase.
      </div>

    </div>
  );
}


export default App;
