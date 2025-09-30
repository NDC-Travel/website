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
            name: "Paris ",
            image:
                "/paris.jpg",
            flag: "https://img.icons8.com/?size=100&id=YwnngGdMBmIV&format=png&color=000000",
            forRent: 3845,
        },
        {
            name: "Yaoundé",
            image:
                "/yaounde.jpg",
            flag: "https://img.icons8.com/?size=100&id=xFzFk0KmlP22&format=png&color=000000",
            forRent: 2903,
        },
        {
            name: "Douala",
            image:
                "/douala.jpg",
            flag: "https://img.icons8.com/?size=100&id=xFzFk0KmlP22&format=png&color=000000",
            forRent: 4561,
        },
        {
            name: "Abidjan",
            image:
                "/abidjan.png",
            flag: "https://img.icons8.com/?size=100&id=v-MBirY7SnW3&format=png&color=000000",
            forRent: 3262,
        },
        {
            name: "Kinshasa",
            image:
                "/kinshasa.jpg",
            flag: "https://img.icons8.com/?size=100&id=etJo5r3yWSEU&format=png&color=000000",
            forRent: 2806,
        },
        {
            name: "Bruxelles",
            image:
                "/bruxelles.jpg",
            flag: "https://img.icons8.com/?size=100&id=EKJmSnhl1hWl&format=png&color=000000",
            forRent: 1625,
        },
        {
            name: "New York",
            image:
                "/nyc.jpg",
            flag: "https://img.icons8.com/?size=100&id=fIgZUHgwc76e&format=png&color=000000",
            forRent: 3845,
        },
        {
            name: "Genève",
            image:
                "/geneve.jpg",
            flag: "https://img.icons8.com/?size=100&id=suxQg9He2_m5&format=png&color=000000",
            forRent: 2903,
        },
        {
            name: "Washington",
            image:
                "/dc.jpg",
            flag: "https://img.icons8.com/?size=100&id=fIgZUHgwc76e&format=png&color=000000",
            forRent: 4561,
        },
        {
            name: "Libreville",
            image:
                "/libreville.jpg",
            flag: "https://img.icons8.com/?size=100&id=8mKN_Bxzy1CH&format=png&color=000000",
            forRent: 3262,
        }
    ];

    const CityCard = ({ city }: {city: any}) => (
        <article className="bg-white relative rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 h-full overflow-hidden border-2">
            <div style={{ backgroundImage: `url(${city.image})`}} className="!bg-cover bg-gray-100 overflow-hidden aspect-[306/230] relative">
                {/*<img*/}
                {/*    src={city.image}*/}
                {/*    alt={city.name}*/}
                {/*    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"*/}
                {/*/>*/}
            </div>
            <img
                src={city.flag}
                className={'w-[50px] h-auto !absolute !left-[50%] border-2 border-white rounded-full bg-white !bottom-[30%]'} style={{ transform: "translate(-50%, -50%)"}} alt={city.name} />
            <div className="p-4 text-center">
                <h3 className="text-lg font-semibold mb-0 mt-4">
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
