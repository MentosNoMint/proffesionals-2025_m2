import {config} from "./config.js";
import {createRoute, createLoadComponent} from "./routing/loadComponent.js";
import {routeHandler} from "./routing/routes.js";

const loadComponent = createLoadComponent(config)
const route = createRoute(loadComponent)


Object.keys(routeHandler).forEach((path) => {
    route.onRoute(path, routeHandler[path])
})

window.addEventListener('DOMContentLoaded', () => {
    route.init()
})