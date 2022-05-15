import loadMap from '../components/map.js';
import loadHistoricalChallengeMarkers from '../components/historical-challenges.js';

export function render() {
    loadMap('/assets/nyc-map.png', async (map) => {
        loadHistoricalChallengeMarkers(map, 'nyc');
    });    
}
