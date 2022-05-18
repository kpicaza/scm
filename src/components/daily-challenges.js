import ENV from '../../env.js';
import getMarker from './marker.js';

const dailyMarker = getMarker('daily');

export default async function loadDailyChallengeMarkers(map, mapName) {
    const data = await fetch(`${ENV.SITE_URL}/data/daily-challenges-${mapName}.json`);
    const markers = L.markerClusterGroup();
    const dailyChallenges = await data.json();
    dailyChallenges.map((markerData) => {
        let popup = L.popup({
            className: 'daily-popup'
        })
            .setContent(
                `
                <div>
                    <div>
                        <a href="${markerData.video}" target="_blank">
                            <img src="${markerData.picture}" height="170px"/>
                        </a>
                    </div>
                    <div><strong>${markerData.name}</strong></div>
                    <div>${markerData.description}</div>
                </div>
                `
            );

        let marker = L.latLng([markerData.coordinates.lat, markerData.coordinates.lng]);
        marker = L.marker(marker, { icon: dailyMarker }).bindPopup(popup);
        markers.addLayer(marker);
    })

    return map.addLayer(markers);
}
