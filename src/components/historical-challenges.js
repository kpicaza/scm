import loadMarkers from './marker.js';

export default async function loadHistoricalChallengeMarkers(map, mapName) {
    return loadMarkers(map, mapName, 'historical-challenges', (markerData) => {
        return `
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
    });
}
