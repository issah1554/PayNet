export interface User {
    id: string;
    name: string;
    email: string;
    // optional additional fields
    phone?: string;
    createdAt?: string;
    updatedAt?: string;
}

// Existing Plan interface
export interface Plan {
    id: string;
    name: string;
    description: string;
    price: number;
    currency: string;
    duration: string;
    dataLimit: string;
    // Optional: which users have this plan
    users?: User[];
}

export interface DevicePlan {
    id: string;
    status: "active" | "expired" | "pending";
}


export interface Device {
    id: string;
    name: string;
    macAddress: string;
    ipAddress?: string;
    status: "active" | "inactive" | "blocked";
    userId: string;         // owner
    plans?: DevicePlan[];       // Plans history
    currentPlan?: DevicePlan['status'];
    createdAt?: string;
    updatedAt?: string;
}




// Payment and PaymentMethod
export interface BasePaymentMethod {
    id: string;
    name: string;
    status: "enabled" | "disabled";
}

export interface ReactPaymentMethod extends BasePaymentMethod{
    description: string;
    imgurl: string;
}



export interface Payment {
    id: string;
    amount: number; // Based on choosen plan
    currency: string;
    status: "pending" | "completed" | "failed";
    method: BasePaymentMethod['id'];
    phoneNumber: number;
    plan: Plan;
    createdAt?: string;
}

export interface PaymentRequest {
    planId: Plan['id'];
    paymentMethod: string;
    phoneNumber: number;
}