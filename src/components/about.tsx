'use client'

import React from 'react';

interface Principle {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    aspectRatios: {
        mobile: number;
        tablet: number;
        desktop: number;
    };
}

const PrinciplesSection: React.FC = () => {
    const principles: Principle[] = [
        {
            id: 1,
            title: "Notre ambition",
            description: "est de devenir un partenaire de confiance pour les particuliers, les familles et les entreprises, en leur offrant un service rapide, transparent et professionnel.\n" +
                "\n\n" +
                "NDC Travel se positionne comme un pont entre les continents, rapprochant les personnes et facilitant les échanges grâce à des solutions modernes, fiables et accessibles.",
            imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop",
            aspectRatios: {
                mobile: (300 / 167) * 100,
                tablet: (350 / 397) * 100,
                desktop: (204 / 336) * 100
            }
        },

        {
            id: 2,
            title: "Notre histoire",
            description: "NDC Travel est née d'une idée simple : rendre les voyages et les échanges internationaux plus accessibles, rapides et fiables.\n" +
                "Bien que jeune, notre agence connaît une croissance rapide, portée par la confiance de nos clients et notre volonté d'apporter des solutions modernes aux voyageurs et aux expéditeurs.\n" +
                "\n" +
                "Depuis notre lancement, nous avons su gagner la fidélité de particuliers et d'entreprises grâce à un service de proximité, transparent et orienté résultats.",
            imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
            aspectRatios: {
                mobile: (300 / 467) * 100,
                tablet: (350 / 697) * 100,
                desktop: (452 / 636) * 100
            }
        },

        {
            id: 3,
            title: "Notre priorité",
            description: "Vous simplifier la vie et vous accompagner dans chacun de vos projets de voyage et d'expédition, où que vous soyez.",
            imageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop",
            aspectRatios: {
                mobile: (300 / 467) * 100,
                tablet: (350 / 697) * 100,
                desktop: (617 / 636) * 100
            }
        },

        {
            id: 4,
            title: "Nos valeurs",
            description: "Chez NDC Travel, nous plaçons nos clients au centre de tout :\n" +
                "\n" +
                "Fiabilité : des services rapides, clairs et sécurisés.\n" +
                "\n" +
                "Proximité : une relation humaine, avec une équipe disponible et réactive.\n" +
                "\n" +
                "Transparence : pas de surprises, juste des solutions adaptées et honnêtes.\n" +
                "\n" +
                "Accessibilité : des prix compétitifs et des services ouverts à tous.",
            imageUrl: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop",
            aspectRatios: {
                mobile: (300 / 467) * 100,
                tablet: (350 / 697) * 100,
                desktop: (353 / 636) * 100
            }
        },
        {
            id: 5,
            title: "Nos engagements",
            description: "Mettre en avant des promesses fortes : ponctualité, sécurité des envois, accompagnement personnalisé, service après-vente réactif.",
            imageUrl: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop",
            aspectRatios: {
                mobile: (300 / 467) * 100,
                tablet: (350 / 697) * 100,
                desktop: (452 / 636) * 100
            }
        }
    ];

    // Function to format text with line breaks and HTML support
    const formatTextWithLineBreaks = (text: string) => {
        return text.split('\n').map((line, index) => (
            <React.Fragment key={index}>
                <span dangerouslySetInnerHTML={{ __html: line }} />
                {index < text.split('\n').length - 1 && <br />}
            </React.Fragment>
        ));
    };

    const PrincipleCard: React.FC<{ principle: Principle; className?: string }> = ({
                                                                                       principle,
                                                                                       className = ""
                                                                                   }) => {
        return (
            <div className={`relative bg-gray-100 rounded-2xl overflow-hidden ${className}`}>
                {/* Content overlay */}
                <div className="absolute inset-0 z-20 p-4">
                    <div className="p-2 lg:p-3 xl:p-4">
                        <h3 className="text-white text-xl lg:text-2xl font-semibold mb-2 lg:mb-3 pb-1">
                            {principle.title}
                        </h3>
                        <p className="text-white text-sm lg:text-lg mb-0 leading-relaxed">
                            {formatTextWithLineBreaks(principle.description)}
                        </p>
                    </div>
                </div>

                {/* Responsive aspect ratio containers */}
                <div
                    className="block sm:hidden"
                    style={{
                        aspectRatio: `467 / 300`,
                        paddingBottom: `${principle.aspectRatios.mobile}%`
                    }}
                />
                <div
                    className="hidden sm:block md:hidden"
                    style={{
                        aspectRatio: `697 / 350`,
                        paddingBottom: `${principle.aspectRatios.tablet}%`
                    }}
                />
                <div
                    className="hidden md:block"
                    style={{
                        aspectRatio: `636 / ${Math.round(636 * principle.aspectRatios.desktop / 100)}`,
                        paddingBottom: `${principle.aspectRatios.desktop}%`
                    }}
                />

                {/* Background image */}
                <img
                    src={principle.imageUrl}
                    // className="absolute inset-0 w-full h-full object-cover"
                    alt={principle.title}
                    loading="lazy"
                />

                {/* Dark overlays */}
                <div className="absolute inset-0 z-10 bg-black bg-opacity-50 sm:hidden" />
                <div
                    className="absolute inset-0 z-10 hidden sm:block"
                    style={{
                        background: 'linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%)'
                    }}
                />
            </div>
        );
    };

    return (
        <section className="container mx-auto px-4 pt-8 sm:pt-12 md:pt-16 lg:pt-20 pb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left column */}
                <div className="flex flex-col gap-4 mb-4 md:mb-0">
                    <PrincipleCard principle={principles[0]} />
                    <PrincipleCard principle={principles[1]} />
                </div>

                {/* Right column */}
                <div className="flex flex-col gap-4">
                    <PrincipleCard principle={principles[2]} />
                    <PrincipleCard principle={principles[3]} />
                    <PrincipleCard principle={principles[4]} />
                </div>
            </div>
        </section>
    );
};

export default PrinciplesSection;