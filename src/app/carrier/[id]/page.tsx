'use client';

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
    Facebook,
    Instagram,
    Linkedin,
    Share2,
    Star,
    ArrowRight,
    PlaneTakeoff,
    PlaneLanding,
    UserIcon, MessageSquareIcon,
} from "lucide-react";
import { BsStarFill } from "react-icons/bs";
import Breadcrumb from "@/components/nav";
import { Button } from "@/components/ui/button";
import {
    countryNameToISO,
    getCountryFromAddress,
    isoToFlag,
    FacebookShareButton, transportIcon, transportName, getAddress,
} from "@/components/my-carry";
import { ReviewForm } from "@/components/review";
import {FaWhatsapp} from "react-icons/fa";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import Marquee from "react-fast-marquee";

interface Transport {
    id: string;
    userId: string;
    destination: string;
    origin: string;
    isRoundTrip: boolean;
    meansTransport: string;
    outboundArrivalDate: string;
    outboundDepartureDate: string;
    paymentPeriod: string;
    pricePerKg: string;
    returnArrivalDate?: string | null;
    returnDepartureDate?: string | null;
    tripDescription?: string | null;
    weightAvailable: string;
    user?: {
        id: string;
        name: string | null;
        email: string | null;
        image: string | null;
        phone?: string | null;
    };
}


function formatDate(date: string){
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

export default function CarrierDetailPage() {
    const { id } = useParams();
    const [carrier, setCarrier] = useState<Transport | null>(null);
    const [related, setRelated] = useState<Transport[]>([]);
    const [reviews, setReviews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);

                const res = await fetch(`/api/transport/${id}`);
                const data = await res.json();

                const relatedRes = await fetch(`/api/carriers?limit=6`);
                const relatedData = await relatedRes.json();

                setCarrier(data);
                setRelated(relatedData.filter((t: Transport) => t.id !== data.id));
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        if (id) fetchData();
    }, [id]);

    const loadReviews = async () => {
        const res = await fetch(`/api/reviews?transportId=${id}`);
        const data = await res.json();
        setReviews(data);
    };

    useEffect(() => {
        loadReviews();
    }, []);

    if (loading)
        return (
            <div className="container py-20 text-center">
                <p>Chargement du transporteur...</p>
            </div>
        );

    if (!carrier)
        return (
            <div className="container py-20 text-center">
                <p>Transporteur introuvable.</p>
            </div>
        );

    return (
        <main className="content-wrapper">
            <Breadcrumb
                items={[
                    { label: "Accueil", href: "/" },
                    { label: "Transporteurs", href: "/carrier" },
                    { label: `${carrier.origin} → ${carrier.destination}`, href: `/carrier/${carrier.id}` },
                ]}
            />

            <section className="container mb-10 pb-10">
                {/* Header */}
                <div className="flex justify-between items-center gap-3 mb-4">
                    <h1 className="text-2xl md:text-3xl font-semibold flex items-center gap-2">
                        {isoToFlag(countryNameToISO[getCountryFromAddress(carrier.origin)])} {carrier.origin}
                        <ArrowRight />
                        {isoToFlag(countryNameToISO[getCountryFromAddress(carrier.destination)])} {carrier.destination}
                    </h1>

                    <FacebookShareButton
                        url={`https://www.ndc-travels.com/carrier/${carrier.id}`}
                        quote="Regardez ce trajet sur NDC Travels !"
                    />
                </div>

                <div className="row">
                    {/* LEFT: Details + Reviews */}
                    <div className="col-lg-7 mb-5 order-2 order-lg-1">
                        <div className="card bg-body-tertiary border-0 p-3 mb-4">
                            <h2 className="h5 mb-2 text-primary">Détails du trajet</h2>
                            <ul className="list-unstyled text-body-secondary">
                                <li className="flex justify-between">
                                    <strong>Transport:</strong>
                                    <span className="text-black">{transportIcon[carrier.meansTransport]} {transportName[carrier.meansTransport]}</span>
                                </li>
                                <li className="flex justify-between">
                                    <strong>Poids disponible:</strong>
                                    <span className="text-black">{carrier.weightAvailable} kg</span>
                                </li>
                                <li className="flex justify-between">
                                    <strong>Prix par kg:</strong>
                                    <span className="text-black fw-bold">{carrier.pricePerKg} €</span>
                                </li>
                                <li className="flex justify-between">
                                    <strong>Date départ:</strong>
                                    <span className="text-black">
                                        {new Date(carrier.outboundDepartureDate).toDateString()}
                                    </span>
                                </li>
                                <li className="flex justify-between">
                                    <strong>Date arrivée:</strong>
                                    <span className="text-black">
                                        {new Date(carrier.outboundArrivalDate).toDateString()}
                                    </span>
                                </li>
                                {carrier.isRoundTrip && (
                                    <>
                                        <li className="flex justify-between">
                                            <strong>Retour départ:</strong>
                                            <span className="text-black">
                                                {carrier.returnDepartureDate
                                                    ? new Date(carrier.returnDepartureDate).toDateString()
                                                    : "N/A"}
                                            </span>
                                        </li>
                                        <li className="flex justify-between">
                                            <strong>Retour arrivée:</strong>
                                            <span className="text-black">
                                                {carrier.returnArrivalDate
                                                    ? new Date(carrier.returnArrivalDate).toDateString()
                                                    : "N/A"}
                                            </span>
                                        </li>
                                    </>
                                )}
                            </ul>

                            {carrier.tripDescription && (
                                <div className="mt-4">
                                    <h3 className="h6 mb-2">Description</h3>
                                    <p>{carrier.tripDescription}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* RIGHT: Carrier Info */}
                    <aside className="col-lg-5 order-1 order-lg-2 !mt-[-110px]">
                        <div className="position-sticky top-0" style={{ paddingTop: "110px" }}>
                            <div className="card bg-body-tertiary border-0 p-sm-2 p-lg-0 p-xl-2 mb-4">
                                <div className="card-body">
                                    <div className="flex flex-column justify-content-center items-center mb-3">
                                        <div
                                            className="rounded-full overflow-hidden mt-3 bg-body-secondary"
                                            style={{ width: "72px", height: "72px" }}
                                        >
                                            <img
                                                src={carrier.user?.image || "/user.png"}
                                                alt={carrier.user?.name || "User"}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex flex-column justify-content-center items-center mt-5 ">
                                            <h5 className="mb-1 font-semibold text-center">{carrier.user?.name}</h5>
                                            <p className="text-sm text-gray-500 text-center">{carrier.user?.email}</p>
                                            {/*<p className="text-sm text-gray-700">{carrier.user?.phone}</p>*/}
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2 mt-[5.5rem]">
                                        <Link
                                            href={`https://wa.me/237656501651`}
                                            // href={`/dashboard?page=message&id=${carrier.user?.email}`}
                                            className="btn flex-1 btn-primary fw-bold d-flex align-items-center"
                                        >
                                            <MessageSquareIcon className="w-4 me-2 h-4 text-white" /> Chat Par Message
                                        </Link>
                                        {/*<a*/}
                                        {/*    href="https://wa.me/237656501651"*/}
                                        {/*    className="btn flex-1 fw-bold btn-primary d-flex align-items-center !bg-green-600 !border-0"*/}
                                        {/*>*/}
                                        {/*    <FaWhatsapp className="w-4 me-2 h-4 text-white" /> Contactez-nous*/}
                                        {/*</a>*/}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>

                {/* Related Carriers */}
                {related.length > 0 && (
                    <>
                        <h2 className="text-xl font-semibold my-6">Autres transporteurs disponibles</h2>
                        <Marquee pauseOnHover speed={50} gradient gradientWidth={100} gradientColor="white" className="py-3">
                            {related.map((pkg, index) => (
                                <div key={index} className="mx-1.5">
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
                                                                href={`https://wa.me/237656501651`}
                                                                // href={"/dashboard?page=message&id=" + pkg.user?.email}
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
                            ))}
                        </Marquee>
                    </>
                )}
            </section>
        </main>
    );
}
