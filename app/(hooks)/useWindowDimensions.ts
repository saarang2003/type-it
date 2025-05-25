import { useEffect, useState } from "react";


const getWindowDimensions = () : [number , number] =>{

    return [window.innerWidth , window.innerHeight];
}

export default function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState<[number, number]>(getWindowDimensions);

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}