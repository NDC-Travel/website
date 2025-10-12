'use client';

import React, {useEffect, useState} from "react";
import {useParams} from "next/navigation";
import Link from "next/link";
import {
    Facebook,
    Instagram,
    Linkedin,
    Share2,
    StarIcon,
    PlaneTakeoff,
    PlaneLanding,
    UserIcon, ArrowRight,
} from "lucide-react";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import Breadcrumb from "@/components/nav";
import {BsStarFill} from "react-icons/bs";
import {countryNameToISO, FacebookShareButton, getCountryFromAddress, isoToFlag} from "@/components/my-carry";

interface Package {
    id: string;
    title: string;
    weight: string | null;
    reward: string | null;
    imageUrl?: string | null;
    departure: string | null;
    destination: string | null;
    shippingDeadline: string | null;
    description?: string | null;
    user?: {
        id: string;
        name: string | null;
        email: string | null;
        image: string | null;
    };
}

export default function PackageDetailPage() {
    const {id} = useParams();
    const [pkg, setPkg] = useState<Package | null>(null);
    const [related, setRelated] = useState<Package[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch package detail + related
    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);

                const detailRes = await fetch(`/api/package/${id}`);
                const detail = await detailRes.json();

                const relatedRes = await fetch(`/api/packages?limit=4`);
                const related = await relatedRes.json();

                setPkg(detail);
                setRelated(related.filter((p: Package) => p.id !== detail.id));
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        if (id) fetchData();
    }, [id]);

    if (loading) {
        return (
            <div className="container py-20 text-center">
                <p>Chargement du colis...</p>
            </div>
        );
    }

    if (!pkg) {
        return (
            <div className="container py-20 text-center">
                <p>Colis introuvable.</p>
            </div>
        );
    }

    return (
        <main className="content-wrapper">
            <Breadcrumb
                items={[
                    {label: "Accueil", href: "/"},
                    {label: "Colis", href: "/package"},
                    {label: pkg.packageContents, href: `/package/${pkg.id}`},
                ]}
            />

            <section className="container mb-10 pb-10">
                {/* Header */}
                <div className="flex justify-between items-center gap-3 mb-4">
                    <h1 className="text-2xl md:text-3xl font-semibold flex items-center gap-2">
                        {pkg.packageContents}
                    </h1>

                    <FacebookShareButton
                        url={"https://www.ndc-travels.com/package/" + pkg.id}
                        quote="Regardez ce trajet incroyable sur NDC Travels !"
                    />
                </div>

                {/* Main Content */}
                <div className="row">
                    <div className="col-lg-7 mb-5">
                        <div className="ratio bg-body-tertiary rounded overflow-hidden mb-4"
                             style={{"--fn-aspect-ratio": "calc(482 / 856 * 100%)"} as React.CSSProperties}>
                            <img src={pkg.imageUrl || "/img.jpg"} alt={pkg.title} className="w-100 h-auto"/>
                        </div>


                        <div className="row g-4 pb-3 mb-3">
                            <div className="col-sm-5 col-md-3 col-lg-4">
                                <div className="vstack h-100 position-relative">
                                    <div className="d-flex flex-column align-items-center justify-content-center h-100 position-relative z-1 p-4">
                                        <div className="h1 pb-2 mb-1">4.5</div>
                                        <div className="hstack justify-content-center gap-1 fs-sm mb-2">
                                            <BsStarFill className="fi-star-filled text-warning" />
                                            <BsStarFill className="fi-star-filled text-warning" />
                                            <BsStarFill className="fi-star-filled text-warning" />
                                            <BsStarFill className="fi-star-filled text-warning" />
                                            <BsStarFill className="fi-star-half text-warning" />
                                        </div>
                                        <div className="fs-sm">176 reviews</div>
                                    </div>
                                    <span className="position-absolute top-0 start-0 w-100 h-100 bg-body-tertiary rounded d-none-dark"></span>
                                    <span className="position-absolute top-0 start-0 w-100 h-100 bg-body-secondary rounded opacity-50 d-none d-block-dark"></span>
                                </div>
                            </div>

                            <div className="col-sm-7 col-md-9 col-lg-8">
                                <div className="vstack gap-3">
                                    {[
                                        { stars: 5, percent: 65, count: 128 },
                                        { stars: 4, percent: 21, count: 27 },
                                        { stars: 3, percent: 10, count: 13 },
                                        { stars: 2, percent: 5, count: 6 },
                                        { stars: 1, percent: 2.6, count: 2 },
                                    ].map(({ stars, percent, count }) => (
                                        <div key={stars} className="hstack gap-2">
                                            <div className="hstack fs-sm gap-1">
                                                {stars}
                                                <i className="fi-star-filled text-warning" />
                                            </div>
                                            <div
                                                className="progress w-100"
                                                role="progressbar"
                                                aria-label={`${stars} stars`}
                                                aria-valuenow={percent}
                                                aria-valuemin={0}
                                                aria-valuemax={100}
                                                style={{ height: "4px" }}
                                            >
                                                <div
                                                    className="progress-bar bg-warning rounded-pill"
                                                    style={{ width: `${percent}%` }}
                                                ></div>
                                            </div>
                                            <div
                                                className="fs-sm text-nowrap text-end"
                                                style={{ width: "40px" }}
                                            >
                                                {count}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="vstack gap-4">
                            {[
                                {
                                    name: "Randy W.",
                                    date: "November 19, 2024",
                                    rating: 5,
                                    text: "Dr. Michael Johnston is truly a life-saver. His expertise and attention to detail are unmatched. He took the time to explain everything clearly and made sure I felt comfortable every step of the way. Thanks to him, my heart health is now better than ever. I highly recommend him!",
                                    likes: 6,
                                    dislikes: 0,
                                },
                                {
                                    name: "Lora Palmer",
                                    date: "November 10, 2024",
                                    rating: 5,
                                    text: "From the first consultation, Dr. Johnston showed exceptional care and professionalism. His thorough approach to diagnosing my heart condition was impressive, and his treatment plan has worked wonders. I feel fortunate to have found such a knowledgeable and compassionate cardiologist.",
                                    likes: 13,
                                    dislikes: 2,
                                },
                                {
                                    name: "Melissa Smith",
                                    date: "November 5, 2024",
                                    rating: 5,
                                    text: "Dr. Johnston was incredibly attentive and reassuring during a very stressful time for me. He made complex medical concepts easy to understand and guided me through the entire process. His expertise gave me confidence, and my heart is now in great shape. Five stars for sure!",
                                    likes: 8,
                                    dislikes: 0,
                                },
                                {
                                    name: "Alice Cooper",
                                    date: "October 23, 2024",
                                    rating: 5,
                                    text: "I can't say enough good things about Dr. Johnston. His calm demeanor, vast knowledge, and caring nature set him apart. He listens carefully to all concerns and tailors treatments to each patient's needs. I'm grateful for the care I've received and highly recommend him to anyone seeking a top-notch cardiologist.",
                                    likes: 27,
                                    dislikes: 3,
                                },
                                {
                                    name: "Natalia D.",
                                    date: "October 7, 2024",
                                    rating: 4,
                                    text: "Dr. Johnston is an excellent cardiologist and clearly knows his field well. My treatment has been effective, and I feel much healthier. The only reason for 4 stars is that the wait time for my appointment was longer than expected, but once I saw him, the care was outstanding.",
                                    likes: 15,
                                    dislikes: 0,
                                },
                            ].map((review, index) => (
                                <div key={index} className="vstack gap-2 mb-sm-2">
                                    <div className="d-flex align-items-center gap-3 mb-1">
                                        <h6 className="mb-0">{review.name}</h6>
                                        <span className="fs-xs text-body-secondary">{review.date}</span>
                                    </div>

                                    <div className="d-flex gap-1 fs-sm mb-1">
                                        {[...Array(5)].map((_, i) => (
                                            <BsStarFill
                                                key={i}
                                                className={`fi-star${
                                                    i < review.rating
                                                        ? "-filled text-warning"
                                                        : " text-warning"
                                                }`}
                                            />
                                        ))}
                                    </div>

                                    <p className="fs-sm mb-1">{review.text}</p>
                                </div>
                            ))}

                        </div>

                    </div>

                    {/* Sidebar */}

                    <aside className={'col-lg-5 !mt-[-110px]'}>
                        <div className="position-sticky top-0" style={{paddingTop: "110px"}}>

                            {/* Seller info card */}
                            <div className="card bg-body-tertiary border-0 p-sm-2 p-lg-0 p-xl-2 mb-4">
                                <div className="card-body">
                                    <div className="d-flex align-items-center position-relative !mb-0">
                                        <div
                                            className="ratio ratio-1x1 flex-shrink-0 bg-body-secondary rounded-circle overflow-hidden"
                                            style={{width: "72px"}}
                                        >
                                            <img
                                                src={pkg.user?.image}
                                                alt="Seller avatar"
                                            />
                                        </div>

                                        <div className="w-100 ps-3">
                                            <div
                                                className="d-flex align-items-center justify-content-between gap-3 mb-1">
                                                <span
                                                    className="h6 fs-sm hover-effect-underline stretched-link text-decoration-none mb-0"
                                                >
                                                    {pkg.user?.name}
                                                </span>
                                                <span className="badge text-bg-light">Private seller</span>
                                            </div>


                                            <div className="!flex !items-center gap-1">
                                                <span
                                                    className="fs-sm fw-medium text-dark-emphasis">{pkg.user?.phone}</span>
                                                <BsStarFill className="!text-[0.75rem] text-warning"/>
                                                <span className="fs-xs text-body-secondary">({pkg.user?.email})</span>
                                            </div>
                                        </div>
                                    </div>

                                    <hr/>

                                    <div className="d-flex flex-1 justify-content-between gap-3 !mt-0">
                                        <a
                                            href={"tel:" + pkg.user?.phone}
                                            className="btn btn-primary fw-bold d-flex align-items-center !bg-[#094786] !border-0"
                                        >
                                            Appel Direct
                                        </a>
                                        <a
                                            href={"mailto:" + pkg.user?.email}
                                            className="btn fw-bold btn-primary d-flex align-items-center !bg-[#094786] !border-0"
                                        >
                                            Envoi un mail
                                        </a>
                                        <Link
                                            href={"/dashboard?page=message&id=" + pkg.user?.email}
                                            className="btn btn-primary fw-bold d-flex align-items-center"
                                        >
                                            Chat Par Message
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="card bg-body-tertiary border-0 !py-0 mb-4">
                                <div className="card-body !py-2.5">
                                    <div className="!flex !items-center !justify-between py-0">
                                        <div className="text0muted !mb-0">Indemnité</div>
                                        <div className="!flex !items-center !gap-x-4 !justify-between py-0">
                                            <div className="h2 !mb-0">{pkg.participationAllowance} €</div>
                                            <div className="d-flex gap-2">
                                          <span className="badge text-bg-info d-inline-flex align-items-center">
                                            Valide
                                          </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card p-sm-2 p-lg-0 p-xl-2">
                                <div className="card-body">
                                    <h2 className="h4 mb-3 !text-[#007bff]">Trajet du colis</h2>
                                    <div className="flex items-center justify-content-between g-2 py-2 fs-sm">
                                        <div className="col d-flex fw-bold text-black align-items-center gap-2">
                                            {isoToFlag(countryNameToISO[getCountryFromAddress(pkg.origin)])} {pkg.origin}
                                        </div>
                                        <ArrowRight/>
                                        <div
                                            className="col d-flex fw-bold text-black align-items-center justify-content-end gap-2">
                                            {isoToFlag(countryNameToISO[getCountryFromAddress(pkg.destination)])} {pkg.destination}
                                        </div>
                                    </div>
                                    <Link
                                        href={"/package?origin=" + pkg.origin + "&destination=" + pkg.destination}
                                        className="btn btn-outline-primary w-full mt-4 fw-bold d-flex align-items-center"
                                    >
                                        Autres Colis sur ce trajet
                                    </Link>
                                </div>
                            </div>

                            <div className="card p-sm-2 mt-4 p-lg-0 p-xl-2">
                                <div className="card-body">
                                    <h2 className="h4 mb-3">Détails du colis</h2>
                                    <ul className="list-unstyled text-body-secondary">
                                        <li className={'flex items-center justify-content-between'}>
                                            <strong>Poids:</strong> <b
                                            className={'!text-black'}>{pkg.weight || "N/A"} Kg</b></li>
                                        <li className={'flex items-center justify-content-between'}>
                                            <strong>Dimension:</strong> <b
                                            className={'!text-black'}>{pkg.reward || "N/A"} €</b></li>
                                        <li className={'flex items-center justify-content-between'}><strong>Date limite
                                            d’expédition:</strong> <b
                                            className={'!text-black'}>{pkg.shippingDeadline ? new Date(pkg.shippingDeadline).toDateString() : "N/A"}</b>
                                        </li>
                                    </ul>

                                    <hr/>

                                    {pkg.parcelDetails && (
                                        <>
                                            <h3 className="h5 !my-4 mb-2">Description</h3>
                                            <p className="text-body-secondary">{pkg.parcelDetails}</p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </aside>

                </div>

                {/* Related Packages */}
                {related.length > 0 && (
                    <>
                        <h2 className="text-xl font-semibold my-6">Autres colis disponibles</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-7">
                            {related.map((listing) => (
                                <div key={listing.id}>
                                    <article className="card h-100 hover-effect-scale">
                                        <div className="card-img-top overflow-hidden">
                                            <img src={listing.imageUrl || "/img.jpg"} alt={listing.title}/>
                                        </div>
                                        <div className="card-body">
                                            <h3 className="h6 mb-1">
                                                <Link href={`/package/${listing.id}`}
                                                      className="hover-effect-underline stretched-link">
                                                    {listing.title}
                                                </Link>
                                            </h3>
                                            <div className="text-sm text-muted">
                                                <PlaneTakeoff size={14}
                                                              className="inline mr-1"/> {listing.departure || "N/A"} →{" "}
                                                <PlaneLanding size={14}
                                                              className="inline mr-1"/> {listing.destination || "N/A"}
                                            </div>
                                            <div className="mt-2 font-semibold text-primary">
                                                {listing.reward ? `${listing.reward} €` : "Sur demande"}
                                            </div>
                                        </div>
                                    </article>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </section>
        </main>
    );
}


// 'use client'
//
// import React from "react";
// import {
//     Facebook,
//     Instagram,
//     Linkedin,
//     Share2,
//     Heart, StarHalf, StarHalfIcon, StarIcon, PlaneTakeoff, PlaneLanding, UserIcon,
// } from "lucide-react";
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Button } from "@/components/ui/button";
// import Breadcrumb from "@/components/nav";
// import {BsStarFill} from "react-icons/bs";
// import Listing from "@/components/listing";
// import Link from "next/link";
//
// export default function Detail() {
//
//     const mockListings: any[] = [
//         {
//             id: 1,
//             title: "Deux valises d'habit",
//             year: 2024,
//             price: "$7,9",
//             date: "30/09/2024",
//             location: "Boston",
//             mileage: "0K mi",
//             fuel: "Diesel",
//             transmission: "Automatic",
//             image: "/img.jpg",
//             badges: [
//                 { text: "Poids: 3Kg", type: "primary" }
//             ]
//         },
//         {
//             id: 2,
//             title: "Carton de Parfums",
//             year: 2021,
//             price: "$12,00",
//             date: "15/07/2024",
//             location: "New York",
//             mileage: "15K mi",
//             fuel: "Gasoline",
//             transmission: "Manual",
//             image: "/img.jpg",
//             badges: [
//                 { text: "Poids: 3Kg", type: "primary" }
//             ]
//         },
//         {
//             id: 3,
//             title: "Sac d'epices",
//             year: 2017,
//             price: "$5,00",
//             date: "16/08/2024",
//             location: "Chicago",
//             mileage: "32K mi",
//             fuel: "Gasoline",
//             transmission: "Manual",
//             image: "/img.jpg",
//             badges: [
//                 { text: "Poids: 3Kg", type: "primary" }
//             ]
//         },
//         {
//             id: 4,
//             title: "Carton de Telephones",
//             year: 2024,
//             price: "$3,2",
//             date: "19/10/2024",
//             location: "Los Angeles",
//             mileage: "0K mi",
//             fuel: "Electric",
//             transmission: "Automatic",
//             image: "/img.jpg",
//             badges: [
//                 { text: "Poids: 3Kg", type: "primary" }
//             ]
//         }
//     ];
//
//     const getBadgeClasses = (type: string) => {
//         switch (type) {
//             case 'info':
//                 return 'badge text-bg-info d-inline-flex align-items-center';
//             case 'primary':
//                 return 'badge text-bg-primary';
//             case 'warning':
//                 return 'badge text-bg-warning';
//             default:
//                 return 'badge';
//         }
//     };
//
//     const formatDate = (dateString: string) => {
//         const [day, month, year] = dateString.split('/');
//         const date = new Date(`${month}/${day}/${year}`);
//
//         return date.toLocaleDateString('en-US', {
//             year: 'numeric',
//             month: 'short',
//             day: 'numeric'
//         });
//     };
//
//     const renderCard = (listing: any, index: number) => (
//         <div
//             key={`${listing.id}-${index}`}
//             className=""
//             style={{ width: '100%', flexShrink: 0 }}
//         >
//             <article className="card h-100 hover-effect-scale">
//                 <div className="card-img-top position-relative overflow-hidden">
//                     <div className="d-flex flex-column gap-2 align-items-start position-absolute top-0 start-0 z-1 pt-1 pt-sm-0 ps-1 ps-sm-0 mt-2 mt-sm-3 ms-2 ms-sm-3">
//                         {listing.badges.map((badge, badgeIndex) => (
//                             <span key={badgeIndex} className={getBadgeClasses(badge.type)}>
//                                 {badge.text}
//                                 {badge.icon && <i className="fi-shield ms-1"></i>}
//                             </span>
//                         ))}
//                     </div>
//                     <div
//                         className="ratio hover-effect-target bg-body-tertiary"
//                         style={{ '--fn-aspect-ratio': 'calc(204 / 306 * 100%)' } as React.CSSProperties}
//                     >
//                         <img
//                             src={listing.image}
//                             alt={listing.title}
//                             onError={(e) => {
//                                 e.currentTarget.src = `https://via.placeholder.com/306x204?text=${encodeURIComponent(listing.title)}`;
//                             }}
//                         />
//                     </div>
//                 </div>
//
//                 <div className="card-body pb-3">
//                     <div className="d-flex align-items-center justify-content-between mb-2">
//                         <div className="fs-xs text-body-secondary me-3">
//                             {formatDate(listing.date)}
//                         </div>
//                         <div className={'d-flex align-items-center g-2 text-sm'}>
//                             <StarIcon size={16} style={{color:'#ffab00'}} className={'me-2'}/> <b>3.5</b>/5
//                         </div>
//                     </div>
//
//                     <h3 className="h6 mb-2">
//                         <Link
//                             href={`/package/${listing.id}`}
//                             className="hover-effect-underline stretched-link me-1"
//                         >
//                             {listing.title}
//                         </Link>
//                     </h3>
//
//                     <div className="mb-0 text-[0.85rem]">Indemnité Proposée: <b className={'h6 text-primary'}>{listing.price}</b></div>
//                 </div>
//
//                 <div className="card-footer bg-transparent border-0 pt-0 pb-4">
//                     <div className="border-top pt-3 mb-3">
//                         <div className="row row-cols-2 g-2 fs-sm">
//                             <div className="col d-flex align-items-center gap-2">
//                                 <PlaneTakeoff size={16} />
//                                 Depart
//                             </div>
//                             <div className="col d-flex fw-bold align-items-center justify-content-end gap-2">
//                                 <img width="96" height="96" style={{width: "16px", height: "auto"}} src="https://img.icons8.com/fluency/96/france-circular.png" alt="cameroon-circular"/>
//                                 {listing.location}
//                             </div>
//                             <div className="col d-flex align-items-center gap-2">
//                                 <PlaneLanding size={16} />
//                                 Destination
//                             </div>
//                             <div className="col d-flex fw-bold align-items-center justify-content-end gap-2">
//                                 <img width="96" height="96" style={{width: "16px", height: "auto"}} src="https://img.icons8.com/fluency/96/cameroon-circular.png" alt="cameroon-circular"/>
//                                 {listing.location}
//                             </div>
//                         </div>
//                     </div>
//                     <div className="border-top pt-3">
//                         <div className="d-flex align-items-center gap-2">
//                             <button
//                                 type="button"
//                                 className="btn btn-icon btn-sm btn-outline-secondary animate-pulse rounded-circle me-3"
//                                 data-bs-toggle="tooltip"
//                                 data-bs-custom-class="tooltip-sm"
//                                 aria-label="Add to wishlist"
//                                 title="Wishlist"
//                             >
//                                 <UserIcon className="animate-target" size={14} />
//                             </button>
//                             Nom de Utilisateur
//                         </div>
//                     </div>
//                 </div>
//             </article>
//         </div>
//     );
//
//     return (
//         <main className={'content-wrapper'}>
//
//             <Breadcrumb
//                 items={[
//                     { label: "Accueil", href: "/" },
//                     { label: "Colis", href: "/package" },
//                 ]}
//             />
//
//             <section className={'container !mb-10 !pb-10'}>
//                 <div className="flex justify-between items-center gap-3 relative z-20 mb-3 lg:mb-4">
//                     {/* Title */}
//                     <h1 className="mb-0 text-2xl md:text-3xl font-semibold !flex !items-center flex-wrap gap-2">
//                         Valise d&#39;habit{" "}
//                     </h1>
//
//                     {/* Actions */}
//                     <div className="flex gap-2">
//                         {/* Share Dropdown */}
//                         <DropdownMenu>
//                             <DropdownMenuTrigger asChild>
//                                 <Button
//                                     variant="default"
//                                     // size="icon"
//                                     className="!rounded-full !bg-black hover:scale-105 !transition-transform"
//                                     aria-label="Share"
//                                 >
//                                     <Share2 className="w-5 h-5" /> Partagez
//                                 </Button>
//                             </DropdownMenuTrigger>
//                             <DropdownMenuContent align="end" className="min-w-[9.5rem]">
//                                 <DropdownMenuItem asChild>
//                                     <a
//                                         href="#!"
//                                         className="flex items-center gap-2"
//                                     >
//                                         <Facebook className="w-4 h-4" />
//                                         Facebook
//                                     </a>
//                                 </DropdownMenuItem>
//                                 <DropdownMenuItem asChild>
//                                     <a
//                                         href="#!"
//                                         className="flex items-center gap-2"
//                                     >
//                                         <Instagram className="w-4 h-4" />
//                                         Instagram
//                                     </a>
//                                 </DropdownMenuItem>
//                                 <DropdownMenuItem asChild>
//                                     <a
//                                         href="#!"
//                                         className="flex items-center gap-2"
//                                     >
//                                         <Linkedin className="w-4 h-4" />
//                                         LinkedIn
//                                     </a>
//                                 </DropdownMenuItem>
//                             </DropdownMenuContent>
//                         </DropdownMenu>
//                     </div>
//                 </div>
//
//                 <div className={'row'}>
//                     <div className={'col-lg-8 pb-3 pb-sm-0 mb-4 mb-sm-5 mb-lg-0'}>
//
//                         <div className="ratio bg-body-tertiary rounded overflow-hidden"
//                              style={{ "--fn-aspect-ratio": "calc(482 / 856 * 100%)" } as React.CSSProperties}>
//                             <img src="/img.jpg" alt="Image"/>
//                         </div>
//
//                         <h2 className="h3 pt-5 mt-sm-2 my-lg-4">Specifications</h2>
//
//                         <div className="row row-cols-1 row-cols-sm-2 gy-2">
//                             <div className="col">
//                                 <ul className="list-unstyled text-body-secondary mt-n1 mb-0">
//                                     <li className="mt-1">
//                                         <span className="fw-medium text-dark-emphasis me-1">Manufacturing year:</span>
//                                         2021
//                                     </li>
//                                     <li className="mt-1">
//                                         <span className="fw-medium text-dark-emphasis me-1">Mileage:</span>
//                                         60K miles
//                                     </li>
//                                     <li className="mt-1">
//                                         <span className="fw-medium text-dark-emphasis me-1">Body type:</span>
//                                         Convertible
//                                     </li>
//                                     <li className="mt-1">
//                                         <span className="fw-medium text-dark-emphasis me-1">Drive type:</span>
//                                         2 wheel drive - rear
//                                     </li>
//                                     <li className="mt-1">
//                                         <span className="fw-medium text-dark-emphasis me-1">Engine:</span>
//                                         6-Cylinder Turbo
//                                     </li>
//                                     <li className="mt-1">
//                                         <span className="fw-medium text-dark-emphasis me-1">Transmission:</span>
//                                         7-Speed Shiftable Automatic
//                                     </li>
//                                 </ul>
//                             </div>
//                             <div className="col">
//                                 <ul className="list-unstyled text-body-secondary mt-n1 mb-0">
//                                     <li className="mt-1">
//                                         <span className="fw-medium text-dark-emphasis me-1">Fuel type:</span>
//                                         2021
//                                     </li>
//                                     <li className="mt-1">
//                                         <span className="fw-medium text-dark-emphasis me-1">City MPG:</span>
//                                         60K miles
//                                         <i className="fi-alert-circle fs-lg text-primary align-middle ms-2" data-bs-toggle="tooltip" aria-label="Verified by seller" data-bs-original-title="Verified by seller"></i>
//                                     </li>
//                                     <li className="mt-1">
//                                         <span className="fw-medium text-dark-emphasis me-1">Highway MPG:</span>
//                                         Convertible
//                                         <i className="fi-alert-circle fs-lg text-primary align-middle ms-2" data-bs-toggle="tooltip" aria-label="Verified by seller" data-bs-original-title="Verified by seller"></i>
//                                     </li>
//                                     <li className="mt-1">
//                                         <span className="fw-medium text-dark-emphasis me-1">Exterior color:</span>
//                                         2 wheel drive - rear
//                                     </li>
//                                     <li className="mt-1">
//                                         <span className="fw-medium text-dark-emphasis me-1">Interior color:</span>
//                                         Charcoal
//                                     </li>
//                                     <li className="mt-1">
//                                         <span className="fw-medium text-dark-emphasis me-1">VIN:</span>
//                                         2VW821AU9JM754284
//                                     </li>
//                                 </ul>
//                             </div>
//                         </div>
//
//                         <div
//                             className="position-relative p-4 mt-4"
//                             id="reviews"
//                             style={{ scrollMarginTop: "98px" }}
//                         >
//                             <div className="position-relative z-1 p-xl-2">
//                                 {/* Header */}
//                                 <div className="d-flex align-items-center justify-content-between mb-4">
//                                     <h2 className="h4 mb-0">Reviews</h2>
//                                     <button
//                                         type="button"
//                                         className="btn btn-outline-secondary"
//                                         data-bs-toggle="modal"
//                                         data-bs-target="#reviewForm"
//                                     >
//                                         <i className="fi-edit-3 fs-base ms-n1 me-2" />
//                                         Add review
//                                     </button>
//                                 </div>
//
//                                 {/* Rating breakdown */}
//                                 <div className="row g-4 pb-3 mb-3">
//                                     <div className="col-sm-5 col-md-3 col-lg-4">
//                                         <div className="vstack h-100 position-relative">
//                                             <div className="d-flex flex-column align-items-center justify-content-center h-100 position-relative z-1 p-4">
//                                                 <div className="h1 pb-2 mb-1">4.5</div>
//                                                 <div className="hstack justify-content-center gap-1 fs-sm mb-2">
//                                                     <BsStarFill className="fi-star-filled text-warning" />
//                                                     <BsStarFill className="fi-star-filled text-warning" />
//                                                     <BsStarFill className="fi-star-filled text-warning" />
//                                                     <BsStarFill className="fi-star-filled text-warning" />
//                                                     <BsStarFill className="fi-star-half text-warning" />
//                                                 </div>
//                                                 <div className="fs-sm">176 reviews</div>
//                                             </div>
//                                             <span className="position-absolute top-0 start-0 w-100 h-100 bg-body-tertiary rounded d-none-dark"></span>
//                                             <span className="position-absolute top-0 start-0 w-100 h-100 bg-body-secondary rounded opacity-50 d-none d-block-dark"></span>
//                                         </div>
//                                     </div>
//
//                                     <div className="col-sm-7 col-md-9 col-lg-8">
//                                         <div className="vstack gap-3">
//                                             {[
//                                                 { stars: 5, percent: 65, count: 128 },
//                                                 { stars: 4, percent: 21, count: 27 },
//                                                 { stars: 3, percent: 10, count: 13 },
//                                                 { stars: 2, percent: 5, count: 6 },
//                                                 { stars: 1, percent: 2.6, count: 2 },
//                                             ].map(({ stars, percent, count }) => (
//                                                 <div key={stars} className="hstack gap-2">
//                                                     <div className="hstack fs-sm gap-1">
//                                                         {stars}
//                                                         <i className="fi-star-filled text-warning" />
//                                                     </div>
//                                                     <div
//                                                         className="progress w-100"
//                                                         role="progressbar"
//                                                         aria-label={`${stars} stars`}
//                                                         aria-valuenow={percent}
//                                                         aria-valuemin={0}
//                                                         aria-valuemax={100}
//                                                         style={{ height: "4px" }}
//                                                     >
//                                                         <div
//                                                             className="progress-bar bg-warning rounded-pill"
//                                                             style={{ width: `${percent}%` }}
//                                                         ></div>
//                                                     </div>
//                                                     <div
//                                                         className="fs-sm text-nowrap text-end"
//                                                         style={{ width: "40px" }}
//                                                     >
//                                                         {count}
//                                                     </div>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     </div>
//                                 </div>
//
//                                 {/* Reviews list */}
//                                 <div className="vstack gap-4">
//                                     {[
//                                         {
//                                             name: "Randy W.",
//                                             date: "November 19, 2024",
//                                             rating: 5,
//                                             text: "Dr. Michael Johnston is truly a life-saver. His expertise and attention to detail are unmatched. He took the time to explain everything clearly and made sure I felt comfortable every step of the way. Thanks to him, my heart health is now better than ever. I highly recommend him!",
//                                             likes: 6,
//                                             dislikes: 0,
//                                         },
//                                         {
//                                             name: "Lora Palmer",
//                                             date: "November 10, 2024",
//                                             rating: 5,
//                                             text: "From the first consultation, Dr. Johnston showed exceptional care and professionalism. His thorough approach to diagnosing my heart condition was impressive, and his treatment plan has worked wonders. I feel fortunate to have found such a knowledgeable and compassionate cardiologist.",
//                                             likes: 13,
//                                             dislikes: 2,
//                                         },
//                                         {
//                                             name: "Melissa Smith",
//                                             date: "November 5, 2024",
//                                             rating: 5,
//                                             text: "Dr. Johnston was incredibly attentive and reassuring during a very stressful time for me. He made complex medical concepts easy to understand and guided me through the entire process. His expertise gave me confidence, and my heart is now in great shape. Five stars for sure!",
//                                             likes: 8,
//                                             dislikes: 0,
//                                         },
//                                         {
//                                             name: "Alice Cooper",
//                                             date: "October 23, 2024",
//                                             rating: 5,
//                                             text: "I can't say enough good things about Dr. Johnston. His calm demeanor, vast knowledge, and caring nature set him apart. He listens carefully to all concerns and tailors treatments to each patient's needs. I'm grateful for the care I've received and highly recommend him to anyone seeking a top-notch cardiologist.",
//                                             likes: 27,
//                                             dislikes: 3,
//                                         },
//                                         {
//                                             name: "Natalia D.",
//                                             date: "October 7, 2024",
//                                             rating: 4,
//                                             text: "Dr. Johnston is an excellent cardiologist and clearly knows his field well. My treatment has been effective, and I feel much healthier. The only reason for 4 stars is that the wait time for my appointment was longer than expected, but once I saw him, the care was outstanding.",
//                                             likes: 15,
//                                             dislikes: 0,
//                                         },
//                                     ].map((review, index) => (
//                                         <div key={index} className="vstack gap-2 mb-sm-2">
//                                             <div className="d-flex align-items-center gap-3 mb-1">
//                                                 <h6 className="mb-0">{review.name}</h6>
//                                                 <span className="fs-xs text-body-secondary">{review.date}</span>
//                                             </div>
//
//                                             <div className="d-flex gap-1 fs-sm mb-1">
//                                                 {[...Array(5)].map((_, i) => (
//                                                     <BsStarFill
//                                                         key={i}
//                                                         className={`fi-star${
//                                                             i < review.rating
//                                                                 ? "-filled text-warning"
//                                                                 : " text-warning"
//                                                         }`}
//                                                     />
//                                                 ))}
//                                             </div>
//
//                                             <p className="fs-sm mb-1">{review.text}</p>
//                                         </div>
//                                     ))}
//
//                                 </div>
//                             </div>
//
//                             {/* Background layers */}
//                             <span className="position-absolute top-0 start-0 w-100 h-100 bg-white rounded shadow d-none-dark"></span>
//                             <span className="position-absolute top-0 start-0 w-100 h-100 bg-body-tertiary rounded d-none d-block-dark"></span>
//                         </div>
//
//                     </div>
//
//                     <aside className={'col-lg-4 !mt-[-110px]'}>
//                         <div className="position-sticky top-0" style={{paddingTop: "110px"}}>
//                             {/* Listing meta visible on screens > 991px (lg breakpoint) */}
//                             <div className="d-none d-lg-block">
//                                 <div className="d-flex gap-2 pb-1 mb-2">
//           <span className="badge text-bg-info d-inline-flex align-items-center">
//             Verified
//             <i className="fi-shield ms-1" />
//           </span>
//                                     <span className="badge text-bg-warning">Used</span>
//                                 </div>
//
//                                 <div className="h2 pb-1 mb-2">$41,900</div>
//
//                                 <div className="d-flex flex-wrap justify-content-lg-between gap-2 fs-sm text-nowrap mb-4">
//                                     <div className="d-flex align-items-center gap-2 me-2">
//                                         <i className="fi-map-pin" />
//                                         Chicago
//                                     </div>
//                                     <div className="d-flex align-items-center gap-2 me-2">
//                                         <i className="fi-tachometer" />
//                                         60K mi
//                                     </div>
//                                     <div className="d-flex align-items-center gap-2 me-2">
//                                         <i className="fi-gas-pump" />
//                                         Gasoline
//                                     </div>
//                                     <div className="d-flex align-items-center gap-2">
//                                         <i className="fi-gearbox" />
//                                         Automatic
//                                     </div>
//                                 </div>
//                             </div>
//
//                             {/* Seller info card */}
//                             <div className="card bg-body-tertiary border-0 p-sm-2 p-lg-0 p-xl-2 mb-4">
//                                 <div className="card-body">
//                                     <div className="d-flex align-items-center position-relative mb-3">
//                                         <div
//                                             className="ratio ratio-1x1 flex-shrink-0 bg-body-secondary rounded-circle overflow-hidden"
//                                             style={{ width: "72px" }}
//                                         >
//                                             <img
//                                                 src="https://finder-html.createx.studio/assets/img/listings/cars/single/seller.jpg"
//                                                 alt="Seller avatar"
//                                             />
//                                         </div>
//
//                                         <div className="w-100 ps-3">
//                                             <div className="d-flex align-items-center justify-content-between gap-3 mb-1">
//                                                 <a
//                                                     href="#!"
//                                                     className="h6 fs-sm hover-effect-underline stretched-link text-decoration-none mb-0"
//                                                 >
//                                                     Darrell Steward
//                                                 </a>
//                                                 <span className="badge text-bg-light">Private seller</span>
//                                             </div>
//
//                                             <div className="!flex !items-center gap-1">
//                                                 <BsStarFill className="!text-[0.75rem] text-warning" />
//                                                 <span className="fs-sm fw-medium text-dark-emphasis">4.9</span>
//                                                 <span className="fs-xs text-body-secondary">(5 reviews)</span>
//                                             </div>
//                                         </div>
//                                     </div>
//
//                                     <div className="nav mb-3">
//                                         <a className="nav-link position-relative px-0" href="#!">
//               <span className="hover-effect-underline stretched-link">
//                 Other ads by this seller
//               </span>
//                                             <i className="fi-chevron-right fs-base ms-1" />
//                                         </a>
//                                     </div>
//
//                                     <div className="d-flex flex-wrap gap-3">
//                                         <button type="button" className="btn btn-outline-dark">
//                                             (316) *** **** – reveal
//                                         </button>
//                                         <a
//                                             href="mailto:d.steward@example.com"
//                                             className="btn btn-primary d-flex align-items-center"
//                                         >
//                                             <i className="fi-mail fs-base me-2" />
//                                             Send email
//                                         </a>
//                                     </div>
//                                 </div>
//                             </div>
//
//                             {/* Subscribe */}
//                             <div className="card p-sm-2 p-lg-0 p-xl-2">
//                                 <div className="card-body">
//                                     <h4 className="h6">
//                                         Email me price drops and new listings for these search results:
//                                     </h4>
//
//                                     <form
//                                         className="needs-validation d-flex flex-column flex-sm-row flex-lg-column flex-xl-row gap-2 gap-sm-3 gap-lg-2 gap-xl-3 mb-3"
//                                         noValidate
//                                     >
//                                         <div className="position-relative">
//                                             <i className="fi-mail position-absolute top-50 start-0 translate-middle-y ms-3" />
//                                             <input
//                                                 type="email"
//                                                 className="form-control form-icon-start"
//                                                 placeholder="Your email"
//                                                 required
//                                             />
//                                         </div>
//                                         <button type="submit" className="btn btn-secondary">
//                                             Subscribe
//                                         </button>
//                                     </form>
//
//                                     <div className="form-check">
//                                         <input
//                                             className="form-check-input"
//                                             type="checkbox"
//                                             id="consent"
//                                         />
//                                         <label className="form-check-label fs-xs" htmlFor="consent">
//                                             I agree to receive price drop alerts on this vehicle and helpful
//                                             shopping information.
//                                         </label>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </aside>
//                 </div>
//
//                 <div className="d-sm-flex justify-content-between gap-3 !py-3 !my-10">
//                     <h2 className="mb-sm-0">Autres Colis</h2>
//                 </div>
//
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 !gap-3 !mb-7">
//                     {mockListings.map((listing, index) =>
//                         renderCard(listing, index)
//                     )}
//                 </div>
//             </section>
//
//         </main>
//     );
// }
