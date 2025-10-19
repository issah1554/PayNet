// services/paymentService.ts
export async function getPaymentMethods() {
    const res = await fetch("/api/payments/methods");
    return res.json();
}

export async function createTransaction(data: { userId: string; planId: string; methodId: string }) {
    const res = await fetch("/api/payments/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return res.json();
}

export async function getTransactionHistory(userId: string) {
    const res = await fetch(`/api/payments/transactions/${userId}`);
    return res.json();
}


// services/planService.ts
export async function getPlans() {
    const res = await fetch("/api/plans");
    return res.json(); // returns array of plans
}
