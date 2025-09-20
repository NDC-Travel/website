'use client'

import Link from 'next/link';
import { ShoppingBag, Package, Truck } from 'lucide-react';

interface CategoryCard {
    id: number;
    title: string;
    buttonText: string;
    buttonLink: string;
    bgColor: string;
    textColor: string;
    icon: React.ReactNode;
    image: string;
}

const categories: CategoryCard[] = [
    {
        id: 1,
        title: "Expédier un colis",
        buttonText: "Créer une expédition",
        buttonLink: "/expedier",
        bgColor: "bg-primary-subtle",
        textColor: "text-dark-emphasis",
        icon: <ShoppingBag className="text-dark-emphasis my-3 mt-sm-0" size={48} />,
        image: "/banner.jpg"
    },
    {
        id: 2,
        title: "Transporter des colis",
        buttonText: "Devenir transporteur",
        buttonLink: "/transporter",
        bgColor: "bg-info",
        textColor: "text-white",
        icon: <Truck className="text-white my-3 mt-sm-0" size={48} />,
        image: "/banner2.jpg"
    },
    {
        id: 3,
        title: "Suivi de colis",
        buttonText: "Suivre mon colis",
        buttonLink: "/suivi",
        bgColor: "bg-warning-subtle",
        textColor: "text-dark-emphasis",
        icon: <Package className="text-dark-emphasis my-3 mt-sm-0" size={48} />,
        image: "/banner3.jpg"
    }
];

export default function CategoryCardsSection() {
    return (
        <section className="container pt-2 pt-sm-3 pt-md-4 pt-lg-5 my-xxl-3">
            <div className="d-sm-flex justify-content-center gap-3 pb-3 mb-5 mb-sm-5">
                <h2 className="mb-sm-0">NDC Travels</h2>
            </div>
            {/* Responsive grid that becomes carousel-like on mobile */}
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 pb-5">
                {categories.map((category) => (
                    <div key={category.id} className="col">
                        <article className={`card hover-effect-scale ${category.bgColor} border-0 overflow-hidden text-center h-100`}>
                            <div className="card-body pt-sm-5 pb-3">
                                {category.icon}
                                <h3 className={`h5 mb-0 ${category.textColor}`}>
                                    {category.title}
                                </h3>
                            </div>
                            <div className="card-footer d-flex flex-column align-items-center gap-4 gap-sm-5 bg-transparent border-0 p-0">
                                <Link
                                    href={category.buttonLink}
                                    className="btn btn-dark stretched-link mx-4"
                                >
                                    {category.buttonText}
                                </Link>
                                <div
                                    className="ratio hover-effect-target mt-3 mt-sm-0"
                                    style={{ '--fn-aspect-ratio': 'calc(216 / 416 * 100%)' }}
                                >
                                    <img
                                        src={category.image}
                                        alt={category.title}
                                        onError={(e) => {
                                            e.currentTarget.src = `https://via.placeholder.com/416x216/6366f1/ffffff?text=${encodeURIComponent(category.title)}`;
                                        }}
                                    />
                                </div>
                            </div>
                        </article>
                    </div>
                ))}
            </div>
        </section>
    );
}