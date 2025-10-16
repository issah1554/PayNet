import { useState } from "react";
import type { FormEvent } from "react";
import OutlinedTextField from "../../../components/ui/TextInput";
import Button from "../../../components/ui/Button";


interface OTPFormProps {
  onVerify: (otp: string) => void;
  loading: boolean;
  error: string;
}

export default function OTPForm({ onVerify, loading, error }: OTPFormProps) {
  const [otp, setOtp] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onVerify(otp);
  };

  return (
    <div
      className="card shadow p-4"
      style={{ width: "100%", maxWidth: "400px" }}
    >
      <h3 className="text-center mb-4 text-primary">
        <i className="bi bi-shield-lock"></i> Verify OTP
      </h3>

      <form onSubmit={handleSubmit} style={{ display: "grid" }}>
        <OutlinedTextField
          required
          onChange={(e) => setOtp(e.target.value)}
          value={otp}
          label="Enter the OTP sent to your email"
          type="email"
          variant="secondary"
          icon={<i className="bi bi-shield-check"></i>}
          inputSize="md"
          name="otp"
        />

        <Button
          type="submit"
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2"></span>
              Verifying...
            </>
          ) : (
            <>
              <i className="bi bi-shield-lock me-2"></i> Verify
            </>
          )}
        </Button>
      </form>

      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
}
