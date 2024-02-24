import dynamic from 'next/dynamic';
export const MapComponent = dynamic(() => import('../Mapbox/Mapbox'), { ssr: false });