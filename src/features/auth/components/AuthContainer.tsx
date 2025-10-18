import React, { type CSSProperties } from "react";
import { Link } from "react-router-dom";

interface AuthContainerProps {
  children: React.ReactNode;
  leftCol?: string;   // e.g. "col-md-6"
  rightCol?: string;  // e.g. "col-md-6"
  rightClassName?: string; // additional class for right column
  rightStyle?: CSSProperties; // additional style for right column
  imageSrc?: string;
  logoSrc?: string;
  appName?: string;
  navIcon?: React.ReactNode;  // Right column top icon
  navLink?: string;           // Right column link
}

export default function AuthContainer({
  children,
  leftCol = "col-md-6",
  rightCol = "col-md-6",
  rightClassName = "",
  rightStyle = {},
  imageSrc = "/auth-cover.png",
  logoSrc = "/wifi-icon.png",
  appName = "PayNet",
  navIcon,
  navLink,
}: AuthContainerProps) {
  return (
    <div className="d-flex vh-100 bg-light">
      {/* Left Column — Image Section */}
      <div className={`d-none d-md-flex ${leftCol} bg-body-secondary position-relative justify-content-center align-items-center overflow-hidden`}>
        <Link to={"/"} className="position-absolute top-0 start-0 m-4 fw-bold text-primary fs-4">
          <div className="d-flex align-items-center gap-2 mt-2">
            {logoSrc && <img src={logoSrc} alt={`${appName} Logo`} style={{ width: "45px", height: "45px", objectFit: "contain" }} />}
            {appName}
          </div>
        </Link>

        <img
          src={imageSrc}
          alt="Auth Cover"
          className="img-fluid w-100 h-auto object-fit-contain p-5"
          style={{ maxWidth: "550px" }}
        />
      </div>

      {/* Right Column — Form Section */}
      <div
        className={`${rightCol} d-flex flex-column p-4 position-relative col-12 ${rightClassName}`}
        style={{
          overflowY: "auto",
          maxHeight: "100vh",
          paddingTop: "80px",
          ...rightStyle, // merge custom styles
        }}
      >
        <div className="w-100" style={{ maxWidth: "700px", margin: "0 auto" }}>
          {navIcon && navLink && (
            <div className="position-absolute top-0 end-0 m-4">
              <Link to={navLink}>{navIcon}</Link>
            </div>
          )}
          {children}
        </div>
      </div>

    </div>
  );
}
