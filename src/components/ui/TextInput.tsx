import React, { useState } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
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
    icon?: ReactNode; // always right
    inputSize?: SizeVariant; // renamed to avoid TS conflict
    type?: "text" | "password" | "phone"; // added "phone"
}

const TextInput: React.FC<OutlinedTextFieldProps> = ({
    label,
    helperText,
    id,
    type = "text",
    variant = "primary",
    icon,
    inputSize = "md",
    ...props
}) => {
    const inputId =
        id || `outlined-input-${Math.random().toString(36).substr(2, 9)}`;

    const [showPassword, setShowPassword] = useState(false);
    const [phoneValue, setPhoneValue] = useState(""); // for phone formatting

    const isPassword = type === "password";
    const isPhone = type === "phone";

    const effectiveType = isPassword && showPassword ? "text" : isPhone ? "text" : type;

    const togglePassword = () => setShowPassword((prev) => !prev);

    // Phone input formatting
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let digits = e.target.value.replace(/\D/g, "").slice(0, 10); // max 10 digits
        let formatted = digits;

        if (digits.length > 4 && digits.length <= 7) {
            formatted = `${digits.slice(0, 4)} ${digits.slice(4)}`;
        } else if (digits.length > 7) {
            formatted = `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
        }

        setPhoneValue(formatted);
    };

    return (
        <div
            className={`${styles.field} ${styles[variant]} ${styles.iconRight} ${styles[inputSize]}`}
        >
            <div className={styles.inputWrapper}>
                <input
                    id={inputId}
                    placeholder=" "
                    type={effectiveType}
                    className={styles.input}
                    value={isPhone ? phoneValue : props.value}
                    onChange={isPhone ? handlePhoneChange : props.onChange}
                    {...props}
                />

                <label htmlFor={inputId} className={styles.label}>
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

            {helperText && <div className={styles.help}>{helperText}</div>}
        </div>
    );
};

export default TextInput;
