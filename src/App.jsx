import React, { useState } from "react";

function App() {
  const [screen, setScreen] = useState("login");
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [clientSection, setClientSection] = useState("inicio");
  const [adminSection, setAdminSection] = useState("dashboard");

  const businesses = [
    {
      id: "STB-001",
      name: "Mi negocio",
      website: "mipagina.com",
      status: "Activo",
    },
    {
      id: "STB-002",
      name: "Segundo negocio",
      website: "segundapagina.com",
      status: "Activo",
    },
  ];

  function handleLogin() {
    /*
      TEMPORALMENTE:
      Aquí después conectaremos Supabase Auth.

      Por ahora dejamos la pantalla de selección
      para poder visualizar toda la estructura.
    */
    setScreen("business-selection");
  }

  function enterBusiness(business) {
    setSelectedBusiness(business);
    setClientSection("inicio");
    setScreen("client");
  }

  function enterAdmin() {
    /*
      TEMPORALMENTE:
      Después comprobaremos el rol real del usuario
      mediante Supabase.
    */
    setAdminSection("dashboard");
    setScreen("admin");
  }

  function logout() {
    setSelectedBusiness(null);
    setScreen("login");
  }

  if (screen === "login") {
    return <LoginScreen onLogin={handleLogin} onAdmin={enterAdmin} />;
  }

  if (screen === "business-selection") {
    return (
      <BusinessSelection
        businesses={businesses}
        onSelect={enterBusiness}
        onAdmin={enterAdmin}
        onLogout={logout}
      />
    );
  }

  if (screen === "client") {
    return (
      <ClientApp
        business={selectedBusiness}
        section={clientSection}
        setSection={setClientSection}
        businesses={businesses}
        onSelectBusiness={() => setScreen("business-selection")}
        onLogout={logout}
      />
    );
  }

  if (screen === "admin") {
    return (
      <AdminApp
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

function LoginScreen({ onLogin, onAdmin }) {
  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-brand">
          <div className="brand-symbol">S</div>
          <span>Siteblia</span>
        </div>

        <div className="auth-presentation">
          <span className="yellow-label">PLATAFORMA PARA NEGOCIOS</span>

          <h1>
            Tu negocio.
            <br />
            <strong>Todo en un solo lugar.</strong>
          </h1>

          <p>
            Administra tu negocio, sitio web, facturación, clientes,
            productos y mucho más desde una sola plataforma.
          </p>
        </div>

        <div className="auth-footer">
          © 2026 Siteblia
        </div>
      </div>

      <div className="auth-right">
        <div className="login-card">
          <div className="mobile-brand">
            <div className="brand-symbol">S</div>
            <span>Siteblia</span>
          </div>

          <div className="login-heading">
            <span className="section-label">BIENVENIDO</span>
            <h2>Inicia sesión</h2>
            <p>
              Accede a la administración de tu negocio.
            </p>
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              onLogin();
            }}
          >
            <label>
              Correo electrónico
              <input
                type="email"
                placeholder="tu@email.com"
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
                <span>Recordarme</span>
              </label>

              <button
                type="button"
                className="text-button"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            <button
              type="submit"
              className="primary-button full-width"
            >
              Iniciar sesión
            </button>
          </form>

          <div className="login-divider">
            <span>o</span>
          </div>

          <p className="login-help">
            ¿Tu empresa utiliza Siteblia?
            <br />
            Utiliza el ID proporcionado por tu administrador.
          </p>

          <button
            type="button"
            className="secondary-button full-width"
            onClick={onLogin}
          >
            Crear cuenta con ID de Siteblia
          </button>

          <button
            type="button"
            className="admin-demo-button"
            onClick={onAdmin}
          >
            Acceso administrativo
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   BUSINESS SELECTION
========================================================= */

function BusinessSelection({
  businesses,
  onSelect,
  onAdmin,
  onLogout,
}) {
  return (
    <div className="selection-page">
      <header className="simple-header">
        <div className="auth-brand dark-brand">
          <div className="brand-symbol">S</div>
          <span>Siteblia</span>
        </div>

        <button
          className="header-text-button"
          onClick={onLogout}
        >
          Cerrar sesión
        </button>
      </header>

      <main className="selection-content">
        <div className="selection-heading">
          <span className="section-label">
            TU ESPACIO DE TRABAJO
          </span>

          <h1>Elige tu negocio</h1>

          <p>
            Selecciona el negocio o sitio web que deseas administrar.
          </p>
        </div>

        <div className="business-grid">
          {businesses.map((business) => (
            <button
              className="business-card"
              key={business.id}
              onClick={() => onSelect(business)}
            >
              <div className="business-card-top">
                <div className="business-large-icon">
                  {business.name.charAt(0)}
                </div>

                <span className="active-badge">
                  ● {business.status}
                </span>
              </div>

              <div className="business-card-info">
                <h2>{business.name}</h2>

                <p>{business.website}</p>

                <span>
                  ID: {business.id}
                </span>
              </div>

              <div className="business-card-footer">
                <span>Administrar negocio</span>
                <strong>→</strong>
              </div>
            </button>
          ))}

          <button className="add-business-card">
            <div className="add-icon">+</div>

            <h2>Agregar negocio</h2>

            <p>
              Vincula otro negocio utilizando un ID de Siteblia.
            </p>
          </button>
        </div>

        <button
          className="admin-entry"
          onClick={onAdmin}
        >
          ¿Eres administrador de Siteblia? →
        </button>
      </main>
    </div>
  );
}

/* =========================================================
   CLIENT APPLICATION
========================================================= */

function ClientApp({
  business,
  section,
  setSection,
  onSelectBusiness,
  onLogout,
}) {
  const navigation = [
    {
      id: "inicio",
      icon: "⌂",
      label: "Inicio",
    },
    {
      id: "negocio",
      icon: "▣",
      label: "Negocio",
    },
    {
      id: "facturacion",
      icon: "▤",
      label: "Facturación",
    },
    {
      id: "configuracion",
      icon: "⚙",
      label: "Configuración",
    },
    {
      id: "soporte",
      icon: "?",
      label: "Soporte",
    },
  ];

  return (
    <div className="siteblia-app">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-symbol">S</div>
          <span>Siteblia</span>
        </div>

        <div className="sidebar-business">
          <span className="sidebar-small-label">
            NEGOCIO ACTUAL
          </span>

          <button
            className="sidebar-business-selector"
            onClick={onSelectBusiness}
          >
            <div className="business-mini-icon">
              {business?.name?.charAt(0) || "N"}
            </div>

            <div className="sidebar-business-text">
              <strong>{business?.name}</strong>
              <span>{business?.website}</span>
            </div>

            <span>⌄</span>
          </button>
        </div>

        <nav className="sidebar-navigation">
          <span className="navigation-heading">
            PRINCIPAL
          </span>

          {navigation.map((item) => (
            <button
              key={item.id}
              className={`navigation-item ${
                section === item.id ? "active" : ""
              }`}
              onClick={() => setSection(item.id)}
            >
              <span className="navigation-icon">
                {item.icon}
              </span>

              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-status">
            <span className="status-dot"></span>

            <div>
              <strong>Sitio web activo</strong>
              <span>{business?.website}</span>
            </div>
          </div>

          <div className="sidebar-user">
            <div className="user-avatar">
              U
            </div>

            <div className="user-information">
              <strong>Usuario</strong>
              <span>Cuenta del negocio</span>
            </div>

            <button
              className="logout-icon"
              onClick={onLogout}
              title="Cerrar sesión"
            >
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
          </div>

          <div className="topbar-actions">
            <button className="icon-button">
              ?
            </button>

            <button className="icon-button notification">
              ♧
              <span></span>
            </button>
          </div>
        </header>

        <div className="content">
          {section === "inicio" && (
            <ClientHome business={business} />
          )}

          {section === "negocio" && (
            <ClientBusiness business={business} />
          )}

          {section === "facturacion" && (
            <ClientBilling />
          )}

          {section === "configuracion" && (
            <ClientSettings business={business} />
          )}

          {section === "soporte" && (
            <ClientSupport />
          )}
        </div>
      </main>
    </div>
  );
}

/* =========================================================
   CLIENT HOME
========================================================= */

function ClientHome({ business }) {
  return (
    <>
      <div className="page-heading">
        <div>
          <span className="page-label">
            CENTRO DE CONTROL
          </span>

          <h1>
            Hola, bienvenido 👋
          </h1>

          <p>
            Aquí tienes un resumen de lo que está pasando con tu negocio.
          </p>
        </div>
      </div>

      <section className="stats-grid">
        <DashboardStat
          icon="◈"
          title="Ventas"
          value="$0.00"
          description="Este período"
        />

        <DashboardStat
          icon="▤"
          title="Facturas"
          value="0"
          description="Este período"
        />

        <DashboardStat
          icon="♙"
          title="Clientes"
          value="0"
          description="Clientes registrados"
        />

        <DashboardStat
          icon="◉"
          title="Productos"
          value="0"
          description="Productos publicados"
        />
      </section>

      <section className="home-grid">
        <div className="panel web-analytics-panel">
          <div className="panel-header">
            <div>
              <span className="panel-label">
                PÁGINA WEB
              </span>

              <h2>Rendimiento de tu sitio</h2>

              <p>
                Aquí podrás consultar el tráfico de tu página.
              </p>
            </div>

            <span className="panel-period">
              Este mes
            </span>
          </div>

          <div className="analytics-placeholder">
            <div className="analytics-main-number">
              0
            </div>

            <span>
              visitantes
            </span>

            <div className="chart-placeholder">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>

          <div className="analytics-details">
            <div>
              <span>Sesiones</span>
              <strong>0</strong>
            </div>

            <div>
              <span>Páginas vistas</span>
              <strong>0</strong>
            </div>

            <div>
              <span>Nuevos visitantes</span>
              <strong>0%</strong>
            </div>
          </div>
        </div>

        <div className="panel traffic-panel">
          <div className="panel-header">
            <div>
              <span className="panel-label">
                AUDIENCIA
              </span>

              <h2>Visitantes por país</h2>
            </div>
          </div>

          <div className="country-empty">
            <div className="empty-circle">
              ◉
            </div>

            <h3>Sin datos todavía</h3>

            <p>
              Cuando conectemos las estadísticas de tu sitio,
              aquí podrás ver de qué países llegan tus visitantes.
            </p>
          </div>
        </div>
      </section>

      <section className="home-grid second-row">
        <div className="panel">
          <div className="panel-header">
            <div>
              <span className="panel-label">
                MARKETING
              </span>

              <h2>Marketing de tu negocio</h2>

              <p>
                Herramientas para conocer y mejorar el rendimiento de tu sitio.
              </p>
            </div>
          </div>

          <div className="marketing-grid">
            <MarketingCard
              icon="↗"
              title="Fuentes de tráfico"
              text="Descubre de dónde llegan tus visitantes."
            />

            <MarketingCard
              icon="◎"
              title="Conversiones"
              text="Mide qué acciones realizan tus visitantes."
            />

            <MarketingCard
              icon="★"
              title="Recomendaciones"
              text="Obtén ideas para mejorar tu presencia digital."
            />
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <span className="panel-label">
                ESTADO
              </span>

              <h2>Tu servicio</h2>
            </div>
          </div>

          <div className="service-status-list">
            <StatusRow
              label="Página web"
              status="Activa"
              active
            />

            <StatusRow
              label="Dominio"
              status="Activo"
              active
            />

            <StatusRow
              label="Mantenimiento Siteblia"
              status="Al día"
              active
            />

            <StatusRow
              label="Pasarela de pagos"
              status="No conectada"
            />
          </div>
        </div>
      </section>

      <section className="panel activity-panel">
        <div className="panel-header">
          <div>
            <span className="panel-label">
              ACTIVIDAD
            </span>

            <h2>Actividad reciente</h2>

            <p>
              Aquí aparecerán los movimientos importantes de tu negocio.
            </p>
          </div>
        </div>

        <div className="empty-activity">
          No hay actividad reciente.
        </div>
      </section>
    </>
  );
}

/* =========================================================
   CLIENT BUSINESS
========================================================= */

function ClientBusiness({ business }) {
  return (
    <>
      <PageTitle
        label="MI NEGOCIO"
        title="Negocio"
        description="Administra la información y el contenido que aparece en tu página web."
      />

      <section className="business-management-grid">
        <div className="panel">
          <div className="panel-header">
            <div>
              <span className="panel-label">
                INFORMACIÓN
              </span>

              <h2>Información del negocio</h2>
            </div>

            <button className="outline-button">
              Editar
            </button>
          </div>

          <div className="information-list">
            <InfoRow
              label="Nombre"
              value={business?.name || "Sin configurar"}
            />

            <InfoRow
              label="Sitio web"
              value={business?.website || "Sin configurar"}
            />

            <InfoRow
              label="Descripción"
              value="Agrega una descripción de tu negocio."
            />

            <InfoRow
              label="Teléfono"
              value="No configurado"
            />

            <InfoRow
              label="Dirección"
              value="No configurada"
            />
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <span className="panel-label">
                IMÁGENES
              </span>

              <h2>Contenido visual</h2>
            </div>
          </div>

          <div className="image-management">
            <div className="image-placeholder">
              <span>+</span>
              <strong>Logo</strong>
              <small>Agregar imagen</small>
            </div>

            <div className="image-placeholder wide">
              <span>+</span>
              <strong>Imagen principal</strong>
              <small>Agregar imagen</small>
            </div>
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <div>
            <span className="panel-label">
              CONTENIDO
            </span>

            <h2>Productos y servicios</h2>

            <p>
              Aquí podrás administrar lo que aparece en tu página.
            </p>
          </div>

          <button className="outline-button">
            Administrar
          </button>
        </div>

        <div className="empty-table">
          Todavía no tienes productos o servicios configurados.
        </div>
      </section>
    </>
  );
}

/* =========================================================
   CLIENT BILLING
========================================================= */

function ClientBilling() {
  return (
    <>
      <PageTitle
        label="FACTURACIÓN"
        title="Facturación"
        description="Administra las facturas y registros de facturación de tu negocio."
      />

      <section className="stats-grid billing-stats">
        <DashboardStat
          icon="$"
          title="Facturado"
          value="$0.00"
          description="Este período"
        />

        <DashboardStat
          icon="✓"
          title="Pagadas"
          value="0"
          description="Facturas pagadas"
        />

        <DashboardStat
          icon="!"
          title="Pendientes"
          value="0"
          description="Facturas pendientes"
        />

        <DashboardStat
          icon="#"
          title="Total"
          value="0"
          description="Facturas emitidas"
        />
      </section>

      <section className="panel">
        <div className="panel-header">
          <div>
            <span className="panel-label">
              FACTURAS
            </span>

            <h2>Facturas de tu negocio</h2>

            <p>
              Aquí aparecerán las facturas generadas desde tu sitio
              y las facturas que registres manualmente.
            </p>
          </div>
        </div>

        <div className="billing-tabs">
          <button className="billing-tab active">
            Todas
          </button>

          <button className="billing-tab">
            Del sitio web
          </button>

          <button className="billing-tab">
            Manuales
          </button>
        </div>

        <div className="empty-table">
          Todavía no hay facturas registradas.
        </div>
      </section>
    </>
  );
}

/* =========================================================
   CLIENT SETTINGS
========================================================= */

function ClientSettings() {
  return (
    <>
      <PageTitle
        label="CONFIGURACIÓN"
        title="Configuración"
        description="Administra tu cuenta, negocio, pagos y preferencias."
      />

      <section className="settings-grid">
        <SettingsCard
          icon="♙"
          title="Datos personales"
          text="Administra tu nombre, correo y datos de acceso."
        />

        <SettingsCard
          icon="▣"
          title="Datos del negocio"
          text="Configura la información fiscal y comercial."
        />

        <SettingsCard
          icon="文"
          title="Idioma"
          text="Selecciona el idioma de tu panel."
        />

        <SettingsCard
          icon="$"
          title="Pagos"
          text="Consulta tu mantenimiento, dominio y pagos."
        />

        <SettingsCard
          icon="◉"
          title="Pasarela de pagos"
          text="Conecta una plataforma para recibir pagos en línea."
        />

        <SettingsCard
          icon="◎"
          title="Dominio"
          text="Consulta el estado y la información de tu dominio."
        />

        <SettingsCard
          icon="🔒"
          title="Seguridad"
          text="Contraseña y opciones de seguridad."
        />

        <SettingsCard
          icon="!"
          title="Notificaciones"
          text="Controla las notificaciones de tu cuenta."
        />
      </section>
    </>
  );
}

/* =========================================================
   CLIENT SUPPORT
========================================================= */

function ClientSupport() {
  return (
    <>
      <PageTitle
        label="SOPORTE"
        title="Centro de soporte"
        description="Estamos aquí para ayudarte con tu negocio y tu sitio web."
      />

      <section className="support-grid">
        <div className="panel support-main">
          <span className="panel-label">
            NUEVA SOLICITUD
          </span>

          <h2>¿En qué podemos ayudarte?</h2>

          <p>
            Envía una solicitud directamente al equipo de Siteblia.
          </p>

          <label>
            Asunto
            <input placeholder="¿Qué necesitas?" />
          </label>

          <label>
            Categoría
            <select>
              <option>Seleccionar categoría</option>
              <option>Página web</option>
              <option>Facturación</option>
              <option>Dominio</option>
              <option>Pagos</option>
              <option>Cuenta</option>
              <option>Otro</option>
            </select>
          </label>

          <label>
            Mensaje
            <textarea
              placeholder="Describe tu solicitud..."
              rows="6"
            />
          </label>

          <button className="primary-button">
            Enviar solicitud
          </button>
        </div>

        <div className="panel">
          <span className="panel-label">
            MIS SOLICITUDES
          </span>

          <h2>Historial de soporte</h2>

          <div className="empty-table">
            No tienes solicitudes abiertas.
          </div>
        </div>
      </section>
    </>
  );
}

/* =========================================================
   ADMIN APPLICATION
========================================================= */

function AdminApp({
  section,
  setSection,
  onLogout,
}) {
  const navigation = [
    {
      id: "dashboard",
      icon: "⌂",
      label: "Dashboard",
    },
    {
      id: "usuarios",
      icon: "♙",
      label: "Usuarios",
    },
    {
      id: "negocios",
      icon: "▣",
      label: "Negocios",
    },
    {
      id: "sitios",
      icon: "◉",
      label: "Sitios web",
    },
    {
      id: "ids",
      icon: "#",
      label: "Siteblia IDs",
    },
    {
      id: "dominios",
      icon: "◎",
      label: "Dominios",
    },
    {
      id: "pagos",
      icon: "$",
      label: "Pagos",
    },
    {
      id: "facturacion",
      icon: "▤",
      label: "Facturación",
    },
    {
      id: "estadisticas",
      icon: "↗",
      label: "Estadísticas",
    },
    {
      id: "soporte",
      icon: "?",
      label: "Soporte",
    },
    {
      id: "integraciones",
      icon: "⌘",
      label: "Integraciones",
    },
    {
      id: "configuracion",
      icon: "⚙",
      label: "Configuración",
    },
  ];

  return (
    <div className="siteblia-app admin-mode">
      <aside className="sidebar admin-sidebar">
        <div className="sidebar-brand">
          <div className="brand-symbol">S</div>
          <span>Siteblia</span>
        </div>

        <div className="admin-badge">
          ADMINISTRADOR
        </div>

        <nav className="sidebar-navigation admin-navigation">
          <span className="navigation-heading">
            ADMINISTRACIÓN
          </span>

          {navigation.map((item) => (
            <button
              key={item.id}
              className={`navigation-item ${
                section === item.id ? "active" : ""
              }`}
              onClick={() => setSection(item.id)}
            >
              <span className="navigation-icon">
                {item.icon}
              </span>

              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="admin-system-status">
            <span className="status-dot"></span>

            <div>
              <strong>Siteblia operativo</strong>
              <span>Sistema</span>
            </div>
          </div>

          <div className="sidebar-user">
            <div className="user-avatar admin-avatar">
              A
            </div>

            <div className="user-information">
              <strong>Administrador</strong>
              <span>Siteblia Admin</span>
            </div>

            <button
              className="logout-icon"
              onClick={onLogout}
            >
              ↪
            </button>
          </div>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar admin-topbar">
          <div className="breadcrumb">
            <span>Siteblia</span>
            <span>/</span>
            <strong>Administración</strong>
          </div>

          <div className="admin-topbar-label">
            MODO ADMIN
          </div>
        </header>

        <div className="content">
          {section === "dashboard" && <AdminDashboard />}

          {section !== "dashboard" && (
            <AdminPlaceholder section={section} />
          )}
        </div>
      </main>
    </div>
  );
}

/* =========================================================
   ADMIN DASHBOARD
========================================================= */

function AdminDashboard() {
  return (
    <>
      <PageTitle
        label="ADMINISTRACIÓN DE SITEBLIA"
        title="Dashboard"
        description="Control general de usuarios, negocios, sitios, dominios y operaciones."
      />

      <section className="stats-grid admin-stats">
        <DashboardStat
          icon="♙"
          title="Usuarios"
          value="0"
          description="Usuarios registrados"
        />

        <DashboardStat
          icon="▣"
          title="Negocios"
          value="0"
          description="Negocios activos"
        />

        <DashboardStat
          icon="◉"
          title="Sitios web"
          value="0"
          description="Sitios administrados"
        />

        <DashboardStat
          icon="$"
          title="Ingresos"
          value="$0.00"
          description="Este período"
        />
      </section>

      <section className="home-grid">
        <div className="panel">
          <div className="panel-header">
            <div>
              <span className="panel-label">
                OPERACIÓN
              </span>

              <h2>Resumen de Siteblia</h2>

              <p>
                Información general de la plataforma.
              </p>
            </div>
          </div>

          <div className="admin-summary-grid">
            <AdminSummary
              title="Mantenimientos"
              value="$0.00"
            />

            <AdminSummary
              title="Dominios"
              value="0"
            />

            <AdminSummary
              title="Soporte pendiente"
              value="0"
            />

            <AdminSummary
              title="Pagos pendientes"
              value="0"
            />
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <span className="panel-label">
                ACTIVIDAD
              </span>

              <h2>Actividad reciente</h2>
            </div>
          </div>

          <div className="empty-table">
            No hay actividad registrada.
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <div>
            <span className="panel-label">
              ACCESO RÁPIDO
            </span>

            <h2>Gestión de Siteblia</h2>

            <p>
              Estas herramientas estarán conectadas progresivamente.
            </p>
          </div>
        </div>

        <div className="admin-quick-grid">
          <AdminQuickCard
            icon="♙"
            title="Usuarios"
            text="Crear y administrar cuentas."
          />

          <AdminQuickCard
            icon="#"
            title="Siteblia IDs"
            text="Registrar y asignar IDs."
          />

          <AdminQuickCard
            icon="◎"
            title="Dominios"
            text="Gestionar dominios de clientes."
          />

          <AdminQuickCard
            icon="⌘"
            title="Integraciones"
            text="Conectar servicios externos."
          />
        </div>
      </section>
    </>
  );
}

/* =========================================================
   ADMIN PLACEHOLDERS
========================================================= */

function AdminPlaceholder({ section }) {
  const labels = {
    usuarios: ["USUARIOS", "Usuarios"],
    negocios: ["NEGOCIOS", "Negocios"],
    sitios: ["SITIOS WEB", "Sitios web"],
    ids: ["SITEBLIA IDs", "Siteblia IDs"],
    dominios: ["DOMINIOS", "Dominios"],
    pagos: ["PAGOS", "Pagos"],
    facturacion: ["FACTURACIÓN", "Facturación"],
    estadisticas: ["ESTADÍSTICAS", "Estadísticas"],
    soporte: ["SOPORTE", "Soporte"],
    integraciones: ["INTEGRACIONES", "Integraciones"],
    configuracion: ["CONFIGURACIÓN", "Configuración"],
  };

  const [label, title] =
    labels[section] || ["SITEBLIA", "Módulo"];

  return (
    <>
      <PageTitle
        label={label}
        title={title}
        description="Este módulo forma parte de la arquitectura administrativa de Siteblia."
      />

      <div className="admin-module-placeholder">
        <div className="admin-module-icon">
          {section === "ids" ? "#" : "◈"}
        </div>

        <h2>
          Módulo preparado
        </h2>

        <p>
          La estructura ya está creada. Aquí conectaremos
          la funcionalidad real cuando implementemos este módulo.
        </p>
      </div>
    </>
  );
}

/* =========================================================
   REUSABLE COMPONENTS
========================================================= */

function PageTitle({ label, title, description }) {
  return (
    <div className="page-heading">
      <div>
        <span className="page-label">
          {label}
        </span>

        <h1>{title}</h1>

        <p>{description}</p>
      </div>
    </div>
  );
}

function DashboardStat({
  icon,
  title,
  value,
  description,
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

function MarketingCard({ icon, title, text }) {
  return (
    <div className="marketing-card">
      <div className="marketing-icon">
        {icon}
      </div>

      <strong>{title}</strong>

      <p>{text}</p>
    </div>
  );
}

function StatusRow({ label, status, active }) {
  return (
    <div className="status-row">
      <div>
        <span
          className={`status-indicator ${
            active ? "active" : ""
          }`}
        ></span>

        <strong>{label}</strong>
      </div>

      <span
        className={`status-text ${
          active ? "active" : ""
        }`}
      >
        {status}
      </span>
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

function SettingsCard({ icon, title, text }) {
  return (
    <button className="settings-card">
      <div className="settings-icon">
        {icon}
      </div>

      <div>
        <strong>{title}</strong>
        <p>{text}</p>
      </div>

      <span className="settings-arrow">
        →
      </span>
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

function AdminQuickCard({ icon, title, text }) {
  return (
    <button className="admin-quick-card">
      <div className="admin-quick-icon">
        {icon}
      </div>

      <div>
        <strong>{title}</strong>
        <p>{text}</p>
      </div>

      <span>→</span>
    </button>
  );
}

export default App;
