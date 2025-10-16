import { useAuth } from "./hooks/useAuth";
import WelcomeForm from "./components/WelcomeForm";

export default function WelcomePage() {
  const { login, loading, error } = useAuth();

  return (
    <div className="d-flex vh-100">
      {/* Left: Cover (visible on md+ screens) */}
      <div className="d-none d-md-flex col-md-8  bg-surface justify-content-center align-items-center">
        <img
          src="/payment-cover.png"
          alt="Login Cover"
          className="img-fluid"
          style={{ maxWidth: "400px" }}
        />
      </div>

      {/* Right: Login Form */}
      <div className="col-12 col-md-4 d-flex justify-content-center align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-9 col-lg-9">
              <WelcomeForm
                onLogin={login}
                loading={loading}
                error={error || ""}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
