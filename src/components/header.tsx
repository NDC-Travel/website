'use client'

import Link from 'next/link';
import Image from "next/image";
import {Package, Truck, User2Icon, UsersIcon} from "lucide-react";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import {Button} from "@/components/ui/button";
import React from "react";

export default function Header() {

    const handleSocialLogin = (provider: string) => {
        console.log(`Login with ${provider}`);
        // Handle social login here
    };

    return (
        <header
            className="navbar navbar-expand-lg bg-body navbar-sticky sticky-top z-fixed px-0"
            data-sticky-element=""
        >
            <div className="container">
                <button
                    type="button"
                    className="navbar-toggler me-3 me-lg-0"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <Link href="/" className="navbar-brand py-1 py-md-2 py-xl-1 me-2 me-sm-n4 me-md-n5 me-lg-0 flex items-center">
                    <Image alt={"NDC Travels"} width={100} height={100} src={"/appIcon.png"} className={'w-[50px] h-auto'} />
                    <Image alt={"NDC Travels"} width={100} height={100} src={"/ndc.png"} className={'w-[70px] h-auto'} />
                </Link>

                <nav className="offcanvas offcanvas-start" id="navbarNav" tabIndex={-1} aria-labelledby="navbarNavLabel">
                    <div className="offcanvas-header py-3">
                        <h5 className="offcanvas-title" id="navbarNavLabel">Browse Finder</h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="offcanvas"
                            aria-label="Close"
                        />
                    </div>
                    <div className="offcanvas-body pt-2 pb-4 py-lg-0 mx-lg-auto">
                        <ul className="navbar-nav position-relative">

                            <li className="nav-item py-lg-2 me-lg-n2 me-xl-0">
                                <Link href="/services" className="fw-bold nav-link">Nos Services</Link>
                            </li>
                            <li className="nav-item py-lg-2 me-lg-n2 me-xl-0">
                                <Link href="/about" className="fw-bold nav-link">À Propos</Link>
                            </li>
                            <li className="nav-item py-lg-2 me-lg-n2 me-xl-0">
                                <Link href="/contact" className="fw-bold nav-link">Contactez-Nous</Link>
                            </li>

                        </ul>
                    </div>
                </nav>

                <div className="d-flex gap-sm-1">

                    <Drawer>
                        <DrawerTrigger>
                            <User2Icon className={'w-8 h-8 me-5'} />
                        </DrawerTrigger>
                        <DrawerContent>
                            <DrawerHeader>
                                <DrawerTitle>
                                    <Link href="/" className="navbar-brand py-1 py-md-2 py-xl-1 me-2 me-sm-n4 me-md-n5 me-lg-0 flex items-center mb-10">
                                        <Image alt={"NDC Travels"} width={100} height={100} src={"/appIcon.png"} className={'w-[50px] h-auto'} />
                                        <Image alt={"NDC Travels"} width={100} height={100} src={"/ndc.png"} className={'w-[70px] h-auto'} />
                                    </Link>
                                </DrawerTitle>
                                <DrawerDescription>
                                    <span className="h2 mt-auto">Bienvenue sur NDC Travels</span><br/>
                                    <div className="d-flex align-items-center my-4">
                                        <hr className="w-100 m-0"/>
                                        <span
                                            className="text-body-emphasis fw-medium text-nowrap mx-4">
                                            <small className={'text-[1.15rem] text-muted'}>Connectez-vous </small>
                                        </span>
                                        <hr className="w-100 m-0"/>
                                    </div>

                                </DrawerDescription>
                            </DrawerHeader>

                            <div className="flex flex-col w-full pb-4 mx-auto" style={{maxWidth: '416px'}}>
                                <div className="flex flex-col sm:flex-row gap-3 pb-4 mb-3 lg:mb-4">
                                    <button
                                        onClick={() => handleSocialLogin('Google')}
                                        className="flex items-center justify-center w-full px-2 py-3 text-lg font-medium text-gray-700 bg-white border border-gray-300 rounded-4 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 outline-none transition-colors"
                                    >
                                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                        </svg>
                                        Google
                                    </button>
                                    <button
                                        onClick={() => handleSocialLogin('Facebook')}
                                        className="flex items-center justify-center w-full px-2 py-3 text-lg font-medium text-gray-700 bg-white border border-gray-300 rounded-4 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 outline-none transition-colors"
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                        </svg>
                                        Facebook
                                    </button>
                                </div>
                            </div>

                            <DrawerFooter className={'flex w-full justify-center'}>
                                <p className="text-body-secondary fs-sm text-center mb-0 order-sm-1">
                                    © Copyright <a
                                    className="text-primary fw-bold text-decoration-none hover-effect-underline"
                                    href="/"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    NDC Travel
                                </a>{' '}2025. Tous les droits sont reservés. {' '}
                                </p>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>

                    <Link href="#" className="btn btn-primary animate-shake me-2 h-[40px]">
                        <Truck className="w-[20px] animate-target ms-n2 me-2"/>
                        Transporter
                    </Link>

                    <Link href="#" className="btn btn-outline-primary animate-scale h-[40px]">
                        <Package className="w-20px] animate-target ms-n2 me-1 me-sm-2"/>
                        Expédier
                    </Link>
                </div>
            </div>
        </header>
    );
}