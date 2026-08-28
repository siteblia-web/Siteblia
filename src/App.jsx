import { useState } from "react";

function App() {
  const [view, setView] = useState("home");

  return (
    <div className="app">
      <header className="navbar">
        <div className="logo">Siteblia</div>

        <nav>
          <button onClick={() => setView("home")}>Inicio</button>
          <button onClick={() => setView("login")}>Iniciar sesión</button>
        </nav>
      </header>

      <main className="content">
        {view === "home" && (
          <section className="hero">
            <h1>Todo tu negocio en un solo lugar.</h1>

            <p>
              Siteblia te ayuda a administrar tu negocio, tus clientes,
              productos, facturas y mucho más.
            </p>

            <button
              className="primary-button"
              onClick={() => setView("login")}
            >
              Comenzar
            </button>
          </section>
        )}

        {view === "login" && (
          <section className="login">
            <h2>Iniciar sesión</h2>

            <p>
              Próximamente podrás acceder a tu cuenta de Siteblia.
            </p>

            <button
              className="primary-button"
              onClick={() => setView("home")}
            >
              Volver
            </button>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
