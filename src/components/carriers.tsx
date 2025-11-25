'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Marquee from "react-fast-marquee";
import {
    StarIcon,
    PlaneTakeoff,
    PlaneLanding,
    UserIcon, ArrowRight, Truck
} from 'lucide-react';
import {countryNameToISO, getAddress, getCountryFromAddress, isoToFlag, transportIcon} from "@/components/my-carry";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

export interface Package {
    id: string;
    title: string;
    reward: number;
    departure: string;
    destination: string;
    shippingDeadline: string; // ISO string from DB
    weight?: string;
    image?: string;
    user?: {
        name: string;
        image?: string;
    };
}

export default function ListingCarrier() {
    const [packages, setPackages] = useState<Package[]>([]);
    const [activeFilter, setActiveFilter] = useState('Tous');

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const res = await fetch('/api/carriers?limit=10');
                const data: Package[] = await res.json();

                // Shuffle randomly
                const shuffled = data.sort(() => 0.5 - Math.random());
                setPackages(shuffled);
            } catch (e) {
                console.error('Error loading packages:', e);
            }
        };

        fetchPackages();
    }, []);

    function formatDate(date: string) {
        try{
            return new Date(date).toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            });
        } catch (e) {
            return date
        }
    }


    const renderCard = (pkg: Package, index: number) => (
        <div key={`${pkg.id}-${index}`} className="!mx-0 md:!mx-3 !w-full md:!w-[400px]" style={{ flexShrink: 0 }}>
            <Link href={`/carrier/${pkg.id}`} className="card h-100 hover-effect-scale">
                <div className="card-img-top position-relative overflow-hidden">
                    <div className="position-absolute top-0 start-0 z-1 pt-2 ps-2">
            <span className="badge text-bg-primary !bg-[#094786] fw-bold">
              Transporteur
            </span>
                    </div>

                    <div className="ratio hover-effect-target bg-body-tertiary"
                         style={{ '--fn-aspect-ratio': 'calc(204 / 306 * 100%)' } as React.CSSProperties}>
                        <img className={'!h-[300px] !w-full !object-cover'} src={"/carrier.jpeg"} alt={pkg.packageContents}/>
                    </div>
                </div>

                <div className="card-body pb-3">

                    <div className="flex items-center justify-content-between g-2 text-[0.75rem]">
                        <div className="col d-flex fw-bold align-items-center justify-content-start gap-3">
                            {isoToFlag(countryNameToISO[getCountryFromAddress(pkg.origin)]) || "🌍"} {getAddress(pkg.origin)}
                        </div><ArrowRight />
                        <div className="col d-flex fw-bold align-items-center justify-content-end gap-3">
                            {isoToFlag(countryNameToISO[getCountryFromAddress(pkg.destination)]) || "🌍"} {getAddress(pkg.destination)}
                        </div>
                    </div>

                    <div className="flex items-center justify-content-between g-2 mt-3 text-[0.75rem]">
                        <div className="col d-flex align-items-center justify-content-start gap-3">
                            Aller
                        </div>

                        <div className="col d-flex fw-bold align-items-center justify-content-end gap-3">
                            {new Date(pkg.outboundDepartureDate).toLocaleDateString()}  - {new Date(pkg.outboundArrivalDate).toLocaleDateString()}
                        </div>
                    </div>
                    <div className="flex items-center justify-content-between g-2 mt-1.5 text-[0.75rem]">
                        <div className="col d-flex align-items-center justify-content-start gap-3">
                            Retour
                        </div>

                        <div className="col d-flex fw-bold align-items-center justify-content-end gap-3">
                            {new Date(pkg.returnDepartureDate).toLocaleDateString()}  - {new Date(pkg.returnArrivalDate).toLocaleDateString()}
                        </div>
                    </div>

                </div>

                <div className="card-footer bg-transparent border-0 pt-0 pb-4">
                    <div className="border-top pt-3 mb-3">
                        <div className="d-flex align-items-center justify-content-between mb-4">
                            <div className="fs-xs text-body-secondary me-3">
                                Poids Acceptable: <b className={'text-black'}>{pkg.weightAvailable} KG</b>
                            </div>
                            <div className="mb-0 text-[0.85rem]">
                                Prix du Kilo: <b className="h6 text-primary">{pkg.pricePerKg} €</b>
                            </div>
                        </div>

                        <small className={'text-muted'}>
                            {pkg.tripDescription}
                        </small>
                    </div>

                    <div className="border-top pt-3">
                        <div className="d-flex text-[0.85rem] align-items-center justify-content-between gap-2">
                            Publié par
                            <div className="d-flex fw-bold text-black align-items-center gap-2">
                                <Avatar className={'!w-[32px] !bg-black !text-white !h-[32px]'}>
                                    <AvatarImage src={pkg.user?.image as string} />
                                    <AvatarFallback className={'!text-decoration-none !bg-black !text-white'}>{pkg.user?.name?.charAt(0)}</AvatarFallback>
                                </Avatar>
                                {pkg.user?.name || 'Utilisateur Inconnu'}
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );

    return (
        <section className="pt-2 pt-sm-3 pt-md-4 pt-lg-5 pb-5 my-xxl-3">
            <div className="container">
                <div className="d-sm-flex justify-content-between gap-3 pb-3 mb-2 mb-sm-3">
                    <h2 className="mb-sm-0">Nos Transporteurs</h2>
                    <Link
                        href={"/carrier"}
                        className="btn btn-primary btn-lg d-flex align-items-center justify-content-center"
                    >
                        Nos Transporteurs
                    </Link>
                </div>
            </div>

            {/* Desktop View: Marquee */}
            <div className="d-none d-md-block">
                <Marquee pauseOnHover speed={50} gradient gradientWidth={100} gradientColor="white" className="py-3">
                    {packages.map((pkg, index) => renderCard(pkg, index))}
                </Marquee>
            </div>

            {/* Mobile View */}
            <div className="d-md-none">
                <div className="container">
                    <div className="row row-cols-1 row-cols-sm-2 g-4">
                        {packages.slice(0, 4).map((pkg, index) => (
                            <div key={pkg.id} className="col">{renderCard(pkg, index)}</div>
                        ))}
                    </div>
                    <div className="text-center mt-4">
                        <Link href="/package" className="btn btn-outline-primary btn-lg">
                            Voir les Transporteurs
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
