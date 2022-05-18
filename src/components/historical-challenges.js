import ENV from '../../env.js';
import getMarker from './marker.js';

const historicalMarker = getMarker('historical');

export default async function loadHistoricalChallengeMarkers(map, mapName) {
    const data = await fetch(`${ENV.SITE_URL}/data/historical-challenges-${mapName}.json`);
    const markers = L.markerClusterGroup();
    const historicalChallenges = await data.json();
    historicalChallenges.map((markerData) => {
        let popup = L.popup({
            className: 'historical-popup'
        })
            .setContent(
                `
                <div>
                    <div>
                        <a href="${markerData.video}" target="_blank">
                            <img src="${markerData.picture}" height="170px"/>
                        </a>
                    </div>
                    <div><strong>Skater:</strong> ${markerData.skater}<div>
                    <div><strong>Trick:</strong> ${markerData.trick}</div>
                    <div>${markerData.description}</div>
                </div>
                `
            );

        let marker = L.latLng([markerData.coordinates.lat, markerData.coordinates.lng]);
        marker = L.marker(marker, { icon: historicalMarker }).bindPopup(popup);
        markers.addLayer(marker);
    })

    return map.addLayer(markers);
}
