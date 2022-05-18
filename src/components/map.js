const app = document.getElementById('app');

app.addEventListener('loadMap', async (event) => {
    const map = L.map('map', {
        crs: L.CRS.Simple,
        minZoom: -1,
        maxZoom: 3,
    });
    const bounds = [[100,0], [2160, 3840]];
    L.imageOverlay(event.detail.map, bounds).addTo(map);

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
