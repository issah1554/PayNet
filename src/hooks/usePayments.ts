// hooks/usePayments.ts
import { useState, useEffect } from "react";
import {getPlans, initiatePayment } from "../services/paymentService";
import type { Plan,PaymentRequest } from "../types/types"

export function usePlans() {
    const [plans, setPlans] = useState<Plan[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPlans().then((data) => {
            setPlans(data);
            setLoading(false);
        });
    }, []);

    return { plans, loading };
}

export function usePaymentRequest() {
    const [data, setData] = useState<any>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const makePayment = async (payload: PaymentRequest) => {
        setLoading(true);
        setError(null);
        try {
            const response = await initiatePayment(payload);
            setData(response);
        } catch (err: any) {
            setError(err.message || "Payment failed");
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, makePayment };
}
 
