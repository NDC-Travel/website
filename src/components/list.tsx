"use client";

import React, { useState } from "react";
import {Calendar, CreditCard, MapPin, Menu, PlaneLanding, PlaneTakeoff, StarIcon, UserIcon} from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {Listing} from "@/components/listing";
import Link from "next/link";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

export default function ListingPackage() {
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
            style={{ width: '100%', flexShrink: 0 }}
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
                            href={`/listings/${listing.id}`}
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
        <section className="container !px-0 !mb-2 !pt-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 !gap-3 !mb-7">
                {mockListings.concat(mockListings).map((listing, index) =>
                    renderCard(listing, index)
                )}
            </div>

            <Pagination className={'!text-black !my-10'}>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious  className={'!text-black'} href="#" />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink className={'!text-black'} href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink className={'!text-black'} href="#" isActive>
                            2
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink className={'!text-black'} href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis className={'!text-black'} />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink className={'!text-black'} href="#">10</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext className={'!text-black'} href="#" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </section>
    );
}
