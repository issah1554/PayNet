import type { PaymentRequest } from "../types/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getPaymentMethods() {
    const res = await fetch(`${API_BASE_URL}/payments/methods`);
    return res.json();
}

export async function getPlans() {
    const res = await fetch(`${API_BASE_URL}/plans`);
    return res.json();
}

export async function initiatePayment(data: PaymentRequest) {
    const res = await fetch(`${API_BASE_URL}/payments/initiate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return res.json();
}
