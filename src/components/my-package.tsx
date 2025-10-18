'use client'

import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetTrigger,
} from "@/components/ui/sheet";
import { useSession } from "next-auth/react";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle, EmptyMedia } from "@/components/ui/empty";
import {
    Calendar1Icon,
    CalendarCheck2Icon,
    DockIcon,
    DollarSignIcon,
    Edit2Icon,
    EyeIcon,
    PackageIcon,
    PlaneLanding,
    PlaneTakeoff,
    RulerIcon,
    ScaleIcon,
    SearchIcon,
    Trash2Icon,
    BoxIcon
} from "lucide-react";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ChevronRight } from "lucide-react";
import { FaFacebook } from "react-icons/fa";
import { LocationAutocomplete } from "@/app/carry/page";
import Image from "next/image";
import {countryNameToISO, getCountryFromAddress, isoToFlag} from "@/components/my-carry";

interface Package {
    id: string;
    origin: string;
    destination: string;
    packageContents: string;
    width: string;
    height: string;
    length: string;
    weight: string;
    participationAllowance: string;
    shippingDeadline: string;
    parcelDetails: string;
    imageUrl?: string;
    status: string;
}

const PackageTable: React.FC = () => {
    const { data: session } = useSession();
    const [packages, setPackages] = useState<Package[]>([]);
    const [selected, setSelected] = useState<Package | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchPackages = async () => {
            if (!session) return;
            try {
                const res = await fetch("/api/package");
                const data = await res.json();
                setPackages(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchPackages();
    }, [session]);

    const handleDelete = async (id: string) => {
        if (!confirm("Êtes-vous sûr de vouloir supprimer ce colis ?")) return;

        try {
            const res = await fetch(`/api/package/${id}`, { method: "DELETE" });
            if (res.ok) {
                setPackages((prev) => prev.filter((p) => p.id !== id));
            } else {
                alert("Erreur lors de la suppression.");
            }
        } catch (err) {
            console.error(err);
            alert("Erreur réseau.");
        }
    };

    if (packages.length === 0) {
        return (
            <Empty className="border border-dashed p-6">
                <EmptyHeader>
                    <EmptyMedia variant="icon">
                        <PackageIcon />
                    </EmptyMedia>
                    <EmptyTitle>Aucun colis</EmptyTitle>
                    <EmptyDescription>
                        Vous n&#39;avez pas encore ajouté de colis. Cliquez ci-dessous pour en ajouter un.
                    </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                    <Button variant="outline" onClick={() => router.push("/ship")}>
                        Ajouter un colis
                    </Button>
                </EmptyContent>
            </Empty>
        );
    }

    return (
        <Table className="border border-gray-300">
            <TableHeader>
                <TableRow>
                    <TableHead className="border">Départ</TableHead>
                    <TableHead className="border">Destination</TableHead>
                    <TableHead className="border">Date Limite</TableHead>
                    <TableHead className="border">Poids</TableHead>
                    <TableHead className="border justify-content-end flex items-center gap-x-3">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {packages.map((p) => (
                    <TableRow key={p.id} className="border">
                        <TableCell className="border">
                            {isoToFlag(countryNameToISO[getCountryFromAddress(p.origin)]) || "🌍"}
                            {p.origin}
                        </TableCell>
                        <TableCell className="border">
                            {isoToFlag(countryNameToISO[getCountryFromAddress(p.destination)]) || "🌍"}
                            {p.destination}
                        </TableCell>
                        <TableCell className="border">
                            {new Date(p.shippingDeadline).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="border">{p.weight} kg</TableCell>
                        <TableCell className="border justify-content-end flex gap-2">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button size="icon" variant="outline" onClick={() => setSelected(p)}>
                                        <EyeIcon />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent>
                                    <SheetHeader className={'!pt-24'}>
                                        <SheetTitle>Détails du colis</SheetTitle>
                                        <SheetDescription>
                                            Informations détaillées sur ce colis
                                        </SheetDescription>
                                    </SheetHeader>

                                    {selected && (
                                        <div className="grid gap-2 ps-4 mt-4">
                                            {selected.imageUrl && (
                                                <div className="mb-4">
                                                    <img
                                                        src={selected.imageUrl}
                                                        alt="Package"
                                                        className="h-auto rounded-lg object-cover w-full"
                                                    />
                                                </div>
                                            )}
                                            <p className={'flex items-center gap-x-3'}>
                                                <PlaneTakeoff className={'w-4 h-4'} />
                                                <strong className={'text-black'}>Départ :</strong> {selected.origin}
                                            </p>
                                            <p className={'flex items-center gap-x-3'}>
                                                <PlaneLanding className={'w-4 h-4'} />
                                                <strong className={'text-black'}>Destination :</strong> {selected.destination}
                                            </p>
                                            <p className={'flex items-center gap-x-3'}>
                                                <BoxIcon className={'w-4 h-4'} />
                                                <strong className={'text-black'}>Contenu :</strong> {selected.packageContents}
                                            </p>
                                            <p className={'flex items-center gap-x-3'}>
                                                <RulerIcon className={'w-4 h-4'} />
                                                <strong className={'text-black'}>Dimensions :</strong> {selected.width} x {selected.height} x {selected.length} cm
                                            </p>
                                            <p className={'flex items-center gap-x-3'}>
                                                <ScaleIcon className={'w-4 h-4'} />
                                                <strong className={'text-black'}>Poids :</strong> {selected.weight} kg
                                            </p>
                                            <p className={'flex items-center gap-x-3'}>
                                                <DollarSignIcon className={'w-4 h-4'} />
                                                <strong className={'text-black'}>Participation :</strong> <b className={'text-[#007bff]'}>{selected.participationAllowance} €</b>
                                            </p>
                                            <p className={'flex items-center gap-x-3'}>
                                                <CalendarCheck2Icon className={'w-4 h-4'} />
                                                <strong className={'text-black'}>Date limite :</strong> {new Date(selected.shippingDeadline).toLocaleDateString()}
                                            </p>
                                            <p className={'flex items-start gap-x-3'}>
                                                <DockIcon className={'w-4 h-4 mt-1'} />
                                                <div>
                                                    <strong className={'text-black'}>Détails :</strong>
                                                    <span className="block mt-1">{selected.parcelDetails}</span>
                                                </div>
                                            </p>
                                        </div>
                                    )}
                                </SheetContent>
                            </Sheet>

                            {/* Chercher un transporteur */}
                            <Button
                                size="icon"
                                variant="outline"
                                onClick={() => router.push(`/carrier?origin=${encodeURIComponent(p.origin)}&destination=${encodeURIComponent(p.destination)}`)}
                                title="Chercher un transporteur"
                            >
                                <SearchIcon />
                            </Button>

                            <Button size="icon" variant="outline" onClick={() => router.push("/ship?id=" + p.id)}>
                                <Edit2Icon />
                            </Button>

                            <Button size="icon" variant="destructive" onClick={() => handleDelete(p.id)}>
                                <Trash2Icon />
                            </Button>

                            {/* Partager sur Facebook */}
                            <FacebookShareButton
                                url={"https://www.ndc-travels.com/carrier/" + p.id}
                                quote="Regardez ce colis sur NDC Travels !"
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default PackageTable;

interface ShareButtonProps {
    url: string;
    quote?: string;
}

const FacebookShareButton: React.FC<ShareButtonProps> = ({ url, quote }) => {
    const handleShare = () => {
        const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}${
            quote ? `&quote=${encodeURIComponent(quote)}` : ""
        }`;
        window.open(shareUrl, "_blank", "width=600,height=400");
    };

    return (
        <Button
            className="bg-[#1877F2] text-white"
            variant="default"
            onClick={handleShare}
        >
            <FaFacebook className="me-2" /> Partager
        </Button>
    );
};