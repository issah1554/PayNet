import api from "../../../services/api";

export interface LoginResponse {
  access: string;
  refresh: string;
  user: {
    id: string;
    username?: string;
    email: string;
    first_name?: string;
    last_name?: string;
    avatar?: string | null;
    is_active: boolean;
    is_staff: boolean;
    date_joined: string;
    roles: string[];
  };
}

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const res = await api.post<LoginResponse>("/auth/login/", { email, password });

    const data = res.data;
    localStorage.setItem("access_token", data.access);
    localStorage.setItem("refresh_token", data.refresh);
    localStorage.setItem("user", JSON.stringify(data.user));

    return data;
  },

  logout(): void {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
  },

  getAccessToken(): string | null {
    return localStorage.getItem("access_token");
  },

  getRefreshToken(): string | null {
    return localStorage.getItem("refresh_token");
  },

  getUser() {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  },

  async refreshToken(): Promise<string> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) throw new Error("No refresh token available");

    const res = await api.post<{ access: string }>("/auth/refresh/", {
      refresh: refreshToken,
    });
    localStorage.setItem("access_token", res.data.access);
    return res.data.access;
  },
};
