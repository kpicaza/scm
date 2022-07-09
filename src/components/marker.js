import ENV from '../../env.js';
import getMarkerIcon from './marker-icon.js';


export default async function loadMarkers(map, mapName, markerType, markup) {
    const data = await fetch(`${ENV.SITE_URL}/data/${markerType}-${mapName}.json`);
    const markers = L.markerClusterGroup();
    const markerIcon = getMarkerIcon(markerType);
    const pointers = await data.json();
    pointers.map((markerData) => {
        let popup = L.popup({
            className: `${markerType}-popup`
        })
            .setContent(markup(markerData));

        let marker = L.latLng([markerData.coordinates.lat, markerData.coordinates.lng]);
        marker = L.marker(marker, { icon: markerIcon }).bindPopup(popup);
        markers.addLayer(marker);
    });

    return map.addLayer(markers);
}
