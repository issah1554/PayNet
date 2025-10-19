import { useEffect, useState } from "react";
import MultiStepContainer from "../../components/ui/MultiStepContainer";
import TextInput from "../../components/ui/TextInput";
import AuthContainer from "./components/AuthContainer";
import { usePlans, usePaymentRequest } from "../../hooks/usePayments";
import Loader from "../../components/ui/Loaders";
import type { PaymentRequest } from "../../types/types";

export default function WelcomePage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [isMdUp, setIsMdUp] = useState(false);

  const { plans, loading: plansLoading } = usePlans();
  const { data: paymentData, loading: paymentLoading, error: paymentError, makePayment } = usePaymentRequest();

  const paymentMethods = [
    { id: "mpesa", name: "M-Pesa", img: "/mpesa-logo.png", desc: "Pay quickly via Safaricom M-Pesa." },
    { id: "airtelmoney", name: "Airtel Money", img: "/airtelmoney-logo.png", desc: "Use Airtel Money for secure payments." },
    { id: "halopesa", name: "HaloPesa", img: "/halopesa-logo.png", desc: "HaloPesa offers convenient mobile payment options." },
  ];

  useEffect(() => {
    const handleResize = () => setIsMdUp(window.innerWidth >= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmit = () => {
    if (!selectedPlan || !selectedMethod || !phone) return;

    const payload: PaymentRequest = {
      planId: selectedPlan,
      paymentMethod: selectedMethod, // string, must match type
      phoneNumber: Number(phone),
    };

    makePayment(payload);
  };

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
            canProceed: !!selectedPlan,
            content: (
              <div>
                <h5 className="mb-3 fw-semibold text-primary">Choose Your Internet Package</h5>
                <p className="text-muted small mb-4">Select your preferred internet plan. Prices are in TZS.</p>
                {plansLoading ? (
                  <Loader type="bars" />
                ) : (
                  <div className="row g-4 animation-zoom-in">
                    {plans.map((plan) => (
                      <div className="col-12 col-md-4" key={plan.id}>
                        <div
                          className={`card shadow-sm border-2 text-center p-4 h-100 transition ${selectedPlan === plan.id ? "border-primary bg-primary-subtle" : "border-0 bg-white"
                            }`}
                          onClick={() => setSelectedPlan(plan.id)}
                          style={{ cursor: "pointer", minHeight: "220px" }}
                        >
                          <h6 className="fw-bold mb-2">{plan.name}</h6>
                          <p className="text-muted small mb-1">{plan.description}</p>
                          <p className="fw-semibold text-primary mb-1">
                            {plan.currency} {plan.price} / {plan.duration}
                          </p>
                          <p className="text-secondary small mb-0">Data Limit: {plan.dataLimit}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ),
          },
          {
            title: "Method",
            icon: <i className="bi bi-wallet2 fs-4"></i>,
            canProceed: !!selectedMethod,
            content: (
              <div>
                <h5 className="mb-3 fw-semibold text-primary">Choose Your Payment Method</h5>
                <p className="text-muted small mb-4">Select a payment option to complete your purchase.</p>
                <div className="row g-4">
                  {paymentMethods.map((method) => (
                    <div className="col-12 col-md-4" key={method.id}>
                      <div
                        className={`card shadow-sm border-2 text-center p-4 h-100 transition ${selectedMethod === method.id ? "border-primary bg-primary-subtle" : "border-0 bg-white"
                          }`}
                        onClick={() => setSelectedMethod(method.id)}
                        style={{ cursor: "pointer", minHeight: "220px" }}
                      >
                        <div className="d-flex justify-content-center align-items-center mb-3">
                          <img
                            src={method.img}
                            alt={method.name}
                            className="img-fluid"
                            style={{ width: "100px", height: "60px", objectFit: "contain" }}
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
            canProceed: username.trim() !== "" && phone.trim() !== "",
            content: (
              <div className="row">
                <h5 className="mb-3 fw-semibold text-primary">Account Information</h5>
                <TextInput
                  label="Username"
                  labelBgColor="var(--bs-light)"
                  helperText="This is just a temporary name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <div className="my-2">
                  <TextInput
                    label="Phone number"
                    labelBgColor="var(--bs-light)"
                    helperText="e.g. 07xxxxxxx"
                    type="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
            ),
          },
        ]}
        onSubmit={handleSubmit}
      />

      {paymentLoading && <Loader type="bars" />}
      {paymentError && <p className="text-danger mt-3">{paymentError}</p>}
      {paymentData && (
        <p className="text-success mt-3">Payment successful! ID: {paymentData.id}</p>
      )}
    </AuthContainer>
  );
}
