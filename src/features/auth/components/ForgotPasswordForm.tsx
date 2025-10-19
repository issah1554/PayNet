import { useState } from "react";
import type { FormEvent } from "react";
import Button from "../../../components/ui/Button";
import TextInput from "../../../components/ui/TextInput";
import { Link } from "react-router-dom";

interface ForgotPasswordFormProps {
  onSubmitEmail: (email: string) => void;
  loading: boolean;
  message: string;
  error: string;
}

export default function ForgotPasswordForm({
  onSubmitEmail,
  loading,
  message,
  error,
}: ForgotPasswordFormProps) {
  const [email, setEmail] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmitEmail(email);
  };

  return (
    <div className="card  animation-zoom-in w-100 bg-transparent border-0  p-0 p-md-4">
      <div className="card-body p-0">
        <h3 className="text-primary mb-4">
          <i className="bi bi-key"></i> Forgot Password
        </h3>

        <form onSubmit={handleSubmit} style={{ display: "grid" }}>
          <TextInput
            label="Email"
            labelBgColor="var(--bs-light)"
            type="email"
            icon={<i className="bi bi-envelope"></i>}
            inputSize="md"
            name="email"
          />
          <Button
            type="submit" fullWidth
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Sending...
              </>
            ) : (
              <>
                <i className="bi bi-envelope me-2"></i> Request Reset Link
              </>
            )}
          </Button>
          <div className="mt-3 text-center">
            <span>Return to </span>
            <Link to="/auth/login" className="text-decoration-none">
              Login
            </Link>
          </div>
        </form>

        {message && <div className="alert alert-success mt-3">{message}</div>}
        {error && <div className="alert alert-danger mt-3">{error}</div>}
      </div>
    </div>
  );
}
