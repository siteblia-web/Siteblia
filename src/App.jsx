function App() {
  return (
    <div className="app">
      <header className="header">
        <div className="brand">
          <div className="brand-icon">S</div>
          <span>Siteblia</span>
        </div>
      </header>

      <main className="main">
        <div className="hero">
          <span className="label">PLATAFORMA DIGITAL</span>

          <h1>
            Tu negocio.
            <br />
            <strong>Un solo lugar.</strong>
          </h1>

          <p>
            Administra tu página web, negocio, pagos y herramientas
            digitales desde Siteblia.
          </p>

          <button className="button">
            Entrar a Siteblia
          </button>
        </div>
      </main>

      <footer className="footer">
        © {new Date().getFullYear()} Siteblia
      </footer>
    </div>
  );
}

export default App;
