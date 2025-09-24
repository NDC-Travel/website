'use client'

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const CitySearchCarousel = () => {
    const cities = [
        {
            name: "New York",
            image:
                "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop",
            forSale: 1739,
            forRent: 3845,
        },
        {
            name: "Dallas",
            image:
                "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=400&h=300&fit=crop",
            forSale: 986,
            forRent: 2903,
        },
        {
            name: "San Francisco",
            image:
                "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
            forSale: 2134,
            forRent: 4561,
        },
        {
            name: "Los Angeles",
            image:
                "https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=400&h=300&fit=crop",
            forSale: 1875,
            forRent: 3262,
        },
        {
            name: "Chicago",
            image:
                "https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?w=400&h=300&fit=crop",
            forSale: 1549,
            forRent: 2806,
        },
        {
            name: "Philadelphia",
            image:
                "https://images.unsplash.com/photo-1549924231-f129b911e442?w=400&h=300&fit=crop",
            forSale: 874,
            forRent: 1625,
        },
        {
            name: "New York",
            image:
                "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop",
            forSale: 1739,
            forRent: 3845,
        },
        {
            name: "Dallas",
            image:
                "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=400&h=300&fit=crop",
            forSale: 986,
            forRent: 2903,
        },
        {
            name: "San Francisco",
            image:
                "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
            forSale: 2134,
            forRent: 4561,
        },
        {
            name: "Los Angeles",
            image:
                "https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=400&h=300&fit=crop",
            forSale: 1875,
            forRent: 3262,
        },
        {
            name: "Chicago",
            image:
                "https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?w=400&h=300&fit=crop",
            forSale: 1549,
            forRent: 2806,
        },
        {
            name: "Philadelphia",
            image:
                "https://images.unsplash.com/photo-1549924231-f129b911e442?w=400&h=300&fit=crop",
            forSale: 874,
            forRent: 1625,
        },
    ];

    const CityCard = ({ city }: {city: any}) => (
        <article className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 h-full overflow-hidden border-2">
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
                <button className="btn btn-primary w-100">Explore</button>
            </div>
        </article>
    );

    return (
        <section className="container mx-auto px-4 mb-10">
            {/* Header + Navigation */}
            <div className="flex items-center justify-between gap-4 pb-3 mb-2 sm:mb-3 lg:mb-4">
                <h2 className="text-3xl lg:text-4xl font-bold mb-0">Top Destinations</h2>
            </div>

            {/* Swiper Carousel */}
            <Swiper
                modules={[Autoplay]}
                spaceBetween={24}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                breakpoints={{
                    0: { slidesPerView: 1 },
                    460: { slidesPerView: 2 },
                    768: { slidesPerView: 2 },
                    860: { slidesPerView: 3 },
                    1200: { slidesPerView: 4 },
                }}
            >
                {cities.map((city, index) => (
                    <SwiperSlide key={index}>
                        <CityCard city={city} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default CitySearchCarousel;
