'use client'

import React, { useState } from 'react';
import {
    Search,
    Grid,
    Key,
    ShoppingBag,
    Coffee,
    Music,
    Heart,
    HeadsetIcon,
    DollarSignIcon,
    LockIcon
} from 'lucide-react';
import {RiSpeedLine} from "react-icons/ri";

interface Category {
    id: string;
    name: string;
    icon: React.ReactNode;
    color: string;
    bgColor: string;
}

const categories: Category[] = [
    {
        id: 'accommodation',
        name: 'Accommodation',
        icon: <Key className="w-12 h-12" />,
        color: 'text-blue-600',
        bgColor: 'bg-blue-100'
    },
    {
        id: 'shopping',
        name: 'Shopping',
        icon: <ShoppingBag className="w-12 h-12" />,
        color: 'text-cyan-600',
        bgColor: 'bg-cyan-100'
    },
    {
        id: 'food',
        name: 'Food & Drink',
        icon: <Coffee className="w-12 h-12" />,
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-100'
    },
    {
        id: 'entertainment',
        name: 'Entertainment',
        icon: <Music className="w-12 h-12" />,
        color: 'text-green-600',
        bgColor: 'bg-green-100'
    },
    {
        id: 'health',
        name: 'Health',
        icon: <Heart className="w-12 h-12" />,
        color: 'text-red-600',
        bgColor: 'bg-red-100'
    }
];

const categoryOptions = [
    { value: '', label: 'Category' },
    { value: 'accommodation', label: 'Accommodation' },
    { value: 'shopping', label: 'Shopping' },
    { value: 'food', label: 'Food & Drink' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'health', label: 'Health' }
];

export default function ServiceBanner() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Search:', { query: searchQuery, category: selectedCategory });
    };

    return (
        <section className="position-relative pt-5 pb-md-3 pb-lg-4 pb-xl-5 mt-n1 mt-sm-0">
            <div className="container position-relative z-2 pt-md-4 pt-lg-5 pb-xxl-3">
                <div className="pt-sm-2 mx-auto" style={{ maxWidth: '820px' }}>
                    <h1 className="display-4 text-center mb-sm-4">Envoyez vos colis en toute confiance</h1>
                    <p className="fs-lg text-center pb-3 pb-sm-0 pb-lg-2 pb-xl-3 mb-4 mb-sm-5 mx-auto" style={{ maxWidth: '546px' }}>
                        Avec NDC Travels, expédiez vos colis rapidement et en toute sécurité entre l’Europe, l’Afrique et les États-Unis, grâce à notre réseau fiable et nos partenaires de confiance.
                    </p>

                    {/* Search form */}
                    <div className="position-relative z-3 p-2 mx-auto" style={{ maxWidth: '720px' }}>

                    </div>

                    {/* Categories */}
                    <div className="overflow-x-auto pb-3 pt-2 pt-sm-3 pt-md-4 pt-lg-5 mt-xxl-3">
                        <div className="d-flex justify-content-between text-nowrap pt-5">
                            <article className="hover-effect-scale position-relative flex-shrink-0 text-center px-3">
                                <div className="position-relative d-flex align-items-end justify-content-center text-primary mx-auto" style={{ width: '88px', height: '88px' }}>
                                    <DollarSignIcon className="position-relative z-1 !h-[48px] !w-[48px] relative top-[-20px]" style={{ backfaceVisibility: 'hidden' }} />
                                    <span className="hover-effect-target position-absolute top-0 start-0 w-100 h-100 bg-primary-subtle rounded-circle" style={{ '--fn-transform-scale': '1.1' } as React.CSSProperties}></span>
                                </div>
                                <h3 className="h6 fw-normal pt-3 pt-sm-4 mb-0">
                                    <b>Economique</b>
                                </h3>
                            </article>

                            <article className="hover-effect-scale position-relative flex-shrink-0 text-center px-3">
                                <div className="position-relative d-flex align-items-end justify-content-center text-info mx-auto" style={{ width: '88px', height: '88px' }}>
                                    <RiSpeedLine className="position-relative z-1 !h-[48px] !w-[48px] relative top-[-20px]" style={{ backfaceVisibility: 'hidden' }} />
                                    <span className="hover-effect-target position-absolute top-0 start-0 w-100 h-100 bg-info-subtle rounded-circle" style={{ '--fn-transform-scale': '1.1' } as React.CSSProperties}></span>
                                </div>
                                <h3 className="h6 fw-normal pt-3 pt-sm-4 mb-0">
                                    <b>Rapide</b>
                                </h3>
                            </article>

                            <article className="hover-effect-scale position-relative flex-shrink-0 text-center px-3">
                                <div className="position-relative d-flex align-items-end justify-content-center text-warning mx-auto" style={{ width: '88px', height: '88px' }}>
                                    <LockIcon className="position-relative z-1 !h-[48px] !w-[48px] relative top-[-20px]" style={{ backfaceVisibility: 'hidden' }} />
                                    <span className="hover-effect-target position-absolute top-0 start-0 w-100 h-100 bg-warning-subtle rounded-circle" style={{ '--fn-transform-scale': '1.1' } as React.CSSProperties}></span>
                                </div>
                                <h3 className="h6 fw-normal pt-3 pt-sm-4 mb-0">
                                    <b>Sécurisé</b>
                                </h3>
                            </article>

                            <article className="hover-effect-scale position-relative flex-shrink-0 text-center px-3">
                                <div className="position-relative d-flex align-items-end justify-content-center text-success mx-auto" style={{ width: '88px', height: '88px' }}>
                                    <HeadsetIcon className="position-relative z-1 !h-[48px] !w-[48px] relative top-[-20px]" style={{ backfaceVisibility: 'hidden' }} />
                                    <span className="hover-effect-target position-absolute top-0 start-0 w-100 h-100 bg-success-subtle rounded-circle" style={{ '--fn-transform-scale': '1.1' } as React.CSSProperties}></span>
                                </div>
                                <h3 className="h6 fw-normal pt-3 pt-sm-4 mb-0">
                                    <b>Support 24/7</b>
                                </h3>
                            </article>
                        </div>
                    </div>
                </div>
            </div>

            {/* Background images */}
            <div className="position-absolute top-0 start-0 w-100 h-100 overflow-hidden">
                <div className="position-absolute top-0 start-50 h-100 translate-middle-x d-flex align-items-start">
                    <div className="d-xl-none" style={{ width: '2300px' }}></div>
                    <div className="d-none d-xl-block d-xxl-none" style={{ width: '2340px' }}></div>
                    <div className="d-none d-xxl-block" style={{ width: '2390px' }}></div>
                    <div className="position-absolute" style={{ top: '-212px', left: '-130px', width: '865px' }}>
                        <div className="ratio ratio-1x1 bg-body-tertiary rounded-circle overflow-hidden">
                            <img src="/banner3.jpg" alt="Image" />
                        </div>
                        <span className="position-absolute top-50 translate-middle-y bg-success-subtle rounded-circle z-1" style={{ right: '-27px', width: '60px', height: '60px', marginTop: '62px' }}></span>
                        <span className="position-absolute top-50 translate-middle-y bg-primary rounded-circle z-1" style={{ right: '42px', width: '22px', height: '22px', marginTop: '25px' }}></span>
                    </div>
                    <div className="position-absolute bottom-0" style={{ right: '135px', width: '562px' }}>
                        <div className="ratio ratio-1x1 bg-body-tertiary rounded-circle overflow-hidden">
                            <img src="/banner2.jpg" alt="Image" />
                        </div>
                        <span className="position-absolute top-0 bg-primary rounded-circle z-1" style={{ left: '55px', width: '60px', height: '60px', marginTop: '55px' }}></span>
                        <span className="position-absolute top-0 bg-success-subtle rounded-circle z-1" style={{ left: '40px', width: '21px', height: '21px', marginTop: '25px' }}></span>
                    </div>
                </div>
            </div>
        </section>
    );
}