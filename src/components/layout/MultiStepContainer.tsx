import React, { useState } from "react";
import Button from "../ui/Button";

interface Step {
    title: string;
    subtitle?: string;
    icon?: React.ReactNode;
    content: React.ReactNode;
    canProceed?: boolean;
}

interface MultiStepContainerProps {
    steps: Step[];
    onSubmit?: () => void;
}

export default function MultiStepContainer({ steps, onSubmit }: MultiStepContainerProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const totalSteps = steps.length;

    const next = () => {
        if (steps[currentStep].canProceed) {
            if (currentStep < totalSteps - 1) setCurrentStep(currentStep + 1);
            else onSubmit?.();
        }
    };

    const prev = () => {
        if (currentStep > 0) setCurrentStep(currentStep - 1);
    };

    return (
        <div className="max-w-3xl mx-auto mt-5 px-4">
            <div className="bg-transparent rounded-2xl overflow-hidden">

                {/* Step Header */}
                <div className="flex justify-between items-center flex-wrap mb-6">
                    {steps.map((step, i) => {
                        const isActive = i === currentStep;
                        const isCompleted = i < currentStep;

                        const circleClasses = isActive
                            ? "bg-primary-100 border border-primary-500 text-primary-600"
                            : isCompleted
                                ? "bg-success-100 border border-success text-success"
                                : "bg-neutral-100 border border-neutral-300 text-neutral-500";

                        const textClasses = isActive
                            ? "text-primary-600 font-semibold"
                            : isCompleted
                                ? "text-success"
                                : "text-neutral-400";

                        return (
                            <div key={i} className="flex items-center">
                                <div className="flex flex-col items-center">
                                    <div
                                        className={`flex items-center justify-center rounded-full w-10 h-10 ${circleClasses}`}
                                    >
                                        {step.icon || i + 1}
                                    </div>
                                    <span className={`mt-2 text-sm ${textClasses}`}>{step.title}</span>
                                    {step.subtitle && <small className="text-neutral-400">{step.subtitle}</small>}
                                </div>
                                {i < totalSteps - 1 && <div className="mx-3 text-neutral-400">→</div>}
                            </div>
                        );
                    })}
                </div>

                {/* Step Content */}
                <div className="transition-all duration-300" key={currentStep}>
                    {steps[currentStep].content}
                </div>

                {/* Footer */}
                <div className="flex justify-between mt-6">
                    <Button
                        onClick={prev}
                        color="neutral"
                        variant="outline"
                        disabled={currentStep === 0}
                        rounded="lg"
                    >
                        ← Previous
                    </Button>

                    <Button
                        onClick={next}
                        color={currentStep === totalSteps - 1 ? "accent" : "primary"}
                        disabled={!steps[currentStep].canProceed}
                        rounded="lg"
                    >
                        {currentStep === totalSteps - 1 ? "✔ Submit" : "Next →"}
                    </Button>
                </div>
            </div>
        </div>
    );
}
