import { useState } from "react";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/user/signin`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          Object.fromEntries(new FormData(event.currentTarget)),
        ),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not sign in");
      }

      window.location.assign("/");
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="auth-shell">
      <div className="auth-art">
        <Link className="brand auth-brand" to="/">
          <span className="brand-mark">t</span>todoform
        </Link>
        <div className="auth-art-copy">
          <span className="eyebrow">Your thoughts, collected</span>
          <h1>Return to a clearer mind.</h1>
          <p>
            A focused home for the todos, plans, and small ideas that keep your
            days moving.
          </p>
        </div>
        <span className="auth-quote">
          “The best way to have a good idea is to have a lot of ideas.”
        </span>
      </div>

      <main className="auth-panel">
        <div className="auth-form-wrap">
          <span className="eyebrow">Welcome back</span>
          <h2>Sign in to your space</h2>
          <p className="auth-intro">Pick up exactly where you left off.</p>
          <form className="auth-form" onSubmit={handleSubmit}>
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
            />
            <div className="label-row">
              <label htmlFor="password">Password</label>
              <span className="field-hint">Keep it private</span>
            </div>
            <div className="password-wrap">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                autoComplete="current-password"
                required
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {error && <p className="error-message">{error}</p>}
            <button className="auth-submit" type="submit" disabled={submitting}>
              {submitting ? "Signing in..." : "Sign in"} <span>→</span>
            </button>
          </form>
          <p className="auth-switch">
            New to todoform? <Link to="/signup">Create an account</Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default Signin;
