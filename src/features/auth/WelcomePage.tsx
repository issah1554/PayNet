import { useState } from "react";
import MultiStepContainer from "../../components/ui/MultiStepContainer";
import TextInput from "../../components/ui/TextInput";

export default function WelcomePage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  return (
    <div className="d-flex vh-100 bg-light">
      {/* Left Section — Cover Image */}
      <div className="d-none d-md-flex col-md-6 bg-body-secondary position-relative justify-content-center align-items-center overflow-hidden">
        <div
          className="position-absolute top-0 start-0 m-4 fw-bold text-primary fs-4"
          style={{ letterSpacing: "0.5px" }}
        >
          PayNet
        </div>
        <img
          src="/payment-cover.png"
          alt="Welcome Cover"
          className="img-fluid w-100 h-auto object-fit-contain p-5"
          style={{ maxWidth: "550px" }}
        />
      </div>

      {/* Right Section — Multi-Step Form */}
      <div className="col-12 col-md-6 d-flex justify-content-center align-items-center p-4">
        <div className="w-100" style={{ maxWidth: "700px" }}>
          <MultiStepContainer
            steps={[

              {
                title: "Billing",
                icon: <i className="bi bi-credit-card fs-4"></i>,
                content: (
                  <div>
                    <h5 className="mb-3 fw-semibold text-primary">Choose Your Plan</h5>
                    <div className="row g-3">
                      {[
                        { name: "Basic", price: "$5/mo", desc: "Starter features" },
                        { name: "Standard", price: "$10/mo", desc: "Most popular choice" },
                        { name: "Premium", price: "$20/mo", desc: "All features" },
                      ].map((plan) => (
                        <div className="col-12 col-md-4" key={plan.name}>
                          <div
                            className={`card shadow-sm border-2 text-center p-3 h-100 cursor-pointer transition
                              ${selectedPlan === plan.name
                                ? "border-primary bg-primary-subtle"
                                : "border-0 bg-white"
                              }`}
                            onClick={() => setSelectedPlan(plan.name)}
                            style={{ cursor: "pointer" }}
                          >
                            <h6 className="fw-bold mb-1">{plan.name}</h6>
                            <p className="text-muted small mb-1">{plan.desc}</p>
                            <p className="fw-semibold text-primary mb-0">{plan.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ),
              },
              {
                title: "Payment Method",
                icon: <i className="bi bi-wallet2 fs-4"></i>,
                content: (
                  <div>
                    <h5 className="mb-3 fw-semibold text-primary">Choose Payment Method</h5>
                    <div className="row g-3">
                      {[
                        { name: "M-Pesa", icon: "bi-phone-fill", color: "text-success" },
                        { name: "Airtel Money", icon: "bi-wifi", color: "text-danger" },
                        { name: "HaloPesa", icon: "bi-broadcast", color: "text-warning" },
                      ].map((method) => (
                        <div className="col-12 col-md-4" key={method.name}>
                          <div
                            className={`card shadow-sm border-2 text-center p-3 h-100 transition
                              ${selectedMethod === method.name
                                ? "border-primary bg-primary-subtle"
                                : "border-0 bg-white"
                              }`}
                            onClick={() => setSelectedMethod(method.name)}
                            style={{ cursor: "pointer" }}
                          >
                            <i className={`bi ${method.icon} ${method.color} fs-3 mb-2`}></i>
                            <h6 className="fw-semibold mb-0">{method.name}</h6>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ),
              },
              {
                title: "Account",
                icon: <i className="bi bi-person-circle fs-4"></i>,
                content: (
                  <div>
                    <h5 className="mb-3 fw-semibold text-primary">Account Information</h5>
                    <div className="my-4">
                      <TextInput label="Username" />
                    </div>
                    <div className="my-4">
                      <TextInput label="Phone number" />
                    </div>
                  </div>
                ),
              },
            ]}
            onSubmit={() =>
              alert(
                `Selected Plan: ${selectedPlan || "None"}\nPayment Method: ${selectedMethod || "None"
                }`
              )
            }
          />
        </div>
      </div>
    </div>
  );
}
