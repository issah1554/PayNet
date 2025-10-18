import React, { useState } from "react";
import type { InputHTMLAttributes, ReactNode, CSSProperties } from "react";
import styles from "./styles/TextInput.module.css";

type ColorVariant =
    | "primary"
    | "primaryLight"
    | "light"
    | "light2"
    | "secondary"
    | "success"
    | "info"
    | "warning";

type SizeVariant = "xs" | "sm" | "md" | "lg" | "xl";

interface OutlinedTextFieldProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
    label: string;
    helperText?: string;
    variant?: ColorVariant;
    icon?: ReactNode;
    inputSize?: SizeVariant;
    type?: "text" | "password" | "phone" | "email";
    labelBgColor?: string; // new prop for label background color
}

const TextInput: React.FC<OutlinedTextFieldProps> = ({
    label,
    helperText,
    id,
    type = "text",
    variant = "primary",
    icon,
    inputSize = "md",
    labelBgColor,
    ...props
}) => {
    const inputId =
        id || `outlined-input-${Math.random().toString(36).substr(2, 9)}`;

    const [showPassword, setShowPassword] = useState(false);
    const [phoneValue, setPhoneValue] = useState("");
    const [emailError, setEmailError] = useState<string | null>(null);
    const [emailValue, setEmailValue] = useState("");

    const isPassword = type === "password";
    const isPhone = type === "phone";
    const isEmail = type === "email";

    const effectiveType =
        isPassword && showPassword ? "text" : isPhone ? "text" : type;

    const togglePassword = () => setShowPassword((prev) => !prev);

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let digits = e.target.value.replace(/\D/g, "").slice(0, 10);
        let formatted = digits;
        if (digits.length > 4 && digits.length <= 7) {
            formatted = `${digits.slice(0, 4)} ${digits.slice(4)}`;
        } else if (digits.length > 7) {
            formatted = `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
        }
        setPhoneValue(formatted);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmailValue(e.target.value);
        props.onChange?.(e);
    };

    const handleEmailBlur = () => {
        if (!emailValue) return setEmailError(null);
        const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
        setEmailError(valid ? null : "Invalid email address");
    };

    const labelStyle: CSSProperties = labelBgColor
        ? { backgroundColor: labelBgColor, padding: "0 0.3rem" }
        : {};

    return (
        <div
            className={`${styles.field} ${styles[variant]} ${styles.iconRight} ${styles[inputSize]}`}
        >
            <div className={styles.inputWrapper}>
                <input
                    id={inputId}
                    placeholder=" "
                    type={effectiveType}
                    className={`${styles.input} ${emailError ? styles.error : ""}`}
                    value={isPhone ? phoneValue : isEmail ? emailValue : props.value}
                    onChange={
                        isPhone ? handlePhoneChange : isEmail ? handleEmailChange : props.onChange
                    }
                    onBlur={isEmail ? handleEmailBlur : props.onBlur}
                    {...props}
                />

                <label htmlFor={inputId} className={styles.label} style={labelStyle}>
                    {label}
                </label>

                {isPassword ? (
                    <span
                        className={`${styles.icon} ${styles.toggle}`}
                        role="button"
                        tabIndex={0}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        onClick={togglePassword}
                        onKeyDown={(e) => e.key === "Enter" && togglePassword()}
                    >
                        <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                    </span>
                ) : (
                    icon && <span className={styles.icon}>{icon}</span>
                )}
            </div>

            <div className={styles.help}>
                {emailError ? emailError : helperText}
            </div>
        </div>
    );
};

export default TextInput;
