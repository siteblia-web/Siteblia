import React from "react";

function App() {
  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          <span className="logo-icon">S</span>
          <span className="logo-text">Siteblia</span>
        </div>

        <nav className="nav">
          <a href="#inicio">Inicio</a>
          <a href="#negocios">Negocios</a>
          <a href="#facturacion">Facturación</a>
          <a href="#contacto">Contacto</a>
        </nav>

        <button className="login-button">
          Iniciar sesión
        </button>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-content">
            <p className="eyebrow">PLATAFORMA PARA NEGOCIOS</p>

            <h1>
              Gestiona tu negocio
              <br />
              <span>de forma sencilla.</span>
            </h1>

            <p className="hero-description">
              Siteblia reúne las herramientas que necesitas para administrar
              tu negocio, organizar clientes, controlar tus ventas y llevar
              tu facturación desde un solo lugar.
            </p>

            <div className="hero-buttons">
              <button className="primary-button">
                Comenzar ahora
              </button>

              <button className="secondary-button">
                Conocer más
              </button>
            </div>
          </div>

          <div className="hero-card">
            <div className="dashboard-card">
              <div className="dashboard-top">
                <div>
                  <p className="small-label">Resumen</p>
                  <h2>Mi negocio</h2>
                </div>

                <div className="status">
                  Activo
                </div>
              </div>

              <div className="stats">
                <div className="stat">
                  <span>Ventas</span>
                  <strong>$2,450</strong>
                </div>

                <div className="stat">
                  <span>Clientes</span>
                  <strong>128</strong>
                </div>

                <div className="stat">
                  <span>Pedidos</span>
                  <strong>64</strong>
                </div>
              </div>

              <div className="chart">
                <div className="bar bar-1"></div>
                <div className="bar bar-2"></div>
                <div className="bar bar-3"></div>
                <div className="bar bar-4"></div>
                <div className="bar bar-5"></div>
                <div className="bar bar-6"></div>
                <div className="bar bar-7"></div>
              </div>
            </div>
          </div>
        </section>

        <section className="features" id="negocios">
          <div className="section-heading">
            <p className="eyebrow">TODO EN UN SOLO LUGAR</p>

            <h2>
              Herr
