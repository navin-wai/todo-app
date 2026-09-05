import { useState } from "react";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/user/signup`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(event.currentTarget))),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not create account");
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
      <div className="auth-art auth-art-signup">
        <Link className="brand auth-brand" to="/"><span className="brand-mark">n</span>noteform</Link>
        <div className="auth-art-copy">
          <span className="eyebrow">A little room to think</span>
          <h1>Start with one good note.</h1>
          <p>Build a simple ritual for capturing what matters and making progress feel visible.</p>
        </div>
        <span className="auth-quote">One page. A thousand better beginnings.</span>
      </div>

      <main className="auth-panel">
        <div className="auth-form-wrap">
          <span className="eyebrow">Join noteform</span>
          <h2>Create your workspace</h2>
          <p className="auth-intro">A calm place for your everyday thinking.</p>
          <form className="auth-form" onSubmit={handleSubmit}>
            <label htmlFor="fullName">Full name</label>
            <input type="text" id="fullName" name="fullName" autoComplete="name" required placeholder="Your name" />
            <label htmlFor="email">Email address</label>
            <input type="email" id="email" name="email" autoComplete="email" required placeholder="you@example.com" />
            <div className="label-row">
              <label htmlFor="password">Password</label>
              <span className="field-hint">At least 8 characters</span>
            </div>
            <div className="password-wrap">
              <input type={showPassword ? "text" : "password"} id="password" name="password" autoComplete="new-password" minLength="8" required placeholder="Create a password" />
              <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>{showPassword ? "Hide" : "Show"}</button>
            </div>
            {error && <p className="error-message">{error}</p>}
            <button className="auth-submit" type="submit" disabled={submitting}>{submitting ? "Creating..." : "Create workspace"} <span>→</span></button>
          </form>
          <p className="auth-switch">Already have an account? <Link to="/signin">Sign in</Link></p>
        </div>
      </main>
    </div>
  );
}

export default Signup;
