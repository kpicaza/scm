import ENV from '../../env.js';

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
    let path = window.location.pathname;
    path = path.split('/scm').pop();

    if (path === currentPath) {
        return;
    }
    currentPath = path;

    const route = routes[path] || routes[404];
    console.log([ENV.SITE_URL, route.template]);
    const html = await fetch(ENV.SITE_URL + route.template).then((data) => data.text());
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
