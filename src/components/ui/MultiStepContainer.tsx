import React, { useState } from "react";
import Button from "./Button";

interface Step {
    title: string;
    subtitle?: string;
    icon?: React.ReactNode; // ← change this line
    content: React.ReactNode;
}

interface MultiStepContainerProps {
    steps: Step[];
    onSubmit?: () => void;
}

export default function MultiStepContainer({ steps, onSubmit }: MultiStepContainerProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const totalSteps = steps.length;

    const next = () => {
        if (currentStep < totalSteps - 1) setCurrentStep(currentStep + 1);
        else onSubmit?.();
    };

    const prev = () => {
        if (currentStep > 0) setCurrentStep(currentStep - 1);
    };

    return (
        <div className="container-sm mt-5">
            <div className="card border-0 rounded-4 overflow-hidden bg-transparent">
                {/* Step Header */}
                <div className="card-header  border-0 px-3 py-3 bg-transparent">
                    <div className="d-flex justify-content-between align-items-center flex-wrap">
                        {steps.map((step, i) => (
                            <div key={i} className="d-flex align-items-center">
                                <button
                                    type="button"
                                    className={`btn d-flex flex-column align-items-center border-0  position-relative ${i === currentStep
                                            ? "text-primary fw-semibold"
                                            : i < currentStep
                                                ? "text-success"
                                                : "text-muted"
                                        }`}
                                    onClick={() => i < currentStep && setCurrentStep(i)}
                                    disabled={i > currentStep}
                                >
                                    <div
                                        className={`rounded d-flex align-items-center justify-content-center border ${i === currentStep
                                                ? "bg-primary-subtle border-primary text-primary"
                                                : i < currentStep
                                                    ? "bg-success-subtle border-success text-success"
                                                    : "bg-light border-secondary text-secondary"
                                            }`}
                                        style={{ width: "42px", height: "42px" }}
                                    >
                                        {step.icon || i + 1}  {/* ← render directly */}
                                    </div>

                                    <span>{step.title}</span>
                                    {step.subtitle && (
                                        <small className="text-secondary">{step.subtitle}</small>
                                    )}
                                </button>

                                {i < totalSteps - 1 && (
                                    <i className="bi bi-chevron-right text-muted mx-2"></i>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Step Content */}
                <div className="card-body px-4 py-4">
                    {steps[currentStep].content}
                </div>

                {/* Footer */}
                <div className="card-footer bg-white border-0 px-4 py-3 d-flex justify-content-between bg-transparent">
                    <button
                        type="button"
                        onClick={prev}
                        className="btn btn-outline-secondary"
                        disabled={currentStep === 0}
                    >
                        <i className="bi bi-arrow-left me-2"></i> Previous
                    </button>

                    <Button onClick={next} >
                        {currentStep === totalSteps - 1 ? (
                            <>
                                <i className="bi bi-check2-circle me-2"></i> Submit
                            </>
                        ) : (
                            <>
                                Next <i className="bi bi-arrow-right ms-2"></i>
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}
