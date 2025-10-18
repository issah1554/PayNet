import { useState } from "react";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import { Link } from "react-router-dom";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmitEmail = async (email: string) => {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      // Call your forgot password API here
      // await forgotPassword(email);

      await new Promise((res) => setTimeout(res, 1500));
      setMessage("Reset link sent to your email.");
    } catch (err) {
      setError("Failed to send reset link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex vh-100 bg-light">
      {/* Left Section — Cover Image */}
      <div className="d-none d-md-flex col-md-8 bg-body-secondary position-relative justify-content-center align-items-center overflow-hidden">
        <Link to={"/"}>
          <div
            className="position-absolute top-0 start-0 m-4 fw-bold text-primary fs-4 cursor-pointer"
            style={{ letterSpacing: "0.5px" }}
          >
            <div className="mt-2 d-flex align-items-center gap-2">
              <img
                src="/wifi-icon.png"
                alt="PayNet Logo"
                style={{ width: "50px", height: "50px", objectFit: "contain" }}
              />
              PayNet
            </div>
          </div>
        </Link>

        <img
          src="/payment-cover.png"
          alt="Welcome Cover"
          className="img-fluid w-100 h-auto object-fit-contain p-5"
          style={{ maxWidth: "550px" }}
        />
      </div>

      {/* Right Section — Forgot Password Form */}
      <div className="col-12 col-md-4 d-flex justify-content-center align-items-center p-4">
        <div className="position-absolute top-0 end-0 m-4">
          <Link to={"/"}>
            <i className="bi bi-house fs-4 text-primary me-2"></i>
          </Link>
        </div>
        <div className="w-100" style={{ maxWidth: "700px" }}>
          <ForgotPasswordForm
            onSubmitEmail={handleSubmitEmail}
            loading={loading}
            message={message}
            error={error}
          />
        </div>
      </div>
    </div>
  );
}
