import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/ui/Button";
import OutlinedTextField from "../../../components/ui/TextInput";

interface LoginFormProps {
  onLogin: (email: string, password: string) => Promise<void>;
  loading?: boolean;
  error?: string;
}

export default function LoginForm({ onLogin, loading = false, error }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await onLogin(email, password);
  };

  return (
    <div className="card  animetion-zoom-in bg-transparent border-0  p-0 p-md-4">
      <div className="card-body p-0">
        <div className="mb-4">
          <h3 className="text-primary fw-semibold">
            Welcome Back
          </h3>
          <p className="text-muted small mb-0">
            Sign in to continue to your account and manage your dashboard with ease.
          </p>
        </div>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
          <OutlinedTextField
            label="Email Address"
            labelBgColor="var(--bs-light)"
            type="email"
            variant="primary"
            icon={<i className="bi bi-envelope"></i>}
            inputSize="md"
            name="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <OutlinedTextField
            label="Password"
            labelBgColor="var(--bs-light)"
            type="password"
            variant="primary"
            icon={<i className="bi bi-lock"></i>}
            inputSize="md"
            name="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="d-flex justify-content-between align-items-center mb-2">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMe"
              />
              <label className="form-check-label small" htmlFor="rememberMe">
                Remember me
              </label>
            </div>
            <Link
              to="/auth/forgot-password"
              className="text-decoration-none small text-primary"
            >
              Forgot password?
            </Link>
          </div>

          <Button type="submit" disabled={loading} fullWidth>
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  aria-hidden="true"
                ></span>
                <span role="status">Signing you in...</span>
              </>
            ) : (
              "Login"
            )}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <span className="text-muted">Don’t have an account? </span>
          <Link to="/auth/register" className="text-decoration-none text-primary fw-semibold">
            Create one
          </Link>
        </div>
      </div>
    </div>
  );
}
