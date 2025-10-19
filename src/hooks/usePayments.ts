// hooks/usePayments.ts
import { useState, useEffect } from "react";
import { getPlans, initiatePayment, getPaymentMethods } from "../services/paymentService";
import type { Plan, PaymentRequest,BasePaymentMethod, ReactPaymentMethod } from "../types/types"

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
 
export function usePaymentMethods() {
    const [methods, setMethods] = useState<ReactPaymentMethod[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const fetchMethods = async () => {
            setLoading(true);
            setError(null);

            try {
                const data: BasePaymentMethod[] = await getPaymentMethods();

                // Map BasePaymentMethod -> ReactPaymentMethod
                const reactMethods: ReactPaymentMethod[] = data.map((method) => {
                    let imgurl = "";
                    let description = "";

                    switch (method.id) {
                        case "mpesa":
                            imgurl = "/mpesa-logo.png";
                            description = "Pay quickly via Safaricom M-Pesa.";
                            break;
                        case "airtelmoney":
                            imgurl = "/airtelmoney-logo.png";
                            description = "Use Airtel Money for secure payments.";
                            break;
                        case "halopesa":
                            imgurl = "/halopesa-logo.png";
                            description = "HaloPesa offers convenient mobile payment options.";
                            break;
                        case "mixxbyyass":
                            imgurl = "/mixx-by-Yas.png";
                            description = "HaloPesa offers convenient mobile payment options.";
                            break;
                        default:
                            imgurl = "/default-payment-logo.png";
                            description = "Payment option.";
                    }

                    return { ...method, imgurl, description };
                });

                if (isMounted) {
                    setMethods(reactMethods);
                }
            } catch (err: any) {
                if (isMounted) {
                    setError(err.message || "Failed to fetch payment methods.");
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchMethods();

        return () => {
            isMounted = false;
        };
    }, []);

    return { methods, loading, error };
}
