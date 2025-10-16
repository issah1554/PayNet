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
    <div className="card shadow p-4">
      <div className="card-body">
        <h3 className="text-center text-primary mb-4">
          <i className="bi bi-box-arrow-in-right me-2"></i>
          Login
        </h3>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "grid" }}>
          <OutlinedTextField
            label="Email"
            type="email"
            variant="secondary"
            icon={<i className="bi bi-envelope"></i>}
            inputSize="md"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <OutlinedTextField
            label="Password"
            type="password"
            variant="secondary"
            inputSize="md"
            name="password"
            onChange={e => setPassword(e.target.value)}
          />
          <div className="d-flex justify-content-between mb-3">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMe"
              />
              <label className="form-check-label" htmlFor="rememberMe">
                Remember me
              </label>
            </div>
            <Link to="/auth/forgot-password" className="text-decoration-none">
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            disabled={loading}
            fullWidth
          >

            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"aria-hidden="true"></span>
                <span role="status">Logging in...</span>
              </>
            ) : (
              "Login"
            )}

          </Button>
        </form>

        <div className="mt-3 text-center">
          <span className="text-muted">Don't have an account? </span>
          <Link to="/auth/register" className="text-decoration-none">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}