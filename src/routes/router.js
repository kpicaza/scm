const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href)
    handleLocation()
}

const routes = {
    404: {
        template: "pages/404.html",
        controller: null
    },
    "/": {
        template: "pages/nyc-1.html",
        controller: "nyc-1-map.js"
    },
};

let currentPath = null;

const handleLocation = async () => {
    const path = window.location.pathname;
    if (path === currentPath) {
        return;
    }
    currentPath = path;

    const route = routes[path] || routes[404];
    const html = await fetch(route.template).then((data) => data.text());
    document.getElementById('app').innerHTML = html;

    if (null === route.controller) {
        return;
    }

    const module = `../controllers/${route.controller}`;

    const controller = await import(module);
    controller.render();
}

window.onpopstate = handleLocation;
window.route = route;

handleLocation()
