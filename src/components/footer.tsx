import Link from 'next/link';
import {RiTwitterXFill} from "react-icons/ri";
import {SiFacebook, SiInstagram, SiLinkedin} from "react-icons/si";
import * as React from "react";
import type { SVGProps } from "react";
import {Headset, MailIcon, PhoneCallIcon, PhoneIcon} from "lucide-react";
import Image from "next/image";
import {Separator} from "@/components/ui/separator";

export const WhatsApp = (props: SVGProps<SVGSVGElement>) => <svg viewBox="0 0 256 259" width="18px" height="18px" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" {...props}><path d="m67.663 221.823 4.185 2.093c17.44 10.463 36.971 15.346 56.503 15.346 61.385 0 111.609-50.224 111.609-111.609 0-29.297-11.859-57.897-32.785-78.824-20.927-20.927-48.83-32.785-78.824-32.785-61.385 0-111.61 50.224-110.912 112.307 0 20.926 6.278 41.156 16.741 58.594l2.79 4.186-11.16 41.156 41.853-10.464Z" fill="#00E676" /><path d="M219.033 37.668C195.316 13.254 162.531 0 129.048 0 57.898 0 .698 57.897 1.395 128.35c0 22.322 6.278 43.947 16.742 63.478L0 258.096l67.663-17.439c18.834 10.464 39.76 15.347 60.688 15.347 70.453 0 127.653-57.898 127.653-128.35 0-34.181-13.254-66.269-36.97-89.986ZM129.048 234.38c-18.834 0-37.668-4.882-53.712-14.648l-4.185-2.093-40.458 10.463 10.463-39.76-2.79-4.186C7.673 134.63 22.322 69.058 72.546 38.365c50.224-30.692 115.097-16.043 145.79 34.181 30.692 50.224 16.043 115.097-34.18 145.79-16.045 10.463-35.576 16.043-55.108 16.043Zm61.385-77.428-7.673-3.488s-11.16-4.883-18.136-8.371c-.698 0-1.395-.698-2.093-.698-2.093 0-3.488.698-4.883 1.396 0 0-.697.697-10.463 11.858-.698 1.395-2.093 2.093-3.488 2.093h-.698c-.697 0-2.092-.698-2.79-1.395l-3.488-1.395c-7.673-3.488-14.648-7.674-20.229-13.254-1.395-1.395-3.488-2.79-4.883-4.185-4.883-4.883-9.766-10.464-13.253-16.742l-.698-1.395c-.697-.698-.697-1.395-1.395-2.79 0-1.395 0-2.79.698-3.488 0 0 2.79-3.488 4.882-5.58 1.396-1.396 2.093-3.488 3.488-4.883 1.395-2.093 2.093-4.883 1.395-6.976-.697-3.488-9.068-22.322-11.16-26.507-1.396-2.093-2.79-2.79-4.883-3.488H83.01c-1.396 0-2.79.698-4.186.698l-.698.697c-1.395.698-2.79 2.093-4.185 2.79-1.395 1.396-2.093 2.79-3.488 4.186-4.883 6.278-7.673 13.951-7.673 21.624 0 5.58 1.395 11.161 3.488 16.044l.698 2.093c6.278 13.253 14.648 25.112 25.81 35.575l2.79 2.79c2.092 2.093 4.185 3.488 5.58 5.58 14.649 12.557 31.39 21.625 50.224 26.508 2.093.697 4.883.697 6.976 1.395h6.975c3.488 0 7.673-1.395 10.464-2.79 2.092-1.395 3.487-1.395 4.882-2.79l1.396-1.396c1.395-1.395 2.79-2.092 4.185-3.487 1.395-1.395 2.79-2.79 3.488-4.186 1.395-2.79 2.092-6.278 2.79-9.765v-4.883s-.698-.698-2.093-1.395Z" fill="#FFF" /></svg>;

export default function Footer() {
    return (
        <footer className="footer bg-black border-top" data-bs-theme="dark">
            <div className="container pt-sm-2 pt-md-3 pt-lg-4">
                {/* Features */}
                <div className="border-bottom flex md:flex-row flex-col md:gap-y-0 gap-y-5 justify-content-between item-center mt-0 pt-mt-4 pb-4">
                    <b style={{ alignSelf: "center" }} className="flex items-center fs-sm mb-0 pb-0 text-white">
                        <Headset className={'text-primary'} />&nbsp;&nbsp;&nbsp;
                        <span>Contactez-nous pour tout aide ou support</span>
                    </b>
                    <div className="d-flex items-center gap-x-3">
                        <a
                            className="btn btn-market h-[40px] w-100"
                            href="#!"
                            aria-label="Download on App Store"
                        >

                            <WhatsApp className="lead ms-n1 me-2"/>
                            Chattez ici
                        </a>
                        <a
                            className="btn btn-market h-[40px] w-100"
                            href="#!"
                            aria-label="Download on Google Play"
                        >
                            <PhoneCallIcon className="lead w-[18px] ms-n1 me-2"/>
                            Appelez ici
                        </a>
                    </div>
                </div>

                {/* Column with links that are turned into accordion on screens < 500px wide (sm breakpoint) + Download app CTA */}
                <div className="accordion row pb-4 py-sm-5" id="footerLinks">
                    <div className="col-sm-4 col-md-3">
                        <div className="accordion-item border-0">
                            <h6 className="accordion-header" id="siteLinksHeading">
                                <span className="d-none d-sm-block pb-1 mb-2">NDC Travels</span>
                                <button
                                    type="button"
                                    className="accordion-button collapsed py-3 d-sm-none"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#aboutLinks"
                                    aria-expanded="false"
                                    aria-controls="aboutLinks"
                                >
                                    NDC Travels
                                </button>
                            </h6>
                            <div
                                className="d-sm-block"
                                id="aboutLinks"
                                aria-labelledby="aboutLinksHeading"
                                data-bs-parent="#footerLinks"
                            >
                                <div className="nav flex-column gap-2 pt-sm-1 pt-lg-2 pb-3 pb-sm-0 mt-n1 mb-1 mb-sm-0">
                                    <Image alt={"NDC Travels"} width={100} height={100} src={"/logo.jpg"} className={'w-[50%] mt-2 rounded-lg h-auto'} />
                                </div>
                            </div>
                            <hr className="d-sm-none my-0" />
                        </div>
                    </div>

                    <div className="col-sm-4 col-md-2 col-lg-3">
                        <div className="accordion-item border-0">
                            <h6 className="accordion-header" id="aboutLinksHeading">
                                <span className="d-none d-sm-block pb-1 mb-2">Site & Navigation</span>
                                <button
                                    type="button"
                                    className="accordion-button collapsed py-3 d-sm-none"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#aboutLinks"
                                    aria-expanded="false"
                                    aria-controls="aboutLinks"
                                >
                                    Site & Navigation
                                </button>
                            </h6>
                            <div
                                className="d-sm-block"
                                id="aboutLinks"
                                aria-labelledby="aboutLinksHeading"
                                data-bs-parent="#footerLinks"
                            >
                                <ul className="nav flex-column gap-2 pt-sm-1 pt-lg-2 pb-3 pb-sm-0 mt-n1 mb-1 mb-sm-0">
                                    <li className="pt-1">
                                        <Link href="/service" className="nav-link hover-effect-underline d-inline text-body fw-normal p-0">
                                            Nos Services
                                        </Link>
                                    </li>
                                    <li className="pt-1">
                                        <Link href="/about" className="nav-link hover-effect-underline d-inline text-body fw-normal p-0">
                                            À Propos De Nous
                                        </Link>
                                    </li>
                                    <li className="pt-1">
                                        <Link href="/contact" className="nav-link hover-effect-underline d-inline text-body fw-normal p-0">
                                            Contactez-Nous
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <hr className="d-sm-none my-0" />
                        </div>
                    </div>

                    <div className="col-sm-4 col-md-2 col-xl-3">
                        <div className="accordion-item border-0">
                            <h6 className="accordion-header" id="profileLinksHeading">
                                <span className="d-none d-sm-block pb-1 mb-2">Compte Utilisateur</span>
                                <button
                                    type="button"
                                    className="accordion-button collapsed py-3 d-sm-none"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#profileLinks"
                                    aria-expanded="false"
                                    aria-controls="profileLinks"
                                >
                                    Compte Utilisateur
                                </button>
                            </h6>
                            <div
                                className="d-sm-block"
                                id="profileLinks"
                                aria-labelledby="profileLinksHeading"
                                data-bs-parent="#footerLinks"
                            >
                                <ul className="nav flex-column gap-2 pt-sm-1 pt-lg-2 pb-3 pb-sm-0 mt-n1 mb-1 mb-sm-0">
                                    <li className="pt-1">
                                        <Link href="/account" className="nav-link hover-effect-underline d-inline text-body fw-normal p-0">
                                            Mon Profil Utilisateur
                                        </Link>
                                    </li>
                                    <li className="pt-1">
                                        <Link href="/wishlist" className="nav-link hover-effect-underline d-inline text-body fw-normal p-0">
                                            Activités & Historiques
                                        </Link>
                                    </li>
                                    <li className="pt-1">
                                        <Link href="/my-listings" className="nav-link hover-effect-underline d-inline text-body fw-normal p-0">
                                            Parametres du Site
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <hr className="d-sm-none my-0" />
                        </div>
                    </div>

                    {/* Download app CTA */}
                    <div className="col-md-5 col-lg-4 col-xl-3 pt-4 pt-sm-5 pt-md-0 mt-3 mt-sm-0">
                        <h6 className="mb-2">Notre Newsletter</h6>

                        <p className="fs-sm text-body-secondary my-4">
                            Souscrire pour recevoir toutes nos offres
                        </p>

                        <form className="d-flex flex-column flex-sm-row flex-md-column gap-3 needs-validation mb-4"
                              noValidate>
                            <div className="position-relative w-100">
                                <MailIcon className="position-absolute top-50 start-0 translate-middle-y text-body ms-2"/>
                                <input type="email" className="form-control ps-10 form-icon-start text-start"
                                       placeholder="Your email" aria-label="Email input" required={true}/>
                            </div>
                            <button type="submit" className="btn btn-primary px-4">Subscribe</button>
                        </form>

                    </div>
                </div>

                {/* Copyright + Social links */}
                <div
                    className="d-flex flex-column border-top flex-sm-row align-items-center justify-content-between pb-4 pt-3 pt-sm-2 pt-md-3 pt-lg-4">
                    <div className="d-flex justify-content-center mb-3 mb-md-0 order-sm-2">
                        <a
                            className="btn btn-icon fs-base btn-outline-secondary border-0"
                            href="#!"
                            data-bs-toggle="tooltip"
                            data-bs-template='<div className="tooltip fs-xs mb-n2" role="tooltip"><div className="tooltip-inner bg-transparent text-white opacity-75 p-0"></div></div>'
                            title="Instagram"
                            aria-label="Follow us on Instagram"
                        >
                            <SiFacebook />
                        </a>
                        <a
                            className="btn btn-icon fs-base btn-outline-secondary border-0"
                            href="#!"
                            data-bs-toggle="tooltip"
                            data-bs-template='<div className="tooltip fs-xs mb-n2" role="tooltip"><div className="tooltip-inner bg-transparent text-white opacity-75 p-0"></div></div>'
                            title="Facebook"
                            aria-label="Follow us on Facebook"
                        >
                            <SiInstagram />
                        </a>
                        <a
                            className="btn btn-icon fs-base btn-outline-secondary border-0"
                            href="#!"
                            data-bs-toggle="tooltip"
                            data-bs-template='<div className="tooltip fs-xs mb-n2" role="tooltip"><div className="tooltip-inner bg-transparent text-white opacity-75 p-0"></div></div>'
                            title="X (Twitter)"
                            aria-label="Follow us on X (Twitter)"
                        >
                            <SiLinkedin />
                        </a>
                        <a
                            className="btn btn-icon fs-base btn-outline-secondary border-0"
                            href="#!"
                            data-bs-toggle="tooltip"
                            data-bs-template='<div className="tooltip fs-xs mb-n2" role="tooltip"><div className="tooltip-inner bg-transparent text-white opacity-75 p-0"></div></div>'
                            title="X (Twitter)"
                            aria-label="Follow us on X (Twitter)"
                        >
                            <RiTwitterXFill />
                        </a>
                    </div>
                    <p className="text-body-secondary fs-sm text-center mb-0 order-sm-1">
                        © Copyright <a
                            className="text-white fw-bold text-decoration-none hover-effect-underline"
                            href="/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            NDC Travel
                        </a>{' '}2025. Tous les droits sont reservés. {' '}
                    </p>
                </div>
            </div>
        </footer>
    );
}