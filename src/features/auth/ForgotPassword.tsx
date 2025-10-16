import { useState } from "react";
import ForgotPasswordForm from "./components/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmitEmail = async (email: string) => {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      // Call your forgot password API here
      // await forgotPassword(email);

      // Simulate API success delay
      await new Promise((res) => setTimeout(res, 1500));

      setMessage("Reset link sent to your email.");
    } catch (err) {
      setError("Failed to send reset link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 db-bg-light">
      <ForgotPasswordForm
        onSubmitEmail={handleSubmitEmail}
        loading={loading}
        message={message}
        error={error}
      />
    </div>
  );
}
