'use client'

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Link from 'next/link';
import Image from "next/image";
import {BadgeCheckIcon, BellIcon, ChevronRightIcon, Package, Truck, User2Icon, UsersIcon} from "lucide-react";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemGroup,
    ItemMedia,
    ItemTitle,
} from "@/components/ui/item"
import {Button} from "@/components/ui/button";
import React from "react";
import Login from "@/components/login";
import {usePathname} from "next/navigation";
import {useSession} from "next-auth/react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

export default function Header() {

    const { data: session } = useSession();

    const [openAuth, setOpen] = React.useState(false);

    const pathname = usePathname();

    React.useEffect(() => {
        setOpen(false);
    }, [pathname]);

    const music = [
        {
            title: "Midnight City Lights",
            artist: "Neon Dreams",
            album: "Electric Nights",
            duration: "3:45",
        },
        {
            title: "Coffee Shop Conversations",
            artist: "The Morning Brew",
            album: "Urban Stories",
            duration: "4:05",
        },
        {
            title: "Digital Rain",
            artist: "Cyber Symphony",
            album: "Binary Beats",
            duration: "3:30",
        },
    ]

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

                    {
                        session ?
                            <div className={'!flex !items-center !justify-center !gap-x-6  me-5'}>
                                <Link href={"/dashboard"} className={'!text-decoration-none'}>
                                    <Avatar className={'!w-[40px] !bg-black !text-white !h-[40px]'}>
                                        <AvatarImage src={session.user?.image as string} />
                                        <AvatarFallback className={'!text-decoration-none !bg-black !text-white'}>{session.user?.name?.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                </Link>
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <Button variant="outline" size="icon" className={'!h-[40px] !m-0 !rounded-full !w-[40px]'}>
                                            <BellIcon />
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent className="w-full sm:max-w-[640px] overflow-y-auto">
                                        <SheetHeader>
                                            <SheetTitle>Notifications</SheetTitle>
                                        </SheetHeader>
                                        <div className="!flex !w-full !px-3 !flex-col !gap-6">
                                            <ItemGroup className="gap-4">
                                                {music.map((song) => (
                                                    <Item key={song.title} variant="outline" asChild role="listitem">
                                                        <a className={'!text-decoration-none !hover:text-decoration-none'} href="#">
                                                            <ItemMedia variant="image">
                                                                <Image
                                                                    src={`/img.jpg}`}
                                                                    alt={song.title}
                                                                    width={32}
                                                                    height={32}
                                                                    className="object-cover"
                                                                />
                                                            </ItemMedia>
                                                            <ItemContent>
                                                                <ItemTitle className="line-clamp-1 text-black fw-bold">
                                                                    {song.title}
                                                                </ItemTitle>
                                                                <ItemDescription>{song.artist}</ItemDescription>
                                                            </ItemContent>
                                                            <ItemContent className="flex-none text-center">
                                                                <ItemDescription>{song.duration}</ItemDescription>
                                                            </ItemContent>
                                                        </a>
                                                    </Item>
                                                ))}
                                            </ItemGroup>

                                            <Item variant="outline" className={'!py-4'}>
                                                <ItemContent>
                                                    <ItemTitle className={'text-black !font-bold'}>Basic Item</ItemTitle>
                                                    <ItemDescription>
                                                        A simple item with title and description.
                                                    </ItemDescription>
                                                </ItemContent>
                                                <ItemActions>
                                                    <Button variant="outline" size="sm">
                                                        Action
                                                    </Button>
                                                </ItemActions>
                                            </Item>
                                        </div>
                                        <SheetFooter>
                                            <SheetClose asChild>
                                                <Button className={'!rounded-lg'} variant="destructive">Fermer</Button>
                                            </SheetClose>
                                        </SheetFooter>
                                    </SheetContent>
                                </Sheet>
                            </div>
                            :
                            <Drawer open={openAuth} onOpenChange={setOpen}>
                                <DrawerTrigger onClick={() => setOpen(true)}>
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

                                            <div className={'!flex !items-center !justify-center !w-full'}>
                                                <div className={'!max-w-[700px] !w-[450px]'}>
                                                    <Login />
                                                </div>
                                            </div>
                                        </DrawerDescription>
                                    </DrawerHeader>

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
                    }

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