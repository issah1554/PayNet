import React from 'react';
import './styles/Buttons.css';

type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type ButtonVariant = 'solid' | 'outline' | 'text';
type ButtonColor = 'primary' | 'light' | 'secondary' | 'danger' | 'success' | 'warning' | 'info';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    size?: ButtonSize;
    fullWidth?: boolean;
    variant?: ButtonVariant;
    color?: ButtonColor;
    rounded?: boolean;
    loading?: boolean;
    loadingText?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
    size = 'lg',
    variant = 'solid',
    color = 'primary',
    fullWidth = false,
    rounded = false,
    loading = false,
    loadingText,
    className = '',
    children,
    disabled,
    ...props
}, ref) => {
    const buttonClasses = [
        'button',
        variant,
        color,
        size,
        rounded ? 'rounded' : '',
        fullWidth ? 'full-width' : '',
        loading ? 'loading' : '',
        className
    ].filter(Boolean).join(' ');

    return (
        <button
            ref={ref}
            className={buttonClasses}
            disabled={disabled || loading}
            aria-busy={loading}
            {...props}
        >
            {loading ? (
                <>
                    <span className="spinner" aria-hidden="true" />
                    {loadingText && <span>{loadingText}</span>}
                </>
            ) : (
                children
            )}
        </button>
    );
});

Button.displayName = 'Button';

export default Button;
