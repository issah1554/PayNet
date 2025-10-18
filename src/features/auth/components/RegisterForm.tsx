import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/ui/Button";
import OutlinedTextField from "../../../components/ui/TextInput";

interface RegisterFormProps {
  onRegister: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => void;
  loading: boolean;
  error: string;
}

export default function RegisterForm({
  onRegister,
  loading,
  error,
}: RegisterFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    setPasswordError("");
    onRegister(firstName, lastName, email, password, confirmPassword);
  };

  return (
    <div className="card border-0 bg-transparent p-0 p-md-4" style={{ width: "100%" }}>
      <div className="card-body p-0">
        <div className="mb-4">
          <h3 className="text-primary fw-semibold">
            <i className="bi bi-person-plus me-2"></i>
            Create Your Account
          </h3>
          <p className="text-muted small mb-0">
            Join our community and start managing your account with ease.
          </p>
        </div>

        {error && <div className="alert alert-danger mb-3">{error}</div>}

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
          <div className="d-flex gap-2 justify-content-between">
            <OutlinedTextField
              label="First Name"
              labelBgColor="var(--bs-light)"
              type="text"
              variant="primary"
              icon={<i className="bi bi-person"></i>}
              inputSize="md"
              name="firstName"
              placeholder="John"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />

            <OutlinedTextField
              label="Last Name"
              labelBgColor="var(--bs-light)"
              type="text"
              variant="primary"
              icon={<i className="bi bi-person"></i>}
              inputSize="md"
              name="lastName"
              placeholder="Doe"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

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
            placeholder="Enter a strong password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <OutlinedTextField
            label="Confirm Password"
            labelBgColor="var(--bs-light)"
            type="password"
            variant={passwordError ? "warning" : "primary"}
            icon={<i className="bi bi-lock-fill"></i>}
            inputSize="md"
            name="confirmPassword"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            helperText={passwordError}
            required
          />

          <Button type="submit" fullWidth disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Creating your account...
              </>
            ) : (
              <>
                <i className="bi bi-person-plus me-2"></i>
                Register
              </>
            )}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <span className="text-muted">Already have an account? </span>
          <Link to="/auth/login" className="text-decoration-none text-primary fw-semibold">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
