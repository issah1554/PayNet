import React, { useState, type CSSProperties } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";

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

interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
    label: string;
    helperText?: string;
    variant?: ColorVariant;
    icon?: ReactNode;
    inputSize?: SizeVariant;
    type?: "text" | "password" | "phone" | "email";
    labelBgColor?: string;
}

const sizePadding: Record<SizeVariant, string> = {
    xs: "px-2 py-1 text-xs",
    sm: "px-2.5 py-1.5 text-sm",
    md: "px-3 py-3 text-base",
    lg: "px-4 py-3 text-lg",
    xl: "px-5 py-4 text-xl",
};

const labelTranslateY: Record<SizeVariant, string> = {
    xs: "translate-y-2",
    sm: "translate-y-3",
    md: "translate-y-4",
    lg: "translate-y-4.5",
    xl: "translate-y-6",
};

const variantColors: Record<ColorVariant, string> = {
    primary: "border-blue-500 focus:border-blue-600 focus:ring-blue-500",
    primaryLight: "border-blue-200 focus:border-blue-300 focus:ring-blue-300",
    light: "border-gray-300 focus:border-gray-400 focus:ring-gray-400",
    light2: "border-gray-200 focus:border-gray-300 focus:ring-gray-300",
    secondary: "border-purple-500 focus:border-purple-600 focus:ring-purple-500",
    success: "border-green-500 focus:border-green-600 focus:ring-green-500",
    info: "border-teal-500 focus:border-teal-600 focus:ring-teal-500",
    warning: "border-yellow-400 focus:border-yellow-500 focus:ring-yellow-500",
};

const TextInput: React.FC<TextInputProps> = ({
    label,
    helperText,
    type = "text",
    variant = "primary",
    icon,
    inputSize = "md",
    labelBgColor,
    ...props
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [phoneValue, setPhoneValue] = useState("");
    const [emailValue, setEmailValue] = useState("");
    const [emailError, setEmailError] = useState<string | null>(null);

    const inputId = props.id || `input-${Math.random().toString(36).slice(2, 9)}`;
    const isPassword = type === "password";
    const isPhone = type === "phone";
    const isEmail = type === "email";

    const effectiveType = isPassword && showPassword ? "text" : type === "phone" ? "text" : type;

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
        ? { backgroundColor: labelBgColor, padding: "0 0.25rem" }
        : {};

    return (
        <div className={`relative my-1`}>
            <input
                id={inputId}
                placeholder=" "
                type={effectiveType}
                        className={`
                peer w-full rounded-md border bg-white text-gray-900 outline-none
                ${sizePadding[inputSize]} ${variantColors[variant]}
                ${icon ? "pr-9" : ""}
                ${emailError ? "border-red-500 focus:border-red-600 focus:ring-red-500" : ""}
                transition-all duration-200
                `}
                value={isPhone ? phoneValue : isEmail ? emailValue : props.value}
                onChange={isPhone ? handlePhoneChange : isEmail ? handleEmailChange : props.onChange}
                onBlur={isEmail ? handleEmailBlur : props.onBlur}
                {...props}
            />

            <label
                htmlFor={inputId}
                className={`
                    bg-accent
          absolute left-3 text-gray-400 text-sm 
          transform origin-left
          transition-all duration-150
          peer-placeholder-shown:${labelTranslateY[inputSize]} 
          peer-placeholder-shown:text-base
          peer-focus:-translate-y-1/2 peer-focus:scale-85 peer-focus:text-blue-500
        `}
                style={labelStyle}
            >
                {label}
            </label>

            {isPassword && (
                <span
                    role="button"
                    tabIndex={0}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={togglePassword}
                    onKeyDown={(e) => e.key === "Enter" && togglePassword()}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600"
                >
                    <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                </span>
            )}

            {icon && !isPassword && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>
            )}

            {helperText || emailError ? (
                <p className={`mt-1 text-sm ${emailError ? "text-red-500" : "text-gray-400"}`}>
                    {emailError || helperText}
                </p>
            ) : null}
        </div>
    );
};

export default TextInput;
