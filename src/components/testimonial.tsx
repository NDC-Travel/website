'use client'

import React, { useRef } from 'react';
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {ChevronLeft, ChevronRight} from "lucide-react";

interface Testimonial {
    id: number;
    quote: string;
    highlight: string;
    name: string;
    role: string;
    avatar: string;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        quote: 'I had an amazing experience using Finder to search for my new home. The platform is incredibly user-friendly, with comprehensive listings and detailed descriptions that made it easy to find exactly what I was looking for.',
        highlight: 'an amazing experience using Finder',
        name: 'Michael Howard',
        role: 'Landlord',
        avatar: 'assets/img/about/v1/avatar/02.jpg'
    },
    {
        id: 2,
        quote: 'I was thoroughly impressed with Finder when searching for my first rental property. The platform is intuitive and offers a wide range of listings, complete with high-quality images and all the details I needed to make an informed decision.',
        highlight: 'impressed with Finder',
        name: 'Kristin Watson',
        role: 'Tenant',
        avatar: 'assets/img/about/v1/avatar/03.jpg'
    }
];

export default function TestimonialsSection() {
    const [currentIndex, setCurrentIndex] = React.useState(0);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    };

    const getHighlightedText = (quote: string, highlight: string) => {
        const parts = quote.split(highlight);
        if (parts.length === 1) return quote;

        return (
            <>
                {parts[0]}
                <span className="fw-semibold">{highlight}</span>
                {parts[1]}
            </>
        );
    };

    return (
        <section className="container pt-2 pt-sm-3 pt-md-4 pt-lg-5 pb-5 my-xxl-3">
            <div className="d-flex justify-content-between gap-4 pt-1 pt-sm-2 pt-lg-0 pb-2 pb-md-3 pb-lg-0 mb-4 mb-lg-5">
                <h2 className="h1 mb-0 flex justify-content-start items-center gap-x-5">
                    Témoignages
                    <svg className="text-primary" xmlns="http://www.w3.org/2000/svg" width="36" height="31" fill="currentColor">
                        <path d="M18.455 30.455L3.852 15.852a8.64 8.64 0 0 1-2.33-4.062c-.379-1.544-.374-3.078.014-4.602.388-1.534 1.16-2.869 2.315-4.006C5.036 2.017 6.385 1.245 7.901.866a9.07 9.07 0 0 1 4.56 0c1.525.388 2.879 1.16 4.063 2.315l1.932 1.875 1.932-1.875c1.193-1.155 2.547-1.927 4.063-2.315s3.03-.388 4.545 0c1.525.379 2.879 1.151 4.063 2.315 1.155 1.136 1.927 2.472 2.315 4.006a9.24 9.24 0 0 1 0 4.602c-.379 1.543-1.151 2.898-2.315 4.063L18.455 30.455z"></path>
                    </svg>
                    NDC Travels
                </h2>

                {/* Carousel controls (Prev/next buttons) */}
                <div className="d-flex gap-2">
                    <button
                        type="button"
                        className="btn btn-icon btn-lg btn-outline-secondary animate-slide-start rounded-circle me-1"
                        onClick={handlePrev}
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="fi-chevron-left fs-xl animate-target"/>
                    </button>
                    <button
                        type="button"
                        className="btn btn-icon btn-lg btn-outline-secondary animate-slide-end rounded-circle"
                        onClick={handleNext}
                        aria-label="Next slide"
                    >
                        <ChevronRight className="fi-chevron-right fs-xl animate-target"/>
                    </button>
                </div>
            </div>

            <div className="row row-cols-1 row-cols-md-2 g-0 bg-body-tertiary rounded overflow-hidden">
                {/* Image */}
                <div className="col position-relative bg-body-secondary">
                    <img
                        src="/banner.jpg"
                        className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
                        alt="Image"
                    />
                </div>

                {/* Testimonials carousel */}
                <div className="col py-5 px-4 px-sm-5">
                    <div className="p-lg-4 p-xl-5 my-xxl-3">
                        <div className="swiper swiper-initialized swiper-horizontal swiper-autoheight swiper-backface-hidden">
                            <div className="swiper-wrapper" style={{ transition: 'opacity 0.3s ease' }}>
                                {testimonials.map((testimonial, index) => (
                                    <figure
                                        key={testimonial.id}
                                        className="swiper-slide"
                                        style={{
                                            display: index === currentIndex ? 'block' : 'none',
                                            opacity: index === currentIndex ? 1 : 0
                                        }}
                                    >
                                        <svg className="text-primary mt-n3" xmlns="http://www.w3.org/2000/svg" width="72" height="72" fill="#ffab00">
                                            <path d="M14.1 53.1c-3-3.3-4.8-6.9-4.8-12.9 0-10.5 7.5-19.8 18-24.6l2.7 3.9c-9.9 5.4-12 12.3-12.6 16.8 1.5-.9 3.6-1.2 5.7-.9 5.4.6 9.6 4.8 9.6 10.5 0 2.7-1.2 5.4-3 7.5-2.1 2.1-4.5 3-7.5 3-3.3 0-6.3-1.5-8.1-3.3zm30 0c-3-3.3-4.8-6.9-4.8-12.9 0-10.5 7.5-19.8 18-24.6l2.7 3.9c-9.9 5.4-12 12.3-12.6 16.8 1.5-.9 3.6-1.2 5.7-.9 5.4.6 9.6 4.8 9.6 10.5 0 2.7-1.2 5.4-3 7.5s-4.5 3-7.5 3c-3.3 0-6.3-1.5-8.1-3.3z"></path>
                                        </svg>
                                        <blockquote className="fs-lg text-dark-emphasis pt-3 mt-lg-2 mt-xl-3">
                                            <p>{getHighlightedText(testimonial.quote, testimonial.highlight)}</p>
                                        </blockquote>
                                        <figcaption className="d-flex align-items-center pt-2 pt-lg-3">
                                            <Avatar className={'!w-[60px] me-5 !bg-black !text-white !h-[60px]'}>
                                                <AvatarFallback className={'!text-decoration-none !bg-black !text-white'}>{testimonial.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div className="ps-0">
                                                <div className="h6 mb-1">{testimonial.name}</div>
                                                <div className="fs-sm text-body-secondary">Utilisateur de NDC Travels</div>
                                            </div>
                                        </figcaption>
                                    </figure>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}