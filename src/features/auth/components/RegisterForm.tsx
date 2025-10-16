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
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    setPasswordError(""); // Clear error
    onRegister(firstName, lastName, email, password, confirmPassword);
  };

  return (
    <div className="card shadow p-4" style={{ width: "100%", maxWidth: "400px" }}>
      <h3 className="text-center mb-4 text-primary">
        <i className="bi bi-person-plus"></i> Register
      </h3>

      {error && <div className="alert alert-danger mb-3">{error}</div>}

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
        <OutlinedTextField
          label="First Name"
          type="text"
          variant="secondary"
          icon={<i className="bi bi-person"></i>}
          inputSize="md"
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <OutlinedTextField
          label="Last Name"
          type="text"
          variant="secondary"
          icon={<i className="bi bi-person"></i>}
          inputSize="md"
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <OutlinedTextField
          label="Email"
          type="email"
          variant="secondary"
          icon={<i className="bi bi-envelope"></i>}
          inputSize="md"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <OutlinedTextField
          label="Password"
          type="password"
          variant="secondary"
          inputSize="md"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <OutlinedTextField
          label="Confirm Password"
          type="password"
          variant={passwordError ? "warning" : "secondary"}
          inputSize="md"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          helperText={passwordError}
        />

        <Button type="submit" fullWidth disabled={loading}>
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2"></span>
              Registering...
            </>
          ) : (
            <>
              <i className="bi bi-person-plus me-2"></i> Register
            </>
          )}
        </Button>
      </form>

      <div className="mt-3 text-center">
        <span>Already have an account? </span>
        <Link to="/auth/login" className="text-decoration-none">
          Login
        </Link>
      </div>
    </div>
  );
}
