'use client'

import {Button} from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import React, {use, useEffect, useRef, useState} from "react";
import {signIn, useSession} from "next-auth/react";
import {useRouter, useSearchParams} from "next/navigation";
import ContactTab, {ProfileTab} from "@/components/my-contact";
import MessageTab from "@/components/my-message";
import TransportTable, {countryNameToISO, getCountryFromAddress, isoToFlag} from "@/components/my-carry";
import PackageTable from "@/components/my-package";
import {
    BoxIcon, Calendar1Icon, CalendarCheck2Icon,
    ChevronRightIcon, DockIcon, DollarSignIcon, Edit2Icon, EyeIcon,
    MailIcon, MapIcon,
    MessageCircleDashedIcon,
    Package2Icon, PackageIcon, PhoneIcon,
    PlaneIcon, PlaneLanding, PlaneTakeoff, RulerIcon, ScaleIcon, SearchIcon, TrainIcon, Trash2Icon,
    UserIcon,
    UsersIcon
} from "lucide-react";
import {Item, ItemActions, ItemContent, ItemMedia, ItemTitle} from "@/components/ui/item";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle} from "@/components/ui/empty";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {ScrollArea} from "@/components/ui/scroll-area";

export default function Dashboard({
                                      searchParams,
                                  }: {
    searchParams: Promise<{ page?: string, id?: string }>
}) {
    const params = use(searchParams)

    const {data: session, status, update} = useSession();
    const router = useRouter();
    const initialTab = params.page || "contact";
    const [activeTab, setActiveTab] = useState(initialTab);

    // useEffect(() => {
    //     if (status === "unauthenticated") {
    //         router.push("/auth/signin");
    //     }
    // }, [status, router]);

    const handleTabChange = (value: string) => {
        setActiveTab(value);
        router.replace(`?page=${value}`, {scroll: false});
    };

    if (status === "loading") {
        return (
            <div className="flex items-center justify-center h-[70dvh]">
                <p>Chargement...</p>
            </div>
        );
    }

    return (
        <div className="!flex !w-full !min-h-[70dvh] !py-10 !flex-col !justify-center !gap-6">
            <div className={'container flex justify-content-center'}>
                <Tabs defaultValue={initialTab} onValueChange={handleTabChange} className={'md:!w-[70%] !w-full'}>
                    <TabsList className={'!h-[50px] !w-full'}>
                        <TabsTrigger value="contact">
                            <b className={'hidden md:flex'}>Les Utilisateurs</b>
                            <UsersIcon className={'md:hidden flex'} />
                        </TabsTrigger>
                        <TabsTrigger value="package">
                            <b className={'hidden md:flex'}>Les Colis</b>
                            <Package2Icon className={'md:hidden flex'} />
                        </TabsTrigger>
                        <TabsTrigger value="trip">
                            <b className={'hidden md:flex'}>Les Trajets</b>
                            <PlaneIcon className={'md:hidden flex'} />
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="contact">
                        <UsersTab />
                    </TabsContent>
                    <TabsContent value="package">
                        <PackagesTable/>
                    </TabsContent>
                    <TabsContent value="trip">
                        <CarriersTable/>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}


export const CarriersTable: React.FC = () => {
    const [packages, setPackages] = useState<any[]>([]);
    const [selected, setSelected] = useState<any | null>(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const limit = 10; // items per page

    const fetchPackages = async (pageNumber = 1) => {
        try {
            setLoading(true);
            const res = await fetch(`/api/admin/trip?page=${pageNumber}&limit=${limit}`);
            if (!res.ok) throw new Error("Failed to fetch");
            const data = await res.json();
            setPackages(data.transports);
            setTotalPages(data.totalPages);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPackages(page);
    }, [page]);

    const handleDelete = async (id: string) => {
        if (!confirm("Voulez-vous vraiment supprimer ce colis ?")) return;
        try {
            await fetch(`/api/admin/package/${id}`, { method: "DELETE" });
            fetchPackages(page);
        } catch (err) {
            console.error(err);
        }
    };

    if (loading && packages.length === 0) {
        return (
            <div className="text-center py-6 text-muted-foreground">
                Chargement des colis...
            </div>
        );
    }

    if (!loading && packages.length === 0) {
        return (
            <Empty className="border border-dashed p-6">
                <EmptyHeader>
                    <EmptyMedia variant="icon">
                        <PackageIcon />
                    </EmptyMedia>
                    <EmptyTitle>Aucune Expedition</EmptyTitle>
                    <EmptyDescription>
                        Vous n&apos;avez pas encore ajouté expedition
                    </EmptyDescription>
                </EmptyHeader>
            </Empty>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            <Table className="border border-gray-300">
                <TableHeader>
                    <TableRow>
                        <TableHead className="border">Départ</TableHead>
                        <TableHead className="border">Destination</TableHead>
                        <TableHead className="border">Publié le</TableHead>
                        <TableHead className="border flex justify-end">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {packages.map((p) => (
                        <TableRow key={p.id} className="border">
                            <TableCell className="border">
                                {isoToFlag(countryNameToISO[getCountryFromAddress(p.origin)]) || "🌍"} {p.origin}
                            </TableCell>
                            <TableCell className="border">
                                {isoToFlag(countryNameToISO[getCountryFromAddress(p.destination)]) || "🌍"} {p.destination}
                            </TableCell>
                            <TableCell className="border italic">{new Date(p.createdAt).toDateString()}</TableCell>
                            <TableCell className="border flex gap-2 justify-end">
                                {/* View Details */}
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <Button
                                            size="icon"
                                            variant="outline"
                                            onClick={() => setSelected(p)}
                                        >
                                            <EyeIcon />
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent>
                                        <SheetHeader className="!pt-24">
                                            <SheetTitle>Détails du colis</SheetTitle>
                                            <SheetDescription>
                                                Informations détaillées sur ce colis
                                            </SheetDescription>
                                        </SheetHeader>
                                        {selected && (
                                            <div className="grid gap-2 ps-4 mt-4">
                                                <p className={'flex items-center gap-x-3'}>
                                                    <PlaneTakeoff className={'w-4 h-4'} />
                                                    <strong className={'text-black'}>Départ :</strong> {isoToFlag(countryNameToISO[getCountryFromAddress(selected.origin)]) || "🌍"}  {selected.origin}</p>
                                                <p className={'flex items-center gap-x-3'}>
                                                    <PlaneLanding className={'w-4 h-4'} />
                                                    <strong className={'text-black'}>Destination :</strong> {isoToFlag(countryNameToISO[getCountryFromAddress(selected.destination)]) || "🌍"}  {selected.destination}</p>
                                                <p className={'flex items-center gap-x-3'}>
                                                    <TrainIcon className={'w-4 h-4'} />
                                                    <strong className={'text-black'}>Moyen :</strong> {selected.meansTransport}</p>
                                                <p className={'flex items-center gap-x-3'}>
                                                    <ScaleIcon className={'w-4 h-4'} />
                                                    <strong className={'text-black'}>Poids :</strong> {selected.weightAvailable} kg</p>
                                                <p className={'flex items-center gap-x-3'}>
                                                    <DollarSignIcon className={'w-4 h-4'} />
                                                    <strong className={'text-black'}>Prix / kg :</strong> {selected.pricePerKg} €</p>
                                                <p className={'flex items-center gap-x-3'}>
                                                    <CalendarCheck2Icon className={'w-4 h-4'} />
                                                    <strong className={'text-black'}>Départ aller :</strong> {selected.outboundDepartureDate}</p>
                                                <p className={'flex items-center gap-x-3'}>
                                                    <CalendarCheck2Icon className={'w-4 h-4'} />
                                                    <strong className={'text-black'}>Arrivée aller :</strong> {selected.outboundArrivalDate}</p>
                                                {selected.isRoundTrip && (
                                                    <>
                                                        <p className={'flex items-center gap-x-3'}>
                                                            <Calendar1Icon className={'w-4 h-4'} />
                                                            <strong className={'text-black'}>Départ retour :</strong> {selected.returnDepartureDate}</p>
                                                        <p className={'flex items-center gap-x-3'}>
                                                            <Calendar1Icon className={'w-4 h-4'} />
                                                            <strong className={'text-black'}>Arrivée retour :</strong> {selected.returnArrivalDate}</p>
                                                    </>
                                                )}
                                                {selected.tripDescription && (
                                                    <p className={'flex items-center gap-x-3'}>
                                                        <DockIcon className={'w-4 h-4'} />
                                                        <strong className={'text-black'}>Description :</strong> {selected.tripDescription}
                                                    </p>
                                                )}

                                                <hr/>

                                                <div className="mt-4 px-4 space-y-3">
                                                    <h5><b className={'text-black'}>Publié par</b></h5>
                                                    <br/><p><b>Nom:</b> {selected.user?.name}</p>
                                                    <p><b>Email:</b> {selected.user?.email}</p>
                                                    <p><b>Address:</b> {selected.user?.address ?? "N/A"}</p>
                                                    <p><b>Téléphone:</b> {selected.user?.phone ?? "N/A"}</p>
                                                </div>
                                            </div>
                                        )}
                                    </SheetContent>
                                </Sheet>

                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center gap-2 mt-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    disabled={page === 1 || loading}
                >
                    Précédent
                </Button>

                {Array.from({ length: totalPages }).map((_, i) => (
                    <Button
                        key={i}
                        variant={page === i + 1 ? "default" : "outline"}
                        size="sm"
                        onClick={() => setPage(i + 1)}
                        disabled={loading}
                    >
                        {i + 1}
                    </Button>
                ))}

                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                    disabled={page === totalPages || loading}
                >
                    Suivant
                </Button>
            </div>
        </div>
    );
};


export const PackagesTable: React.FC = () => {
    const [packages, setPackages] = useState<any[]>([]);
    const [selected, setSelected] = useState<any | null>(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const limit = 10; // items per page

    const fetchPackages = async (pageNumber = 1) => {
        try {
            setLoading(true);
            const res = await fetch(`/api/admin/package?page=${pageNumber}&limit=${limit}`);
            if (!res.ok) throw new Error("Failed to fetch");
            const data = await res.json();
            setPackages(data.packages);
            setTotalPages(data.totalPages);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPackages(page);
    }, [page]);

    const handleDelete = async (id: string) => {
        if (!confirm("Voulez-vous vraiment supprimer ce colis ?")) return;
        try {
            await fetch(`/api/admin/package/${id}`, { method: "DELETE" });
            fetchPackages(page);
        } catch (err) {
            console.error(err);
        }
    };

    if (loading && packages.length === 0) {
        return (
            <div className="text-center py-6 text-muted-foreground">
                Chargement des colis...
            </div>
        );
    }

    if (!loading && packages.length === 0) {
        return (
            <Empty className="border border-dashed p-6">
                <EmptyHeader>
                    <EmptyMedia variant="icon">
                        <PackageIcon />
                    </EmptyMedia>
                    <EmptyTitle>Aucun colis</EmptyTitle>
                    <EmptyDescription>
                        Vous n&apos;avez pas encore ajouté de colis
                    </EmptyDescription>
                </EmptyHeader>
            </Empty>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            <Table className="border border-gray-300">
                <TableHeader>
                    <TableRow>
                        <TableHead className="border">Départ</TableHead>
                        <TableHead className="border">Destination</TableHead>
                        <TableHead className="border">Date Limite</TableHead>
                        <TableHead className="border">Publié le</TableHead>
                        <TableHead className="border flex justify-end">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {packages.map((p) => (
                        <TableRow key={p.id} className="border">
                            <TableCell className="border">
                                {isoToFlag(countryNameToISO[getCountryFromAddress(p.origin)]) || "🌍"} {p.origin}
                            </TableCell>
                            <TableCell className="border">
                                {isoToFlag(countryNameToISO[getCountryFromAddress(p.destination)]) || "🌍"} {p.destination}
                            </TableCell>
                            <TableCell className="border fw-bold">
                                {new Date(p.shippingDeadline).toDateString()}
                            </TableCell>
                            <TableCell className="border italic">{new Date(p.createdAt).toDateString()}</TableCell>
                            <TableCell className="border flex gap-2 justify-end">
                                {/* View Details */}
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <Button
                                            size="icon"
                                            variant="outline"
                                            onClick={() => setSelected(p)}
                                        >
                                            <EyeIcon />
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent>
                                        <SheetHeader className="!pt-24">
                                            <SheetTitle>Détails du colis</SheetTitle>
                                            <SheetDescription>
                                                Informations détaillées sur ce colis
                                            </SheetDescription>
                                        </SheetHeader>
                                        {selected && (
                                            <div>
                                                <div className="mt-4 px-4 space-y-3">
                                                    <p><b>Départ:</b> {isoToFlag(countryNameToISO[getCountryFromAddress(selected.origin)]) || "🌍"} {selected.origin}</p>
                                                    <p><b>Destination:</b> {isoToFlag(countryNameToISO[getCountryFromAddress(selected.destination)]) || "🌍"} {selected.destination}</p>
                                                    <p><b>Contenu:</b> {selected.packageContents}</p>
                                                    <p><b>Poids:</b> {selected.weight} kg</p>
                                                    <p><b>Participation:</b> {selected.participationAllowance} €</p>
                                                    <p><b>Date limite:</b> {new Date(selected.shippingDeadline).toLocaleDateString()}</p>
                                                </div>

                                                <br/>
                                                <hr/>
                                                <br/>

                                                <div className="mt-4 px-4 space-y-3">
                                                    <h5><b className={'text-black'}>Publié par</b></h5>
                                                    <br/><p><b>Nom:</b> {selected.user?.name}</p>
                                                    <p><b>Email:</b> {selected.user?.email}</p>
                                                    <p><b>Address:</b> {selected.user?.address ?? "N/A"}</p>
                                                    <p><b>Téléphone:</b> {selected.user?.phone ?? "N/A"}</p>
                                                </div>
                                            </div>
                                        )}
                                    </SheetContent>
                                </Sheet>

                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center gap-2 mt-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    disabled={page === 1 || loading}
                >
                    Précédent
                </Button>

                {Array.from({ length: totalPages }).map((_, i) => (
                    <Button
                        key={i}
                        variant={page === i + 1 ? "default" : "outline"}
                        size="sm"
                        onClick={() => setPage(i + 1)}
                        disabled={loading}
                    >
                        {i + 1}
                    </Button>
                ))}

                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                    disabled={page === totalPages || loading}
                >
                    Suivant
                </Button>
            </div>
        </div>
    );
};


export function UsersTab() {
    const [contacts, setContacts] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const limit = 10; // items per page

    const fetchContacts = async (pageNumber = 1) => {
        setLoading(true);
        const res = await fetch(`/api/admin/user?page=${pageNumber}&limit=${limit}`);
        if (res.ok) {
            const data = await res.json();
            setContacts(data.users);
            setTotalPages(data.totalPages);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchContacts(page);
    }, [page]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Mes Utilisateurs</CardTitle>
                <CardDescription>
                    Liste de tous les utilisateurs enregistrés sur la plateforme
                </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-4">
                {loading ? (
                    <div className="text-center py-6 text-sm text-muted-foreground">
                        Chargement...
                    </div>
                ) : (
                    <div className="grid gap-2">
                        {contacts.map((c) => (
                            <div
                                key={c.id}
                                className="flex items-center justify-between border rounded-xl p-3 hover:bg-muted/50 transition"
                            >
                                <div className="flex items-center gap-3">
                                    <Avatar className="w-[32px] h-[32px] bg-black text-white">
                                        {c.image ? (
                                            <AvatarImage src={c.image} />
                                        ) : (
                                            <AvatarFallback className={'!bg-black !text-white'}>
                                                {c.name?.charAt(0) || "?"}
                                            </AvatarFallback>
                                        )}
                                    </Avatar>

                                    <div>
                                        <div className="font-bold">{c.name}</div>
                                        <div className="flex items-center gap-x-4 text-xs text-muted-foreground">
                                            <div className="flex items-center gap-x-1">
                                                <MailIcon className="w-3 h-3" />
                                                <b className="text-blue-600">{c.email}</b>
                                            </div>
                                            {c.phone && (
                                                <div className="flex items-center gap-x-1">
                                                    <PhoneIcon className="w-3 h-3" />
                                                    <b className="text-blue-600">{c.phone}</b>
                                                </div>
                                            )}
                                            {c.address && (
                                                <div className="flex items-center gap-x-1">
                                                    <MapIcon className="w-3 h-3" />
                                                    <b className="text-blue-600">{c.address}</b>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <ChevronRightIcon className="w-4 h-4" />
                            </div>
                        ))}
                    </div>
                )}

                {/* Pagination Controls */}
                <div className="flex justify-center items-center gap-2 mt-6">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage((p) => Math.max(p - 1, 1))}
                        disabled={page === 1 || loading}
                    >
                        Précédent
                    </Button>

                    {Array.from({ length: totalPages }).map((_, i) => (
                        <Button
                            key={i}
                            variant={page === i + 1 ? "default" : "outline"}
                            size="sm"
                            onClick={() => setPage(i + 1)}
                        >
                            {i + 1}
                        </Button>
                    ))}

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                        disabled={page === totalPages || loading}
                    >
                        Suivant
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}


