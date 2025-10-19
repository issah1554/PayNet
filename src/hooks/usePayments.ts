// hooks/usePayments.ts
import { useState, useEffect } from "react";
import { getPaymentMethods, createTransaction, getTransactionHistory, getPlans } from "../services/paymentService";
import type { Plan, PaymentMethod, } from "../types/types"

interface Transaction {
    id: string;
    userId: string;
    planId: string;
    methodId: string;
    // optional extra fields
    amount?: number;
    date?: string;
    [key: string]: any;
}


export function usePayments(userId: string) {
    const [methods, setMethods] = useState<PaymentMethod[]>([]);
    const [history, setHistory] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([getPaymentMethods(), getTransactionHistory(userId)]).then(([m, h]) => {
            setMethods(m);
            setHistory(h);
            setLoading(false);
        });
    }, [userId]);

    const pay = async (planId: string, methodId: string) => {
        const transaction = (await createTransaction({ userId, planId, methodId })) as Transaction;
        setHistory((prev) => [...prev, transaction]);
    };

    return { methods, history, loading, pay };
}


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
