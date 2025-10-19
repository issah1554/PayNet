// hooks/useAuth.ts
import React, { useEffect, useState, createContext, useContext } from "react";
import { getCurrentUser, login, logout, signup } from "../services/authService";

interface AuthContextType {
    user: any;
    loading: boolean;
    loginUser: (email: string, password: string) => Promise<void>;
    signupUser: (data: { username: string; phone: string; password: string }) => Promise<void>;
    logoutUser: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCurrentUser().then((data) => {
            setUser(data);
            setLoading(false);
        });
    }, []);

    const loginUser = async (email: string, password: string) => {
        const loggedUser = await login(email, password);
        setUser(loggedUser);
    };

    const signupUser = async (data: { username: string; phone: string; password: string }) => {
        const newUser = await signup(data);
        setUser(newUser);
    };

    const logoutUser = () => {
        logout();
        setUser(null);
    };

return React.createElement(
    AuthContext.Provider,
    { value: { user, loading, loginUser, signupUser, logoutUser } },
    children
);
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
