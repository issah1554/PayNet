export interface User {
    id: string;
    name: string;
    email: string;
    // optional additional fields
    phone?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface Device {
    id: string;
    name: string; 
    macAddress: string;
    ipAddress?: string;
    previousPlans?: Plan[];
    currentPlan?: Plan;
    status: "active" | "inactive" | "blocked"; // device state
    userId: string;         // owner
    planId?: string;        // assigned plan (optional if device tracks plan individually)
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

// Payment and PaymentMethod
export interface PaymentMethod {
    id: string;
    name: string;
    status: string; // e.g., "active", "inactive"
}

export interface Payment {
    id: string;
    amount: number;
    currency: string;
    status: string; // e.g., "pending", "completed", "failed"
    method: PaymentMethod;
    user: User;
    plan: Plan;
    createdAt?: string;
}