// App.jsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./features/auth/LoginPage";
import RegisterPage from "./features/auth/RegisterPage";
import WelcomePage from "./features/auth/WelcomePage";
import ForgotPasswordPage from "./features/auth/ForgotPassword";
import Pricing from "./features/Pricing";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/pricing" element={<Pricing />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
