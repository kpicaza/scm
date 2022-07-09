import ENV from '../../env.js';

export default function getMarkerIcon(markerName) {
    const marker = L.icon({
        iconUrl: `${ENV.SITE_URL}assets/${markerName}-marker.png`,
    
        iconSize:     [45, 45], // size of the icon
        shadowSize:   [0, 0], // size of the shadow
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [0, 0],  // the same for the shadow
        popupAnchor:  [0, -96] // point from which the popup should open relative to the iconAnchor
    });
    
    return marker;
};
