'use client'

import React, { useState, useEffect } from 'react';
import {LifeBuoyIcon, PlaneIcon, TicketsPlaneIcon} from "lucide-react";

interface Feature {
    id: number;
    icon: React.ReactNode;
    title: string;
    description: string;
}

const FeaturesSection: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        const checkScreenSize = (): void => {
            setIsMobile(window.innerWidth < 992);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const features: Feature[] = [
        {
            id: 1,
            icon: (
                <TicketsPlaneIcon className={'text-primary w-12 h-12'} />
            ),
            title: "Vente de billets d’avion à l’international",
            description: "Avec des tarifs compétitifs et des solutions de paiement adaptées."
        },
        {
            id: 2,
            icon: (
                <PlaneIcon className={'text-primary w-12 h-12'} />
            ),
            title: "Import-export & Transport de colis",
            description: "Entre l’Europe, l’Afrique et les États-Unis, en garantissant le respect des délais de livraison et la sécurité des marchandises."
        },
        {
            id: 3,
            icon: (
                <LifeBuoyIcon className={'text-primary w-12 h-12'} />
            ),
            title: "Assistance & Accompagnement",
            description: "Personnalisés pour vos voyages, vos réservations et vos besoins logistiques."
        }
    ];

    const nextSlide = (): void => {
        setCurrentSlide((prev: number) => (prev + 1) % features.length);
    };

    const prevSlide = (): void => {
        setCurrentSlide((prev: number) => (prev - 1 + features.length) % features.length);
    };

    const goToSlide = (index: number): void => {
        setCurrentSlide(index);
    };

    return (
        <section className="bg-black">
            <div className="container mx-auto px-4 py-8 lg:py-16">
                <h2 className="text-4xl lg:text-5xl font-bold text-white pb-4 mb-8 lg:mb-12 text-center">
                    Nous proposons une large gamme de prestations
                </h2>

                {/* Desktop: Grid Layout */}
                <div className="hidden lg:grid lg:grid-cols-3 gap-6">
                    {features.map((feature) => (
                        <div key={feature.id} className="bg-white rounded-2xl p-6 lg:p-8 h-full shadow-lg">
                            <div className="mb-6">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-4 text-gray-900">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Mobile: Carousel */}
                <div className="lg:hidden">
                    <div className="relative overflow-hidden">
                        <div
                            className="flex transition-transform duration-300 ease-in-out"
                            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                        >
                            {features.map((feature) => (
                                <div key={feature.id} className="w-full flex-shrink-0 px-3">
                                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                                        <div className="mb-6">
                                            {feature.icon}
                                        </div>
                                        <h3 className="text-xl font-semibold mb-4 text-gray-900">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Arrows */}
                    <div className="flex justify-center items-center mt-6 space-x-4">
                        <button
                            onClick={prevSlide}
                            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                            aria-label="Diapositive précédente"
                        >
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        {/* Pagination Dots */}
                        <div className="flex space-x-2">
                            {features.map((_, index: number) => (
                                <button
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    className={`w-3 h-3 rounded-full transition-colors ${
                                        index === currentSlide ? 'bg-white' : 'bg-white/50'
                                    }`}
                                    aria-label={`Aller à la diapositive ${index + 1}`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={nextSlide}
                            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                            aria-label="Diapositive suivante"
                        >
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FeaturesSection;