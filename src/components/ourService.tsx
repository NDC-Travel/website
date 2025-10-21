'use client'
import React from 'react';
import Link from "next/link";

interface Consultation {
    id: number;
    image: string;
    title: string;
    description: React.ReactNode;
    price: string;
    originalPrice: string;
}

const consultations: Consultation[] = [
    {
        id: 1,
        image: 'https://img.freepik.com/free-vector/flat-design-boarding-pass-template_23-2151021838.jpg?t=st=1759303998~exp=1759307598~hmac=5f75466ece8c95afdde57b7f238c669f8d75485fa20f7f7ba3b3cd5fe537c55c&w=2000',
        title: 'Billets d’avion à l’international',
        description: <ul className={'!p-0'}>
            <li>Réservation de vols pour toutes destinations.</li>
            <li>Tarifs compétitifs et offres spéciales.</li>
            <li>Conseils personnalisés pour optimiser vos voyages.</li>
        </ul>,
        price: '$50.00',
        originalPrice: '$75.00'
    },
    {
        id: 2,
        image: 'https://img.freepik.com/free-photo/close-up-delivery-person-giving-parcel-client_23-2149095913.jpg?t=st=1759304412~exp=1759308012~hmac=b46dd9d6f5aa4795362fd1915f92a9acff143d0e7d0430c53a3a72255e1d42e5&w=1480',
        title: 'Transport et expédition de colis',
        description: <ul className={'!p-0'}>
            <li>Envois sécurisés entre l’Europe, l’Afrique et les États-Unis.</li>
            <li>Respect strict des délais de livraison.</li>
            <li>Suivi et traçabilité de vos colis.</li>
        </ul>,
        price: '$35.00',
        originalPrice: '$45.00'
    },
    {
        id: 3,
        image: 'https://img.freepik.com/free-photo/warehouse-employees-putting-boxes-desk-ready-shipment_482257-77668.jpg?t=st=1759304574~exp=1759308174~hmac=b04c10f5469f648ab3792ceb54865be44921076ed4e4725f89c57d5d7238413c&w=1480',
        title: 'Import – Export',
        description: <ul className={'!p-0'}>
            <li>Accompagnement dans vos démarches commerciales internationales.</li>
            <li>Solutions fiables pour le transport de marchandises.</li>
            <li>Mise en relation avec des partenaires stratégiques.</li>
        </ul>,
        price: '$60.00',
        originalPrice: '$90.00'
    },
    {
        id: 4,
        image: 'https://img.freepik.com/free-photo/young-african-american-traveler-man-standing-with-suitcase-holding-air-tickets-clock-looking-worried-confused-orange-background_141793-22252.jpg?t=st=1759304615~exp=1759308215~hmac=c8072f8fb464579769beea1d64527d69bd4b578a5378b2d832ca0d786cc0f4e6&w=1480',
        title: 'Services complémentaires de voyage',
        description: <ul className={'!p-0'}>
            <li>Réservation d’hôtels et d’hébergements.</li>
            <li>Assistance pour les formalités de visa.</li>
            <li>Organisation de séjours touristiques et professionnels.</li>
        </ul>,
        price: '$50.00',
        originalPrice: '$75.00'
    },
    {
        id: 5,
        image: 'https://img.freepik.com/free-photo/top-view-hands-holding-travel-documents_23-2150433383.jpg?t=st=1759304661~exp=1759308261~hmac=d2e7a3c998d19d0b67b2f24e2d2de9a74d4571382462afe78b5d1286047389ad&w=1480',
        title: 'Assistance personnalisée',
        description: <ul className={'!p-0'}>
            <li>Service client disponible et réactif.</li>
            <li>Conseils adaptés à vos projets.</li>
            <li>Un interlocuteur unique pour simplifier vos démarches.</li>
        </ul>,
        price: '$35.00',
        originalPrice: '$45.00'
    }
];

export default function PopularConsultations() {
    return (
        <section className="container pt-2 pt-sm-3 pt-md-4 pt-lg-5 my-xxl-3 !mb-10 !pb-5">
            <div className="d-flex flex-col align-items-start justify-content-between gap-4 pt-5 pb-3 mb-2 mb-sm-3">
                <h2 className="h1 mb-0">Nos Services</h2>
                <p>
                    Chez NDC Travel, nous vous proposons une gamme complète de services adaptés à vos besoins en voyage et en logistique internationale :
                </p>
            </div>

            {/* Row of cards that turns into carousel on screens < 768px wide (md breakpoint) */}
            <div className="row row-cols-md-3  row-cols-1 gap-y-5">
                {consultations.map((consultation, index) => (
                    <div
                        key={consultation.id}
                        className={`h-auto`}
                        // style={{ width: '416px', marginRight: '24px' }}
                    >
                        <article className="card h-100 hover-effect-scale">
                            <div className="card-img-top bg-body-tertiary !bg-cover bg-no-repeat overflow-hidden" style={{ background: "url(" + consultation.image + ")"}}>
                                <div className="ratio hover-effect-target" style={{ '--fn-aspect-ratio': 'calc(230 / 416 * 100%)' } as React.CSSProperties}>
                                    {/*<img src={} className={''} alt="Image" />*/}
                                </div>
                            </div>
                            <div className="card-body p-3">
                                <h3 className="h4 pt-1 mb-2">
                                    <b>{consultation.title}</b>
                                </h3>
                                <p className="fs-sm mt-5">{consultation.description}</p>
                            </div>
                            <div className="card-footer d-flex flex-wrap justify-content-between gap-3 bg-transparent border-0 pt-1 pt-sm-2 pt-xl-3 pb-3 px-3">
                                <Link href="/dashboard" className="btn btn-primary position-relative w-full z-2">
                                    Commencez
                                </Link>
                            </div>
                        </article>
                    </div>
                ))}
            </div>
        </section>
    );
}