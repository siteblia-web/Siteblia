import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function getSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (mounted) {
        setSession(session);
        setLoading(false);
      }
    }

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="auth-page">
        <div className="auth-right">
          <div className="login-card">
            <p>Cargando Siteblia...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    return <Login />;
  }

  return <Dashboard session={session} />;
}

function Login() {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setMessage("");
    setLoading(true);

    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      }
    }

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        setMessage(
          "Cuenta creada. Revisa tu correo si Supabase solicita confirmar tu email."
        );
      }
    }

    setLoading(false);
  }

  async function handleResetPassword() {
    if (!email) {
      setError("Escribe primero tu correo electrónico.");
      return;
    }

    setError("");
    setMessage("");
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin,
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage("Te enviamos un enlace para recuperar tu contraseña.");
    }

    setLoading(false);
  }

  const isSignup = mode === "signup";

  return (
    <div className="auth-page">
      <section className="auth-left">
        <div className="auth-brand">
          <span className="brand-symbol">S</span>
          <span>Siteblia</span>
        </div>

        <div className="auth-presentation">
          <span className="yellow-label">PLATAFORMA DIGITAL</span>

          <h1>
            Tu negocio.
            <br />
            <strong>Un solo lugar.</strong>
          </h1>

          <p>
            Administra tu negocio, tu página web, facturación, pagos,
            herramientas y mucho más desde Siteblia.
          </p>
        </div>

        <div className="auth-footer">
          © {new Date().getFullYear()} Siteblia
        </div>
      </section>

      <section className="auth-right">
        <div className="login-card">
          <div className="mobile-brand">
            <span className="brand-symbol">S</span>
            <span>Siteblia</span>
          </div>

          <div className="login-heading">
            <span className="page-label">
              {isSignup ? "CREAR CUENTA" : "BIENVENIDO"}
            </span>

            <h2>{isSignup ? "Crea tu cuenta" : "Inicia sesión"}</h2>

            <p>
              {isSignup
                ? "Crea tu acceso a Siteblia."
                : "Accede a la administración de tu negocio."}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <label>
              Correo electrónico
              <input
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </label>

            <label>
              Contraseña
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                minLength={6}
              />
            </label>

            {!isSignup && (
              <div className="form-options">
                <label className="checkbox-label">
                  <input type="checkbox" />
                  Recordarme
                </label>

                <button
                  type="button"
                  className="text-button"
                  onClick={handleResetPassword}
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
            )}

            {error && (
              <p style={{ color: "#b91c1c", fontSize: "11px" }}>{error}</p>
            )}

            {message && (
              <p style={{ color: "#15803d", fontSize: "11px" }}>
                {message}
              </p>
            )}

            <button
              className="primary-button full-width"
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Procesando..."
                : isSignup
                ? "Crear cuenta"
                : "Entrar a Siteblia"}
            </button>
          </form>

          <div className="login-divider">
            <span>o</span>
          </div>

          <p className="login-help">
            {isSignup
              ? "¿Ya tienes una cuenta?"
              : "¿Todavía no tienes una cuenta?"}
          </p>

          <button
            type="button"
            className="secondary-button full-width"
            onClick={() => {
              setMode(isSignup ? "login" : "signup");
              setError("");
              setMessage("");
            }}
          >
            {isSignup ? "Iniciar sesión" : "Crear una cuenta"}
          </button>
        </div>
      </section>
    </div>
  );
}

function Dashboard({ session }) {
  async function handleLogout() {
    await supabase.auth.signOut();
  }

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Sesión iniciada</h1>

      <p>
        Has iniciado sesión como:
        <br />
        <strong>{session.user.email}</strong>
      </p>

      <button className="primary-button" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </div>
  );
}

export default App;
