// services/paymentService.ts
export async function getPaymentMethods() {
    const res = await fetch("/api/payments/methods");
    return res.json();
}

// services/planService.ts
export async function getPlans() {
    const res = await fetch("/api/plans");
    const data = await res.json();

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 3000));

    return data; // returns array of plans
}

