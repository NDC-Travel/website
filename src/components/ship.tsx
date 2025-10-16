'use client';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, {use, useEffect, useRef, useState} from "react";
import {
    PackageIcon, Truck, ChevronRight, Upload, X
} from "lucide-react";
import Breadcrumb from "@/components/nav";
import Link from "next/link";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import useGooglePlaces from '@/hooks/useGooglePlaces';
import { useSearchParams } from "next/navigation";

interface PackageData {
    id: string;
    packageContents: string;
    width: string;
    height: string;
    length: string;
    weight: string;
    participationAllowance: string;
    shippingDeadline: string;
    parcelDetails: string;
    origin: string;
    destination: string;
}

const PackageForm: React.FC<{ packageId?: string; initialData?: PackageData }> = ({ packageId, initialData }) => {
    const [form, setForm] = useState({
        packageContents: "",
        width: "",
        height: "",
        length: "",
        weight: "",
        participationAllowance: "",
        shippingDeadline: "",
        parcelDetails: "",
        agreeTerms: false,
    });

    const [loading, setLoading] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const router = useRouter();

    // Prefill form if initial data is provided (edit mode)
    useEffect(() => {
        if (initialData) {
            setForm({
                packageContents: initialData.packageContents || "",
                width: initialData.width || "",
                height: initialData.height || "",
                length: initialData.length || "",
                weight: initialData.weight || "",
                participationAllowance: initialData.participationAllowance || "",
                shippingDeadline: initialData.shippingDeadline || "",
                parcelDetails: initialData.parcelDetails || "",
                agreeTerms: true,
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

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setSelectedImage(null);
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
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

        // Create FormData for file upload
        const formData = new FormData();

        // Remove agreeTerms and add other fields
        const { agreeTerms, ...formFields } = form;

        Object.entries(formFields).forEach(([key, value]) => {
            formData.append(key, value);
        });

        formData.append('origin', origin);
        formData.append('destination', destination);

        if (selectedImage) {
            formData.append('image', selectedImage);
        }

        try {
            setLoading(true);

            const url = isEditMode ? `/api/package/${packageId}` : "/api/package";
            const method = isEditMode ? "PUT" : "POST";

            const res = await fetch(url, {
                method: method,
                body: formData,
            });

            const data = await res.json();

            if (res.ok) {
                router.push("/dashboard?page=package");
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
                    {isEditMode ? "Modifier le Colis" : "Spécifications du Colis"}
                </h2>

                <div className="rounded overflow-hidden my-5">
                    <img src="/dim.jpg" alt="Package Dimensions" className="w-full"/>
                </div>

                <div className="row g-3 g-md-4 mb-3 mb-md-4">
                    {/* Package Contents */}
                    <div className="col-12">
                        <label htmlFor="packageContents" className="form-label">
                            Contenu du colis *
                        </label>
                        <input
                            type="text"
                            id="packageContents"
                            name="packageContents"
                            className="form-control form-control-lg"
                            placeholder="Décrivez le contenu du colis"
                            value={form.packageContents}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Width */}
                    <div className="col-md-4">
                        <label htmlFor="width" className="form-label">
                            Largeur *
                        </label>
                        <div className="input-group input-group-lg">
                            <input
                                type="number"
                                id="width"
                                name="width"
                                className="form-control"
                                placeholder="Largeur"
                                min={0}
                                step="0.1"
                                value={form.width}
                                onChange={handleChange}
                                required
                            />
                            <span className="input-group-text">cm</span>
                        </div>
                    </div>

                    {/* Height */}
                    <div className="col-md-4">
                        <label htmlFor="height" className="form-label">
                            Hauteur *
                        </label>
                        <div className="input-group input-group-lg">
                            <input
                                type="number"
                                id="height"
                                name="height"
                                className="form-control"
                                placeholder="Hauteur"
                                min={0}
                                step="0.1"
                                value={form.height}
                                onChange={handleChange}
                                required
                            />
                            <span className="input-group-text">cm</span>
                        </div>
                    </div>

                    {/* Length */}
                    <div className="col-md-4">
                        <label htmlFor="length" className="form-label">
                            Longueur *
                        </label>
                        <div className="input-group input-group-lg">
                            <input
                                type="number"
                                id="length"
                                name="length"
                                className="form-control"
                                placeholder="Longueur"
                                min={0}
                                step="0.1"
                                value={form.length}
                                onChange={handleChange}
                                required
                            />
                            <span className="input-group-text">cm</span>
                        </div>
                    </div>

                    {/* Weight */}
                    <div className="col-12">
                        <label htmlFor="weight" className="form-label">
                            Poids du colis en Kg *
                        </label>
                        <div className="input-group input-group-lg">
                            <input
                                type="number"
                                id="weight"
                                name="weight"
                                className="form-control"
                                placeholder="Entrez le poids"
                                min={0}
                                step="0.1"
                                value={form.weight}
                                onChange={handleChange}
                                required
                            />
                            <span className="input-group-text">kg</span>
                        </div>
                    </div>

                    {/* Participation Allowance */}
                    <div className="col-12">
                        <label htmlFor="participationAllowance" className="form-label">
                            Participation que vous proposez pour envoyer le colis *
                        </label>
                        <div className="input-group input-group-lg">
                            <input
                                type="number"
                                id="participationAllowance"
                                name="participationAllowance"
                                className="form-control"
                                placeholder="Montant de la participation"
                                min={0}
                                step="0.01"
                                value={form.participationAllowance}
                                onChange={handleChange}
                                required
                            />
                            <span className="input-group-text">€</span>
                        </div>
                    </div>

                    {/* Shipping Deadline */}
                    <div className="col-12">
                        <label htmlFor="shippingDeadline" className="form-label">
                            Date limite d&#39;expédition *
                        </label>
                        <DatePicker
                            selected={form.shippingDeadline ? new Date(form.shippingDeadline) : null}
                            onChange={(date: Date | null) =>
                                setForm(prev => ({
                                    ...prev,
                                    shippingDeadline: date ? date.toISOString().split("T")[0] : ""
                                }))
                            }
                            dateFormat="dd-MM-yyyy"
                            className="form-control form-control-lg w-full"
                            placeholderText="Sélectionnez la date"
                            minDate={new Date()}
                            required
                        />
                    </div>

                    {/* Parcel Details */}
                    <div className="col-12">
                        <label htmlFor="parcelDetails" className="form-label">
                            Détails du colis *
                        </label>
                        <textarea
                            id="parcelDetails"
                            name="parcelDetails"
                            className="form-control form-control-lg"
                            rows={4}
                            placeholder="Ajoutez des détails supplémentaires sur votre colis..."
                            value={form.parcelDetails}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Parcel Image */}
                    <div className="col-12">
                        <label className="form-label">Image du colis</label>
                        {
                            isEditMode && initialData?.imageUrl && (
                                <div className="position-relative my-3">
                                    <img
                                        src={initialData?.imageUrl}
                                        alt="Preview"
                                        className="rounded"
                                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                    />
                                </div>
                            )
                        }
                        <div className="d-flex align-items-center gap-3">
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageSelect}
                                className="d-none"
                                id="parcelImage"
                            />
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="btn btn-primary d-flex align-items-center gap-2"
                            >
                                <Upload className="w-5 h-5" />
                                Ajouter une image
                            </button>

                            {imagePreview && (
                                <div className="position-relative">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="rounded"
                                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                    />
                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className="btn btn-danger btn-sm position-absolute top-0 end-0 rounded-circle"
                                        style={{ width: '25px', height: '25px', padding: '0' }}
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

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
                    {loading ? (isEditMode ? "Mise à jour..." : "Enregistrement...") : (isEditMode ? "Mettre à jour le colis" : "Envoyer le colis")}
                    {!loading && <ChevronRight className="w-[20px] animate-target me-n2 ms-2" />}
                </button>

            </div>

            <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark rounded d-none d-block-dark"></div>
        </section>
    );
};


export default function SendPackage({
                                        searchParams,
                                    }: {
    searchParams: Promise<{ origin?: string, id?: string, destination?: string }>
}) {

    const { data: session, status } = useSession();
    const router = useRouter();

    const params = use(searchParams)

    const originParam = params.origin || "";
    const destinationParam = params.destination || "";
    const packageId = params.id || "";

    const [packageData, setPackageData] = useState<PackageData | null>(null);
    const [loadingData, setLoadingData] = useState(false);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/auth/signin");
        }
    }, [status, router]);

    useEffect(() => {
        const fetchPackageData = async () => {
            if (!packageId) return;

            try {
                setLoadingData(true);
                const res = await fetch(`/api/package/${packageId}`);

                if (res.ok) {
                    const data = await res.json();
                    setPackageData(data);
                } else {
                    alert("Impossible de charger les données du colis.");
                    router.push("/package");
                }
            } catch (error) {
                console.error("Error fetching package data:", error);
                alert("Erreur lors du chargement des données.");
            } finally {
                setLoadingData(false);
            }
        };

        fetchPackageData();
    }, [packageId, router]);

    const [route, setRoute] = useState("/carrier");

    useEffect(() => {
        const urlParams = new URLSearchParams();

        // Use only string values, not the full object
        if (params.origin) urlParams.set("origin", params.origin || "");
        if (params.destination) urlParams.set("destination", params.destination || "");

        setRoute(`/carrier?${urlParams.toString()}`);
    }, [params]);

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
                    {label: "Colis", href: "/package"},
                    ...(packageId ? [{label: "Modifier", href: "#"}] : []),
                ]}
            />

            <section className={'container !mb-10 !pb-10'}>
                <div className={'row'}>
                    <div className={'col-lg-6 pb-3 pb-sm-0 mb-4 mb-sm-5 mb-lg-0'}>

                        <PackageForm packageId={packageId} initialData={packageData || undefined} />

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
                                            defaultValue={packageData?.origin || originParam}
                                            onSelect={(place) => console.log('Départ sélectionné:', place)}
                                        />
                                        <LocationAutocomplete
                                            id="destination"
                                            label="Destination *"
                                            placeholder="Ville d'arrivée"
                                            defaultValue={packageData?.destination || destinationParam}
                                            onSelect={(place) => console.log('Destination sélectionnée:', place)}
                                        />
                                    </div>

                                </div>
                            </div>

                            <div className="alert d-sm-flex !items-start alert-info pb-4 pt-sm-4" role="alert">
                                <PackageIcon className="!w-[10rem] !h-auto mt-1 mb-2 mb-sm-0"/>
                                <div className="ps-sm-3 pe-sm-4">
                                    <h4 className="alert-heading !text-[1.3rem] mb-2">
                                        {packageId ? "Modifier votre colis" : "Passez une annonce pour expédier votre colis"}
                                    </h4>
                                    <hr className="opacity-25 my-3"/>
                                    <p className="mb-3">
                                        {packageId
                                            ? "Mettez à jour les informations de votre colis."
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
                                            Vérifiez les transporteurs disponibles pour cet itinéraire.
                                        </p>
                                    </div>
                                    <Link href={route} className="btn text-white !bg-[#094786] animate-shake me-2 h-[40px]">
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

interface LocationAutocompleteProps {
    id: string;
    label: string;
    placeholder?: string;
    defaultValue?: string;
    onSelect: (place: google.maps.places.PlaceResult | null) => void;
    full?: boolean;
}

export const LocationAutocomplete: React.FC<LocationAutocompleteProps> = ({
                                                                              id,
                                                                              label,
                                                                              placeholder,
                                                                              defaultValue,
                                                                              onSelect, full
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
        <div className={"pb-4 mb-2 w-full " + full ? "md:w-full" : "md:w-1/2"} onMouseDown={handleMouseDown}>
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