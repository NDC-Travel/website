"use client";

import React, {useState, useEffect, use} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import {LocationAutocomplete} from "@/components/ship";
import {Separator} from "@/components/ui/separator";
import {countryNameToISO, getAddress, getCountryFromAddress, isoToFlag, transportIcon} from "@/components/my-carry";
import {ArrowRight} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

const PAGE_SIZE = 12;

export default function ListingCarrier({
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

        router.replace(`/carrier?${params.toString()}`);
    }, [origin, destination, search]);

    // Fetch listings (mocked here, replace with API call)
    const fetchListings = async () => {
        let data: any = await fetch("/api/carriers")
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-1.5 mb-7">
                {paginated.map((pkg: any, index: number) => (
                    <div key={index} className="mx-1.5">
                        <Link href={`/carrier/${pkg.id}`} className="card h-100 hover-effect-scale">
                            <div className="card-body pb-3">

                                <div className="flex items-center justify-content-between g-2 text-[0.75rem]">
                                    <div className="col d-flex fw-bold align-items-center justify-content-start gap-3">
                                        {isoToFlag(countryNameToISO[getCountryFromAddress(pkg.origin)]) || "🌍"} {getAddress(pkg.origin)}
                                    </div>
                                    <ArrowRight /> &nbsp; &nbsp;
                                    {transportIcon[pkg.meansTransport]}
                                    &nbsp; &nbsp;  <ArrowRight />
                                    <div className="col d-flex fw-bold align-items-center justify-content-end gap-3">
                                        {isoToFlag(countryNameToISO[getCountryFromAddress(pkg.destination)]) || "🌍"} {getAddress(pkg.destination)}
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


