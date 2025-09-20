import Link from 'next/link';
import {ArrowRightCircle, Package, User2} from "lucide-react";

export default function CTASection() {
    return (
        <section className="position-relative bg-black py-5 px-sm-5 px-md-0">
            <div className="container position-relative z-2 py-lg-5">
                <div className="row py-2 py-sm-4 py-lg-5">
                    <div className="col-md-4 col-lg-5 py-lg-2 py-xl-4 py-xxl-5 mb-md-3">
                        <h2 className="text-white text-center text-md-start pb-2 pb-sm-3">
                            Notre Engagement :
                            un transport fiable et
                            un suivi de qualité
                            à chaque étape
                        </h2>
                        <div className="d-flex mt-5 flex-column flex-sm-row flex-md-column flex-lg-row justify-content-center justify-content-md-start gap-3">
                            <Link
                                href="/"
                                className="btn btn-lg btn-primary animate-slide-end"
                            >
                                Contactez-Nous
                                <ArrowRightCircle className="fi-plus fs-lg animate-target ms-2"/>
                            </Link>
                        </div>

                        <div className="d-flex gap-3 mt-5 gap-sm-4 justify-content-between">
                            <div className="d-flex align-items-center gap-3 mt-5 gap-sm-4 justify-content-between">
                                <Package className={'text-white'} style={{ width: "50px", height: "auto"}} />
                                <div className="vstack gap-2">
                                    <div className="h1 mb-0" style={{ color: '#ffab00' }}>
                                        3 500+
                                    </div>
                                    <div className="text-white opacity-75">Colis Expediés</div>
                                </div>
                            </div>

                            <div className="d-flex align-items-center gap-3 mt-5 gap-sm-4 justify-content-between">
                                <User2 className={'text-white'} style={{ width: "50px", height: "auto"}} />
                                <div className="vstack gap-2">
                                    <div className="h1 mb-0" style={{ color: '#ffab00' }}>
                                        300+
                                    </div>
                                    <div className="text-white opacity-75">Clients Satisfaits</div>
                                </div>
                            </div>
                        </div>

                        <div
                            className="position-absolute top-50 start-50 translate-middle d-none d-md-flex align-items-center justify-content-center"
                            style={{ width: '164px', height: '164px' }}
                        >
                            <svg
                                className="animate-spin"
                                width="144"
                                viewBox="0 0 100 100"
                                xmlns="http://www.w3.org/2000/svg"
                                style={{ animationDuration: '22s' }}
                            >
                                <path
                                    id="circlePath"
                                    fill="none"
                                    d="M 10, 50a 40,40 0 1,1 80,0a 40,40 0 1,1 -80,0"
                                />
                                <text
                                    id="text"
                                    fontSize="7.7"
                                    fill="#fff"
                                    style={{ letterSpacing: '-.05' }}
                                >
                                    <textPath id="textPath" href="#circlePath">
                                       NDC Travels &nbsp; NDC Travels &nbsp; NDC Travels &nbsp; NDC Travels &nbsp; NDC Travels &nbsp;
                                    </textPath>
                                </text>
                            </svg>
                            <span className="position-absolute top-0 start-0 w-100 h-100 border border-2 border-white rounded-circle"></span>
                            <span
                                className="position-absolute top-50 start-50 translate-middle border border-2 border-white rounded-circle"
                                style={{ width: '87px', height: '87px' }}
                            ></span>
                            <span
                                className="position-absolute top-50 start-50 translate-middle bg-primary rounded-circle"
                                style={{ width: '30px', height: '30px' }}
                            ></span>
                        </div>
                    </div>
                </div>
            </div>
            <img
                src="/cta.jpg"
                className="position-absolute top-0 end-0 w-50 h-100 object-fit-cover d-none d-md-block"
                alt="Image"
            />
        </section>
    );
}