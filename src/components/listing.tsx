'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Marquee from "react-fast-marquee";
import {
    StarIcon,
    PlaneTakeoff,
    PlaneLanding,
    UserIcon, ArrowRight, Truck, MessageSquareIcon
} from 'lucide-react';
import {countryNameToISO, getCountryFromAddress, isoToFlag} from "@/components/my-carry";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Separator} from "@radix-ui/react-menu";

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
    carrier?: {
        name: string;
        email: string;
        image?: string;
    };
}

export default function Listing() {
    const [packages, setPackages] = useState<Package[]>([]);
    const [activeFilter, setActiveFilter] = useState('Tous');

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const res = await fetch('/api/packages?limit=10');
                const data: Package[] = await res.json();

                // Filter valid packages (not expired)
                const valid = data.filter(pkg => {
                    if (!pkg.shippingDeadline) return false;
                    const deadline = new Date(pkg.shippingDeadline);
                    return deadline >= new Date(); // still valid
                });

                // Shuffle randomly
                const shuffled = valid.sort(() => 0.5 - Math.random());
                setPackages(shuffled);
            } catch (e) {
                console.error('Error loading packages:', e);
            }
        };

        fetchPackages();
    }, []);

    const formatDate = (date: string) =>
        new Date(date).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });

    const renderCard = (pkg: Package, index: number) => (
        <div key={`${pkg.id}-${index}`} className="!mx-0 md:!mx-3 !w-full md:!w-[400px]" style={{ flexShrink: 0 }}>
            <Link href={`/package/${pkg.id}`} className="card h-100 hover-effect-scale">
                <div className="card-img-top position-relative overflow-hidden">
                    <div className="d-flex flex-row items-center !w-[90%] md:!w-[365px] justify-content-between gap-2 align-items-start position-absolute top-0 start-0 z-1 pt-1 pt-sm-0 ps-1 ps-sm-0 mt-2 mt-sm-3 ms-2 ms-sm-3">
                        <span className="badge text-bg-primary p-2 !bg-[#094786] w-auto fw-bold">
                          {pkg.weight ? `Poids: ${pkg.weight} KG` : 'Colis'}
                        </span>
                        <span className="badge text-bg-primary p-2 !bg-[#000]">
                          Colis pour des expedition
                        </span>
                    </div>


                    <div className="ratio hover-effect-target bg-body-tertiary"
                         style={{ '--fn-aspect-ratio': 'calc(204 / 306 * 100%)' } as React.CSSProperties}>
                        <img className={'!h-[300px] !w-full !object-cover'} src={pkg.imageUrl || "https://img.freepik.com/free-vector/cardboard-box_23-2147513430.jpg?t=st=1760309231~exp=1760312831~hmac=cbb721d02a1fc426748066b66230a45e80ee69d96f18af4f1147f866ffb48b82&w=2000"} alt={pkg.packageContents}/>
                    </div>
                </div>

                <div className="card-body pb-3">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                        <div className="fs-xs text-body-secondary me-3">
                            Deadline: <b className={'text-black'}>{formatDate(pkg.shippingDeadline)}</b>
                        </div>
                        <div className="mb-0 text-[0.85rem]">
                            Indemnité Proposée: <b className="h6 text-primary">{pkg.participationAllowance} €</b>
                        </div>
                    </div>

                    <h3 className="h6 mb-2">
                        <Link href={`/package/${pkg.id}`} className="hover-effect-underline stretched-link me-1 !text-[#d46328]">
                            {pkg.packageContents}
                        </Link>
                    </h3>

                    <small className={'text-muted'}>
                        {pkg.parcelDetails}
                    </small>

                </div>

                <div className="card-footer bg-transparent border-0 pt-0 pb-4">
                    <div className="border-top pt-3 mb-3">
                        <div className="flex items-center justify-content-between g-2 fs-sm">
                            <div className="col d-flex align-items-center gap-2">
                                {isoToFlag(countryNameToISO[getCountryFromAddress(pkg.origin)]) || "🌍"} {pkg.origin}
                            </div>
                            <ArrowRight />
                            <div className="col d-flex fw-bold align-items-center justify-content-end gap-2">
                                {isoToFlag(countryNameToISO[getCountryFromAddress(pkg.destination)]) || "🌍"} {pkg.destination}
                            </div>
                        </div>
                    </div>

                    <div className="border-top pt-3">
                        <div className="d-flex align-items-center justify-content-between gap-2">
                            Publié par
                            <div className="d-flex align-items-center gap-2">
                                <Avatar className={'!w-[32px] !bg-black !text-white !h-[32px]'}>
                                    <AvatarImage src={pkg.user?.image as string} />
                                    <AvatarFallback className={'!text-decoration-none !bg-black !text-white'}>{pkg.user?.name?.charAt(0)}</AvatarFallback>
                                </Avatar>
                                {pkg.user?.name || 'Utilisateur Inconnu'}
                            </div>
                        </div>
                        {
                            pkg.carrier !== null ? (
                                <>
                                    <br />
                                    <div className="d-flex border-top align-items-center justify-content-between gap-2 pt-3">
                                        Transporté par
                                        <div className="d-flex align-items-center gap-2">
                                            <Avatar className={'!w-[32px] !bg-black !text-white !h-[32px]'}>
                                                <AvatarImage src={pkg.carrier?.image as string} />
                                                <AvatarFallback className={'!text-decoration-none !bg-black !text-white'}>{pkg.carrier?.name?.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            {pkg.carrier?.name || 'Utilisateur Inconnu'}
                                        </div>
                                    </div>
                                </> )
                                :
                                <div className="d-flex border-top align-items-center justify-content-between gap-2 pt-3 mt-3">
                                    Pas de Transporteur
                                    <Link
                                        href={"/dashboard?page=message&id=" + pkg.user?.email}
                                        className="btn btn-sm btn-primary fw-bold d-flex z-2 align-items-center"
                                    >
                                        <MessageSquareIcon className="w-4 me-2 h-4 text-white" /> Chat Par Message
                                    </Link>
                                </div>
                        }
                    </div>
                </div>
            </Link>
        </div>
    );

    return (
        <section className="pt-2 pt-sm-3 pt-md-4 pt-lg-5 pb-5 my-xxl-3">
            <div className="container">
                <div className="d-sm-flex justify-content-between gap-3 pb-3 mb-2 mb-sm-3">
                    <h2 className="mb-sm-0">Dernières Annonces</h2>

                    <Link
                        href={"/package"}
                        className="btn btn-primary btn-lg d-flex align-items-center justify-content-center"
                    >
                        Nos Colis
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
                            Voir Plus d&#39;Annonces
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
