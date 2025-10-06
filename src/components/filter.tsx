"use client";

import React, { useState } from "react";
import { Calendar, CreditCard, MapPin, Menu } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const categories = [
    "Concerts",
    "Sports",
    "Hobbies",
    "Disco",
    "Conference",
    "Cinema",
];

const locations = [
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Phoenix",
    "Philadelphia",
    "San Antonio",
    "San Diego",
    "Dallas",
    "San Jose",
];

const prices = [
    "Free",
    "Up to $25",
    "$25 - $50",
    "$50 - $100",
    "$100 - $200",
    "Over $200",
];

export default function ListingFilter() {
    const [category, setCategory] = useState("Concerts");
    const [location, setLocation] = useState("Chicago");
    const [date, setDate] = useState("");
    const [price, setPrice] = useState("");

    return (
        <section className="container mb-2">
            <h1 className="mb-4 text-3xl font-semibold">Listings des Colis</h1>

            {/* Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                {/* Category */}
                <div className="relative">
                    <Menu className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                    <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger className="!pl-12 !rounded-lg !h-[45px] !w-full bg-transparent">
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map((c) => (
                                <SelectItem key={c} value={c}>
                                    {c}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Location */}
                <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                    <Select value={location} onValueChange={setLocation}>
                        <SelectTrigger className="!pl-12 !rounded-lg !h-[45px] !w-full bg-transparent">
                            <SelectValue placeholder="Location" />
                        </SelectTrigger>
                        <SelectContent>
                            {locations.map((loc) => (
                                <SelectItem key={loc} value={loc}>
                                    {loc}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Date */}
                <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                    <Input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="!pl-12 !w-full bg-transparent !rounded-lg !h-[45px]"
                    />
                </div>

                {/* Price */}
                <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                    <Select value={price} onValueChange={setPrice}>
                        <SelectTrigger className="!pl-12 !rounded-lg !h-[45px] !w-full bg-transparent">
                            <SelectValue placeholder="Price" />
                        </SelectTrigger>
                        <SelectContent>
                            {prices.map((p) => (
                                <SelectItem key={p} value={p}>
                                    {p}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </section>
    );
}
