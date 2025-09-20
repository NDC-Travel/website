'use client'

import React from 'react';

const DirectoryListingCTA = () => {
    const steps = [
        { number: 1, text: "S'enregister" },
        { number: 2, text: "Publier Son Colis" },
        { number: 3, text: "Se Faire Livrer" }
    ];

    const handleRegisterClick = () => {
        // Handle registration navigation
        console.log('Navigate to registration page');
    };

    return (
        <section className="container mx-auto">
            <div className="bg-black rounded-lg pb-4 md:pb-0 px-4 md:px-0 mb-20">
                <div className="flex flex-col md:flex-row items-center">

                    <img src={"/cta.svg"} alt={""} className={'w-[200px] h-auto'} />

                    {/* Content Section */}
                    <div className="md:w-7/12 lg:w-2/3 md:ml-8 pb-6 md:pb-0 mb-6 md:mb-0">
                        {/* Steps */}
                        <div className="flex flex-wrap md:flex-nowrap justify-center md:justify-start gap-6 sm:gap-8 xl:gap-12">
                            {steps.map((step, index) => (
                                <div key={index} className="flex items-center">
                                    <div
                                        className="flex items-center justify-center flex-shrink-0 text-sm font-medium text-white border-2 border-white rounded-full"
                                        style={{ width: '2rem', height: '2rem' }}
                                    >
                                        {step.number}
                                    </div>
                                    <div className="text-sm font-medium text-white pl-3">
                                        {step.text}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA Button Section */}
                    <div className="md:w-3/12 lg:w-1/6 gap-x-7 flex justify-center md:justify-end">
                        <button
                            onClick={handleRegisterClick}
                            className="btn btn-warning"
                        >
                            Expedier
                        </button>
                        <button
                            onClick={handleRegisterClick}
                            className="btn btn-success"
                        >
                            Expedier
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DirectoryListingCTA;