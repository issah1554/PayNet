import { useAuth } from "./hooks/useAuth";
import WelcomeForm from "./components/WelcomeForm";
import MultiStepContainer from "../../components/ui/MultiStepContainer";

export default function WelcomePage() {
  const { login, loading, error } = useAuth();

  return (
    <div className="d-flex vh-100 bg-light">
      {/* Left Section — Cover Image */}
      <div className="d-none d-md-flex col-md-6 bg-body-secondary justify-content-center align-items-center">
        <img
          src="/payment-cover.png"
          alt="Welcome Cover"
          className="img-fluid rounded shadow-sm"
          style={{ maxWidth: "420px" }}
        />
      </div>

      {/* Right Section — Multi-Step Form */}
      <div className="col-12 col-md-6 d-flex justify-content-center align-items-center p-4">
        <div className="w-100" style={{ maxWidth: "700px" }}>
          <MultiStepContainer
            steps={[
              {
                title: "Account",
                subtitle: "Create Account",
                icon: <i className="bi bi-person-circle fs-4"></i>,
                content: (
                  <div>
                    <h5 className="mb-3 fw-semibold text-primary">Account Information</h5>
                    <WelcomeForm
                      onLogin={login}
                      loading={loading}
                      error={error || ""}
                    />
                  </div>
                ),
              },
              {
                title: "Personal",
                subtitle: "Profile Details",
                icon: <i className="bi bi-person-lines-fill fs-4"></i>,
                content: (
                  <div>
                    <h5 className="mb-3 fw-semibold text-primary">Personal Information</h5>
                    <input className="form-control mb-3" placeholder="First Name" />
                    <input className="form-control mb-3" placeholder="Last Name" />
                    <input className="form-control mb-3" placeholder="Email Address" />
                  </div>
                ),
              },
              {
                title: "Billing",
                subtitle: "Payment Setup",
                icon: <i className="bi bi-credit-card fs-4"></i>,
                content: (
                  <div>
                    <h5 className="mb-3 fw-semibold text-primary">Payment Information</h5>
                    <input className="form-control mb-3" placeholder="Card Number" />
                    <input className="form-control mb-3" placeholder="Expiry Date" />
                    <input className="form-control mb-3" placeholder="CVV" />
                  </div>
                ),
              },
            ]}
            onSubmit={() => alert("Form submitted successfully.")}
          />
        </div>
      </div>
    </div>
  );
}
