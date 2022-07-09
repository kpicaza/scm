import loadMarkers from './marker.js';

export default async function loadDailyChallengeMarkers(map, mapName) {
    return loadMarkers(map, mapName, 'daily-challenges', (markerData) => {
        return `
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
    });
}
