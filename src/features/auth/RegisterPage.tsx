import { Link } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";

export default function RegisterPage() {
  const handleRegister = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    console.log("User Registration Attempt:", {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    });
    // Add your API call or validation logic here later
    alert(`Welcome, ${firstName}!`);
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
            <div className="mt-2">
              <img src="/wifi-icon.png" alt="PayNet Logo" style={{ width: "50px", height: "50px", objectFit: "contain" }} />  PayNet

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

      {/* Right Section — Register Form */}
      <div className="col-12 col-md-4 d-flex justify-content-center align-items-center p-4">
        <div className="w-100" style={{ maxWidth: "700px" }}>
          <RegisterForm
            onRegister={handleRegister}
            loading={false}
            error=""
          />
        </div>
      </div>
    </div>
  );
}
