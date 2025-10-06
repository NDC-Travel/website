"use client";

import React from "react";
import Link from "next/link";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
    return (
        <nav className="container pt-4 pb-1 pb-sm-2" aria-label="breadcrumb">
            <ol className="breadcrumb">
                {items.map((item, index) => (
                    <li
                        key={index}
                        className={`breadcrumb-item ${index === items.length - 1 ? "active" : ""}`}
                        aria-current={index === items.length - 1 ? "page" : undefined}
                    >
                        {item.href && index !== items.length - 1 ? (
                            <Link href={item.href}>{item.label}</Link>
                        ) : (
                            item.label
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
