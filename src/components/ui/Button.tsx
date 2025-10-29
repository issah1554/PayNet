import React from 'react';

type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type ButtonVariant = 'solid' | 'outline' | 'text';
type ButtonColor =
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'neutral'
    | 'success'
    | 'warning'
    | 'error'
    | 'info'
    | 'pending';
type RoundOption = boolean | 'sm' | 'md' | 'lg' | 'full';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    size?: ButtonSize;
    fullWidth?: boolean;
    variant?: ButtonVariant;
    color?: ButtonColor;
    rounded?: RoundOption;
    loading?: boolean;
    loadingText?: string;
}

const sizeClasses: Record<ButtonSize, string> = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-5 py-3 text-lg',
    xl: 'px-6 py-4 text-xl',
};

const variantClasses: Record<ButtonVariant, Record<ButtonColor, string>> = {
    solid: {
        primary: 'bg-primary-500 text-neutral-white hover:bg-primary-600',
        secondary: 'bg-secondary-500 text-neutral-white hover:bg-secondary-600',
        accent: 'bg-accent-500 text-neutral-white hover:bg-accent-600',
        neutral: 'bg-gray-400 text-white hover:bg-gray-500',
        success: 'bg-green-500 text-white hover:bg-green-600',
        warning: 'bg-yellow-400 text-black hover:bg-yellow-500',
        error: 'bg-red-500 text-white hover:bg-red-600',
        info: 'bg-cyan-500 text-white hover:bg-cyan-600',
        pending: 'bg-orange-400 text-black hover:bg-orange-500',
    },
    outline: {
        primary: 'border border-primary-500 text-primary-500 hover:bg-primary-50',
        secondary: 'border border-secondary-500 text-secondary-500 hover:bg-secondary-50',
        accent: 'border border-accent-500 text-accent-500 hover:bg-accent-50',
        neutral: 'border border-gray-400 text-gray-400 hover:bg-gray-50',
        success: 'border border-green-500 text-green-500 hover:bg-green-50',
        warning: 'border border-yellow-400 text-yellow-400 hover:bg-yellow-50',
        error: 'border border-red-500 text-red-500 hover:bg-red-50',
        info: 'border border-cyan-500 text-cyan-500 hover:bg-cyan-50',
        pending: 'border border-orange-400 text-orange-400 hover:bg-orange-50',
    },
    text: {
        primary: 'text-primary-500 hover:text-primary-600',
        secondary: 'text-secondary-500 hover:text-secondary-600',
        accent: 'text-accent-500 hover:text-accent-600',
        neutral: 'text-gray-400 hover:text-gray-500',
        success: 'text-green-500 hover:text-green-600',
        warning: 'text-yellow-400 hover:text-yellow-500',
        error: 'text-red-500 hover:text-red-600',
        info: 'text-cyan-500 hover:text-cyan-600',
        pending: 'text-orange-400 hover:text-orange-500',
    },
};


const roundClassesMap: Record<Exclude<RoundOption, boolean>, string> = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
    size = 'lg',
    variant = 'solid',
    color = 'primary',
    fullWidth = false,
    rounded = true,
    loading = false,
    loadingText,
    className = '',
    children,
    disabled,
    ...props
}, ref) => {
    const base = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

    let roundClass = 'rounded-md';
    if (typeof rounded === 'boolean') roundClass = rounded ? 'rounded-full' : 'rounded-md';
    else roundClass = roundClassesMap[rounded];

    const classes = [
        base,
        sizeClasses[size],
        variantClasses[variant][color],
        roundClass,
        fullWidth ? 'w-full' : '',
        loading ? 'opacity-70 cursor-not-allowed' : '',
        className
    ].filter(Boolean).join(' ');

    return (
        <button
            ref={ref}
            className={classes}
            disabled={disabled || loading}
            aria-busy={loading}
            {...props}
        >
            {loading ? (
                <>
                    <span className="animate-spin rounded-full border-2 border-t-2 border-white w-4 h-4 mr-2" />
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
