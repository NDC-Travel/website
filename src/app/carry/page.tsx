'use client'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, {useEffect, useRef, useState} from "react";
import {
    PackageIcon, Truck, ChevronRight, Calendar
} from "lucide-react";
import Breadcrumb from "@/components/nav";
import Link from "next/link";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import useGooglePlaces from '@/hooks/useGooglePlaces';
import { useSearchParams } from "next/navigation";

interface CarryData {
    id: string;
    weightAvailable: string;
    pricePerKg: string;
    paymentPeriod: string;
    meansTransport: string;
    tripDescription: string;
    isRoundTrip: boolean;
    outboundDepartureDate: string;
    outboundArrivalDate: string;
    returnDepartureDate: string;
    returnArrivalDate: string;
    origin: string;
    destination: string;
}

const ShipForm: React.FC<{ carryId?: string; initialData?: CarryData }> = ({ carryId, initialData }) => {
    const [form, setForm] = useState({
        weightAvailable: "",
        pricePerKg: "",
        paymentPeriod: "define",
        meansTransport: "plane",
        tripDescription: "",
        isRoundTrip: false,
        outboundDepartureDate: "",
        outboundArrivalDate: "",
        returnDepartureDate: "",
        returnArrivalDate: "",
        agreeTerms: false,
    });

    const [loading, setLoading] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    const router = useRouter();

    // Prefill form if initial data is provided (edit mode)
    useEffect(() => {
        if (initialData) {
            setForm({
                weightAvailable: initialData.weightAvailable || "",
                pricePerKg: initialData.pricePerKg || "",
                paymentPeriod: initialData.paymentPeriod || "define",
                meansTransport: initialData.meansTransport || "plane",
                tripDescription: initialData.tripDescription || "",
                isRoundTrip: initialData.isRoundTrip || false,
                outboundDepartureDate: initialData.outboundDepartureDate || "",
                outboundArrivalDate: initialData.outboundArrivalDate || "",
                returnDepartureDate: initialData.returnDepartureDate || "",
                returnArrivalDate: initialData.returnArrivalDate || "",
                agreeTerms: true, // Auto-check in edit mode
            });
            setIsEditMode(true);
        }
    }, [initialData]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type } = e.target;

        if (type === "checkbox") {
            const checked = (e.target as HTMLInputElement).checked;
            setForm((prev) => ({ ...prev, [name]: checked }));
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const origin = (document.getElementById('origin') as HTMLInputElement)?.value;
        const destination = (document.getElementById('destination') as HTMLInputElement)?.value;

        if (!origin || !destination) {
            alert("Veuillez saisir le départ et la destination.");
            return;
        }

        const { agreeTerms, ...formData } = form;
        const payload = { ...formData, origin, destination };

        try {
            setLoading(true);

            // Determine if we're creating or updating
            const url = isEditMode ? `/api/transport/${carryId}` : "/api/carry";
            const method = isEditMode ? "PUT" : "POST";

            const res = await fetch(url, {
                method: method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (res.ok) {
                // Redirect to dashboard page=trip
                router.push("/dashboard?page=trip");
            } else {
                alert(data.error || "Une erreur est survenue lors de l'enregistrement.");
            }
        } catch (error) {
            console.error(error);
            alert("Erreur réseau. Veuillez réessayer.");
        } finally {
            setLoading(false);
        }

    };

    return (
        <section className="position-relative !border-1 bg-body !rounded-[0.75rem] p-4">
            <div className="position-relative z-1 pb-md-2 px-md-2">
                <h2 className="h4 mb-3 mb-sm-4 text-primary">
                    {isEditMode ? "Modifier le Transporteur" : "Details du Transporteur"}
                </h2>

                <div className="row g-3 g-md-4 mb-3 mb-md-4">
                    {/* Weight Available */}
                    <div className="col-12">
                        <label htmlFor="weightAvailable" className="form-label">
                            Poids disponible *
                        </label>
                        <div className="input-group input-group-lg">
                            <input
                                type="number"
                                id="weightAvailable"
                                name="weightAvailable"
                                className="form-control"
                                placeholder="Entrez le poids"
                                min={0}
                                step="0.1"
                                value={form.weightAvailable}
                                onChange={handleChange}
                                required
                            />
                            <span className="input-group-text">kg</span>
                        </div>
                    </div>

                    {/* Price per Kg */}
                    <div className="col-12">
                        <label htmlFor="pricePerKg" className="form-label">
                            Prix par kg (€ /kg) *
                        </label>
                        <div className="input-group input-group-lg">
                            <input
                                type="number"
                                id="pricePerKg"
                                name="pricePerKg"
                                className="form-control"
                                placeholder="Entrez le prix"
                                min={0}
                                step="0.01"
                                value={form.pricePerKg}
                                onChange={handleChange}
                                required
                            />
                            <span className="input-group-text">€</span>
                        </div>
                    </div>

                    {/* Payment Period */}
                    <div className="col-12">
                        <label className="form-label">Période de paiement *</label>
                        <div className="d-flex flex-column gap-2">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="paymentPeriod"
                                    id="paymentDefine"
                                    value="define"
                                    checked={form.paymentPeriod === "define"}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label" htmlFor="paymentDefine">
                                    Définir avec l'intéressé
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="paymentPeriod"
                                    id="paymentBefore"
                                    value="before"
                                    checked={form.paymentPeriod === "before"}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label" htmlFor="paymentBefore">
                                    Avant la livraison
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="paymentPeriod"
                                    id="paymentAfter"
                                    value="after"
                                    checked={form.paymentPeriod === "after"}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label" htmlFor="paymentAfter">
                                    Après la livraison
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="paymentPeriod"
                                    id="paymentPart"
                                    value="part"
                                    checked={form.paymentPeriod === "part"}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label" htmlFor="paymentPart">
                                    Une partie du paiement avant la livraison, et l'autre après
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Means of Transport */}
                    <div className="col-12">
                        <label className="form-label">Moyen de transport *</label>
                        <div className="d-flex flex-column gap-2">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="meansTransport"
                                    id="transportPlane"
                                    value="plane"
                                    checked={form.meansTransport === "plane"}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label" htmlFor="transportPlane">
                                    ✈️ Avion
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="meansTransport"
                                    id="transportCar"
                                    value="car"
                                    checked={form.meansTransport === "car"}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label" htmlFor="transportCar">
                                    🚗 Voiture
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="meansTransport"
                                    id="transportVan"
                                    value="van"
                                    checked={form.meansTransport === "van"}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label" htmlFor="transportVan">
                                    🚐 Camionnette
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="meansTransport"
                                    id="transportTrain"
                                    value="train"
                                    checked={form.meansTransport === "train"}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label" htmlFor="transportTrain">
                                    🚂 Train
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="meansTransport"
                                    id="transportBus"
                                    value="bus"
                                    checked={form.meansTransport === "bus"}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label" htmlFor="transportBus">
                                    🚌 Bus
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="meansTransport"
                                    id="transportShip"
                                    value="ship"
                                    checked={form.meansTransport === "ship"}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label" htmlFor="transportShip">
                                    🚢 Fret maritime
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Trip Description */}
                    <div className="col-12">
                        <label htmlFor="tripDescription" className="form-label">
                            Description du trajet
                        </label>
                        <textarea
                            id="tripDescription"
                            name="tripDescription"
                            className="form-control form-control-lg"
                            rows={4}
                            placeholder="Décrivez votre trajet..."
                            value={form.tripDescription}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Round Trip Checkbox */}
                    <div className="col-12">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="isRoundTrip"
                                name="isRoundTrip"
                                checked={form.isRoundTrip}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="isRoundTrip">
                                Aller-retour
                            </label>
                        </div>
                    </div>

                    {/* Outbound Section */}
                    <div className="col-12">
                        <h5 className="mb-3">Aller</h5>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="outboundDepartureDate" className="form-label">
                            Date de départ *
                        </label>
                        <DatePicker
                            selected={form.outboundDepartureDate ? new Date(form.outboundDepartureDate) : null}
                            onChange={(date: Date | null) =>
                                setForm(prev => ({
                                    ...prev,
                                    outboundDepartureDate: date ? date.toISOString().split("T")[0] : ""
                                }))
                            }
                            dateFormat="yyyy-MM-dd"
                            className="form-control form-control-lg"
                            placeholderText="Sélectionnez la date de départ"
                            required
                        />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="outboundArrivalDate" className="form-label">
                            Date d'arrivée *
                        </label>
                        <DatePicker
                            selected={form.outboundArrivalDate ? new Date(form.outboundArrivalDate) : null}
                            onChange={(date: Date | null) =>
                                setForm(prev => ({
                                    ...prev,
                                    outboundArrivalDate: date ? date.toISOString().split("T")[0] : ""
                                }))
                            }
                            dateFormat="yyyy-MM-dd"
                            className="form-control form-control-lg"
                            placeholderText="Sélectionnez la date d'arrivée"
                            required
                        />
                    </div>

                    {/* Return Section - Only shown if round trip */}
                    {form.isRoundTrip && (
                        <>
                            <div className="col-12">
                                <h5 className="mb-3 mt-2">Retour</h5>
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="returnDepartureDate" className="form-label">
                                    Date de départ *
                                </label>
                                <DatePicker
                                    selected={form.returnDepartureDate ? new Date(form.returnDepartureDate) : null}
                                    onChange={(date: Date | null) =>
                                        setForm(prev => ({
                                            ...prev,
                                            returnDepartureDate: date ? date.toISOString().split("T")[0] : ""
                                        }))
                                    }
                                    dateFormat="yyyy-MM-dd"
                                    className="form-control form-control-lg"
                                    placeholderText="Sélectionnez la date de départ"
                                    required={form.isRoundTrip}
                                />
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="returnArrivalDate" className="form-label">
                                    Date d'arrivée *
                                </label>
                                <DatePicker
                                    selected={form.returnArrivalDate ? new Date(form.returnArrivalDate) : null}
                                    onChange={(date: Date | null) =>
                                        setForm(prev => ({
                                            ...prev,
                                            returnArrivalDate: date ? date.toISOString().split("T")[0] : ""
                                        }))
                                    }
                                    dateFormat="yyyy-MM-dd"
                                    className="form-control form-control-lg"
                                    placeholderText="Sélectionnez la date d'arrivée"
                                    required={form.isRoundTrip}
                                />
                            </div>
                        </>
                    )}

                    {/* Terms Agreement */}
                    <div className="col-12 mt-3">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="agreeTerms"
                                name="agreeTerms"
                                checked={form.agreeTerms}
                                onChange={handleChange}
                                required
                            />
                            <label className="form-check-label" htmlFor="agreeTerms">
                                J'accepte les{" "}
                                <Link href="/terms" className="text-primary">
                                    conditions générales
                                </Link>
                            </label>
                        </div>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={handleSubmit}
                    className="btn !font-bold btn-primary animate-shake mt-4 w-full h-[50px]"
                    disabled={!form.agreeTerms || loading}
                >
                    {loading ? (isEditMode ? "Mise à jour..." : "Enregistrement...") : (isEditMode ? "Mettre à jour" : "Enregistrer mon annonce")}
                    {!loading && <ChevronRight className="w-[20px] animate-target me-n2 ms-2" />}
                </button>

            </div>

            <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark rounded d-none d-block-dark"></div>
        </section>
    );
};


export default function Ship() {

    const { data: session, status } = useSession();
    const router = useRouter();

    const searchParams = useSearchParams();

    const originParam = searchParams.get("origin") || "";
    const destinationParam = searchParams.get("destination") || "";
    const carryId = searchParams.get("id") || "";

    const [carryData, setCarryData] = useState<CarryData | null>(null);
    const [loadingData, setLoadingData] = useState(false);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/auth/signin");
        }
    }, [status, router]);

    // Fetch carry data if id is present (edit mode)
    useEffect(() => {
        const fetchCarryData = async () => {
            if (!carryId) return;

            try {
                setLoadingData(true);
                const res = await fetch(`/api/transport/${carryId}`);

                if (res.ok) {
                    const data = await res.json();
                    setCarryData(data);
                } else {
                    alert("Impossible de charger les données du transporteur.");
                    router.push("/dashboard?page=trip");
                }
            } catch (error) {
                console.error("Error fetching carry data:", error);
                alert("Erreur lors du chargement des données.");
            } finally {
                setLoadingData(false);
            }
        };

        fetchCarryData();
    }, [carryId, router]);

    if (loadingData) {
        return (
            <main className={'content-wrapper'}>
                <div className="container py-5 text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Chargement...</span>
                    </div>
                    <p className="mt-3">Chargement des données...</p>
                </div>
            </main>
        );
    }

    return (
        <main className={'content-wrapper'}>

            <Breadcrumb
                items={[
                    {label: "Accueil", href: "/"},
                    {label: "Transport", href: "/carry"},
                    ...(carryId ? [{label: "Modifier", href: "#"}] : []),
                ]}
            />

            <section className={'container !mb-10 !pb-10'}>
                <div className={'row'}>
                    <div className={'col-lg-6 pb-3 pb-sm-0 mb-4 mb-sm-5 mb-lg-0'}>

                        <ShipForm carryId={carryId} initialData={carryData || undefined} />

                    </div>

                    <aside className={'col-lg-6 !mt-[-110px]'}>
                        <div className="position-sticky top-0" style={{paddingTop: "110px"}}>

                            {/* Route info card */}
                            <div className="card bg-body-tertiary border-0 p-sm-2 p-lg-0 p-xl-2 mb-4">
                                <div className="card-body">

                                    <h3 className="mb-5 text-xl md:text-2xl font-semibold !flex !items-center flex-wrap gap-2">
                                        Trajet du Colis
                                    </h3>

                                    <div className="d-flex gap-x-4 align-items-center position-relative mb-3">
                                        <LocationAutocomplete
                                            id="origin"
                                            label="Départ *"
                                            placeholder="Ville de départ"
                                            defaultValue={carryData?.origin || originParam}
                                            onSelect={(place) => console.log('Départ sélectionné:', place)}
                                        />
                                        <LocationAutocomplete
                                            id="destination"
                                            label="Destination *"
                                            placeholder="Ville d'arrivée"
                                            defaultValue={carryData?.destination || destinationParam}
                                            onSelect={(place) => console.log('Destination sélectionnée:', place)}
                                        />
                                    </div>

                                </div>
                            </div>

                            <div className="alert d-sm-flex !items-start alert-info pb-4 pt-sm-4" role="alert">
                                <PackageIcon className="!w-[10rem] !h-auto mt-1 mb-2 mb-sm-0"/>
                                <div className="ps-sm-3 pe-sm-4">
                                    <h4 className="alert-heading !text-[1.3rem] mb-2">
                                        {carryId ? "Modifier votre annonce" : "Passez une annonce pour expédier votre colis"}
                                    </h4>
                                    <hr className="opacity-25 my-3"/>
                                    <p className="mb-3">
                                        {carryId
                                            ? "Mettez à jour les informations de votre annonce de transport."
                                            : "Passez une annonce pour votre colis sur cet itinéraire. Les transporteurs vous contacteront."
                                        }
                                    </p>
                                </div>
                            </div>

                            <div className="bg-body-tertiary rounded p-4">
                                <div className="d-flex !gap-x-2 !w-full items-center">
                                    <div className="d-flex flex-col justify-content-between !gap-x-2 !w-full">
                                        <h6 className="mb-2">Vous souhaitez transporter un colis ?</h6>
                                        <p className="fs-sm !flex-1 mb-0">
                                            Vérifiez les colis disponibles pour cet itinéraire.
                                        </p>
                                    </div>
                                    <Link href="#" className="btn text-white !bg-[#094786] animate-shake me-2 h-[40px]">
                                        <PackageIcon className="w-[20px] animate-target ms-n2 me-2"/>
                                        Voir les colis
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

interface LocationAutocompleteProps {
    id: string;
    label: string;
    placeholder?: string;
    defaultValue?: string;
    onSelect: (place: google.maps.places.PlaceResult | null) => void;
}

export const LocationAutocomplete: React.FC<LocationAutocompleteProps> = ({
                                                                              id,
                                                                              label,
                                                                              placeholder,
                                                                              defaultValue,
                                                                              onSelect,
                                                                          }) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
    const [inputValue, setInputValue] = useState(defaultValue || "");
    const isLoaded = useGooglePlaces(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!);

    const handleMouseDown = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    useEffect(() => {
        if (isLoaded && inputRef.current && !autocompleteRef.current) {
            autocompleteRef.current = new google.maps.places.Autocomplete(inputRef.current!, {
                types: ["(cities)"],
                fields: ["place_id", "geometry", "formatted_address", "name"],
            });

            const container = document.querySelector(".pac-container");
            if (container) {
                container.setAttribute("data-headlessui-portal", "true");
                container.style.zIndex = "99999";
            }

            autocompleteRef.current.addListener("place_changed", () => {
                const place = autocompleteRef.current?.getPlace();
                if (place) {
                    setInputValue(place.formatted_address || "");
                    onSelect(place);
                }
            });
        }
    }, [isLoaded, onSelect]);

    useEffect(() => {
        setInputValue(defaultValue || "");
    }, [defaultValue]);

    return (
        <div className="pb-4 mb-2 w-full md:w-1/2" onMouseDown={handleMouseDown}>
            <label
                htmlFor={id}
                className="block mb-1 font-semibold text-gray-700"
            >
                {label}
            </label>
            <input
                ref={inputRef}
                id={id}
                type="text"
                placeholder={placeholder}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
};


















// 'use client'
//
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import React, {useEffect, useRef, useState} from "react";
// import {
//     PackageIcon, Truck, ChevronRight, Calendar
// } from "lucide-react";
// import Breadcrumb from "@/components/nav";
// import Link from "next/link";
// import {useSession} from "next-auth/react";
// import {useRouter} from "next/navigation";
// import useGooglePlaces from '@/hooks/useGooglePlaces';
// import { useSearchParams } from "next/navigation";
//
// const ShipForm: React.FC = () => {
//     const [form, setForm] = useState({
//         weightAvailable: "",
//         pricePerKg: "",
//         paymentPeriod: "define",
//         meansTransport: "plane",
//         tripDescription: "",
//         isRoundTrip: false,
//         outboundDepartureDate: "",
//         outboundArrivalDate: "",
//         returnDepartureDate: "",
//         returnArrivalDate: "",
//         agreeTerms: false,
//     });
//
//     const [loading, setLoading] = useState(false);
//
//     const router = useRouter();
//
//     const handleChange = (
//         e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
//     ) => {
//         const { name, value, type } = e.target;
//
//         if (type === "checkbox") {
//             const checked = (e.target as HTMLInputElement).checked;
//             setForm((prev) => ({ ...prev, [name]: checked }));
//         } else {
//             setForm((prev) => ({ ...prev, [name]: value }));
//         }
//     };
//
//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//
//         const origin = (document.getElementById('origin') as HTMLInputElement)?.value;
//         const destination = (document.getElementById('destination') as HTMLInputElement)?.value;
//
//         if (!origin || !destination) {
//             alert("Veuillez saisir le départ et la destination.");
//             return;
//         }
//
//         const payload = { ...form, origin, destination };
//
//         try {
//             setLoading(true); // Start loading
//             const res = await fetch("/api/carry", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(payload),
//             });
//
//             const data = await res.json();
//
//             if (res.ok) {
//                 // Redirect to dashboard page=trip
//                 router.push("/dashboard?page=trip");
//             } else {
//                 alert(data.error || "Une erreur est survenue lors de l'enregistrement.");
//             }
//         } catch (error) {
//             console.error(error);
//             alert("Erreur réseau. Veuillez réessayer.");
//         } finally {
//             setLoading(false); // Stop loading
//         }
//     };
//
//     return (
//         <section className="position-relative !border-1 bg-body !rounded-[0.75rem] p-4">
//             <div className="position-relative z-1 pb-md-2 px-md-2">
//                 <h2 className="h4 mb-3 mb-sm-4 text-primary">Details du Transporteur</h2>
//
//                 <div className="row g-3 g-md-4 mb-3 mb-md-4">
//                     {/* Weight Available */}
//                     <div className="col-12">
//                         <label htmlFor="weightAvailable" className="form-label">
//                             Poids disponible *
//                         </label>
//                         <div className="input-group input-group-lg">
//                             <input
//                                 type="number"
//                                 id="weightAvailable"
//                                 name="weightAvailable"
//                                 className="form-control"
//                                 placeholder="Entrez le poids"
//                                 min={0}
//                                 step="0.1"
//                                 value={form.weightAvailable}
//                                 onChange={handleChange}
//                                 required
//                             />
//                             <span className="input-group-text">kg</span>
//                         </div>
//                     </div>
//
//                     {/* Price per Kg */}
//                     <div className="col-12">
//                         <label htmlFor="pricePerKg" className="form-label">
//                             Prix par kg (€ /kg) *
//                         </label>
//                         <div className="input-group input-group-lg">
//                             <input
//                                 type="number"
//                                 id="pricePerKg"
//                                 name="pricePerKg"
//                                 className="form-control"
//                                 placeholder="Entrez le prix"
//                                 min={0}
//                                 step="0.01"
//                                 value={form.pricePerKg}
//                                 onChange={handleChange}
//                                 required
//                             />
//                             <span className="input-group-text">€</span>
//                         </div>
//                     </div>
//
//                     {/* Payment Period */}
//                     <div className="col-12">
//                         <label className="form-label">Période de paiement *</label>
//                         <div className="d-flex flex-column gap-2">
//                             <div className="form-check">
//                                 <input
//                                     className="form-check-input"
//                                     type="radio"
//                                     name="paymentPeriod"
//                                     id="paymentDefine"
//                                     value="define"
//                                     checked={form.paymentPeriod === "define"}
//                                     onChange={handleChange}
//                                 />
//                                 <label className="form-check-label" htmlFor="paymentDefine">
//                                     Définir avec l'intéressé
//                                 </label>
//                             </div>
//                             <div className="form-check">
//                                 <input
//                                     className="form-check-input"
//                                     type="radio"
//                                     name="paymentPeriod"
//                                     id="paymentBefore"
//                                     value="before"
//                                     checked={form.paymentPeriod === "before"}
//                                     onChange={handleChange}
//                                 />
//                                 <label className="form-check-label" htmlFor="paymentBefore">
//                                     Avant la livraison
//                                 </label>
//                             </div>
//                             <div className="form-check">
//                                 <input
//                                     className="form-check-input"
//                                     type="radio"
//                                     name="paymentPeriod"
//                                     id="paymentAfter"
//                                     value="after"
//                                     checked={form.paymentPeriod === "after"}
//                                     onChange={handleChange}
//                                 />
//                                 <label className="form-check-label" htmlFor="paymentAfter">
//                                     Après la livraison
//                                 </label>
//                             </div>
//                             <div className="form-check">
//                                 <input
//                                     className="form-check-input"
//                                     type="radio"
//                                     name="paymentPeriod"
//                                     id="paymentPart"
//                                     value="part"
//                                     checked={form.paymentPeriod === "part"}
//                                     onChange={handleChange}
//                                 />
//                                 <label className="form-check-label" htmlFor="paymentPart">
//                                     Une partie du paiement avant la livraison, et l'autre après
//                                 </label>
//                             </div>
//                         </div>
//                     </div>
//
//                     {/* Means of Transport */}
//                     <div className="col-12">
//                         <label className="form-label">Moyen de transport *</label>
//                         <div className="d-flex flex-column gap-2">
//                             <div className="form-check">
//                                 <input
//                                     className="form-check-input"
//                                     type="radio"
//                                     name="meansTransport"
//                                     id="transportPlane"
//                                     value="plane"
//                                     checked={form.meansTransport === "plane"}
//                                     onChange={handleChange}
//                                 />
//                                 <label className="form-check-label" htmlFor="transportPlane">
//                                     ✈️ Avion
//                                 </label>
//                             </div>
//                             <div className="form-check">
//                                 <input
//                                     className="form-check-input"
//                                     type="radio"
//                                     name="meansTransport"
//                                     id="transportCar"
//                                     value="car"
//                                     checked={form.meansTransport === "car"}
//                                     onChange={handleChange}
//                                 />
//                                 <label className="form-check-label" htmlFor="transportCar">
//                                     🚗 Voiture
//                                 </label>
//                             </div>
//                             <div className="form-check">
//                                 <input
//                                     className="form-check-input"
//                                     type="radio"
//                                     name="meansTransport"
//                                     id="transportVan"
//                                     value="van"
//                                     checked={form.meansTransport === "van"}
//                                     onChange={handleChange}
//                                 />
//                                 <label className="form-check-label" htmlFor="transportVan">
//                                     🚐 Camionnette
//                                 </label>
//                             </div>
//                             <div className="form-check">
//                                 <input
//                                     className="form-check-input"
//                                     type="radio"
//                                     name="meansTransport"
//                                     id="transportTrain"
//                                     value="train"
//                                     checked={form.meansTransport === "train"}
//                                     onChange={handleChange}
//                                 />
//                                 <label className="form-check-label" htmlFor="transportTrain">
//                                     🚂 Train
//                                 </label>
//                             </div>
//                             <div className="form-check">
//                                 <input
//                                     className="form-check-input"
//                                     type="radio"
//                                     name="meansTransport"
//                                     id="transportBus"
//                                     value="bus"
//                                     checked={form.meansTransport === "bus"}
//                                     onChange={handleChange}
//                                 />
//                                 <label className="form-check-label" htmlFor="transportBus">
//                                     🚌 Bus
//                                 </label>
//                             </div>
//                             <div className="form-check">
//                                 <input
//                                     className="form-check-input"
//                                     type="radio"
//                                     name="meansTransport"
//                                     id="transportShip"
//                                     value="ship"
//                                     checked={form.meansTransport === "ship"}
//                                     onChange={handleChange}
//                                 />
//                                 <label className="form-check-label" htmlFor="transportShip">
//                                     🚢 Fret maritime
//                                 </label>
//                             </div>
//                         </div>
//                     </div>
//
//                     {/* Trip Description */}
//                     <div className="col-12">
//                         <label htmlFor="tripDescription" className="form-label">
//                             Description du trajet
//                         </label>
//                         <textarea
//                             id="tripDescription"
//                             name="tripDescription"
//                             className="form-control form-control-lg"
//                             rows={4}
//                             placeholder="Décrivez votre trajet..."
//                             value={form.tripDescription}
//                             onChange={handleChange}
//                         />
//                     </div>
//
//                     {/* Round Trip Checkbox */}
//                     <div className="col-12">
//                         <div className="form-check">
//                             <input
//                                 className="form-check-input"
//                                 type="checkbox"
//                                 id="isRoundTrip"
//                                 name="isRoundTrip"
//                                 checked={form.isRoundTrip}
//                                 onChange={handleChange}
//                             />
//                             <label className="form-check-label" htmlFor="isRoundTrip">
//                                 Aller-retour
//                             </label>
//                         </div>
//                     </div>
//
//                     {/* Outbound Section */}
//                     <div className="col-12">
//                         <h5 className="mb-3">Aller</h5>
//                     </div>
//
//                     <div className="col-md-6">
//                         <label htmlFor="outboundDepartureDate" className="form-label">
//                             Date de départ *
//                         </label>
//                         <DatePicker
//                             selected={form.outboundDepartureDate ? new Date(form.outboundDepartureDate) : null}
//                             onChange={(date: Date | null) =>
//                                 setForm(prev => ({
//                                     ...prev,
//                                     outboundDepartureDate: date ? date.toISOString().split("T")[0] : ""
//                                 }))
//                             }
//                             dateFormat="yyyy-MM-dd"
//                             className="form-control form-control-lg"
//                             placeholderText="Sélectionnez la date de départ"
//                             required
//                         />
//                     </div>
//
//                     <div className="col-md-6">
//                         <label htmlFor="outboundArrivalDate" className="form-label">
//                             Date d'arrivée *
//                         </label>
//                         <DatePicker
//                             selected={form.outboundArrivalDate ? new Date(form.outboundArrivalDate) : null}
//                             onChange={(date: Date | null) =>
//                                 setForm(prev => ({
//                                     ...prev,
//                                     outboundArrivalDate: date ? date.toISOString().split("T")[0] : ""
//                                 }))
//                             }
//                             dateFormat="yyyy-MM-dd"
//                             className="form-control form-control-lg"
//                             placeholderText="Sélectionnez la date d'arrivée"
//                             required
//                         />
//                     </div>
//
//                     {/* Return Section - Only shown if round trip */}
//                     {form.isRoundTrip && (
//                         <>
//                             <div className="col-12">
//                                 <h5 className="mb-3 mt-2">Retour</h5>
//                             </div>
//
//                             <div className="col-md-6">
//                                 <label htmlFor="returnDepartureDate" className="form-label">
//                                     Date de départ *
//                                 </label>
//                                 <DatePicker
//                                     selected={form.returnDepartureDate ? new Date(form.returnDepartureDate) : null}
//                                     onChange={(date: Date | null) =>
//                                         setForm(prev => ({
//                                             ...prev,
//                                             returnDepartureDate: date ? date.toISOString().split("T")[0] : ""
//                                         }))
//                                     }
//                                     dateFormat="yyyy-MM-dd"
//                                     className="form-control form-control-lg"
//                                     placeholderText="Sélectionnez la date de départ"
//                                     required={form.isRoundTrip}
//                                 />
//                             </div>
//
//                             <div className="col-md-6">
//                                 <label htmlFor="returnArrivalDate" className="form-label">
//                                     Date d'arrivée *
//                                 </label>
//                                 <DatePicker
//                                     selected={form.returnArrivalDate ? new Date(form.returnArrivalDate) : null}
//                                     onChange={(date: Date | null) =>
//                                         setForm(prev => ({
//                                             ...prev,
//                                             returnArrivalDate: date ? date.toISOString().split("T")[0] : ""
//                                         }))
//                                     }
//                                     dateFormat="yyyy-MM-dd"
//                                     className="form-control form-control-lg"
//                                     placeholderText="Sélectionnez la date d'arrivée"
//                                     required={form.isRoundTrip}
//                                 />
//                             </div>
//                         </>
//                     )}
//
//                     {/* Terms Agreement */}
//                     <div className="col-12 mt-3">
//                         <div className="form-check">
//                             <input
//                                 className="form-check-input"
//                                 type="checkbox"
//                                 id="agreeTerms"
//                                 name="agreeTerms"
//                                 checked={form.agreeTerms}
//                                 onChange={handleChange}
//                                 required
//                             />
//                             <label className="form-check-label" htmlFor="agreeTerms">
//                                 J'accepte les{" "}
//                                 <Link href="/terms" className="text-primary">
//                                     conditions générales
//                                 </Link>
//                             </label>
//                         </div>
//                     </div>
//                 </div>
//
//                 <button
//                     type="button"
//                     onClick={handleSubmit}
//                     className="btn !font-bold btn-primary animate-shake mt-4 w-full h-[50px]"
//                     disabled={!form.agreeTerms || loading}
//                 >
//                     {loading ? "Enregistrement..." : "Enregistrer mon annonce"}
//                     {!loading && <ChevronRight className="w-[20px] animate-target me-n2 ms-2" />}
//                 </button>
//
//             </div>
//
//             <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark rounded d-none d-block-dark"></div>
//         </section>
//     );
// };
//
//
// export default function Ship() {
//
//     const { data: session, status, update } = useSession();
//     const router = useRouter();
//
//     const searchParams = useSearchParams();
//
//     const originParam = searchParams.get("origin") || "";
//     const destinationParam = searchParams.get("destination") || "";
//
//     useEffect(() => {
//         if (status === "unauthenticated") {
//             router.push("/auth/signin");
//         }
//     }, [status, router]);
//
//     return (
//         <main className={'content-wrapper'}>
//
//             <Breadcrumb
//                 items={[
//                     {label: "Accueil", href: "/"},
//                     {label: "Transport", href: "/carry"},
//                 ]}
//             />
//
//             <section className={'container !mb-10 !pb-10'}>
//                 <div className={'row'}>
//                     <div className={'col-lg-6 pb-3 pb-sm-0 mb-4 mb-sm-5 mb-lg-0'}>
//
//                         <ShipForm />
//
//                     </div>
//
//                     <aside className={'col-lg-6 !mt-[-110px]'}>
//                         <div className="position-sticky top-0" style={{paddingTop: "110px"}}>
//
//                             {/* Route info card */}
//                             <div className="card bg-body-tertiary border-0 p-sm-2 p-lg-0 p-xl-2 mb-4">
//                                 <div className="card-body">
//
//                                     <h3 className="mb-5 text-xl md:text-2xl font-semibold !flex !items-center flex-wrap gap-2">
//                                         Trajet du Colis
//                                     </h3>
//
//                                     <div className="d-flex gap-x-4 align-items-center position-relative mb-3">
//                                         <LocationAutocomplete
//                                             id="origin"
//                                             label="Départ *"
//                                             placeholder="Ville de départ"
//                                             defaultValue={originParam}
//                                             onSelect={(place) => console.log('Départ sélectionné:', place)}
//                                         />
//                                         <LocationAutocomplete
//                                             id="destination"
//                                             label="Destination *"
//                                             placeholder="Ville d'arrivée"
//                                             defaultValue={destinationParam}
//                                             onSelect={(place) => console.log('Destination sélectionnée:', place)}
//                                         />
//                                     </div>
//
//                                 </div>
//                             </div>
//
//                             <div className="alert d-sm-flex !items-start alert-info pb-4 pt-sm-4" role="alert">
//                                 <PackageIcon className="!w-[10rem] !h-auto mt-1 mb-2 mb-sm-0"/>
//                                 <div className="ps-sm-3 pe-sm-4">
//                                     <h4 className="alert-heading !text-[1.3rem] mb-2">Passez une annonce pour expédier votre colis</h4>
//                                     <hr className="opacity-25 my-3"/>
//                                     <p className="mb-3">Passez une annonce pour votre colis sur cet itinéraire. Les transporteurs vous contacteront.</p>
//                                 </div>
//                             </div>
//
//                             <div className="bg-body-tertiary rounded p-4">
//                                 <div className="d-flex !gap-x-2 !w-full items-center">
//                                     <div className="d-flex flex-col justify-content-between !gap-x-2 !w-full">
//                                         <h6 className="mb-2">Vous souhaitez transporter un colis ?</h6>
//                                         <p className="fs-sm !flex-1 mb-0">
//                                             Vérifiez les colis disponibles pour cet itinéraire.
//                                         </p>
//                                     </div>
//                                     <Link href="#" className="btn text-white !bg-[#094786] animate-shake me-2 h-[40px]">
//                                         <PackageIcon className="w-[20px] animate-target ms-n2 me-2"/>
//                                         Voir les colis
//                                     </Link>
//                                 </div>
//                             </div>
//
//                         </div>
//                     </aside>
//                 </div>
//
//             </section>
//
//         </main>
//     );
// }
//
// interface LocationAutocompleteProps {
//     id: string;
//     label: string;
//     placeholder?: string;
//     defaultValue?: string;
//     onSelect: (place: google.maps.places.PlaceResult | null) => void;
// }
//
// export const LocationAutocomplete: React.FC<LocationAutocompleteProps> = ({
//                                                                               id,
//                                                                               label,
//                                                                               placeholder,
//                                                                               defaultValue,
//                                                                               onSelect,
//                                                                           }) => {
//     const inputRef = useRef<HTMLInputElement | null>(null);
//     const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
//     const [inputValue, setInputValue] = useState(defaultValue || "");
//     const isLoaded = useGooglePlaces(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!);
//
//     // 🧠 Prevent sheet close when selecting
//     const handleMouseDown = (e: React.MouseEvent) => {
//         e.stopPropagation();
//     };
//
//     useEffect(() => {
//         if (isLoaded && inputRef.current && !autocompleteRef.current) {
//             autocompleteRef.current = new google.maps.places.Autocomplete(inputRef.current!, {
//                 types: ["(cities)"],
//                 fields: ["place_id", "geometry", "formatted_address", "name"],
//             });
//
//             // 👇 attach dropdown to body to avoid z-index/focus trap issues
//             const container = document.querySelector(".pac-container");
//             if (container) {
//                 container.setAttribute("data-headlessui-portal", "true");
//                 container.style.zIndex = "99999";
//             }
//
//             autocompleteRef.current.addListener("place_changed", () => {
//                 const place = autocompleteRef.current?.getPlace();
//                 if (place) {
//                     setInputValue(place.formatted_address || "");
//                     onSelect(place);
//                 }
//             });
//         }
//     }, [isLoaded, onSelect]);
//
//     useEffect(() => {
//         setInputValue(defaultValue || "");
//     }, [defaultValue]);
//
//     return (
//         <div className="pb-4 mb-2 w-full md:w-1/2" onMouseDown={handleMouseDown}>
//             <label
//                 htmlFor={id}
//                 className="block mb-1 font-semibold text-gray-700"
//             >
//                 {label}
//             </label>
//             <input
//                 ref={inputRef}
//                 id={id}
//                 type="text"
//                 placeholder={placeholder}
//                 value={inputValue}
//                 onChange={(e) => setInputValue(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//         </div>
//     );
// };
//
//
// // export const LocationAutocomplete: React.FC<LocationAutocompleteProps> = ({
// //                                                                               id,
// //                                                                               label,
// //                                                                               placeholder,
// //                                                                               defaultValue,
// //                                                                               onSelect
// //                                                                           }) => {
// //     const inputRef = useRef<HTMLInputElement | null>(null);
// //     const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
// //     const isLoaded = useGooglePlaces(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!);
// //
// //     useEffect(() => {
// //         if (isLoaded && inputRef.current && !autocompleteRef.current) {
// //             autocompleteRef.current = new google.maps.places.Autocomplete(inputRef.current!, {
// //                 types: ['(cities)'],
// //                 fields: ['place_id', 'geometry', 'formatted_address', 'name']
// //             });
// //
// //             autocompleteRef.current.addListener("place_changed", () => {
// //                 const place = autocompleteRef.current?.getPlace();
// //                 if (place) {
// //                     setInputValue(place.formatted_address || "");
// //                     onSelect(place);
// //                 }
// //             });
// //         }
// //     }, [isLoaded, onSelect]);
// //
// //     const [inputValue, setInputValue] = useState(defaultValue || "");
// //
// //     useEffect(() => {
// //         setInputValue(defaultValue || "");
// //     }, [defaultValue]);
// //
// //     return (
// //         <div className="pb-4 mb-2 w-full">
// //             <label htmlFor={id} className="form-label">{label}</label>
// //             <input
// //                 ref={inputRef}
// //                 id={id}
// //                 type="text"
// //                 className="form-control form-control-lg"
// //                 placeholder={placeholder}
// //                 value={inputValue}
// //                 onChange={(e) => setInputValue(e.target.value)}
// //             />
// //         </div>
// //     );
// // };