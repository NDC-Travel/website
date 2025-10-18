"use client";

import React, {useState, useEffect, use} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import {LocationAutocomplete} from "@/components/ship";
import {Separator} from "@/components/ui/separator";
import {countryNameToISO, getCountryFromAddress, isoToFlag} from "@/components/my-carry";
import {ArrowRight} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

const PAGE_SIZE = 9;

export default function ListingPackage({
                                           searchParams,
                                       }: {
    searchParams: Promise<{ origin?: string, search?: string, destination?: string }>
}) {
    const router = useRouter();

    const [listings, setListings] = useState<any>([]);
    const [page, setPage] = useState(1);

    // Filter states
    const params = use(searchParams)

    const originParam = params.origin || "";
    const destinationParam = params.destination || "";
    const searchParam = params.search || "";

    const [origin, setOrigin] = useState<google.maps.places.PlaceResult | null>(
        originParam ? { name: originParam, formatted_address: originParam } as any : null
    );
    const [destination, setDestination] = useState<google.maps.places.PlaceResult | null>(
        destinationParam ? { name: destinationParam, formatted_address: destinationParam } as any : null
    );
    const [search, setSearch] = useState(searchParam);

    useEffect(() => {
        const params = new URLSearchParams();

        // Use only string values, not the full object
        if (origin) params.set("origin", origin.formatted_address || origin.name || "");
        if (destination) params.set("destination", destination.formatted_address || destination.name || "");
        if (search) params.set("search", search);

        router.replace(`/package?${params.toString()}`);
    }, [origin, destination, search]);

    // Fetch listings (mocked here, replace with API call)
    const fetchListings = async () => {
        let data: any = await fetch("/api/packages")
            .then((res) => res.json())
            .catch(() => []);

        // Normalize origin/destination values
        const originStr = typeof origin === "string"
            ? origin
            : origin?.formatted_address || origin?.name || "";

        const destinationStr = typeof destination === "string"
            ? destination
            : destination?.formatted_address || destination?.name || "";

        // Apply filters safely
        if (originStr)
            data = data.filter((l: any) =>
                l.origin?.toLowerCase().includes(originStr.toLowerCase())
            );

        if (destinationStr)
            data = data.filter((l: any) =>
                l.destination?.toLowerCase().includes(destinationStr.toLowerCase())
            );

        if (search)
            data = data.filter(
                (l: any) =>
                    l.title?.toLowerCase().includes(search.toLowerCase()) ||
                    l.description?.toLowerCase().includes(search.toLowerCase())
            );

        setListings(data);
    };

    useEffect(() => {
        fetchListings();
    }, [origin, destination, search]);

    // Pagination
    const paginated = listings.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    const formatDate = (date: string) =>
        new Date(date).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });

    return (
        <section className="container !px-0 !mb-2 !pt-7">
            {/* Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-4 !px-4 md:!px-0">
                <LocationAutocomplete
                    id="origin"
                    label="Départ *"
                    placeholder="Ville de départ"
                    defaultValue={origin?.formatted_address || ""}
                    onSelect={(place) => setOrigin(place)}
                />

                <LocationAutocomplete
                    id="destination"
                    label="Destination *"
                    placeholder="Ville d'arrivée"
                    defaultValue={destination?.formatted_address || ""}
                    onSelect={(place) => setDestination(place)}
                />
                <div>
                    <label
                        htmlFor={'query'}
                        className="block mb-1 font-semibold text-gray-700"
                    >
                        Mot Clé
                    </label>
                    <input
                        id={'query'}
                        name={'query'}
                        type="text"
                        placeholder="Rechercher..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2"
                    />
                </div>
            </div>

            <Separator className={'my-5'} />

            {/* Listings */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 mb-7">
                {paginated.map((pkg: any, index: number) => (
                    <div key={index} className="mx-3">
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
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

            <Separator className={'my-5'} />

            {/* Pagination */}
            <Pagination className="!text-black !my-10">
                <PaginationContent>
                    <PaginationItem className={''}>
                        <PaginationPrevious
                            className={'!text-black !font-black'}
                            href="#"
                            onClick={() => setPage(Math.max(1, page - 1))}
                        />
                    </PaginationItem>
                    {Array.from({ length: Math.ceil(listings.length / PAGE_SIZE) }).map(
                        (_, idx) => (
                            <PaginationItem key={idx}>
                                <PaginationLink
                                    href="#"
                                    className={'!text-black !font-black'}
                                    isActive={idx + 1 === page}
                                    onClick={() => setPage(idx + 1)}
                                >
                                    {idx + 1}
                                </PaginationLink>
                            </PaginationItem>
                        )
                    )}
                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            className={'!text-black !font-black'}
                            onClick={() =>
                                setPage(Math.min(Math.ceil(listings.length / PAGE_SIZE), page + 1))
                            }
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </section>
    );
}


