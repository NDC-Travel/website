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
    Calendar1Icon, CalendarCheck2Icon,
    DockIcon, DollarSignIcon,
    Edit2Icon,
    EyeIcon,
    FacebookIcon,
    PlaneIcon, PlaneLanding,
    PlaneTakeoff, ScaleIcon,
    SearchIcon, TrainIcon,
    Trash2Icon
} from "lucide-react";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ChevronRight } from "lucide-react";
import {FaFacebook} from "react-icons/fa";
import {LocationAutocomplete} from "@/app/carry/page";

export const countryNameToISO: Record<string, string> = {
    "Afghanistan": "AF",
    "Albania": "AL",
    "Algeria": "DZ",
    "Andorra": "AD",
    "Angola": "AO",
    "Antigua and Barbuda": "AG",
    "Argentina": "AR",
    "Armenia": "AM",
    "Australia": "AU",
    "Austria": "AT",
    "Azerbaijan": "AZ",
    "Bahamas": "BS",
    "Bahrain": "BH",
    "Bangladesh": "BD",
    "Barbados": "BB",
    "Belarus": "BY",
    "Belgium": "BE",
    "Belize": "BZ",
    "Benin": "BJ",
    "Bhutan": "BT",
    "Bolivia": "BO",
    "Bosnia and Herzegovina": "BA",
    "Botswana": "BW",
    "Brazil": "BR",
    "Brunei Darussalam": "BN",
    "Bulgaria": "BG",
    "Burkina Faso": "BF",
    "Burundi": "BI",
    "Cabo Verde": "CV",
    "Cambodia": "KH",
    "Cameroon": "CM",
    "Canada": "CA",
    "Central African Republic": "CF",
    "Chad": "TD",
    "Chile": "CL",
    "China": "CN",
    "Colombia": "CO",
    "Comoros": "KM",
    "Congo (Congo-Brazzaville)": "CG",
    "Congo (Democratic Republic of the Congo)": "CD",
    "Costa Rica": "CR",
    "Croatia": "HR",
    "Cuba": "CU",
    "Cyprus": "CY",
    "Czech Republic": "CZ",
    "Denmark": "DK",
    "Djibouti": "DJ",
    "Dominica": "DM",
    "Dominican Republic": "DO",
    "Ecuador": "EC",
    "Egypt": "EG",
    "El Salvador": "SV",
    "Equatorial Guinea": "GQ",
    "Eritrea": "ER",
    "Estonia": "EE",
    "Eswatini (fmr. 'Swaziland')": "SZ",
    "Ethiopia": "ET",
    "Fiji": "FJ",
    "Finland": "FI",
    "France": "FR",
    "Gabon": "GA",
    "Gambia": "GM",
    "Georgia": "GE",
    "Germany": "DE",
    "Ghana": "GH",
    "Greece": "GR",
    "Grenada": "GD",
    "Guatemala": "GT",
    "Guinea": "GN",
    "Guinea-Bissau": "GW",
    "Guyana": "GY",
    "Haiti": "HT",
    "Honduras": "HN",
    "Hungary": "HU",
    "Iceland": "IS",
    "India": "IN",
    "Indonesia": "ID",
    "Iran": "IR",
    "Iraq": "IQ",
    "Ireland": "IE",
    "Israel": "IL",
    "Italy": "IT",
    "Jamaica": "JM",
    "Japan": "JP",
    "Jordan": "JO",
    "Kazakhstan": "KZ",
    "Kenya": "KE",
    "Kiribati": "KI",
    "Korea (North)": "KP",
    "Korea (South)": "KR",
    "Kuwait": "KW",
    "Kyrgyzstan": "KG",
    "Laos": "LA",
    "Latvia": "LV",
    "Lebanon": "LB",
    "Lesotho": "LS",
    "Liberia": "LR",
    "Libya": "LY",
    "Liechtenstein": "LI",
    "Lithuania": "LT",
    "Luxembourg": "LU",
    "Madagascar": "MG",
    "Malawi": "MW",
    "Malaysia": "MY",
    "Maldives": "MV",
    "Mali": "ML",
    "Malta": "MT",
    "Marshall Islands": "MH",
    "Mauritania": "MR",
    "Mauritius": "MU",
    "Mexico": "MX",
    "Micronesia": "FM",
    "Moldova": "MD",
    "Monaco": "MC",
    "Mongolia": "MN",
    "Montenegro": "ME",
    "Morocco": "MA",
    "Mozambique": "MZ",
    "Myanmar (formerly Burma)": "MM",
    "Namibia": "NA",
    "Nauru": "NR",
    "Nepal": "NP",
    "Netherlands": "NL",
    "New Zealand": "NZ",
    "Nicaragua": "NI",
    "Niger": "NE",
    "Nigeria": "NG",
    "North Macedonia": "MK",
    "Norway": "NO",
    "Oman": "OM",
    "Pakistan": "PK",
    "Palau": "PW",
    "Panama": "PA",
    "Papua New Guinea": "PG",
    "Paraguay": "PY",
    "Peru": "PE",
    "Philippines": "PH",
    "Poland": "PL",
    "Portugal": "PT",
    "Qatar": "QA",
    "Romania": "RO",
    "Russia": "RU",
    "Rwanda": "RW",
    "Saint Kitts and Nevis": "KN",
    "Saint Lucia": "LC",
    "Saint Vincent and the Grenadines": "VC",
    "Samoa": "WS",
    "San Marino": "SM",
    "Sao Tome and Principe": "ST",
    "Saudi Arabia": "SA",
    "Senegal": "SN",
    "Serbia": "RS",
    "Seychelles": "SC",
    "Sierra Leone": "SL",
    "Singapore": "SG",
    "Slovakia": "SK",
    "Slovenia": "SI",
    "Solomon Islands": "SB",
    "Somalia": "SO",
    "South Africa": "ZA",
    "South Sudan": "SS",
    "Spain": "ES",
    "Sri Lanka": "LK",
    "Sudan": "SD",
    "Suriname": "SR",
    "Sweden": "SE",
    "Switzerland": "CH",
    "Syria": "SY",
    "Taiwan": "TW",
    "Tajikistan": "TJ",
    "Tanzania": "TZ",
    "Thailand": "TH",
    "Timor-Leste": "TL",
    "Togo": "TG",
    "Tonga": "TO",
    "Trinidad and Tobago": "TT",
    "Tunisia": "TN",
    "Turkey": "TR",
    "Turkmenistan": "TM",
    "Tuvalu": "TV",
    "Uganda": "UG",
    "Ukraine": "UA",
    "United Arab Emirates": "AE",
    "United Kingdom": "GB",
    "United States": "US",
    "Uruguay": "UY",
    "Uzbekistan": "UZ",
    "Vanuatu": "VU",
    "Vatican City": "VA",
    "Venezuela": "VE",
    "Vietnam": "VN",
    "Yemen": "YE",
    "Zambia": "ZM",
    "Zimbabwe": "ZW"
};


interface Transport {
    id: string;
    origin: string;
    destination: string;
    meansTransport: string;
    weightAvailable: string;
    pricePerKg: string;
    status: string;
    outboundDepartureDate: string;
    outboundArrivalDate: string;
    returnDepartureDate?: string;
    returnArrivalDate?: string;
    tripDescription?: string;
    isRoundTrip?: boolean;
}

const TransportTable: React.FC = () => {
    const { data: session } = useSession();
    const [transports, setTransports] = useState<Transport[]>([]);
    const [selected, setSelected] = useState<Transport | null>(null);
    const [editTransport, setEditTransport] = useState<Transport | null>(null);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchTransports = async () => {
            if (!session) return;
            try {
                const res = await fetch("/api/transport/user");
                const data = await res.json();
                setTransports(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchTransports();
    }, [session]);

    const handleDelete = async (id: string) => {
        if (!confirm("Êtes-vous sûr de vouloir supprimer ce transport ?")) return;

        try {
            const res = await fetch(`/api/transport/${id}`, { method: "DELETE" });
            if (res.ok) {
                setTransports((prev) => prev.filter((t) => t.id !== id));
            } else {
                alert("Erreur lors de la suppression.");
            }
        } catch (err) {
            console.error(err);
            alert("Erreur réseau.");
        }
    };

    if (transports.length === 0) {
        return (
            <Empty className="border border-dashed p-6">
                <EmptyHeader>
                    <EmptyMedia variant="icon">
                        <PlaneIcon />
                    </EmptyMedia>
                    <EmptyTitle>Aucun transport</EmptyTitle>
                    <EmptyDescription>
                        Vous n&#39;avez pas encore ajouté de transport. Cliquez ci-dessous pour en ajouter un.
                    </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                    <Button variant="outline" onClick={() => router.push("/carry")}>
                        Ajouter un transport
                    </Button>
                </EmptyContent>
            </Empty>
        );
    }

    const isoToFlag = (iso: string) => {
        return iso
            .toUpperCase()
            .replace(/./g, char =>
                String.fromCodePoint(127397 + char.charCodeAt(0))
            );
    };

    const getCountryFromAddress = (address: string) => {
        const parts = address.split(",");
        const country = parts[parts.length - 1].trim();
        return country;
    };

    return (
        <Table className="border border-gray-300">
            <TableHeader>
                <TableRow>
                    <TableHead className="border">Départ</TableHead>
                    <TableHead className="border">Destination</TableHead>
                    <TableHead className="border">Date Départ</TableHead>
                    <TableHead className="border justify-content-end flex items-center gap-x-3">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {transports.map((t) => (
                    <TableRow key={t.id} className="border">
                        <TableCell className="border">{isoToFlag(countryNameToISO[getCountryFromAddress(t.origin)])} {t.origin}</TableCell>
                        <TableCell className="border">{isoToFlag(countryNameToISO[getCountryFromAddress(t.destination)])}  {t.destination}</TableCell>
                        <TableCell className="border">{new Date(t.outboundDepartureDate as string).toDateString()}</TableCell>
                        <TableCell className="border justify-content-end flex gap-2">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button size="icon" variant="outline" onClick={() => setSelected(t)}>
                                        <EyeIcon />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent>
                                    <SheetHeader className={'!pt-24'}>
                                        <SheetTitle>Détails du transport</SheetTitle>
                                        <SheetDescription>
                                            Informations détaillées sur ce transport
                                        </SheetDescription>
                                    </SheetHeader>

                                    {selected && (
                                        <div className="grid gap-2 ps-4 mt-4">
                                            <p className={'flex items-center gap-x-3'}>
                                                <PlaneTakeoff className={'w-4 h-4'} />
                                                <strong className={'text-black'}>Départ :</strong> {selected.origin}</p>
                                            <p className={'flex items-center gap-x-3'}>
                                                <PlaneLanding className={'w-4 h-4'} />
                                                <strong className={'text-black'}>Destination :</strong> {selected.destination}</p>
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
                                        </div>
                                    )}
                                </SheetContent>
                            </Sheet>

                            {/* Chercher un colis */}
                            <Button
                                size="icon"
                                variant="outline"
                                onClick={() => router.push(`/package?origin=${encodeURIComponent(t.origin)}&destination=${encodeURIComponent(t.destination)}`)}
                            >
                                <SearchIcon />
                            </Button>

                            <Button size="icon" variant="outline" onClick={() => router.push("/carry?id=" + t.id)}><Edit2Icon /></Button>

                            <Button size="icon" variant="destructive" onClick={() => handleDelete(t.id)}>
                                <Trash2Icon />
                            </Button>

                            {/* Partager sur Facebook */}
                            <FacebookShareButton
                                url={"https://www.ndc-travels.com/trip/" + t.id}
                                quote="Regardez ce trajet incroyable sur NDC Travels !"
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default TransportTable;

interface ShareButtonProps {
    url: string; // L'URL à partager
    quote?: string; // Texte optionnel à afficher
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

interface EditTransportSheetProps {
    transport: Transport | null;
    onUpdate: (updated: Transport) => void;
}

export const EditTransportSheet: React.FC<EditTransportSheetProps> = ({ transport, onUpdate }) => {
    const [form, setForm] = useState<Transport | null>(transport);

    useEffect(() => {
        setForm(transport);
    }, [transport]);

    if (!transport) return null;

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type } = e.target;
        if (!form) return;

        if (type === "checkbox") {
            const checked = (e.target as HTMLInputElement).checked;
            setForm({ ...form, [name]: checked });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form) return;

        try {
            const res = await fetch(`/api/transport/${form.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                const updatedTransport = await res.json();
                onUpdate(updatedTransport);
                alert("Transport mis à jour !");
            } else {
                const data = await res.json();
                alert(data.error || "Erreur lors de la mise à jour.");
            }
        } catch (err) {
            console.error(err);
            alert("Erreur réseau.");
        }
    };

    return (
        <Sheet open={!!transport} onOpenChange={(open) => { if (!open) setForm(null); }}>
            <SheetTrigger asChild>
                <Button size="icon" variant="outline"><Edit2Icon /></Button>
            </SheetTrigger>
            <SheetContent className="overflow-auto !w-full md:!w-[600px]" onClick={(e) => e.stopPropagation()}>
                <SheetHeader>
                    <SheetTitle>Éditer le transport</SheetTitle>
                    <SheetDescription>Modifiez les informations du transport</SheetDescription>
                </SheetHeader>

                {form && (
                    <form className="grid gap-6 mt-6 p-4" onSubmit={handleSubmit}>
                        <LocationAutocomplete
                            id="origin"
                            label="Départ *"
                            placeholder="Ville de départ"
                            defaultValue={form.origin}
                            onSelect={(place) => setForm({ ...form, origin: place?.formatted_address || "" })}
                        />

                        <LocationAutocomplete
                            id="destination"
                            label="Destination *"
                            placeholder="Ville d'arrivée"
                            defaultValue={form.destination}
                            onSelect={(place) => setForm({ ...form, destination: place?.formatted_address || "" })}
                        />

                        <div className="grid gap-2">
                            <label className="font-semibold text-gray-700">Poids disponible (kg)</label>
                            <input
                                type="number"
                                name="weightAvailable"
                                value={form.weightAvailable}
                                onChange={handleChange}
                                className="input input-bordered w-full p-2"
                            />
                        </div>

                        <div className="grid gap-2">
                            <label className="font-semibold text-gray-700">Prix / kg (€)</label>
                            <input
                                type="number"
                                name="pricePerKg"
                                value={form.pricePerKg}
                                onChange={handleChange}
                                className="input input-bordered w-full p-2"
                            />
                        </div>

                        <div className="grid gap-2">
                            <label className="font-semibold text-gray-700">Moyen de transport</label>
                            <select
                                name="meansTransport"
                                value={form.meansTransport}
                                onChange={handleChange}
                                className="input input-bordered w-full p-2"
                            >
                                <option value="plane">✈️ Avion</option>
                                <option value="car">🚗 Voiture</option>
                                <option value="van">🚐 Camionnette</option>
                                <option value="train">🚂 Train</option>
                                <option value="bus">🚌 Bus</option>
                                <option value="ship">🚢 Fret maritime</option>
                            </select>
                        </div>

                        <div className="grid gap-2">
                            <label className="font-semibold text-gray-700">Description du trajet</label>
                            <textarea
                                name="tripDescription"
                                value={form.tripDescription || ""}
                                onChange={handleChange}
                                className="textarea textarea-bordered w-full p-2"
                            />
                        </div>

                        <div className="grid gap-2">
                            <label className="font-semibold text-gray-700">Date départ</label>
                            <DatePicker
                                selected={form.outboundDepartureDate ? new Date(form.outboundDepartureDate) : null}
                                onChange={(date: Date | null) =>
                                    setForm({ ...form, outboundDepartureDate: date?.toISOString() || "" })
                                }
                                className="input input-bordered w-full p-2"
                                dateFormat="yyyy-MM-dd"
                            />
                        </div>

                        <div className="grid gap-2">
                            <label className="font-semibold text-gray-700">Date arrivée</label>
                            <DatePicker
                                selected={form.outboundArrivalDate ? new Date(form.outboundArrivalDate) : null}
                                onChange={(date: Date | null) =>
                                    setForm({ ...form, outboundArrivalDate: date?.toISOString() || "" })
                                }
                                className="input input-bordered w-full p-2"
                                dateFormat="yyyy-MM-dd"
                            />
                        </div>

                        {form.isRoundTrip && (
                            <>
                                <div className="grid gap-2">
                                    <label className="font-semibold text-gray-700">Date départ retour</label>
                                    <DatePicker
                                        selected={form.returnDepartureDate ? new Date(form.returnDepartureDate) : null}
                                        onChange={(date: Date | null) =>
                                            setForm({ ...form, returnDepartureDate: date?.toISOString() || "" })
                                        }
                                        className="input input-bordered w-full p-2"
                                        dateFormat="yyyy-MM-dd"
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <label className="font-semibold text-gray-700">Date arrivée retour</label>
                                    <DatePicker
                                        selected={form.returnArrivalDate ? new Date(form.returnArrivalDate) : null}
                                        onChange={(date: Date | null) =>
                                            setForm({ ...form, returnArrivalDate: date?.toISOString() || "" })
                                        }
                                        className="input input-bordered w-full p-2"
                                        dateFormat="yyyy-MM-dd"
                                    />
                                </div>
                            </>
                        )}

                        <Button
                            type="submit"
                            className="mt-6 w-full bg-black hover:bg-black-700 text-white font-semibold flex items-center gap-x-3 justify-center gap-2"
                        >
                            Enregistrer <ChevronRight className="w-5 h-5"/>
                        </Button>
                    </form>
                )}

            </SheetContent>
        </Sheet>
    );
};

