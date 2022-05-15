import ENV from '../../env.js';

const historicalMarker = L.icon({
    iconUrl: `${ENV.SITE_URL}assets/historical-marker.png`,

    iconSize:     [45, 45], // size of the icon
    shadowSize:   [0, 0], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 0],  // the same for the shadow
    popupAnchor:  [0, -96] // point from which the popup should open relative to the iconAnchor
});

export default async function loadHistoricalChallengeMarkers(map, mapName) {
    const data = await fetch(`${ENV.SITE_URL}/data/historical-challenges-${mapName}.json`)
    const markers = L.markerClusterGroup();
    const historicalChallenges = await data.json();
    historicalChallenges.map((markerData) => {
        let marker = L.latLng([markerData.coordinates.lat, markerData.coordinates.lng])
        marker = L.marker(marker, {icon: historicalMarker}).bindPopup(
`
<div>
    <div>
        <a href="${markerData.video}" target="_blank">
            <img src="${markerData.picture}" width=303px/>
        </a>
    </div>
    <div><strong>Skater:</strong> ${markerData.skater}<div>
    <div><strong>Trick:</strong> ${markerData.trick}</div>
    <div>${markerData.description}</div>
</div>
`
        )
        markers.addLayer(marker);
    })

    return map.addLayer(markers);
}
