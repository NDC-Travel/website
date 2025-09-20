'use client'

import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Zap, Tag } from 'lucide-react';

const CitySearchCarousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const carouselRef = useRef(null);

    const cities = [
        {
            name: "New York",
            image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop",
            forSale: 1739,
            forRent: 3845
        },
        {
            name: "Dallas",
            image: "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=400&h=300&fit=crop",
            forSale: 986,
            forRent: 2903
        },
        {
            name: "San Francisco",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
            forSale: 2134,
            forRent: 4561
        },
        {
            name: "Los Angeles",
            image: "https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=400&h=300&fit=crop",
            forSale: 1875,
            forRent: 3262
        },
        {
            name: "Chicago",
            image: "https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?w=400&h=300&fit=crop",
            forSale: 1549,
            forRent: 2806
        },
        {
            name: "Philadelphia",
            image: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=400&h=300&fit=crop",
            forSale: 874,
            forRent: 1625
        }
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % cities.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + cities.length) % cities.length);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    // Auto-play functionality
    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(nextSlide, 4000);
        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    const handleMouseEnter = () => setIsAutoPlaying(false);
    const handleMouseLeave = () => setIsAutoPlaying(true);

    // Get visible slides based on screen size
    const getVisibleSlides = () => {
        const width = window.innerWidth;
        if (width >= 1200) return 4;
        if (width >= 860) return 3;
        if (width >= 768) return 2;
        if (width >= 460) return 2;
        return 1;
    };

    const [visibleSlides, setVisibleSlides] = useState(getVisibleSlides);

    useEffect(() => {
        const handleResize = () => {
            setVisibleSlides(getVisibleSlides());
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const CityCard = ({ city, index }) => (
        <div
            className="flex-shrink-0 h-full transition-transform duration-300 hover:scale-105"
            style={{
                width: visibleSlides === 1 ? '100%' :
                    visibleSlides === 2 ? 'calc(50% - 12px)' :
                        visibleSlides === 3 ? 'calc(33.333% - 16px)' :
                            'calc(25% - 18px)'
            }}
        >
            <article className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 h-full overflow-hidden">
                <div className="bg-gray-100 overflow-hidden aspect-[306/230]">
                    <img
                        src={city.image}
                        alt={city.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                </div>
                <div className="p-4 text-center">
                    <h3 className="text-lg font-semibold mb-0">
                        <a
                            href="#"
                            className="text-gray-900 hover:text-blue-600 transition-colors duration-200 hover:underline"
                            onClick={(e) => e.preventDefault()}
                        >
                            {city.name}
                        </a>
                    </h3>
                </div>
                <div className="flex bg-transparent border-0 px-4 pb-4 -mt-1">
                    <button className={'btn btn-primary w-100'}>Explorer</button>
                </div>
            </article>
        </div>
    );

    return (
        <section className="container mx-auto px-4 mb-10">
            <div className="flex items-center justify-between gap-4 pb-3 mb-2 sm:mb-3 lg:mb-4">
                <h2 className="text-3xl lg:text-4xl font-bold mb-0">Top Destinations</h2>

                {/* Navigation buttons */}
                <div className="flex gap-2">
                    <button
                        type="button"
                        className="flex items-center rounded-circle justify-center w-12 h-12 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onClick={prevSlide}
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <button
                        type="button"
                        className="flex items-center rounded-circle justify-center w-12 h-12 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onClick={nextSlide}
                        aria-label="Next slide"
                    >
                        <ChevronRight className="w-5 h-5 text-gray-600" />
                    </button>
                </div>
            </div>

            {/* Carousel */}
            <div
                className="pb-12 overflow-hidden"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                ref={carouselRef}
            >
                <div
                    className="flex gap-6 transition-transform duration-500 ease-in-out"
                    style={{
                        transform: `translateX(-${(currentSlide * 100) / visibleSlides}%)`
                    }}
                >
                    {cities.map((city, index) => (
                        <CityCard key={index} city={city} index={index} />
                    ))}
                </div>
            </div>

            {/* Pagination dots */}
            <div className="flex justify-center gap-2 pt-4">
                {cities.map((_, index) => (
                    <button
                        key={index}
                        className={`w-2 h-2  rounded-circle transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            index === currentSlide
                                ? 'bg-blue-600'
                                : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                        onClick={() => goToSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default CitySearchCarousel;