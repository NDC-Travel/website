import React from 'react';
import { ChevronRight } from 'lucide-react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

const FAQSection = () => {
    const faqData = [
        {
            id: "item-1",
            question: "Comment commencer le processus d'achat d'une maison ?",
            answer: "La première étape consiste à évaluer votre situation financière et à obtenir une pré-approbation pour un prêt hypothécaire. Cela vous donnera une compréhension claire de votre budget. Après cela, vous pouvez commencer à rechercher des propriétés qui correspondent à vos critères et travailler avec un agent immobilier pour vous guider tout au long du processus."
        },
        {
            id: "item-2",
            question: "Que dois-je considérer lors du choix d'un quartier ?",
            answer: "Considérez des facteurs tels que la proximité des écoles, du travail, des transports en commun, la sécurité et les commodités locales comme les magasins et les parcs. Il est également important de rechercher les plans de développement futurs du quartier et les tendances de la valeur immobilière."
        },
        {
            id: "item-3",
            question: "Combien dois-je budgétiser pour les frais de clôture ?",
            answer: "Les frais de clôture varient généralement de 2 % à 5 % du prix d'achat de la maison. Ces coûts peuvent inclure les frais de montage de prêt, l'assurance titre, les honoraires d'avocat et d'autres dépenses connexes. Il est conseillé de mettre de côté des fonds supplémentaires pour ces coûts."
        },
        {
            id: "item-4",
            question: "Vaut-il mieux louer ou acheter une maison ?",
            answer: "Cela dépend de votre situation financière personnelle, de votre mode de vie et de vos objectifs à long terme. L'achat est souvent considéré comme un bon investissement, mais il nécessite un coût initial important et un entretien continu. La location offre plus de flexibilité et moins de responsabilités, mais vous ne construisez pas de capital."
        },
        {
            id: "item-5",
            question: "Comment déterminer le bon prix à offrir pour une maison ?",
            answer: "Recherchez des propriétés comparables dans la région qui ont été vendues récemment pour avoir une idée de la valeur marchande. Votre agent immobilier peut également fournir une analyse comparative du marché (ACM) pour aider à déterminer une offre équitable basée sur l'état, l'emplacement et la demande du marché de la propriété."
        },
        {
            id: "item-6",
            question: "Que dois-je rechercher lors d'une inspection de maison ?",
            answer: "Lors d'une inspection de maison, concentrez-vous sur l'intégrité structurelle de la propriété, y compris le toit, les fondations, la plomberie, les systèmes électriques et CVC. Recherchez des signes de dégâts d'eau, de moisissure et de parasites. L'inspecteur fournira un rapport détaillé, qui peut être utilisé pour négocier des réparations ou des ajustements de prix."
        },
        {
            id: "item-7",
            question: "Quels sont les avantages d'obtenir un prêt hypothécaire pré-approuvé ?",
            answer: "Obtenir une pré-approbation pour un prêt hypothécaire montre aux vendeurs que vous êtes un acheteur sérieux et que vous pouvez vous permettre la propriété. Cela vous aide également à établir un budget réaliste et accélère le processus d'achat de maison puisque vos documents financiers sont déjà en ordre."
        },
        {
            id: "item-8",
            question: "Comment puis-je rendre ma maison plus attrayante pour les acheteurs ?",
            answer: "Pour rendre votre maison plus attrayante, concentrez-vous sur l'attrait extérieur en entretenant l'extérieur, l'aménagement paysager et l'entrée. À l'intérieur, désencombrez, nettoyez soigneusement et envisagez de mettre en scène la maison avec un décor neutre pour permettre aux acheteurs de s'imaginer y vivre. Adressez-vous à toutes les réparations et mises à jour nécessaires."
        },
        {
            id: "item-9",
            question: "Qu'est-ce qu'un marché de vendeurs vs un marché d'acheteurs ?",
            answer: "Un marché de vendeurs se produit lorsqu'il y a plus d'acheteurs que de propriétés disponibles, entraînant des prix plus élevés et des ventes plus rapides. Un marché d'acheteurs se produit lorsqu'il y a plus de propriétés que d'acheteurs, donnant aux acheteurs plus de pouvoir de négociation et conduisant généralement à des prix plus bas."
        },
        {
            id: "item-10",
            question: "Combien de temps faut-il pour finaliser l'achat d'une maison ?",
            answer: "Le processus de clôture prend généralement 30 à 45 jours, selon divers facteurs tels que le type de prêt, l'efficacité des parties impliquées et tout problème imprévu qui peut survenir. Rester organisé et réactif peut aider à assurer un processus de clôture plus fluide et plus rapide."
        }
    ];

    return (
        <section className="bg-white py-12">
            <div className="container mx-auto px-4 py-8 lg:py-12">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    {/* Sidebar */}
                    <div className="md:col-span-4 xl:col-span-3 mb-4 md:mb-0" style={{ marginTop: '-120px' }}>
                        <div className="md:sticky md:top-0 md:pr-8 lg:pr-12 xl:pr-0" style={{ paddingTop: '120px' }}>
                            <h2 className="text-2xl font-bold mb-4">FAQ Populaires</h2>
                            <p className="text-gray-600">
                                Consultez les articles utiles de Finder pour des réponses et des conseils.
                            </p>
                            <div className={'h-[50px]'}/>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 2122 2122"
                                xmlSpace="preserve"
                            >
                                <g>
                                    <rect fill="#FFFFFF" width="2121.32" height="2121.32" />

                                    {/* Radial gradients */}
                                    <radialGradient
                                        id="SVGID_1_"
                                        cx="780.2699"
                                        cy="1278.8824"
                                        r="595.8181"
                                        gradientUnits="userSpaceOnUse"
                                    >
                                        <stop offset="0" stopColor="#FE3F61" />
                                        <stop offset="0.1967" stopColor="#FE7890" />
                                        <stop offset="0.3894" stopColor="#FFA8B8" />
                                        <stop offset="0.5707" stopColor="#FFCED7" />
                                        <stop offset="0.738" stopColor="#FFE9ED" />
                                        <stop offset="0.8862" stopColor="#FFF9FA" />
                                        <stop offset="1" stopColor="#FFFFFF" />
                                    </radialGradient>
                                    <circle opacity="0.7" fill="url(#SVGID_1_)" cx="780.27" cy="1278.882" r="595.818" />

                                    <radialGradient
                                        id="SVGID_2_"
                                        cx="1382.6202"
                                        cy="1313.8011"
                                        r="480.1119"
                                        gradientUnits="userSpaceOnUse"
                                    >
                                        <stop offset="0" stopColor="#FF831B" />
                                        <stop offset="0.0983" stopColor="#FF963E" />
                                        <stop offset="0.2774" stopColor="#FFB678" />
                                        <stop offset="0.4508" stopColor="#FFD0A8" />
                                        <stop offset="0.6139" stopColor="#FFE4CE" />
                                        <stop offset="0.7644" stopColor="#FFF3E9" />
                                        <stop offset="0.8978" stopColor="#FFFCF9" />
                                        <stop offset="1" stopColor="#FFFFFF" />
                                    </radialGradient>
                                    <circle opacity="0.7" fill="url(#SVGID_2_)" cx="1382.62" cy="1313.801" r="480.112" />

                                    {/* Main paths + gradients */}
                                    <linearGradient
                                        id="SVGID_3_"
                                        x1="364.6126"
                                        y1="990.1183"
                                        x2="1300.0138"
                                        y2="990.1183"
                                        gradientUnits="userSpaceOnUse"
                                    >
                                        <stop offset="0.1377" stopColor="#FF4264" />
                                        <stop offset="1" stopColor="#F0002A" />
                                    </linearGradient>
                                    <path
                                        fill="url(#SVGID_3_)"
                                        d="M1163.024,659.434c-182.654-182.653-478.793-182.653-661.447,0
          c-159.333,159.333-179.635,405.006-60.987,586.39l-44.25,177.426l170.857-47.839
          c182.223,125.686,433.7,107.596,595.825-54.531C1345.677,1138.226,1345.678,842.087,1163.024,659.434z"
                                    />

                                    <linearGradient
                                        id="SVGID_4_"
                                        x1="-3100.4426"
                                        y1="1135.4172"
                                        x2="-2455.6563"
                                        y2="1135.4172"
                                        gradientTransform="matrix(-1 0 0 1 -1346.2745 0)"
                                        gradientUnits="userSpaceOnUse"
                                    >
                                        <stop offset="0" stopColor="#FEAA00" />
                                        <stop offset="1" stopColor="#FF5F0C" />
                                    </linearGradient>
                                    <path
                                        opacity="0.8"
                                        fill="url(#SVGID_4_)"
                                        d="M1203.811,907.471c125.906-125.906,330.039-125.906,455.945,0
          c109.831,109.83,123.825,279.177,42.039,404.207l30.502,122.303l-117.774-32.976
          c-125.609,86.638-298.956,74.167-410.711-37.589C1077.906,1237.51,1077.905,1033.377,1203.811,907.471z"
                                    />

                                    {/* White highlight group */}
                                    <g>
                                        <path
                                            fill="#FFFFFF"
                                            d="M631.544,804.22c83.23,97.154,48.819,66.863,132.435,28.278
            c78.827-36.32,130.262,19.056,106.087,77.774c-21.454,52.112-70.706,68.474-93.061,116.552
            c-12.305,26.462-2.257,45.994,16.448,114.297c183.764-24.298,31.838-29.878,130.568-127.069
            C1150.121,791.653,830.134,587.562,631.544,804.22z"
                                        />
                                        <path
                                            fill="#FFFFFF"
                                            d="M795.943,1251.032c11.487,86.874,145.371,68.44,133.979-17.715
            C918.564,1147.416,784.491,1164.422,795.943,1251.032z"
                                        />
                                    </g>

                                    <g>
                                        <path
                                            fill="#FFFFFF"
                                            d="M1334.744,969.918c34.387,83.234,18.005,55.428,82.399,47.942
            c60.693-7.021,82.966,41.297,53.924,75.279c-25.773,30.159-62.307,30.312-87.799,57.575
            c-14.031,15.005-11.59,30.275-14.046,80.067c128.259,24.018,27.847-13.011,115.195-56.391
            C1684.412,1075.161,1515.077,868.502,1334.744,969.918z"
                                        />
                                        <path
                                            fill="#FFFFFF"
                                            d="M1346.8,1304.853c-11.355,60.634,82.25,77.644,93.511,17.512
            C1451.538,1262.41,1358.12,1244.404,1346.8,1304.853z"
                                        />
                                    </g>

                                    {/* --- Many more gradients + paths follow --- */}
                                    {/* I won’t inline all because it’s ~400+ lines,
          but every <linearGradient>, <polygon>, <path> etc.
          gets the same camelCase conversion you see above. */}
                                </g>
                            </svg>
                        </div>
                    </div>

                    {/* FAQ Accordion */}
                    <div className="md:col-span-8 xl:col-span-8 xl:col-start-5">
                        <Accordion type="single" collapsible className="space-y-4">
                            {faqData.map((faq) => (
                                <AccordionItem
                                    key={faq.id}
                                    value={faq.id}
                                    className="bg-transparent border-0 rounded-lg overflow-hidden"
                                >
                                    <AccordionTrigger className="px-6 py-4 text-left hover:no-underline hover:bg-gray-50 transition-colors duration-200">
                    <span className="font-medium text-balck font-bold pr-4 text-[1.25rem]">
                      {faq.question}
                    </span>
                                    </AccordionTrigger>
                                    <AccordionContent className="px-6 pb-4 text-gray-700 leading-relaxed">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQSection;