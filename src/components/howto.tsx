import {Globe, Car, Shield, MapPin, UserIcon, Package} from 'lucide-react';

interface Feature {
    id: number;
    title: string;
    description: string;
    icon: React.ReactNode;
}

const features: Feature[] = [
    {
        id: 1,
        title: "Cherchez un trajet",
        description: "Cherchez un trajet, rapide, simple et votre demande est prise en compte.",
        icon: <MapPin className="text-white" size={28} />
    },
    {
        id: 2,
        title: "Choisissez un transporteur",
        description: "Retrouvez les membres qui effectuent le trajet pour transporter votre objet.",
        icon: <UserIcon className="text-white" size={28} />
    },
    {
        id: 3,
        title: "Colis livré",
        description: "Votre colis est livré, laissez un avis sur votre messager et ajoutez le à vos contacts.",
        icon: <Package className="text-white" size={28} />
    }
];

export default function FeaturesSection() {
    return (
        <section className="container pb-5 mb-lg-3 mb-xl-4 mb-xxl-5">
            <div className="d-sm-flex md:!justify-start !justify-center md:!text-start !text-center gap-3 pb-3 mb-5 mb-sm-5">
                <h2 className="mb-sm-0 w-full">Comment ca marche</h2>
            </div>
            <div className="row gy-3 pb-sm-3 pb-md-4 pb-lg-5">
                {features.map((feature) => (
                    <div key={feature.id} className="col-sm-6 col-lg-4">
                        <div className="d-flex flex-column align-items-center mb-3">
                            <div className="flex-shrink-0 bg-primary rounded-circle p-2">
                                {feature.icon}
                            </div>
                            <h3 className="h5 fw-bolder ms-3 mt-4 mb-0">{feature.title}</h3>
                        </div>
                        <p className="fs-sm text-center">{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}