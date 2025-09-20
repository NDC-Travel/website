import Link from 'next/link';
import Image from "next/image";
import {Package, Truck} from "lucide-react";

export default function Header() {
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
                                <Link href="#" className="nav-link">Nos Services</Link>
                            </li>
                            <li className="nav-item py-lg-2 me-lg-n2 me-xl-0">
                                <Link href="#" className="nav-link">À Propos</Link>
                            </li>
                            <li className="nav-item py-lg-2 me-lg-n2 me-xl-0">
                                <Link href="#" className="nav-link">Contactez-Nous</Link>
                            </li>

                        </ul>
                    </div>
                </nav>

                <div className="d-flex gap-sm-1">
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