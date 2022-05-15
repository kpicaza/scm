const app = document.getElementById('app');

app.addEventListener('loadMap', async (event) => {
    const map = L.map('map', {
        crs: L.CRS.Simple,
        minZoom: -1,
        maxZoom: 5,
    });
    const bounds = [[0, 0], [1080, 1920]];
    const image = L.imageOverlay(event.detail.map, bounds).addTo(map);

    await event.detail.loader(map)
    
    map.fitBounds(bounds);
});

export default function loadMap(map, loader) {
    const event = new CustomEvent('loadMap', {
        bubbles: true,
        detail: {
            map: map,
            loader: loader
        }
    });
    app.dispatchEvent(event);
}
