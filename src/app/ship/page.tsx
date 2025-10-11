'use client'

import React, {useState} from "react";
import {
    Facebook,
    Instagram,
    Linkedin,
    Share2,
    Heart, StarHalf, StarHalfIcon, StarIcon, PlaneTakeoff, PlaneLanding, UserIcon, PackageIcon, Truck, ChevronRight,
    PlaneIcon,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import Breadcrumb from "@/components/nav";
import {BsStarFill} from "react-icons/bs";
import ListingPackage from "@/components/list";
import {Listing} from "@/components/listing";
import Link from "next/link";

const ShipForm: React.FC = () => {
    const [form, setForm] = useState({
        driveType: "",
        engine: "",
        transmission: "",
        fuelType: "",
        cityMpg: "",
        highwayMpg: "",
        exteriorColor: "",
        interiorColor: "",
        description: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <section className="position-relative !border-1 bg-body !rounded-[0.75rem] p-4">
            <div className="position-relative z-1 pb-md-2 px-md-2">
                <h2 className="h4 mb-3 mb-sm-4 text-primary">Specifications du Colis</h2>

                <div className="rounded overflow-hidden my-5">
                    <img src="/dim.jpg" alt="Image"/>
                </div>

                <div className="row row-cols-1 row-cols-sm-2 g-3 g-md-4 mb-3 mb-md-4">
                    {/* Drive Type */}
                    <div className="col">
                        <label className="form-label">Drive type *</label>
                        <select
                            className="form-select form-select-lg"
                            name="driveType"
                            value={form.driveType}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select drive type</option>
                            <option value="Front-Wheel Drive">Front-Wheel Drive</option>
                            <option value="Rear-Wheel Drive">Rear-Wheel Drive</option>
                            <option value="All-Wheel Drive">All-Wheel Drive</option>
                            <option value="Four-Wheel Drive">Four-Wheel Drive</option>
                        </select>
                    </div>

                    {/* Engine */}
                    <div className="col">
                        <label className="form-label">Engine *</label>
                        <select
                            className="form-select form-select-lg"
                            name="engine"
                            value={form.engine}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select engine</option>
                            <option value="Inline-4">Inline-4</option>
                            <option value="Inline-6">Inline-6</option>
                            <option value="6-Cylinder Turbo">6-Cylinder Turbo</option>
                            <option value="V6">V6</option>
                            <option value="V8">V8</option>
                            <option value="V10">V10</option>
                            <option value="V12">V12</option>
                            <option value="Electric">Electric</option>
                            <option value="Hybrid">Hybrid</option>
                        </select>
                    </div>

                    {/* Transmission */}
                    <div className="col">
                        <label className="form-label">Transmission *</label>
                        <select
                            className="form-select form-select-lg"
                            name="transmission"
                            value={form.transmission}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select transmission</option>
                            <option value="Manual">Manual</option>
                            <option value="Automatic">Automatic</option>
                            <option value="CVT">CVT</option>
                            <option value="Dual-Clutch">Dual-Clutch</option>
                            <option value="Semi-Automatic">Semi-Automatic</option>
                            <option value="7-Speed Shiftable Automatic">
                                7-Speed Shiftable Automatic
                            </option>
                            <option value="8-Speed Automatic">8-Speed Automatic</option>
                            <option value="9-Speed Automatic">9-Speed Automatic</option>
                            <option value="10-Speed Automatic">10-Speed Automatic</option>
                        </select>
                    </div>

                    {/* Fuel Type */}
                    <div className="col">
                        <label className="form-label">Fuel type *</label>
                        <select
                            className="form-select form-select-lg"
                            name="fuelType"
                            value={form.fuelType}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select fuel type</option>
                            <option value="Gasoline">Gasoline</option>
                            <option value="Diesel">Diesel</option>
                            <option value="Electric">Electric</option>
                            <option value="Hybrid">Hybrid</option>
                            <option value="Plug-in Hybrid">Plug-in Hybrid</option>
                            <option value="Hydrogen">Hydrogen</option>
                            <option value="Flex Fuel">Flex Fuel</option>
                            <option value="Natural Gas">Natural Gas</option>
                        </select>
                    </div>

                    {/* City MPG */}
                    <div className="col">
                        <label htmlFor="cityMpg" className="form-label">
                            City MPG
                        </label>
                        <input
                            type="number"
                            id="cityMpg"
                            name="cityMpg"
                            className="form-control form-control-lg"
                            placeholder="Miles per gallon"
                            min={10}
                            value={form.cityMpg}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Highway MPG */}
                    <div className="col">
                        <label htmlFor="highwayMpg" className="form-label d-flex align-items-center">
                            Highway MPG{" "}
                            <i
                                className="fi-info fs-base ms-2"
                                data-bs-toggle="tooltip"
                                aria-label="Measured at a steady pace of 65 mph"
                            ></i>
                        </label>
                        <input
                            type="number"
                            id="highwayMpg"
                            name="highwayMpg"
                            className="form-control form-control-lg"
                            placeholder="Miles per gallon"
                            min={10}
                            value={form.highwayMpg}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Exterior color */}
                    <div className="col">
                        <label htmlFor="exteriorColor" className="form-label">
                            Exterior color
                        </label>
                        <input
                            type="text"
                            id="exteriorColor"
                            name="exteriorColor"
                            className="form-control form-control-lg"
                            value={form.exteriorColor}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Interior color */}
                    <div className="col">
                        <label htmlFor="interiorColor" className="form-label">
                            Interior color
                        </label>
                        <input
                            type="text"
                            id="interiorColor"
                            name="interiorColor"
                            className="form-control form-control-lg"
                            value={form.interiorColor}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* Description */}
                <label htmlFor="description" className="form-label fs-6 fw-semibold">
                    Description *
                </label>
                <p className="fs-sm mb-2">
                    Here you can let your imagination run wild and describe the car in the
                    best possible way!
                </p>
                <textarea
                    id="description"
                    name="description"
                    className="form-control form-control-lg"
                    rows={5}
                    placeholder="Maximum 2000 characters"
                    required
                    value={form.description}
                    onChange={handleChange}
                />

                <Link href="#" className="btn !font-bold btn-primary animate-shake mt-5 w-full h-[50px]">
                    Envoyez le Colis
                    <ChevronRight className="w-[20px] animate-target me-n2 ms-2"/>
                </Link>

            </div>

            <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark rounded d-none d-block-dark"></div>
        </section>
    );
};


export default function Ship() {

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
                {text: "Poids: 3Kg", type: "primary"}
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
                {text: "Poids: 3Kg", type: "primary"}
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
                {text: "Poids: 3Kg", type: "primary"}
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
                {text: "Poids: 3Kg", type: "primary"}
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
            className=""
            style={{width: '100%', flexShrink: 0}}
        >
            <article className="card h-100 hover-effect-scale">
                <div className="card-img-top position-relative overflow-hidden">
                    <div
                        className="d-flex flex-column gap-2 align-items-start position-absolute top-0 start-0 z-1 pt-1 pt-sm-0 ps-1 ps-sm-0 mt-2 mt-sm-3 ms-2 ms-sm-3">
                        {listing.badges.map((badge, badgeIndex) => (
                            <span key={badgeIndex} className={getBadgeClasses(badge.type)}>
                                {badge.text}
                                {badge.icon && <i className="fi-shield ms-1"></i>}
                            </span>
                        ))}
                    </div>
                    <div
                        className="ratio hover-effect-target bg-body-tertiary"
                        style={{'--fn-aspect-ratio': 'calc(204 / 306 * 100%)'} as React.CSSProperties}
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
                            <StarIcon size={16} style={{color: '#ffab00'}} className={'me-2'}/> <b>3.5</b>/5
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

                    <div className="mb-0 text-[0.85rem]">Indemnité Proposée: <b
                        className={'h6 text-primary'}>{listing.price}</b></div>
                </div>

                <div className="card-footer bg-transparent border-0 pt-0 pb-4">
                    <div className="border-top pt-3 mb-3">
                        <div className="row row-cols-2 g-2 fs-sm">
                            <div className="col d-flex align-items-center gap-2">
                                <PlaneTakeoff size={16}/>
                                Depart
                            </div>
                            <div className="col d-flex fw-bold align-items-center justify-content-end gap-2">
                                <img width="96" height="96" style={{width: "16px", height: "auto"}}
                                     src="https://img.icons8.com/fluency/96/france-circular.png"
                                     alt="cameroon-circular"/>
                                {listing.location}
                            </div>
                            <div className="col d-flex align-items-center gap-2">
                                <PlaneLanding size={16}/>
                                Destination
                            </div>
                            <div className="col d-flex fw-bold align-items-center justify-content-end gap-2">
                                <img width="96" height="96" style={{width: "16px", height: "auto"}}
                                     src="https://img.icons8.com/fluency/96/cameroon-circular.png"
                                     alt="cameroon-circular"/>
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
                                data-bs-custom-className="tooltip-sm"
                                aria-label="Add to wishlist"
                                title="Wishlist"
                            >
                                <UserIcon className="animate-target" size={14}/>
                            </button>
                            Nom de Utilisateur
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );

    return (
        <main className={'content-wrapper'}>

            <Breadcrumb
                items={[
                    {label: "Accueil", href: "/"},
                    {label: "Colis", href: "/package"},
                ]}
            />

            <section className={'container !mb-10 !pb-10'}>
                <div className={'row'}>
                    <div className={'col-lg-6 pb-3 pb-sm-0 mb-4 mb-sm-5 mb-lg-0'}>

                        <ShipForm />

                    </div>

                    <aside className={'col-lg-6 !mt-[-110px]'}>
                        <div className="position-sticky top-0" style={{paddingTop: "110px"}}>

                            {/* Seller info card */}
                            <div className="card bg-body-tertiary border-0 p-sm-2 p-lg-0 p-xl-2 mb-4">
                                <div className="card-body">

                                    <h3 className="mb-5 text-xl md:text-2xl font-semibold !flex !items-center flex-wrap gap-2">
                                        Trajet du Colis {" "}
                                    </h3>

                                    <div className="d-flex gap-x-4 align-items-center position-relative mb-3">
                                        <div className="pb-4 mb-2 !w-1/2">
                                            <label htmlFor="address" className="form-label">Street address *</label>
                                            <input type="text" className="form-control form-control-lg" id="address"
                                                   value="929 Hart Street" placeholder="Enter address"/>
                                        </div>

                                        <div className="pb-4 mb-2 !w-1/2">
                                            <label htmlFor="address" className="form-label">Street address *</label>
                                            <input type="text" className="form-control form-control-lg" id="address"
                                                   value="929 Hart Street" placeholder="Enter address"/>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="alert d-sm-flex !items-start alert-primary pb-4 pt-sm-4" role="alert">
                                <PackageIcon className="!w-[10rem] !h-auto mt-1 mb-2 mb-sm-0"/>
                                <div className="ps-sm-3 pe-sm-4">
                                    <h4 className="alert-heading !text-[1.3rem] mb-2">Passez une annonce pour expédier votre colis</h4>
                                    <hr className="text-success opacity-25 my-3"/>
                                    <p className="mb-3">Passez une annonce pour votre colis sur cet itinéraire. Les transporteurs vous contacteront.</p>
                                </div>
                            </div>

                            <div className="bg-body-tertiary rounded p-4">
                                <div className="d-flex !gap-x-2 !w-full items-center">
                                    <div className="d-flex flex-col justify-content-between !gap-x-2 !w-full">
                                        <h6 className="mb-2">Vous souhaitez envoyer un colis ?</h6>
                                        <p className="fs-sm !flex-1 mb-0">
                                            Vérifiez les transporteurs pour cet itinéraire.
                                        </p>
                                    </div>
                                    <Link href="#" className="btn text-white !bg-[#094786] animate-shake me-2 h-[40px]">
                                        <Truck className="w-[20px] animate-target ms-n2 me-2"/>
                                        Voir les transporteurs
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </aside>
                </div>

            </section>

        </main>
    );
}
