'use client'

import React, { useState } from 'react';
import {
    Search,
    Grid,
    Key,
    ShoppingBag,
    Coffee,
    Music,
    Heart,
    Truck,
    Package,
    SearchIcon,
    UserIcon,
    Package2Icon
} from 'lucide-react';
import Link from "next/link";


export default function ServiceProcess() {


    return (
        <section className="bg-[#094786] overflow-hidden">
            <div className="container">
                <div className="row align-items-end justify-content-center justify-content-md-end">
                    <div className="col-lg-6 py-2 py-sm-3 py-md-4 py-lg-5 my-xxl-3">
                        <h2 className="h1 text-white pt-5 pb-2 pb-md-3">Comment ça marche?</h2>
                        <p className="fs-sm text-white opacity-75 mb-5">
                            Look for a trip, contact the traveler, meet to exchange the parcel, then the traveler will contact you arrived at the destination and it's done!
                        </p>
                        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-1 g-3 pb-3 mb-2 mb-md-3" data-bs-theme="light">

                            {/* Card */}
                            <div className="col">
                                <div className="card h-100 bg-white bg-opacity-10 border-0 p-xl-2">
                                    <div className="card-body d-flex items-center justify-content-between">
                                        <div className="d-flex flex-column pe-4">
                                            <h3 className="h4 mb-2">
                                                <a className="hover-effect-underline stretched-link text-white" href="#!">Rechercher un Trajet</a>
                                            </h3>
                                            <p className="fs-sm text-white opacity-75">Recherchez un itinéraire rapide et simple, et votre demande sera prise en compte.</p>
                                        </div>
                                        <div className="ratio ratio-1x1 flex-shrink-0 bg-white bg-opacity-10 rounded overflow-hidden align-self-center" style={{ width: '106px' }}>
                                            <SearchIcon className={'text-white'}/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Card */}
                            <div className="col">
                                <div className="card h-100 bg-white bg-opacity-10 border-0 p-xl-2">
                                    <div className="card-body d-flex items-center justify-content-between">
                                        <div className="d-flex flex-column pe-4">
                                            <h3 className="h4 mb-2">
                                                <a className="hover-effect-underline stretched-link text-white" href="#!">Choisir un Transporteur</a>
                                            </h3>
                                            <p className="fs-sm text-white opacity-75">Trouvez des membres qui font le trajet pour transporter votre objet.</p>
                                        </div>
                                        <div className="ratio ratio-1x1 flex-shrink-0 bg-white bg-opacity-10 rounded overflow-hidden align-self-center" style={{ width: '106px' }}>
                                            <UserIcon className={'text-white'}/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Card */}
                            <div className="col">
                                <div className="card h-100 bg-white bg-opacity-10 border-0 p-xl-2">
                                    <div className="card-body d-flex items-center justify-content-between">
                                        <div className="d-flex flex-column pe-4">
                                            <h3 className="h4 mb-2">
                                                <a className="hover-effect-underline stretched-link text-white" href="#!">Recevoir votre Colis en toute sécurité</a>
                                            </h3>
                                            <p className="fs-sm text-white opacity-75">Votre colis est livré, laissez un avis sur votre messagerie et ajoutez-le à vos contacts.</p>
                                        </div>
                                        <div className="ratio ratio-1x1 flex-shrink-0 bg-white bg-opacity-10 rounded overflow-hidden align-self-center" style={{ width: '106px' }}>
                                            <Package2Icon className={'text-white'}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* More button */}
                        <div className="mb-md-4 mb-lg-5">
                            <Link href="#" className="btn btn-lg btn-primary animate-shake me-2 h-[50px] !px-10">
                                <Truck className="w-[24px] animate-target ms-n2 me-1.5 me-sm-3"/>
                                Transporter
                            </Link>

                            <Link href="#" className="btn btn-lg btn-primary animate-scale h-[50px] !px-10">
                                <Package className="w-20px] animate-target ms-n2 me-1.5 me-sm-3"/>
                                Expédier
                            </Link>
                        </div>
                    </div>

                    {/* Main image */}
                    <div className="col-7 col-sm-6 col-md-5 col-lg-6">
                        <div className="d-none d-md-block d-lg-none" style={{ marginTop: '-360px' }}></div>
                        <div className="d-md-none" style={{ marginBottom: '-40px' }}></div>
                        <div className="ratio opacity-75" style={{ '--fn-aspect-ratio': 'calc(832 / 736 * 100%)' } as React.CSSProperties}>
                            <img src="/service.png" alt="Image" />
                        </div>
                        <div className="d-sm-none" style={{ marginBottom: '-75px' }}></div>
                        <div className="d-none d-sm-block d-md-none" style={{ marginBottom: '-110px' }}></div>
                    </div>
                </div>
            </div>
        </section>
    );
}