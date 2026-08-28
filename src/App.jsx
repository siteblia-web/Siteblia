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

      <section className="auth-right">
        <div className="login-card">
          <div className="mobile-brand">
            <span className="brand-symbol">S</span>
            Siteblia
          </div>

          <div className="login-heading">
            <span className="page-label">ACCESO</span>
            <h2>Bienvenido</h2>
            <p>Ingresa a tu cuenta para continuar.</p>
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              onLogin("client");
            }}
          >
            <label>
              Correo electrónico
              <input
                type="email"
                placeholder="correo@ejemplo.com"
              />
            </label>

            <label>
              Contraseña
              <input
                type="password"
                placeholder="••••••••"
              />
            </label>

            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" />
                Recordarme
              </label>

              <button type="button" className="text-button">
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            <button className="primary-button full-width" type="submit">
              Iniciar sesión
            </button>
          </form>

          <div className="login-divider">
            <span>¿Tienes un Siteblia ID?</span>
          </div>

          <p className="login-help">
            Si el administrador de tu sitio te proporcionó un Siteblia ID,
            puedes crear tu cuenta.
          </p>

          <button
            className="secondary-button full-width"
            onClick={onRegister}
          >
            Crear cuenta
          </button>

          <button
            className="admin-demo-button"
            onClick={() => onLogin("admin")}
          >
            Acceso administrativo de demostración
          </button>
        </div>
      </section>
    </div>
  );
}

/* =========================================================
   REGISTER
========================================================= */

function Register({ onBack, onComplete }) {
  return (
    <div className="auth-page">
      <section className="auth-left">
        <div className="auth-brand">
          <span className="brand-symbol">S</span>
          Siteblia
        </div>

        <div className="auth-presentation">
          <span className="yellow-label">SITEBLIA ID</span>

          <h1>
            Conecta tu
            <br />
            <strong>negocio.</strong>
          </h1>

          <p>
            El Siteblia ID identifica el sitio web que el administrador
            ha preparado para ti.
          </p>
        </div>
      </section>

      <section className="auth-right">
        <div className="login-card">
          <button className="text-button" onClick={onBack}>
            ← Volver
          </button>

          <div className="login-heading">
            <span className="page-label">REGISTRO</span>
            <h2>Crear cuenta</h2>
            <p>Introduce los datos proporcionados por Siteblia.</p>
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              onComplete();
            }}
          >
            <label>
              Siteblia ID
              <input
                type="text"
                placeholder="SITE-XXXXXX"
              />
            </label>

            <label>
              Nombre
              <input
                type="text"
                placeholder="Tu nombre"
              />
            </label>

            <label>
              Correo electrónico
              <input
                type="email"
                placeholder="correo@ejemplo.com"
              />
            </label>

            <label>
              Contraseña
              <input
                type="password"
                placeholder="Crea una contraseña"
              />
            </label>

            <button className="primary-button full-width" type="submit">
              Crear cuenta
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

/* =========================================================
   BUSINESS SELECTOR
========================================================= */

function BusinessSelector({
  businesses,
  onSelect,
  onLogout,
  onAdmin,
}) {
  return (
    <div className="selection-page">
      <header className="simple-header">
        <div className="sidebar-brand dark-brand">
          <span className="brand-symbol">S</span>
          Siteblia
        </div>

        <button className="header-text-button" onClick={onLogout}>
          Cerrar sesión
        </button>
      </header>

      <main className="selection-content">
        <div className="selection-heading">
          <span className="page-label">TU CUENTA</span>
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
              onClick={() => onSelect(business)}
            >
              <div className="business-card-top">
                <div className="business-large-icon">S</div>

                <span className="active-badge">
                  {business.status}
                </span>
              </div>

              <div className="business-card-info">
                <h2>{business.name}</h2>
                <p>{business.type}</p>
                <span>{business.id}</span>
              </div>

              <div className="business-card-footer">
                <span>{business.domain}</span>
                <span>Administrar →</span>
              </div>
            </button>
          ))}

          <button className="add-business-card">
            <div className="add-icon">+</div>

            <h2>¿Tienes otro negocio?</h2>

            <p>
              Solicita al administrador un nuevo Siteblia ID
              para tu próximo sitio.
            </p>
          </button>
        </div>

        <button className="admin-entry" onClick={onAdmin}>
          Acceso administrativo
        </button>
      </main>
    </div>
  );
}

/* =========================================================
   CLIENT DASHBOARD
========================================================= */

function ClientDashboard({
  business,
  section,
  setSection,
  onBusinesses,
  onLogout,
}) {
  const titles = {
    home: ["INICIO", "Resumen de tu negocio"],
    business: ["NEGOCIO", "Administra el contenido de tu sitio"],
    billing: ["FACTURACIÓN", "Gestiona las facturas de tu negocio"],
    settings: ["CONFIGURACIÓN", "Administra tu cuenta y servicios"],
    support: ["SOPORTE", "Estamos aquí para ayudarte"],
  };

  const [label, description] = titles[section];

  return (
    <div className="siteblia-app">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <span className="brand-symbol">S</span>
          <span>Siteblia</span>
        </div>

        <div className="sidebar-business">
          <span className="sidebar-small-label">
            NEGOCIO ACTUAL
          </span>

          <button
            className="sidebar-business-selector"
            onClick={onBusinesses}
          >
            <div className="business-mini-icon">S</div>

            <div className="sidebar-business-text">
              <strong>{business?.name}</strong>
              <span>{business?.id}</span>
            </div>
          </button>
        </div>

        <nav className="sidebar-navigation">
          <span className="navigation-heading">
            ADMINISTRACIÓN
          </span>

          <NavItem
            icon="⌂"
            text="Inicio"
            active={section === "home"}
            onClick={() => setSection("home")}
          />

          <NavItem
            icon="🏢"
            text="Negocio"
            active={section === "business"}
            onClick={() => setSection("business")}
          />

          <NavItem
            icon="🧾"
            text="Facturación"
            active={section === "billing"}
            onClick={() => setSection("billing")}
          />

          <NavItem
            icon="⚙"
            text="Configuración"
            active={section === "settings"}
            onClick={() => setSection("settings")}
          />

          <NavItem
            icon="?"
            text="Soporte"
            active={section === "support"}
            onClick={() => setSection("support")}
          />
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-status">
            <span className="status-dot"></span>

            <div>
              <strong>Sitio activo</strong>
              <span>Todo funciona correctamente</span>
            </div>
          </div>

          <button
            className="header-text-button"
            onClick={onBusinesses}
          >
            ⇄ Cambiar de negocio
          </button>

          <div className="sidebar-user">
            <div className="user-avatar">U</div>

            <div className="user-information">
              <strong>Usuario</strong>
              <span>Cuenta cliente</span>
            </div>

            <button className="logout-icon" onClick={onLogout}>
              ↪
            </button>
          </div>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div className="breadcrumb">
            <span>Siteblia</span>
            <span>/</span>
            <strong>{business?.name}</strong>
            <span>/</span>
            <strong>{label}</strong>
          </div>

          <div className="topbar-actions">
            <button className="icon-button notification">
              ♧
              <span></span>
            </button>

            <button
              className="icon-button"
              onClick={onBusinesses}
            >
              ⇄
            </button>
          </div>
        </header>

        <div className="content">
          <div className="page-heading">
            <span className="page-label">{label}</span>
            <h1>{section === "home" ? "Resumen general" : label}</h1>
            <p>{description}</p>
          </div>

          {section === "home" && <ClientHome />}
          {section === "business" && <BusinessSection />}
          {section === "billing" && <BillingSection />}
          {section === "settings" && <SettingsSection />}
          {section === "support" && <SupportSection />}
        </div>
      </main>
    </div>
  );
}

/* =========================================================
   CLIENT HOME
========================================================= */

function ClientHome() {
  return (
    <>
      <div className="stats-grid">
        <StatCard icon="◉" value="2,458" title="Visitantes" />
        <StatCard icon="$" value="$2,450" title="Ventas" />
        <StatCard icon="▣" value="64" title="Pedidos" />
        <StatCard icon="♙" value="128" title="Clientes" />
      </div>

      <div className="home-grid">
        <section className="panel">
          <div className="panel-header">
            <div>
              <span className="panel-label">ANALÍTICAS</span>
              <h2>Tráfico del sitio web</h2>
              <p>
                Seguimiento de visitantes y actividad de tu web.
              </p>
            </div>

            <span className="panel-period">Últimos 30 días</span>
          </div>

          <div className="analytics-placeholder">
            <div className="analytics-main-number">
              2,458
            </div>

            <span>visitantes</span>

            <div className="chart-placeholder">
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
            </div>

            <div className="analytics-details">
              <div>
                <span>Nuevos</span>
                <strong>1,924</strong>
              </div>

              <div>
                <span>Sesiones</span>
                <strong>3,821</strong>
              </div>

              <div>
                <span>Conversión</span>
                <strong>3.8%</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="panel">
          <div className="panel-header">
            <div>
              <span className="panel-label">AUDIENCIA</span>
              <h2>Visitantes por país</h2>
              <p>De dónde llegan tus visitantes.</p>
            </div>
          </div>

          <div className="service-status-list">
            <StatusRow name="🇺🇸 Estados Unidos" value="38%" />
            <StatusRow name="🇵🇦 Panamá" value="31%" />
            <StatusRow name="🇨🇴 Colombia" value="14%" />
            <StatusRow name="🇲🇽 México" value="7%" />
            <StatusRow name="🌎 Otros" value="10%" />
          </div>
        </section>
      </div>

      <div className="home-grid">
        <section className="panel">
          <div className="panel-header">
            <div>
              <span className="panel-label">MARKETING</span>
              <h2>Herramientas de marketing</h2>
              <p>
                Herramientas para hacer crecer tu negocio.
              </p>
            </div>
          </div>

          <div className="marketing-grid">
            <MarketingCard icon="M" title="Campañas" />
            <MarketingCard icon="S" title="SEO" />
            <MarketingCard icon="R" title="Redes sociales" />
          </div>
        </section>

        <section className="panel">
          <div className="panel-header">
            <div>
              <span className="panel-label">SERVICIOS</span>
              <h2>Estado de servicios</h2>
            </div>
          </div>

          <div className="service-status-list">
            <StatusRow name="Sitio web" value="Activo" active />
            <StatusRow name="Dominio" value="Activo" active />
            <StatusRow name="Mantenimiento" value="Al día" active />
            <StatusRow name="Pasarela" value="No configurada" />
          </div>
        </section>
      </div>

      <section className="panel activity-panel">
        <div className="panel-header">
          <div>
            <span className="panel-label">ACTIVIDAD</span>
            <h2>Actividad reciente</h2>
            <p>Últimos movimientos de tu negocio.</p>
          </div>
        </div>

        <div className="empty-activity">
          Aquí aparecerá la actividad de tu negocio.
        </div>
      </section>
    </>
  );
}

/* =========================================================
   BUSINESS
========================================================= */

function BusinessSection() {
  return (
    <>
      <div className="business-management-grid">
        <section className="panel">
          <div className="panel-header">
            <div>
              <span className="panel-label">INFORMACIÓN</span>
              <h2>Información del negocio</h2>
              <p>Datos principales de tu negocio.</p>
            </div>

            <button className="outline-button">Editar</button>
          </div>

          <div className="information-list">
            <InfoRow label="Nombre" value="Tienda Ejemplo" />
            <InfoRow label="Tipo" value="Tienda online" />
            <InfoRow label="Descripción" value="Descripción del negocio" />
            <InfoRow label="Teléfono" value="+507 0000-0000" />
            <InfoRow label="Correo" value="contacto@ejemplo.com" />
          </div>
        </section>

        <section className="panel">
          <div className="panel-header">
            <div>
              <span className="panel-label">IMÁGENES</span>
              <h2>Contenido visual</h2>
              <p>Gestiona las imágenes de tu sitio.</p>
            </div>
          </div>

          <div className="image-management">
            <div className="image-placeholder">
              <span>+</span>
              <strong>Logo</strong>
              <small>Subir imagen</small>
            </div>

            <div className="image-placeholder wide">
              <span>+</span>
              <strong>Imagen principal</strong>
              <small>Subir imagen</small>
            </div>
          </div>
        </section>
      </div>

      <section className="panel">
        <div className="panel-header">
          <div>
            <span className="panel-label">CATÁLOGO</span>
            <h2>Productos y servicios</h2>
            <p>
              Administra lo que aparece en tu página web.
            </p>
          </div>

          <button className="primary-button">
            + Agregar
          </button>
        </div>

        <div className="empty-table">
          Aquí aparecerán tus productos y servicios.
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <div>
            <span className="panel-label">PEDIDOS Y ENTREGA</span>
            <h2>Opciones de compra</h2>
            <p>
              Configura únicamente las opciones que necesite tu negocio.
            </p>
          </div>
        </div>

        <div className="settings-grid">
          <SettingsCard
            icon="🚚"
            title="Envío a domicilio"
            description="Zonas, tarifas y tiempos de entrega."
          />

          <SettingsCard
            icon="🏪"
            title="Retiro en tienda"
            description="Horarios e instrucciones de retiro."
          />

          <SettingsCard
            icon="🛒"
            title="Pedidos"
            description="Configuración del sistema de pedidos."
          />

          <SettingsCard
            icon="💳"
            title="Pagos online"
            description="Conecta una pasarela de pago."
          />
        </div>
      </section>
    </>
  );
}

/* =========================================================
   BILLING
========================================================= */

function BillingSection() {
  return (
    <>
      <div className="stats-grid">
        <StatCard icon="$" value="$4,820" title="Facturado" />
        <StatCard icon="✓" value="86" title="Facturas" />
        <StatCard icon="◷" value="4" title="Pendientes" />
        <StatCard icon="↩" value="2" title="Reembolsos" />
      </div>

      <section className="panel">
        <div className="panel-header">
          <div>
            <span className="panel-label">FACTURACIÓN</span>
            <h2>Facturas de tu negocio</h2>
            <p>
              Consulta y administra las facturas generadas.
            </p>
          </div>

          <button className="primary-button">
            + Crear factura
          </button>
        </div>

        <div className="billing-tabs">
          <button className="billing-tab active">
            Todas
          </button>

          <button className="billing-tab">
            Pagadas
          </button>

          <button className="billing-tab">
            Pendientes
          </button>

          <button className="billing-tab">
            Anuladas
          </button>
        </div>

        <div className="empty-table">
          Aquí aparecerán las facturas de tu negocio.
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <div>
            <span className="panel-label">DATOS FISCALES</span>
            <h2>Información fiscal</h2>
            <p>
              Configura los datos utilizados en tus facturas.
            </p>
          </div>

          <button className="outline-button">
            Editar
          </button>
        </div>

        <div className="information-list">
          <InfoRow label="Razón social" value="Pendiente" />
          <InfoRow label="Identificación fiscal" value="Pendiente" />
          <InfoRow label="Dirección fiscal" value="Pendiente" />
        </div>
      </section>
    </>
  );
}

/* =========================================================
   SETTINGS
========================================================= */

function SettingsSection() {
  return (
    <>
      <div className="settings-grid">
        <SettingsCard
          icon="👤"
          title="Datos personales"
          description="Nombre, correo y datos de tu cuenta."
        />

        <SettingsCard
          icon="🌐"
          title="Idioma"
          description="Selecciona el idioma de Siteblia."
        />

        <SettingsCard
          icon="🔒"
          title="Seguridad"
          description="Contraseña y seguridad de tu cuenta."
        />

        <SettingsCard
          icon="💳"
          title="Mantenimiento"
          description="Consulta el estado de tu pago a Siteblia."
        />

        <SettingsCard
          icon="🌐"
          title="Dominio"
          description="Consulta información de tu dominio."
        />

        <SettingsCard
          icon="🔌"
          title="Integraciones"
          description="Google, pagos y otras conexiones."
        />

        <SettingsCard
          icon="🚚"
          title="Entrega"
          description="Configura envíos y retiros."
        />

        <SettingsCard
          icon="🔔"
          title="Notificaciones"
          description="Controla las notificaciones."
        />
      </div>

      <section className="panel" style={{ marginTop: "18px" }}>
        <div className="panel-header">
          <div>
            <span className="panel-label">ESTADO DE PAGOS</span>
            <h2>Tus servicios</h2>
            <p>
              El mantenimiento y el dominio se gestionan por separado.
            </p>
          </div>
        </div>

        <div className="service-status-list">
          <StatusRow
            name="Mantenimiento de Siteblia"
            value="Al día"
            active
          />

          <StatusRow
            name="Dominio"
            value="Activo"
            active
          />
        </div>
      </section>
    </>
  );
}

/* =========================================================
   SUPPORT
========================================================= */

function SupportSection() {
  return (
    <div className="support-grid">
      <section className="panel support-main">
        <span className="panel-label">CONTACTO</span>

        <h2>¿Necesitas ayuda?</h2>

        <p>
          Envíanos tu solicitud y llegará directamente al equipo
          de Siteblia.
        </p>

        <label>
          Asunto
          <input placeholder="¿En qué podemos ayudarte?" />
        </label>

        <label>
          Categoría
          <select defaultValue="">
            <option value="" disabled>
              Selecciona una categoría
            </option>
            <option>Mi sitio web</option>
            <option>Facturación</option>
            <option>Pagos</option>
            <option>Dominio</option>
            <option>Otro</option>
          </select>
        </label>

        <label>
          Mensaje
          <textarea
            rows="6"
            placeholder="Describe tu problema o consulta..."
          />
        </label>

        <button className="primary-button">
          Enviar solicitud
        </button>
      </section>

      <section className="panel">
        <div className="panel-header">
          <div>
            <span className="panel-label">HISTORIAL</span>
            <h2>Mis solicitudes</h2>
            <p>
              Consulta tus conversaciones con Siteblia.
            </p>
          </div>
        </div>

        <div className="empty-activity">
          No tienes solicitudes recientes.
        </div>
      </section>
    </div>
  );
}

/* =========================================================
   ADMIN
========================================================= */

function AdminDashboard({
  section,
  setSection,
  onLogout,
}) {
  const titles = {
    home: ["INICIO", "Centro de control de Siteblia"],
    users: ["USUARIOS Y NEGOCIOS", "Gestiona cuentas, negocios y Siteblia IDs"],
    infrastructure: [
      "DOMINIOS / FACTURACIÓN / INTEGRACIONES",
      "Gestiona servicios e integraciones",
    ],
    support: ["SOPORTE", "Gestiona las solicitudes de tus clientes"],
    settings: ["CONFIGURACIÓN", "Configuración general de Siteblia"],
  };

  const [label, description] = titles[section];

  return (
    <div className="siteblia-app admin-mode">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <span className="brand-symbol">S</span>
          <span>Siteblia</span>
        </div>

        <div className="admin-badge">
          ADMINISTRADOR
        </div>

        <nav className="sidebar-navigation admin-navigation">
          <span className="navigation-heading">
            CONTROL
          </span>

          <NavItem
            icon="⌂"
            text="Inicio"
            active={section === "home"}
            onClick={() => setSection("home")}
          />

          <NavItem
            icon="♙"
            text="Usuarios y negocios"
            active={section === "users"}
            onClick={() => setSection("users")}
          />

          <NavItem
            icon="▣"
            text="Dominios / Facturación"
            active={section === "infrastructure"}
            onClick={() => setSection("infrastructure")}
          />

          <NavItem
            icon="?"
            text="Soporte"
            active={section === "support"}
            onClick={() => setSection("support")}
          />

          <NavItem
            icon="⚙"
            text="Configuración"
            active={section === "settings"}
            onClick={() => setSection("settings")}
          />
        </nav>

        <div className="sidebar-bottom">
          <div className="admin-system-status">
            <span className="status-dot"></span>

            <div>
              <strong>Sistema operativo</strong>
              <span>Siteblia</span>
            </div>
          </div>

          <div className="sidebar-user">
            <div className="user-avatar">A</div>

            <div className="user-information">
              <strong>Administrador</strong>
              <span>Cuenta principal</span>
            </div>

            <button className="logout-icon" onClick={onLogout}>
              ↪
            </button>
          </div>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div className="breadcrumb">
            <span>Siteblia</span>
            <span>/</span>
            <strong>{label}</strong>
          </div>

          <div className="admin-topbar-label">
            ADMIN
          </div>
        </header>

        <div className="content">
          <div className="page-heading">
            <span className="page-label">{label}</span>
            <h1>
              {section === "home"
                ? "Panel administrativo"
                : label}
            </h1>
            <p>{description}</p>
          </div>

          {section === "home" && <AdminHome />}
          {section === "users" && <AdminUsers />}
          {section === "infrastructure" && <AdminInfrastructure />}
          {section === "support" && <AdminSupport />}
          {section === "settings" && <AdminSettings />}
        </div>
      </main>
    </div>
  );
}

/* =========================================================
   ADMIN HOME
========================================================= */

function AdminHome() {
  return (
    <>
      <div className="stats-grid admin-stats">
        <StatCard icon="♙" value="24" title="Usuarios" />
        <StatCard icon="▣" value="31" title="Negocios" />
        <StatCard icon="◉" value="35" title="Sitios web" />
        <StatCard icon="$" value="$3,850" title="Ingresos" />
      </div>

      <div className="home-grid">
        <section className="panel">
          <div className="panel-header">
            <div>
              <span className="panel-label">
                RESUMEN
              </span>
              <h2>Estado de Siteblia</h2>
              <p>
                Vista general de tu plataforma.
              </p>
            </div>
          </div>

          <div className="admin-summary-grid">
            <AdminSummary title="Pagos al día" value="27" />
            <AdminSummary title="Pagos pendientes" value="4" />
            <AdminSummary title="Dominios activos" value="30" />
            <AdminSummary title="Solicitudes" value="3" />
          </div>
        </section>

        <section className="panel">
          <div className="panel-header">
            <div>
              <span className="panel-label">
                ACTIVIDAD
              </span>
              <h2>Actividad reciente</h2>
            </div>
          </div>

          <div className="empty-activity">
            Aquí aparecerá la actividad de Siteblia.
          </div>
        </section>
      </div>

      <section className="panel">
        <div className="panel-header">
          <div>
            <span className="panel-label">
              ACCIONES RÁPIDAS
            </span>
            <h2>Administración</h2>
            <p>
              Accede rápidamente a las tareas principales.
            </p>
          </div>
        </div>

        <div className="admin-quick-grid">
          <AdminQuickCard
            icon="+"
            title="Crear usuario"
            description="Crear una cuenta de cliente."
          />

          <AdminQuickCard
            icon="S"
            title="Registrar Siteblia ID"
            description="Autorizar una nueva web."
          />

          <AdminQuickCard
            icon="🏢"
            title="Crear negocio"
            description="Registrar un nuevo negocio."
          />

          <AdminQuickCard
            icon="🌐"
            title="Registrar dominio"
            description="Asociar un dominio."
          />
        </div>
      </section>
    </>
  );
}

/* =========================================================
   ADMIN USERS
========================================================= */

function AdminUsers() {
  return (
    <>
      <section className="panel">
        <div className="panel-header">
          <div>
            <span className="panel-label">GESTIÓN</span>
            <h2>Usuarios y negocios</h2>
            <p>
              Administra las cuentas y los sitios asociados.
            </p>
          </div>

          <button className="primary-button">
            + Crear usuario
          </button>
        </div>

        <div className="admin-quick-grid">
          <AdminQuickCard
            icon="♙"
            title="Usuarios"
            description="Crear y administrar usuarios."
          />

          <AdminQuickCard
            icon="🏢"
            title="Negocios"
            description="Administrar negocios."
          />

          <AdminQuickCard
            icon="S"
            title="Siteblia IDs"
            description="Registrar y asociar IDs."
          />

          <AdminQuickCard
            icon="↔"
            title="Asociaciones"
            description="Usuario, negocio y web."
          />
        </div>
      </section>

      <section className="panel" style={{ marginTop: "18px" }}>
        <div className="panel-header">
          <div>
            <span className="panel-label">REGISTROS</span>
            <h2>Usuarios registrados</h2>
          </div>
        </div>

        <div className="empty-table">
          Aquí aparecerán los usuarios reales cuando conectemos Supabase.
        </div>
      </section>
    </>
  );
}

/* =========================================================
   ADMIN INFRASTRUCTURE
========================================================= */

function AdminInfrastructure() {
  return (
    <>
      <div className="admin-quick-grid">
        <AdminQuickCard
          icon="🌐"
          title="Dominios"
          description="Registrar y administrar dominios."
        />

        <AdminQuickCard
          icon="🧾"
          title="Facturación"
          description="Gestionar facturación de Siteblia."
        />

        <AdminQuickCard
          icon="💳"
          title="Pasarelas"
          description="Gestionar conexiones de pago."
        />

        <AdminQuickCard
          icon="G"
          title="Google"
          description="Analytics y otras integraciones."
        />
      </div>

      <section className="panel" style={{ marginTop: "18px" }}>
        <div className="panel-header">
          <div>
            <span className="panel-label">
              INTEGRACIONES
            </span>
            <h2>Servicios conectados</h2>
            <p>
              Esta sección permitirá conectar proveedores sin
              amarrar Siteblia a uno solo.
            </p>
          </div>
        </div>

        <div className="service-status-list">
          <StatusRow
            name="Proveedor de pagos"
            value="Preparado"
          />

          <StatusRow
            name="Google Analytics"
            value="Preparado"
          />

          <StatusRow
            name="Gestión de dominios"
            value="Preparado"
          />

          <StatusRow
            name="DNS / proveedor"
            value="Por definir"
          />
        </div>
      </section>
    </>
  );
}

/* =========================================================
   ADMIN SUPPORT
========================================================= */

function AdminSupport() {
  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <span className="panel-label">SOPORTE</span>
          <h2>Solicitudes de clientes</h2>
          <p>
            Aquí llegarán directamente las solicitudes enviadas
            desde los paneles de los clientes.
          </p>
        </div>
      </div>

      <div className="empty-table">
        No hay solicitudes pendientes.
      </div>
    </section>
  );
}

/* =========================================================
   ADMIN SETTINGS
========================================================= */

function AdminSettings() {
  return (
    <div className="settings-grid">
      <SettingsCard
        icon="👤"
        title="Cuenta administrativa"
        description="Datos de tu cuenta."
      />

      <SettingsCard
        icon="🔒"
        title="Seguridad"
        description="Contraseña y acceso."
      />

      <SettingsCard
        icon="⚙"
        title="Configuración de Siteblia"
        description="Opciones generales."
      />

      <SettingsCard
        icon="🔔"
        title="Notificaciones"
        description="Alertas administrativas."
      />
    </div>
  );
}

/* =========================================================
   COMPONENTES PEQUEÑOS
========================================================= */

function NavItem({ icon, text, active, onClick }) {
  return (
    <button
      className={`navigation-item ${active ? "active" : ""}`}
      onClick={onClick}
    >
      <span className="navigation-icon">{icon}</span>
      <span>{text}</span>
    </button>
  );
}

function StatCard({ icon, value, title }) {
  return (
    <div className="stat-card">
      <div className="stat-card-top">
        <div className="stat-icon">{icon}</div>
        <span>30 días</span>
      </div>

      <div className="stat-value">{value}</div>
      <div className="stat-title">{title}</div>
    </div>
  );
}

function StatusRow({ name, value, active = false }) {
  return (
    <div className="status-row">
      <div>
        <span className={`status-indicator ${active ? "active" : ""}`} />
        <strong>{name}</strong>
      </div>

      <span className={`status-text ${active ? "active" : ""}`}>
        {value}
      </span>
    </div>
  );
}

function MarketingCard({ icon, title }) {
  return (
    <div className="marketing-card">
      <div className="marketing-icon">{icon}</div>
      <strong>{title}</strong>
      <p>
        Herramientas para mejorar la presencia de tu negocio.
      </p>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="info-row">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function SettingsCard({ icon, title, description }) {
  return (
    <button className="settings-card">
      <div className="settings-icon">{icon}</div>

      <div>
        <strong>{title}</strong>
        <p>{description}</p>
      </div>

      <span className="settings-arrow">→</span>
    </button>
  );
}

function AdminSummary({ title, value }) {
  return (
    <div className="admin-summary">
      <span>{title}</span>
      <strong>{value}</strong>
    </div>
  );
}

function AdminQuickCard({ icon, title, description }) {
  return (
    <button className="admin-quick-card">
      <div className="admin-quick-icon">{icon}</div>

      <strong>{title}</strong>

      <p>{description}</p>

      <span>→</span>
    </button>
  );
}

export default App;
