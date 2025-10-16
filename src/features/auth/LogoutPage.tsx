import { useEffect, useState } from "react";
import { useAuth } from "./hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function LogoutPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5); // Initial countdown value in seconds

  useEffect(() => {
    logout(); // clear token and auth data

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/auth"); // redirect to welcome when countdown reaches 0
          return 0;
        }
        return prev - 1;
      });
    }, 1000); // Update every second

    return () => clearInterval(timer);
  }, [navigate, logout]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="text-center">
        <i
          className="bi bi-check-circle text-success"
          style={{ fontSize: "4rem" }}
        ></i>
        <h3 className="mt-3">You have been logged out successfully.</h3>
        <p>
          Redirecting to welcome page in {countdown} second
          {countdown !== 1 ? "s" : ""}...
        </p>
      </div>
    </div>
  );
}
