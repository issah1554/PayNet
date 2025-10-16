import { useAuth } from "./hooks/useAuth";
import LoginForm from "./components/LoginForm";

export default function LoginPage() {
  const { login, loading, error } = useAuth();

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 db-bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <LoginForm 
              onLogin={login} 
              loading={loading} 
              error={error || ""} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}