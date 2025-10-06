'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import Marquee from "react-fast-marquee";
import {
    Heart,
    Bell,
    RotateCcw,
    MapPin,
    Fuel,
    Settings,
    ArrowLeftRight,
    PlaneTakeoff,
    PlaneLanding,
    UserIcon,
    StarIcon
} from 'lucide-react';

export interface Listing {
    id: number;
    title: string;
    year: number;
    price: string;
    date: string;
    location: string;
    mileage: string;
    fuel: string;
    transmission: string;
    image: string;
    badges: Array<{
        text: string;
        type: 'info' | 'primary' | 'warning';
        icon?: boolean;
    }>;
}

const mockListings: Listing[] = [
    {
        id: 1,
        title: "Deux valises d'habit",
        year: 2024,
        price: "$7,9",
        date: "30/09/2024",
        location: "Boston",
        mileage: "0K mi",
        fuel: "Diesel",
        transmission: "Automatic",
        image: "/img.jpg",
        badges: [
            { text: "Poids: 3Kg", type: "primary" }
        ]
    },
    {
        id: 2,
        title: "Carton de Parfums",
        year: 2021,
        price: "$12,00",
        date: "15/07/2024",
        location: "New York",
        mileage: "15K mi",
        fuel: "Gasoline",
        transmission: "Manual",
        image: "/img.jpg",
        badges: [
            { text: "Poids: 3Kg", type: "primary" }
        ]
    },
    {
        id: 3,
        title: "Sac d'epices",
        year: 2017,
        price: "$5,00",
        date: "16/08/2024",
        location: "Chicago",
        mileage: "32K mi",
        fuel: "Gasoline",
        transmission: "Manual",
        image: "/img.jpg",
        badges: [
            { text: "Poids: 3Kg", type: "primary" }
        ]
    },
    {
        id: 4,
        title: "Carton de Telephones",
        year: 2024,
        price: "$3,2",
        date: "19/10/2024",
        location: "Los Angeles",
        mileage: "0K mi",
        fuel: "Electric",
        transmission: "Automatic",
        image: "/img.jpg",
        badges: [
            { text: "Poids: 3Kg", type: "primary" }
        ]
    },
    {
        id: 5,
        title: "Boîte de Chocolats",
        year: 2024,
        price: "$8,50",
        date: "25/10/2024",
        location: "Miami",
        mileage: "0K mi",
        fuel: "Gasoline",
        transmission: "Manual",
        image: "/img.jpg",
        badges: [
            { text: "Poids: 2Kg", type: "primary" }
        ]
    },
    {
        id: 6,
        title: "Documents Légaux",
        year: 2024,
        price: "$15,00",
        date: "28/10/2024",
        location: "Toronto",
        mileage: "0K mi",
        fuel: "Gasoline",
        transmission: "Automatic",
        image: "/img.jpg",
        badges: [
            { text: "Poids: 1Kg", type: "primary" }
        ]
    }
];

export default function Listing() {
    const [activeFilter, setActiveFilter] = useState('All');
    const [isHovered, setIsHovered] = useState(false);

    const filters = ['Tous', 'Afrique <--> Europe', 'Afrique <--> Amérique'];

    const getBadgeClasses = (type: string) => {
        switch (type) {
            case 'info':
                return 'badge text-bg-info d-inline-flex align-items-center';
            case 'primary':
                return 'badge text-bg-primary';
            case 'warning':
                return 'badge text-bg-warning';
            default:
                return 'badge';
        }
    };

    const formatDate = (dateString: string) => {
        const [day, month, year] = dateString.split('/');
        const date = new Date(`${month}/${day}/${year}`);

        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const renderCard = (listing: Listing, index: number) => (
        <div
            key={`${listing.id}-${index}`}
            className="mx-3"
            style={{ width: '300px', flexShrink: 0 }}
        >
            <article className="card h-100 hover-effect-scale">
                <div className="card-img-top position-relative overflow-hidden">
                    <div className="d-flex flex-column gap-2 align-items-start position-absolute top-0 start-0 z-1 pt-1 pt-sm-0 ps-1 ps-sm-0 mt-2 mt-sm-3 ms-2 ms-sm-3">
                        {listing.badges.map((badge, badgeIndex) => (
                            <span key={badgeIndex} className={getBadgeClasses(badge.type)}>
                                {badge.text}
                                {badge.icon && <i className="fi-shield ms-1"></i>}
                            </span>
                        ))}
                    </div>
                    <div
                        className="ratio hover-effect-target bg-body-tertiary"
                        style={{ '--fn-aspect-ratio': 'calc(204 / 306 * 100%)' } as React.CSSProperties}
                    >
                        <img
                            src={listing.image}
                            alt={listing.title}
                            onError={(e) => {
                                e.currentTarget.src = `https://via.placeholder.com/306x204?text=${encodeURIComponent(listing.title)}`;
                            }}
                        />
                    </div>
                </div>

                <div className="card-body pb-3">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                        <div className="fs-xs text-body-secondary me-3">
                            {formatDate(listing.date)}
                        </div>
                        <div className={'d-flex align-items-center g-2 text-sm'}>
                            <StarIcon size={16} style={{color:'#ffab00'}} className={'me-2'}/> <b>3.5</b>/5
                        </div>
                    </div>

                    <h3 className="h6 mb-2">
                        <Link
                            href={`/package/${listing.id}`}
                            className="hover-effect-underline stretched-link me-1"
                        >
                            {listing.title}
                        </Link>
                    </h3>

                    <div className="mb-0 text-[0.85rem]">Indemnité Proposée: <b className={'h6 text-primary'}>{listing.price}</b></div>
                </div>

                <div className="card-footer bg-transparent border-0 pt-0 pb-4">
                    <div className="border-top pt-3 mb-3">
                        <div className="row row-cols-2 g-2 fs-sm">
                            <div className="col d-flex align-items-center gap-2">
                                <PlaneTakeoff size={16} />
                                Depart
                            </div>
                            <div className="col d-flex fw-bold align-items-center justify-content-end gap-2">
                                <img width="96" height="96" style={{width: "16px", height: "auto"}} src="https://img.icons8.com/fluency/96/france-circular.png" alt="cameroon-circular"/>
                                {listing.location}
                            </div>
                            <div className="col d-flex align-items-center gap-2">
                                <PlaneLanding size={16} />
                                Destination
                            </div>
                            <div className="col d-flex fw-bold align-items-center justify-content-end gap-2">
                                <img width="96" height="96" style={{width: "16px", height: "auto"}} src="https://img.icons8.com/fluency/96/cameroon-circular.png" alt="cameroon-circular"/>
                                {listing.location}
                            </div>
                        </div>
                    </div>
                    <div className="border-top pt-3">
                        <div className="d-flex align-items-center gap-2">
                            <button
                                type="button"
                                className="btn btn-icon btn-sm btn-outline-secondary animate-pulse rounded-circle me-3"
                                data-bs-toggle="tooltip"
                                data-bs-custom-class="tooltip-sm"
                                aria-label="Add to wishlist"
                                title="Wishlist"
                            >
                                <UserIcon className="animate-target" size={14} />
                            </button>
                            Nom de Utilisateur
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );

    return (
        <section className="pt-2 pt-sm-3 pt-md-4 pt-lg-5 pb-5 my-xxl-3">
            <div className="container">
                <div className="d-sm-flex justify-content-between gap-3 pb-3 mb-2 mb-sm-3">
                    <h2 className="mb-sm-0">Derniers Annonces</h2>
                    <ul className="nav nav-pills flex-sm-nowrap gap-2 text-nowrap">
                        {filters.map((filter) => (
                            <li key={filter} className="nav-item me-1">
                                <button
                                    className={`nav-link ${activeFilter === filter ? 'active' : ''}`}
                                    onClick={() => setActiveFilter(filter)}
                                    aria-current={activeFilter === filter ? 'page' : undefined}
                                >
                                    {filter}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Desktop and Tablet View - Marquee */}
            <div className="d-none d-md-block">
                <Marquee
                    pauseOnHover={true}
                    speed={30}
                    gradient={true}
                    gradientWidth={100}
                    gradientColor="white"
                    className="py-3"
                >
                    {mockListings.concat(mockListings).map((listing, index) =>
                        renderCard(listing, index)
                    )}
                </Marquee>
            </div>

            {/* Mobile View - Static Grid */}
            <div className="d-md-none">
                <div className="container">
                    <div className="row row-cols-1 row-cols-sm-2 g-4">
                        {mockListings.slice(0, 4).map((listing, index) => (
                            <div key={listing.id} className="col">
                                {renderCard(listing, index)}
                            </div>
                        ))}
                    </div>

                    {/* View More Button for Mobile */}
                    <div className="text-center mt-4">
                        <Link href="/package" className="btn btn-outline-primary btn-lg">
                            Voir Plus d&#39;Annonces
                        </Link>
                    </div>
                </div>
            </div>

            {/* Alternative: Mobile Marquee (uncomment if you prefer marquee on mobile too) */}
            {/*
            <div className="d-md-none">
                <Marquee
                    pauseOnHover={true}
                    speed={20}
                    gradient={true}
                    gradientWidth={50}
                    gradientColor="white"
                    className="py-3"
                >
                    {mockListings.map((listing, index) =>
                        renderCard(listing, index)
                    )}
                </Marquee>
            </div>
            */}
        </section>
    );
}