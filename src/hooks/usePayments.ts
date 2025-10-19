// hooks/usePayments.ts
import { useState, useEffect } from "react";
import {getPlans } from "../services/paymentService";
import type { Plan, } from "../types/types"

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
