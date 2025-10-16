import { Link } from "react-router-dom";
import logo from "../../assets/dblogo.png";
import Button from "../../components/ui/Buttons";

export default function WelcomePage() {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center min-vh-100 px-3 db-bg-light"
    >
      <img
        src={logo}
        alt="Databenki Logo"
        style={{ maxWidth: "200px", marginBottom: "1.5rem",backgroundColor:'var(--db-primary-light)' ,borderRadius:'5px' , padding:'15px'}}
      />

      <h1
        className="mb-5 text-center"
        style={{ fontWeight: "700", fontSize: "2.5rem", color: 'var(--db-primary-light)' }}
      >
        Databenki Group of companies Limited
      </h1>

      <div
        className="d-grid gap-3"
        style={{ maxWidth: "320px", width: "100%" }}
      >
        <Link to="/auth/login">
          <Button fullWidth >Login</Button>
        </Link>

        <Link to="/auth/register">
          <Button fullWidth >Register</Button>
        </Link>
      </div>
    </div>
  );
}
