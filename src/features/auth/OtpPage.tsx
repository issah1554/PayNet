import { useState } from "react";
import OTPForm from "./components/OtpForm";
interface OTPPageProps {
  otp?: string; // optional if it might not be passed
}

export default function OTPPage({ otp }: OTPPageProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleVerify = async () => {
    setLoading(true);
    setError("");

    try {
      // Call your OTP verification API here
      // await verifyOTP(otp);

      await new Promise((res) => setTimeout(res, 1500));
      alert("OTP verified successfully!");
    } catch (err) {
      setError("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 db-bg-light">
      <OTPForm onVerify={handleVerify} loading={loading} error={error} />
    </div>
  );
}

