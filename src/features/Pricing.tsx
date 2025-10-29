import React, { useState } from 'react';

const plans = [
    {
        name: 'Basic',
        price: 500,
        duration: 'day',
        features: [
            'Chat anonymously with Mingo',
            'Connect only 1 device',
            '1 GB data bundle',
        ],
        bgColor: 'bg-primary-50',
        textColor: 'text-gray-500',
        btnTextSize: 'text-xl',
        roundedClasses: ' lg:rounded-r-none',
        isPopular: "text-2xl lg:scale-110 text-gray-400"
    },
    {
        name: 'Startup',
        price: 2400,
        duration: 'week',
        features: [
            'All features in Basic',
            'Connect upto 3 device',
            '3.5 GB data ',
        ],
        bgColor: 'bg-gray-900',
        textColor: 'text-gray-400',
        btnTextSize: 'text-2xl',
        roundedClasses: ' lg:scale-110',
        titleColor: 'text-white',
    },
    {
        name: 'Enterprise',
        price: 15000,
        duration: 'month',
        features: [
            'All features in Startup',
            'Connect upto 5 device',
            'Unlimited data',
        ],
        bgColor: 'bg-primary-50',
        textColor: 'text-gray-500',
        btnTextSize: 'text-xl',
        roundedClasses: 'lg:rounded-l-none',
    },
];

const Pricing: React.FC = () => {
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
    // Sort plans so the selected one is in the middle (for lg:flex-row)
    const sortedPlans = [...plans];
    if (selectedPlan) {
        const idx = sortedPlans.findIndex((p) => p.name === selectedPlan);
        if (idx > 0) {
            const plan = sortedPlans.splice(idx, 1)[0];
            // insert in the middle (index 1 for 3 plans)
            sortedPlans.splice(1, 0, plan);
        }
    }

    return (
        <div>
            {/* Header */}
            <header className="max-w-6xl mx-auto py-8 px-5 flex justify-between lg:px-8">
                <a href="#/" className="text-2xl text-gray-900 font-semibold">
                    Pay<span className="text-primary-500">Net</span>
                </a>
                <nav>
                    <ul className="flex pt-1.5 text-md lg:pt-0 lg:text-lg">
                        {['mingo', 'account'].map((item, idx) => (
                            <li key={idx} className={idx < 2 ? 'lg:px-3' : 'lg:pl-3'}>
                                <a
                                    href="#/"
                                    className="p-2 text-gray-500 font-semibold hover:text-accent hover:bg-accent-50 rounded-lg"
                                >
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </header>

            {/* Main */}
            <main className="max-w-6xl mx-auto pt-10 pb-36 px-8">
                <div className="max-w-md mx-auto mb-14 text-center">
                    <h1 className="text-4xl font-semibold mb-6 lg:text-5xl">
                        <span className="text-primary-600">Flexible</span> Plans
                    </h1>
                    <p className="text-xl text-gray-500 font-medium">
                        Choose a plan that works best for you and your team.
                    </p>
                </div>

                <div className="flex flex-col justify-between items-center lg:flex-row lg:items-start animation-zoom-in">
                    {sortedPlans.map((plan, idx) => {
                        const isSelected = plan.name === selectedPlan;

                        return (
                            <div
                                key={idx}
                                onClick={() => setSelectedPlan(plan.name)}
                                className={`w-full flex-1 mt-8 p-8 transition-transform duration-300 cursor-pointer rounded-3xl sm:w-96 lg:w-full
                                    ${plan.bgColor} ${plan.roundedClasses}
                                    ${isSelected ? 'shadow-2xl scale-110 border-4 border-secondary-300' : 'shadow-xl'}
                                `}
                            >
                                {/* Plan header */}
                                <div
                                    className={`mb-7 pb-7 flex items-center border-b ${plan.bgColor === 'bg-primary-50' ? 'border-gray-300' : 'border-gray-600'
                                        }`}
                                >

                                    <div className="ml-5">
                                        <span
                                            className={`block ${plan.name === 'Startup'
                                                    ? 'text-3xl font-semibold'
                                                    : 'text-2xl font-semibold'
                                                } ${plan.titleColor || ''}`}
                                        >
                                            {plan.name}
                                        </span>
                                        <span>
                                            <span
                                                className={`font-medium text-xl align-top ${plan.textColor}`}
                                            >
                                                Tsh&thinsp;
                                            </span>
                                            <span
                                                className={`text-3xl font-bold ${plan.titleColor || ''}`}
                                            >
                                                {plan.price}{' '}
                                            </span>
                                        </span>
                                        <span className={`font-medium ${plan.textColor}`}>
                                            / {plan.duration}
                                        </span>
                                    </div>
                                </div>

                                {/* Features */}
                                <ul className={`mb-7 font-medium ${plan.textColor} text-lg`}>
                                    {plan.features.map((feat, fidx) => (
                                        <li key={fidx} className="flex mb-4">
                                            <i className='bi bi-check2'></i>
                                            <span className="ml-3">{feat}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Button */}
                                <a
                                    href="#/"
                                    className={`flex justify-center items-center bg-secondary-500 hover:bg-secondary-600 rounded-xl py-5 px-4 text-center text-white ${plan.btnTextSize}`}
                                >
                                    Choose Plan
                                    <img
                                        src="https://res.cloudinary.com/williamsondesign/arrow-right.svg"
                                        className="ml-2"
                                        alt="arrow"
                                    />
                                </a>
                            </div>
                        );
                    })}
                </div>
            </main>
        </div>
    );
};

export default Pricing;
