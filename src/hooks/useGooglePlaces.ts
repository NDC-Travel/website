'use client';
import { useEffect, useState } from 'react';

export default function useGooglePlaces(apiKey: string) {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        if ((window as any).google?.maps?.places) {
            setIsLoaded(true);
            return;
        }

        const existing = document.getElementById('google-maps-script');
        if (existing) {
            existing.addEventListener('load', () => setIsLoaded(true));
            return;
        }

        const script = document.createElement('script');
        script.id = 'google-maps-script';
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = () => setIsLoaded(true);
        document.body.appendChild(script);
    }, [apiKey]);

    return isLoaded;
}
