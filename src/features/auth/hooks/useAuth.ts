import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { authService } from "../services/authService";

interface DjangoUser {
  id: string;
  username?: string;
  email: string;
  first_name?: string;
  last_name?: string;
  roles: string[];
  avatar?: string | null;
}

export function useAuth() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<DjangoUser | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const token = authService.getAccessToken();
    if (token) {
      const storedUser = authService.getUser();
      if (storedUser) {
        setUser(storedUser);
      } else {
        authService.logout();
        setUser(null);
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.login(email, password);
      setUser(response.user);
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    navigate("/login");
  };

  const checkAuth = (): boolean => {
    return !!authService.getAccessToken();
  };

  return { user, login, logout, loading, error, checkAuth };
}
