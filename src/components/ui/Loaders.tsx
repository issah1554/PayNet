import React from 'react';
import './styles/Loaders.css';

interface LoaderProps {
    type?: 'spin' | 'dots' | 'glow' | 'spin-dots' | 'spin-smooth' | 'spin-double' | 'bars' | 'bars2' | 'dots-3' | 'blob' | 'globe';
    size?: number;
    color?: string;
    text?: string;
    textPosition?: 'bottom' | 'top' | 'left' | 'right';
}

const Loader: React.FC<LoaderProps> = ({
    type = 'spin',
    size = 50,
    color,
    text,
    textPosition = 'bottom'
}) => {
    const style: React.CSSProperties = {
        width: size,
        height: size,
        ['--loader-color' as any]: color || 'var(--color-primary)'
    };

    const loaderClass = `loader-${type}`;

    const direction =
        textPosition === 'top' ? 'column-reverse' :
            textPosition === 'bottom' ? 'column' :
                textPosition === 'left' ? 'row-reverse' :
                    'row';

    return (
        <div style={{ display: 'flex', flexDirection: direction, alignItems: 'center', gap: text ? '8px' : 0 }}>
            <div className={loaderClass} style={style}></div>
            {text && <span style={{ color: color || 'var(--f-primary)' }}>{text}</span>}
        </div>
    );
};

export default Loader;
export const SpinLoader: React.FC<LoaderProps> = (props) => <Loader type="spin" {...props} />;
export const DotsLoader: React.FC<LoaderProps> = (props) => <Loader type="dots" {...props} />;
export const GlowLoader: React.FC<LoaderProps> = (props) => <Loader type="glow" {...props} />;
