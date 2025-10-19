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

    async function makePayment(payload: PaymentRequest) {
        setLoading(true);
        const response = await initiatePayment(payload);
        setData(response);
        setLoading(false);
    }

    return { data, loading, makePayment };
} 
