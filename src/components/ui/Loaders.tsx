import React from 'react';

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
    const style = {
        width: size,
        height: size,
        ['--loader-color' as any]: color || 'var(--color-primary)'
    } as React.CSSProperties;

    const loaderContent = (() => {
        switch (type) {
            case 'dots':
                return (
                    <>
                        <style>{`
                            .loader-dots {
                              display: flex;
                              justify-content: space-between;
                              align-items: center;
                              width: 60%;
                              height: 25%;
                            }
                            .loader-dots span {
                              display: block;
                              width: 10px;
                              height: 10px;
                              background-color: var(--loader-color);
                              border-radius: 50%;
                              animation: bounce 0.6s infinite alternate;
                            }
                            .loader-dots span:nth-child(2) { animation-delay: 0.2s; }
                            .loader-dots span:nth-child(3) { animation-delay: 0.4s; }
                            @keyframes bounce { to { transform: translateY(-50%); } }
                        `}</style>
                        <div className="loader-dots" style={style}>
                            <span></span><span></span><span></span>
                        </div>
                    </>
                );
            case 'spin-dots':
                return (
                    <>
                        <style>{`
                            .spin-dots {
                              width: 50px;
                              aspect-ratio: 1;
                              display:grid;
                              -webkit-mask: conic-gradient(from 15deg,#0000,#000);
                              animation: l26 1s infinite steps(12);
                            }
                            .spin-dots,
                            .spin-dots:before,
                            .spin-dots:after{
                              background:
                                radial-gradient(closest-side at 50% 12.5%,
                                var(--loader-color) 50% 0/20% 80% repeat-y,
                                radial-gradient(closest-side at 12.5% 50%,
                                var(--loader-color) 96%,#0000) 0 50%/80% 20% repeat-x;
                            }
                            .spin-dots:before,
                            .spin-dots:after {
                              content: "";
                              grid-area: 1/1;
                              transform: rotate(30deg);
                            }
                            .spin-dots:after {
                              transform: rotate(60deg);
                            }
                            @keyframes l26 {100% {transform:rotate(1turn)}}
                        `}</style>
                        <div className="spin-dots" style={style}></div>
                    </>
                );
            case 'glow':
                return (
                    <>
                        <style>{`
                            .loader-glow {
                              height: 80px;
                              aspect-ratio: 1;
                              padding: 4px;
                              border-radius: 50%;
                              box-sizing: border-box;
                              position: relative;
                              mask: conic-gradient(#000 0 0) content-box exclude, conic-gradient(#000 0 0);
                              filter: blur(5px);
                            }
                            .loader-glow:before {
                              content: "";
                              position: absolute;
                              inset: 0;
                              background: conic-gradient(#0000 35%,var(--loader-color, var(--color-primary)), #0000 65%);
                              animation: glow 1.5s linear infinite;
                            }
                            @keyframes glow { to { rotate: 1turn; } }
                        `}</style>
                        <div className="loader-glow" style={style}></div>
                    </>
                );
            case 'spin-smooth':
                return (
                    <>
                        <style>{`
                            .spin-smooth {
                            width: 40px;
                            aspect-ratio: 1;
                            border-radius: 50%;
                            background: 
                                radial-gradient(farthest-side,var(--color-primary), 94%,#0000) top/8px 8px no-repeat,
                                conic-gradient(#0000 30%,var(--color-primary));
                            -webkit-mask: radial-gradient(farthest-side,#0000 calc(100% - 8px),#000 0);
                            animation: l13 1s infinite linear;
                            }
                            @keyframes l13{ 
                            100%{transform: rotate(1turn)}
                                }
                        `}</style>
                        <div className="spin-smooth" style={style}></div>
                    </>
                );
            case 'spin-double':
                return (
                    <>
                        <style>{`
                            .spin-double {
                            width: 50px;
                            aspect-ratio: 1;
                            border-radius: 50%;
                            border: 2px solid lightblue;
                            border-right:3px solid var(--color-primary);
                            animation: l2 1s infinite linear;
                            }
                            @keyframes l2 {to{transform: rotate(1turn)}}
                        `}</style>
                        <div className="spin-double" style={style}></div>
                    </>
                );
            
            case 'bars':
                return (
                    <>
                        <style>{`
                            .bars {
                                width: 45px;
                                aspect-ratio: .75;
                                --c: no-repeat linear-gradient(var(--color-primary) 0 0);
                                background: 
                                    var(--c) 0%   50%,
                                    var(--c) 50%  50%,
                                    var(--c) 100% 50%;
                                animation: l7 1.2s infinite linear alternate;
                            }
                            @keyframes l7 {
                                0%  {background-size: 20% 50% ,20% 50% ,20% 50% }
                                20% {background-size: 20% 20% ,20% 50% ,20% 50% }
                                40% {background-size: 20% 100%,20% 20% ,20% 50% }
                                60% {background-size: 20% 50% ,20% 100%,20% 20% }
                                80% {background-size: 20% 50% ,20% 50% ,20% 100%}
                                100%{background-size: 20% 50% ,20% 50% ,20% 50% }
                            }
                        `}</style>
                        <div className="bars" style={style}></div>
                    </>
                );
            
            case 'bars2':
                return (
                    <>
                        <style>{`
                            .bars2 {
                            width: 45px;
                            aspect-ratio: 1;
                            --c: no-repeat linear-gradient(var(--color-primary) 0 0);
                            background: 
                                var(--c) 0%   50%,
                                var(--c) 50%  50%,
                                var(--c) 100% 50%;
                            background-size: 20% 100%;
                            animation: l1 1.2s infinite linear;
                            }
                            @keyframes l1 {
                            0%  {background-size: 20% 100%,20% 100%,20% 100%}
                            33% {background-size: 20% 10% ,20% 100%,20% 100%}
                            50% {background-size: 20% 100%,20% 10% ,20% 100%}
                            66% {background-size: 20% 100%,20% 100%,20% 10% }
                            100%{background-size: 20% 100%,20% 100%,20% 100%}
                            }
                        `}</style>
                        <div className="bars2" style={style}></div>
                    </>
                );

            case 'dots-3':
                return (
                    <>
                        <style>{`
                            .dots-3 {
                            width: 40px;
                            aspect-ratio: 1.154;
                            --_g: no-repeat radial-gradient(farthest-side,var(--color-primary) 80%,#0000);
                            background: 
                                var(--_g) 50%  0,
                                var(--_g) 0    100%,
                                var(--_g) 100% 100%;
                            background-size: 35% calc(35%*1.154);
                            animation: l16 1.2s infinite;
                            }
                            @keyframes l16{ 
                                50%,100% {background-position: 100% 100%,50% 0,0 100%} 
                            }
                        `}</style>
                        <div className="dots-3" style={style}></div>
                    </>
                );
            case 'blob':
                return (
                    <>
                        <style>
                            {`
                            .blob {
                            width: 70px;
                            height: 70px;
                            position: relative;
                            background: var(--color-primary);
                            border-radius: 50%;
                            display: block;
                            filter: blur(.5px);
                            animation: rotate 12s linear infinite; /* slow rotation */
                            }

                            @keyframes rotate {
                            0%   { transform: rotate(0deg); }
                            100% { transform: rotate(360deg); }
                            }

                            .blob:before,
                            .blob:after {
                            content: "";
                            position: absolute;
                            top: 0; left: 0;
                            width: 100%; height: 100%;
                            background: var(--color-primary);
                            border-radius: 50%;
                            animation: morph 6s infinite ease-in-out;
                            }

                            .blob:after { animation-duration: 8.5s; animation-delay: -1.7s; }

                            @keyframes morph {
                            0%   { border-radius: 50% 50% 50% 50% / 50% 50% 50% 50%; }
                            10%  { border-radius: 65% 35% 55% 45% / 60% 40% 50% 50%; }
                            22%  { border-radius: 55% 70% 40% 65% / 50% 65% 35% 60%; }
                            35%  { border-radius: 70% 30% 60% 40% / 35% 70% 50% 60%; }
                            48%  { border-radius: 45% 55% 75% 35% / 55% 60% 40% 50%; }
                            60%  { border-radius: 60% 40% 50% 65% / 45% 55% 70% 30%; }
                            73%  { border-radius: 55% 65% 45% 50% / 65% 35% 60% 40%; }
                            85%  { border-radius: 50% 45% 65% 55% / 50% 70% 40% 60%; }
                            100% { border-radius: 50% 50% 50% 50% / 50% 50% 50% 50%; }
                            }
                        `}
                        </style>
                        <div className="blob" style={style}></div>
                    </>
                );

            case 'globe':
                return (
                    <>
                        <style>
                            {`

.container {
	width: 45px;
	height: 45px;
	border-radius: 100%;
	background: linear-gradient(165deg, rgba(255,255,255,1) 0%, rgb(220, 220, 220) 40%, rgb(170, 170, 170) 98%, rgb(10, 10, 10) 100%);
	position: relative;
}
.globe {
	
}

.globe:before {
	position: absolute;
	content: '';
	width: 100%;
	height: 100%;
	border-radius: 100%;
	border-bottom: 0 solid #ffffff05;
	
	box-shadow: 
		0 -10px 20px 20px #ffffff40 inset,
		0 -5px 15px 10px #ffffff50 inset,
		0 -2px 5px #ffffff80 inset,
		0 -3px 2px #ffffffBB inset,
		0 2px 0px #ffffff,
		0 2px 3px #ffffff,
		0 5px 5px #ffffff90,
		0 10px 15px #ffffff60,
		0 10px 20px 20px #ffffff40;
	filter: blur(3px);
	animation: 2s rotate linear infinite;
}

@keyframes rotate {
	100% {
		transform: rotate(360deg)
	}
}                        `}
                        </style>
                        <div className="container" style={style}>
                            <div className="globe" ></div>
                        </div>                    </>
                );

            default:
                return (
                    <>
                        <style>{`
                            .loader-spin {
                              width: 50px;
                              padding: 4px;
                              aspect-ratio: 1;
                              border-radius: 50%;
                              background: var(--loader-color, var(--color-primary));
                              --_m: conic-gradient(#0000 10%, #000), linear-gradient(#000 0 0) content-box;
                              -webkit-mask: var(--_m);
                              mask: var(--_m);
                              -webkit-mask-composite: source-out;
                              mask-composite: subtract;
                              animation: spin 1s infinite linear;
                            }
                            @keyframes spin { to { transform: rotate(1turn); } }
                        `}</style>
                        <div className="loader-spin" style={style}></div>
                    </>
                );
        }
    })();

    // Flex direction logic based on textPosition
    const direction =
        textPosition === 'top'
            ? 'column-reverse'
            : textPosition === 'bottom'
                ? 'column'
                : textPosition === 'left'
                    ? 'row-reverse'
                    : 'row';

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: direction,
                alignItems: 'center',
                gap: text ? '8px' : 0
            }}
        >
            {loaderContent}
            {text && (
                <span style={{ color: color || 'var(--f-primary)' }}>
                    {text}
                </span>
            )}
        </div>
    );
};

export default Loader;



export const SpinLoader: React.FC<LoaderProps> = (props) => <Loader type="spin" {...props} />;
export const DotsLoader: React.FC<LoaderProps> = (props) => <Loader type="dots" {...props} />;
export const GlowLoader: React.FC<LoaderProps> = (props) => <Loader type="glow" {...props} />;
