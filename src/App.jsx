import { useState } from "react";

function App() {
  const [screen, setScreen] = useState("welcome");

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: "500px", textAlign: "center" }}>
        <h1>Siteblia</h1>

        {screen === "welcome" && (
          <>
            <p>
              Crea y administra tu sitio web personalizado desde un solo lugar.
            </p>

            <button onClick={() => setScreen("login")}>
              Iniciar sesión
            </button>
          </>
        )}

        {screen === "login" && (
          <>
            <h2>Iniciar sesión</h2>
            <p>Próximamente conectaremos este formulario con Supabase.</p>

            <button onClick={() => setScreen("welcome")}>
              Volver
            </button>
          </>
        )}
      </div>
    </main>
  );
}

export default App;
