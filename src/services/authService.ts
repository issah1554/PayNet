// services/authService.ts
export async function login(email: string, password: string) {
    const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error("Invalid credentials");
    const data = await res.json();
    localStorage.setItem("token", data.token);
    return data.user;
}

export async function signup(data: { username: string; phone: string; password: string }) {
    const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    const result = await res.json();
    localStorage.setItem("token", result.token);
    return result.user;
}

export function logout() {
    localStorage.removeItem("token");
}

export function getToken() {
    return localStorage.getItem("token");
}

export async function getCurrentUser() {
    const token = getToken();
    if (!token) return null;

    const res = await fetch("/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return null;
    return res.json();
}
