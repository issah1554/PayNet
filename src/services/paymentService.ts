import type { PaymentRequest } from "../types/types";


export async function getPaymentMethods() {
    const res = await fetch("/api/payments/methods");
    return res.json();
}

export async function getPlans() {
    const res = await fetch("/api/plans");
    const data = await res.json();
    return data; // returns array of plans
}


export async function initiatePayment(data: PaymentRequest) {
    const res = await fetch(`/api/payments/initiate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return res.json();
}

