import loadMap from '../components/map.js';
import loadHistoricalChallengeMarkers from '../components/historical-challenges.js';
import loadDailyChallengeMarkers from '../components/daily-challenges.js';
import ENV from '../../env.js';

export function render() {
    loadMap(`${ENV.SITE_URL}assets/nyc-map.png`, async (map) => {
        loadHistoricalChallengeMarkers(map, 'nyc');
        loadDailyChallengeMarkers(map, 'nyc');
    });    
}
