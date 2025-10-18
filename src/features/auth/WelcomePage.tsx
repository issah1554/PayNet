import { useEffect, useState } from "react";
import MultiStepContainer from "../../components/ui/MultiStepContainer";
import TextInput from "../../components/ui/TextInput";
import AuthContainer from "./components/AuthContainer";

export default function WelcomePage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [isMdUp, setIsMdUp] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMdUp(window.innerWidth >= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
    <AuthContainer
      leftCol="col-md-6"
      rightCol="col-md-6"
      rightClassName={isMdUp ? "d-flex justify-content-center align-items-center" : undefined}
      rightStyle={isMdUp ? { minHeight: "100vh", paddingTop: 0 } : undefined}
      imageSrc="/payment-cover.png"
      logoSrc="/wifi-icon.png"
      appName="PayNet"
      navIcon={<i className="bi bi-person fs-4 text-primary"></i>}
      navLink="/auth/login"
    >
        <MultiStepContainer
          steps={[
            {
              title: "Billing",
              icon: <i className="bi bi-credit-card fs-4"></i>,
              content: (
                <div>
                  <h5 className="mb-3 fw-semibold text-primary">Choose Your Internet Package</h5>
                  <p className="text-muted small mb-4">
                    Select your preferred internet plan. Prices are in Tanzanian Shillings (TZS) and include data limits.
                  </p>

                  <div className="row g-4">
                    {[
                      {
                        name: "Basic",
                        price: "TZS 1,000",
                        limit: "500 MB",
                        duration: "per hour",
                        desc: "Light browsing, email, and messaging",
                      },
                      {
                        name: "Standard",
                        price: "TZS 3,000",
                        limit: "2 GB",
                        duration: "per day",
                        desc: "Streaming, social media, and regular work use",
                      },
                      {
                        name: "Premium",
                        price: "TZS 15,000",
                        limit: "10 GB",
                        duration: "per week",
                        desc: "High-speed access with extended data limit",
                      },
                    ].map((plan) => (
                      <div className="col-12 col-md-4" key={plan.name}>
                        <div
                          className={`card shadow-sm border-2 text-center p-4 h-100 transition ${selectedPlan === plan.name
                            ? "border-primary bg-primary-subtle"
                            : "border-0 bg-white"
                            }`}
                          onClick={() => setSelectedPlan(plan.name)}
                          style={{ cursor: "pointer", minHeight: "220px" }}
                        >
                          <h6 className="fw-bold mb-2">{plan.name}</h6>
                          <p className="text-muted small mb-1">{plan.desc}</p>
                          <p className="fw-semibold text-primary mb-1">
                            {plan.price} / {plan.duration}
                          </p>
                          <p className="text-secondary small mb-0">Data Limit: {plan.limit}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ),
            },
            {
              title: "Method",
              icon: <i className="bi bi-wallet2 fs-4"></i>,
              content: (
                <div>
                  <h5 className="mb-3 fw-semibold text-primary">Choose Your Payment Method</h5>
                  <p className="text-muted small mb-4">
                    Select a payment option to complete your internet package purchase. All prices are in TZS.
                  </p>

                  <div className="row g-4">
                    {[
                      {
                        name: "M-Pesa",
                        img: "/mpesa-logo.png",
                        desc: "Pay quickly via Safaricom M-Pesa. Supports instant transfers and mobile receipts.",
                      },
                      {
                        name: "Airtel Money",
                        img: "/airtelmoney-logo.png",
                        desc: "Use Airtel Money for secure payments directly from your Airtel wallet.",
                      },
                      {
                        name: "HaloPesa",
                        img: "/halopesa-logo.png",
                        desc: "HaloPesa offers convenient mobile payment options for daily internet packages.",
                      },
                    ].map((method) => (
                      <div className="col-12 col-md-4" key={method.name}>
                        <div
                          className={`card shadow-sm border-2 text-center p-4 h-100 transition ${selectedMethod === method.name
                            ? "border-primary bg-primary-subtle"
                            : "border-0 bg-white"
                            }`}
                          onClick={() => setSelectedMethod(method.name)}
                          style={{ cursor: "pointer", minHeight: "220px" }}
                        >
                          <div className="d-flex justify-content-center align-items-center mb-3">
                            <img
                              src={method.img}
                              alt={method.name}
                              className="img-fluid"
                              style={{
                                width: "100px",
                                height: "60px",
                                objectFit: "contain",
                              }}
                            />
                          </div>
                          <h6 className="fw-semibold mb-1">{method.name}</h6>
                          <p className="text-muted small mb-0">{method.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ),
            },
            {
              title: "Phone",
              icon: <i className="bi bi-telephone fs-4"></i>,
              content: (
                <div>
                  <h5 className="mb-3 fw-semibold text-primary">Account Information</h5>
                  <div className="my-4">
                    <TextInput
                      label="Username"
                      labelBgColor="var(--bs-light)"
                      helperText="This is just a temporary name"
                    />
                  </div>
                  <div className="my-4">
                    <TextInput
                      label="Phone number"
                      labelBgColor="var(--bs-light)"
                      helperText="e.g. 07xxxxxxx"
                      type="phone"
                    />
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
    </AuthContainer>
  );
}
