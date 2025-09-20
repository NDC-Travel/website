'use client'

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Headset, Info, SearchIcon } from "lucide-react";
import dynamic from 'next/dynamic';



export default function HeroSearchSection() {
    const [searchType, setSearchType] = useState('all-cars');
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [bodyType, setBodyType] = useState('');
    const [location, setLocation] = useState('');
    const [yearFrom, setYearFrom] = useState('');
    const [yearTo, setYearTo] = useState('');
    const [priceFrom, setPriceFrom] = useState('');
    const [priceTo, setPriceTo] = useState('');
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Search submitted:', {
            searchType,
            make,
            model,
            bodyType,
            location,
            yearFrom,
            yearTo,
            priceFrom,
            priceTo
        });
    };

    return (
        <section className="relative bg-white overflow-hidden py-5">
            {/* Background video */}
            {isClient && (
                <div className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
                    <video
                        className="absolute inset-0 w-full h-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                        style={{ zIndex: -1 }}
                        onLoadStart={() => console.log('Video loading...')}
                        onError={(e) => console.log('Video error:', e)}
                    >
                        <source src="/banner.mp4" type="video/mp4" />
                    </video>
                </div>
            )}

            {/* Fallback background if video fails */}
            {!isClient && (
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 to-purple-600" style={{ zIndex: -1 }} />
            )}

            {/* Video overlay for better text readability */}
            <div
                className="absolute inset-0 w-full h-full"
                style={{ zIndex: 1, backgroundColor: "rgba(0, 0, 0, 0.4)" }}
            />

            <div className="container relative z-10 pb-2 py-sm-3 py-md-4 py-lg-5 my-lg-3 my-xl-4 my-xxl-5">
                <div className="row align-items-center pt-lg-2 pb-lg-3 pb-xl-4 pb-xxl-5">
                    {/* Heading */}
                    <div className="col-lg-4 order-lg-2 text-center text-lg-start pb-2 pb-sm-3 pb-md-0 mb-4 mb-md-5 mb-lg-0">
                        <h4 className="display-6 text-white" style={{
                         fontSize: "3rem"
                        }}>De l’envoi à la livraison, nous garantissons fiabilité et suivi irréprochable.</h4>
                        <div className="d-flex align-items-center justify-content-center justify-content-lg-start mt-4">
                            <div className="d-flex gap-3 flex-column flex-sm-row">
                                <Link
                                    href="#"
                                    className="btn btn-primary btn-lg text-white d-flex align-items-center justify-content-center"
                                    style={{ minHeight: '50px' }}
                                >
                                    <Info className="me-2" size={20} />
                                    Apprendre Plus
                                </Link>

                                <Link
                                    href="#"
                                    className="btn btn-info btn-lg text-white d-flex align-items-center justify-content-center"
                                    style={{ minHeight: '50px' }}
                                >
                                    <Headset className="me-2" size={20} />
                                    Contacter Nous
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Search form */}
                    <div className="col-lg-8 order-lg-1">
                        <div className="bg-white rounded p-4 mb-4 me-lg-4 me-xxl-0" style={{ maxWidth: '816px' }}>
                            <form className="p-sm-2" onSubmit={handleSubmit}>

                                <div className={'flex justify-between items-center'}>
                                    <img src={'/1.gif'} alt={""} className={'w-[70px] h-auto'} />
                                    <div className={"flex flex-col items-center"}>
                                        <h4>Transport de colis entre particuliers</h4>
                                        <span className={'text-muted'}>Expédition de colis pas cher, rapide et écolo</span>
                                    </div>
                                    <img src={'/2.gif'} alt={""} className={'w-[70px] h-auto'} />
                                </div>

                                <div className="d-flex justify-content-center gap-2 gap-sm-3 mt-5 mb-5">
                                    <input
                                        type="radio"
                                        className="btn-check"
                                        name="car-search"
                                        id="all-cars"
                                        checked={searchType === 'all-cars'}
                                        onChange={() => setSearchType('all-cars')}
                                    />
                                    <label htmlFor="all-cars" className="btn btn-outline-primary rounded-pill">
                                        J'expédie
                                    </label>

                                    <input
                                        type="radio"
                                        className="btn-check"
                                        name="car-search"
                                        id="new-cars"
                                        checked={searchType === 'new-cars'}
                                        onChange={() => setSearchType('new-cars')}
                                    />
                                    <label htmlFor="new-cars" className="btn btn-outline-primary rounded-pill">
                                        Je transporte
                                    </label>
                                </div>

                                <div className="row row-cols-1 row-cols-md-2 g-3">
                                    <div className="col d-flex flex-column gap-3">
                                        <select
                                            className="form-select"
                                            aria-label="Departure location"
                                            value={make}
                                            onChange={(e) => setMake(e.target.value)}
                                        >
                                            <option value="">Lieu de départ</option>
                                            <option value="Paris">Paris</option>
                                            <option value="Lyon">Lyon</option>
                                            <option value="Marseille">Marseille</option>
                                            <option value="Toulouse">Toulouse</option>
                                            <option value="Nice">Nice</option>
                                            <option value="Nantes">Nantes</option>
                                            <option value="Montpellier">Montpellier</option>
                                            <option value="Strasbourg">Strasbourg</option>
                                            <option value="Bordeaux">Bordeaux</option>
                                            <option value="Lille">Lille</option>
                                        </select>

                                        <select
                                            className="form-select"
                                            aria-label="Package type"
                                            value={model}
                                            onChange={(e) => setModel(e.target.value)}
                                        >
                                            <option value="">Type de colis</option>
                                            <option value="Documents">Documents</option>
                                            <option value="Vêtements">Vêtements</option>
                                            <option value="Électronique">Électronique</option>
                                            <option value="Nourriture">Nourriture</option>
                                            <option value="Cadeaux">Cadeaux</option>
                                            <option value="Médicaments">Médicaments</option>
                                            <option value="Livres">Livres</option>
                                            <option value="Objets fragiles">Objets fragiles</option>
                                            <option value="Autre">Autre</option>
                                        </select>
                                    </div>

                                    <div className="col d-flex flex-column gap-3">
                                        <select
                                            className="form-select"
                                            aria-label="Destination location"
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                        >
                                            <option value="">Destination</option>
                                            <option value="Paris">Paris</option>
                                            <option value="Lyon">Lyon</option>
                                            <option value="Marseille">Marseille</option>
                                            <option value="Toulouse">Toulouse</option>
                                            <option value="Nice">Nice</option>
                                            <option value="Nantes">Nantes</option>
                                            <option value="Montpellier">Montpellier</option>
                                            <option value="Strasbourg">Strasbourg</option>
                                            <option value="Bordeaux">Bordeaux</option>
                                            <option value="Lille">Lille</option>
                                        </select>

                                        <div className="input-group">
                                            <div className="w-50">
                                                <select
                                                    className="form-select rounded-end-0"
                                                    aria-label="Date de départ"
                                                    value={yearFrom}
                                                    onChange={(e) => setYearFrom(e.target.value)}
                                                >
                                                    <option value="">Date de départ</option>
                                                    <option value="Aujourd'hui">Aujourd'hui</option>
                                                    <option value="Demain">Demain</option>
                                                    <option value="Cette semaine">Cette semaine</option>
                                                    <option value="Semaine prochaine">Semaine prochaine</option>
                                                    <option value="Ce mois">Ce mois</option>
                                                    <option value="Mois prochain">Mois prochain</option>
                                                    <option value="Flexible">Flexible</option>
                                                </select>
                                            </div>
                                            <div className="w-50">
                                                <select
                                                    className="form-select rounded-start-0"
                                                    aria-label="Urgence"
                                                    value={yearTo}
                                                    onChange={(e) => setYearTo(e.target.value)}
                                                >
                                                    <option value="">Urgence</option>
                                                    <option value="Très urgent">Très urgent</option>
                                                    <option value="Urgent">Urgent</option>
                                                    <option value="Normal">Normal</option>
                                                    <option value="Flexible">Flexible</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-center mt-5">
                                    <button type="submit" className="btn bg-black text-white w-[100%] md:w-[30%] d-flex align-items-center">
                                        <SearchIcon className="me-2" size={18} />
                                        Rechercher
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