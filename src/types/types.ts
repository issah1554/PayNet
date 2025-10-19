export interface Plan {
    id: string;
    name: string;
    description: string;
    price: number;
    currency: string;
    duration: string;
    dataLimit: string;
}

export interface PaymentMethod {
    id: string;
    name: string;
    status: string;
}

export interface TransactionRequest {
    userId: string;
    planId: string;
    methodId: string;
}

export interface TransactionResponse extends TransactionRequest {
    id: string;
    status: string;
}
