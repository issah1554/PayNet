import RegisterForm from "./components/RegisterForm";
import AuthContainer from "./components/AuthContainer";

export default function RegisterPage() {
  const handleRegister = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    console.log("Registration:", { firstName, lastName, email, password, confirmPassword });
    alert(`Welcome, ${firstName}!`);
  };

  return (
    <AuthContainer
      leftCol="col-md-8"
      rightCol="col-md-4"
      imageSrc="/payment-cover.png"
      logoSrc="/wifi-icon.png"
      appName="PayNet"
      navIcon={<i className="bi bi-house fs-4 text-primary"></i>}
      navLink="/"
    >
      <RegisterForm onRegister={handleRegister} loading={false} error="" />
    </AuthContainer>
  );
}
