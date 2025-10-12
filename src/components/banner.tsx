'use client'

import { useState, useEffect } from 'react';
import { Headset, Info, Package, Truck } from "lucide-react";
import { useRouter } from "next/navigation";
import {LocationAutocomplete} from "@/components/ship";

export default function HeroSearchSection() {
    const [departure, setDeparture] = useState('');
    const [destination, setDestination] = useState('');
    const [isClient, setIsClient] = useState(false);
    const router = useRouter();

    useEffect(() => setIsClient(true), []);

    const handleSearch = (type: 'ship' | 'carry') => {
        if (!departure || !destination) {
            alert("Veuillez renseigner le lieu de départ et la destination.");
            return;
        }

        router.push(`/${type}?origin=${encodeURIComponent(departure)}&destination=${encodeURIComponent(destination)}`);
    };

    return (
        <section className="relative overflow-hidden py-5">
            {/* Background video */}
            {isClient && (
                <div className="absolute inset-0 w-full h-full" style={{ zIndex: 10 }}>
                    <video
                        className="absolute inset-0 w-full h-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        style={{ zIndex: -1 }}
                    >
                        <source src="/banner.mp4" type="video/mp4" />
                        <source src="/banner.webm" type="video/webm" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            )}

            <div className="absolute inset-0 w-full h-full" style={{ zIndex: 11, backgroundColor: "rgba(9, 71, 134, 0.4)" }} />

            <div className="container relative z-[12] py-5">
                <div className="row align-items-center">
                    {/* Heading */}
                    <div className="col-lg-5 text-center text-lg-start mb-5 mb-lg-0">
                        <h4 className="display-6 text-white" style={{ fontSize: "2.8rem", lineHeight: 1.2 }}>
                            De l’envoi à la livraison, nous garantissons fiabilité et suivi irréprochable.
                        </h4>
                        <div className="d-flex align-items-center justify-content-center justify-content-lg-start mt-4 gap-3 flex-column flex-sm-row">
                            <a href="#" className="btn btn-primary btn-lg d-flex align-items-center justify-content-center text-white">
                                <Info className="me-2" size={20} /> Apprendre Plus
                            </a>
                            <a href="#" className="btn btn-info !bg-[#094786] btn-lg d-flex align-items-center justify-content-center text-white">
                                <Headset className="me-2" size={20} /> Contacter Nous
                            </a>
                        </div>
                    </div>

                    {/* Search form */}
                    <div className="col-lg-7">
                        <div className="rounded p-4" style={{ backgroundColor: 'rgba(255, 255, 255, 1)' }}>
                            <form onSubmit={(e) => e.preventDefault()} className="d-flex flex-column gap-4 align-items-center">
                                <div className="text-center">
                                    <h4>Transport de colis entre particuliers</h4>
                                    <span className="text-muted">Expédition de colis pas cher, rapide et écolo</span>
                                </div>

                                <div className="row w-100 g-3 mt-3">
                                    <LocationAutocomplete
                                        id="departure"
                                        label="Lieu de départ"
                                        placeholder="Entrez la ville de départ"
                                        defaultValue={departure}
                                        onSelect={(place) => setDeparture(place?.formatted_address || '')}
                                    />
                                    <LocationAutocomplete
                                        id="destination"
                                        label="Destination"
                                        placeholder="Entrez la ville de destination"
                                        defaultValue={destination}
                                        onSelect={(place) => setDestination(place?.formatted_address || '')}
                                    />
                                </div>

                                <div className="d-flex justify-content-center gap-3 mt-4 flex-column flex-md-row w-100">
                                    <button
                                        type="button"
                                        onClick={() => handleSearch('ship')}
                                        className="btn btn-primary btn-lg w-100 d-flex align-items-center justify-content-center"
                                    >
                                        <Package className="me-2" size={20} /> J’expédie un colis
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => handleSearch('carry')}
                                        className="btn btn-outline-primary btn-lg w-100 d-flex align-items-center justify-content-center"
                                    >
                                        <Truck className="me-2" size={20} /> Je transporte
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
