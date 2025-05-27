"use client";
import { useEffect, useState } from "react";

export default function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState<[number, number]>([0, 0]);

    useEffect(() => {
        function getWindowDimensions() {
            return [window.innerWidth, window.innerHeight] as [number, number];
        }

        setWindowDimensions(getWindowDimensions());

        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}